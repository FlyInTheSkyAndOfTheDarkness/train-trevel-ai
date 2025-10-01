import { cacheGet, cacheSet } from '@/lib/cache';
import { env } from '@/lib/env.mjs';
import { getRailProvider } from '@/lib/rail/index';
import crypto from 'node:crypto';
import OpenAI from 'openai';

type Source = { title: string; url: string };
export type SuggestResult = { summary: string; topDates: { date: string; rationale: string; priceHint?: string }[]; sources?: Source[] };

function hashQuery(v: unknown) {
  return crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex');
}

async function serpSearch(query: string): Promise<Source[]> {
  if (!env.SERPAPI_API_KEY) return [];
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&num=5&api_key=${env.SERPAPI_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  const items = (data.organic_results ?? []).slice(0, 5);
  return items.map((it: any) => ({ title: it.title as string, url: it.link as string })).filter(Boolean);
}

export async function suggestCheapestDates({ origin, destination, month }: { origin: string; destination: string; month?: string }): Promise<SuggestResult> {
  const provider = getRailProvider();
  const qHash = hashQuery({ origin, destination, month });
  const cacheKey = `ai:suggest:${qHash}`;
  const cached = await cacheGet(cacheKey);
  if (cached) return JSON.parse(cached);

  let topDates: { date: string; rationale: string; priceHint?: string }[] = [];
  let sources: Source[] | undefined = undefined;

  if (provider.getCheapestCalendar && month) {
    const stationsO = await provider.searchStations(origin);
    const stationsD = await provider.searchStations(destination);
    const o = stationsO[0];
    const d = stationsD[0];
    if (o && d) {
      const cal = await provider.getCheapestCalendar({ originId: o.id, destinationId: d.id, month });
      const sorted = cal.sort((a, b) => a.minPriceMinor - b.minPriceMinor).slice(0, 5);
      topDates = sorted.map((c) => ({ date: c.date, rationale: 'Минимальная цена по календарю', priceHint: `${(c.minPriceMinor / 100).toFixed(0)} ${c.currency}` }));
    }
  }

  if (topDates.length === 0) {
    // Heuristics fallback
    const today = new Date();
    const recommendWindow = 'покупка за 7–30 дней';
    const weekdayHint = 'будни обычно дешевле выходных';
    const nightTrainsHint = 'ночные поезда могут стоить дешевле из-за меньшего спроса';
    topDates = [0, 7, 14].map((offset) => {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset + 10);
      const date = d.toISOString().slice(0, 10);
      return { date, rationale: `${recommendWindow}; ${weekdayHint}; ${nightTrainsHint} — оценка` };
    });
    const serpQuery = `${origin} ${destination} train prices ${month ?? ''}`.trim();
    sources = await serpSearch(serpQuery);
  }

  const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;
  const baseSummary = `Рекомендации носят оценочный характер и не являются гарантией цены.`;
  let summary = `${baseSummary} ${origin} → ${destination}. Предлагаемые даты: ${topDates.map((d) => d.date).join(', ')}.`;
  if (openai) {
    const prompt = `Сформируй краткую (2-3 предложения) рекомендацию по выгодной покупке ЖД-билетов для маршрута ${origin} → ${destination}. Даты кандидаты: ${topDates.map((d) => d.date).join(', ')}. Добавь дисклеймер, что это оценка, не гарантия.`;
    try {
      const resp = await openai.chat.completions.create({
        model: env.AI_MODEL,
        messages: [
          { role: 'system', content: 'Ты помощник по поиску выгодных цен на ЖД билеты. Отвечай кратко и по-делу.' },
          { role: 'user', content: prompt }
        ]
      });
      summary = resp.choices?.[0]?.message?.content ?? summary;
    } catch {
      // ignore, keep default summary
    }
  }

  const result: SuggestResult = { summary, topDates, sources };
  await cacheSet(cacheKey, JSON.stringify(result), 60 * 60 * 6);
  return result;
}


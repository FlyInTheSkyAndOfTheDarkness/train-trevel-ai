import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { suggestCheapestDates } from '@/lib/ai/suggest';
import { cacheGet, cacheSet, makeRateLimiter } from '@/lib/cache';
import crypto from 'node:crypto';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

const rateLimit = makeRateLimiter(20, 60);

const Body = z.object({ origin: z.string().min(1), destination: z.string().min(1), month: z.string().optional() });

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'ip';
  const rl = await rateLimit(ip);
  if (!('success' in rl ? rl.success : rl)) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });

  const json = await req.json();
  const { origin, destination, month } = Body.parse(json);
  const key = crypto.createHash('md5').update(JSON.stringify({ origin, destination, month })).digest('hex');
  const cacheKey = `ai:suggest:${key}`;
  const cached = await cacheGet(cacheKey);
  if (cached) return NextResponse.json(JSON.parse(cached));

  const res = await suggestCheapestDates({ origin, destination, month });
  await cacheSet(cacheKey, JSON.stringify(res), 60 * 60 * 6);

  try {
    const session = await auth();
    await prisma.aiAdviceLog.create({
      data: {
        userId: session?.user?.id ?? null,
        queryHash: key,
        originId: origin,
        destinationId: destination,
        month: month ?? null,
        payload: res as any
      }
    });
  } catch {}

  return NextResponse.json(res);
}


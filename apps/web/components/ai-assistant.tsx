"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [origin, setOrigin] = useState('Москва');
  const [destination, setDestination] = useState('Санкт-Петербург');
  const [month, setMonth] = useState('2025-10');

  async function fetchSuggest() {
    setLoading(true);
    setResult(null);
    const res = await fetch('/api/ai/suggest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ origin, destination, month }) });
    const json = await res.json();
    setResult(json);
    setLoading(false);
  }

  return (
    <div>
      <div className="fixed bottom-4 right-4">
        <Button onClick={() => setOpen((v) => !v)}>ИИ-советы</Button>
      </div>
      {open && (
        <div className="fixed bottom-20 right-4 w-96 rounded-md border bg-white shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">TrainTravel AI</h3>
            <button onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="space-y-2">
            <input className="w-full border rounded px-2 py-1" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Откуда" />
            <input className="w-full border rounded px-2 py-1" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Куда" />
            <input className="w-full border rounded px-2 py-1" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Месяц YYYY-MM" />
            <div className="flex gap-2">
              <Button onClick={fetchSuggest} disabled={loading}>{loading ? 'Загрузка...' : 'Самые дешёвые даты'}</Button>
            </div>
            {result && (
              <div className="mt-2 space-y-2">
                <p className="text-sm text-slate-700">{result.summary}</p>
                {Array.isArray(result.topDates) && (
                  <ul className="text-sm list-disc pl-4">
                    {result.topDates.map((d: any) => (
                      <li key={d.date}>{d.date} — {d.rationale}{d.priceHint ? ` (${d.priceHint})` : ''}</li>
                    ))}
                  </ul>
                )}
                {Array.isArray(result.sources) && result.sources.length > 0 && (
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Источники:</div>
                    <ul className="text-xs list-disc pl-4">
                      {result.sources.map((s: any) => (
                        <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{s.title}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


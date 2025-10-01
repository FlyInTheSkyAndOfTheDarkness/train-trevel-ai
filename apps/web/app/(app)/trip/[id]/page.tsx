"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function TripDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [fares, setFares] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const date = new Date().toISOString().slice(0, 10);
      const res = await fetch('/api/fares', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tripId: params.id, date }) });
      const json = await res.json();
      setFares(json.fares ?? []);
      setLoading(false);
    }
    load();
  }, [params.id]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Детали рейса {params.id}</h2>
      {loading ? <div>Загрузка...</div> : (
        <div className="space-y-2">
          {fares.map((f: any) => (
            <div key={f.classCode} className="border rounded p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{f.className}</div>
                <div className="text-sm text-slate-600">{(f.priceMinor/100).toFixed(0)} {f.currency}</div>
              </div>
              <button className="underline" onClick={() => router.push('/checkout')}>Выбрать</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


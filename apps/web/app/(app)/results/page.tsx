"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Trip = {
  id: string;
  trainNumber: string;
  origin: { name: string; time: string };
  destination: { name: string; time: string };
  durationMinutes: number;
};

export default function ResultsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  useEffect(() => {
    const data = sessionStorage.getItem('results');
    if (data) {
      const json = JSON.parse(data);
      setTrips(json.trips ?? []);
    }
  }, []);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Результаты поиска</h2>
      {trips.length === 0 && <div className="text-slate-600">Ничего не найдено</div>}
      <ul className="space-y-3">
        {trips.map((t) => (
          <li key={t.id} className="border rounded p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Поезд {t.trainNumber}</div>
                <div className="text-sm text-slate-600">{t.origin.name} → {t.destination.name}</div>
              </div>
              <Link className="underline" href={`/trip/${t.id}`}>Детали</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


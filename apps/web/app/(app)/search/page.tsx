"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const [origin, setOrigin] = useState('Москва');
  const [destination, setDestination] = useState('Санкт-Петербург');
  const [dateOut, setDateOut] = useState(() => new Date().toISOString().slice(0, 10));
  const [passengers, setPassengers] = useState(1);
  const router = useRouter();

  async function onSearch() {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination, dateOut, passengers })
    });
    const json = await res.json();
    sessionStorage.setItem('results', JSON.stringify(json));
    router.push('/results');
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input className="border rounded px-3 py-2" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Откуда" />
        <input className="border rounded px-3 py-2" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Куда" />
        <input className="border rounded px-3 py-2" type="date" value={dateOut} onChange={(e) => setDateOut(e.target.value)} />
        <input className="border rounded px-3 py-2" type="number" min={1} max={8} value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value||'1'))} />
      </div>
      <Button onClick={onSearch}>Найти</Button>
    </div>
  );
}


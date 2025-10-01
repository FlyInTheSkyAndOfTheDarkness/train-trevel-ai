"use client";
import { useState } from 'react';

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // prototype only: no payment
    setStatus('Псевдо-бронь создана (демо).');
  }

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-semibold mb-4">Подтверждение</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя пассажира" />
        <button className="rounded bg-black text-white px-4 py-2" type="submit">Подтвердить</button>
      </form>
      {status && <div className="mt-3 text-green-600 text-sm">{status}</div>}
    </div>
  );
}


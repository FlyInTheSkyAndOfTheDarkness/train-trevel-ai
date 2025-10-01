"use client";
import { useState } from 'react';

export type Filters = {
  departureFrom?: string;
  departureTo?: string;
  maxDuration?: number;
  classCode?: string;
};

export function FiltersPanel({ onChange }: { onChange: (f: Filters) => void }) {
  const [state, setState] = useState<Filters>({});
  function update<K extends keyof Filters>(k: K, v: Filters[K]) {
    const next = { ...state, [k]: v };
    setState(next);
    onChange(next);
  }
  return (
    <div className="border rounded p-3 space-y-2">
      <div className="text-sm font-medium">Фильтры</div>
      <div className="grid grid-cols-2 gap-2">
        <input type="time" className="border rounded px-2 py-1" onChange={(e)=>update('departureFrom', e.target.value)} />
        <input type="time" className="border rounded px-2 py-1" onChange={(e)=>update('departureTo', e.target.value)} />
        <input type="number" className="border rounded px-2 py-1" placeholder="Макс. длительность (мин)" onChange={(e)=>update('maxDuration', parseInt(e.target.value||'0'))} />
        <select className="border rounded px-2 py-1" onChange={(e)=>update('classCode', e.target.value)}>
          <option value="">Любой класс</option>
          <option value="eco">Плацкарт</option>
          <option value="std">Купе</option>
          <option value="bus">СВ</option>
        </select>
      </div>
    </div>
  );
}


"use client";
import { useEffect, useState } from 'react';

type Station = { id: string; name: string };

export function StationCombobox({ value, onChange, placeholder }: { value?: Station | null; onChange: (s: Station | null) => void; placeholder?: string }) {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<Station[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!query) { setOptions([]); return; }
      const res = await fetch(`/api/stations?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      setOptions(json.stations ?? []);
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="relative">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder={placeholder}
        value={value?.name ?? query}
        onFocus={() => setOpen(true)}
        onChange={(e) => { setQuery(e.target.value); onChange(null); }}
      />
      {open && options.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded border bg-white shadow">
          {options.map((s) => (
            <button
              key={s.id}
              type="button"
              className="w-full text-left px-3 py-2 hover:bg-slate-50"
              onClick={() => { onChange(s); setQuery(''); setOpen(false); }}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


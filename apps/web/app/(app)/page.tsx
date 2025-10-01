import Link from 'next/link';

export default function AppHome() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-slate-50 p-8">
        <h1 className="text-3xl font-bold mb-2">Найдите лучший билет</h1>
        <p className="text-slate-600 mb-4">Сравнивайте по цене, времени и длительности поездки</p>
        <Link href="/search" className="underline">Перейти к поиску</Link>
      </div>
    </div>
  );
}


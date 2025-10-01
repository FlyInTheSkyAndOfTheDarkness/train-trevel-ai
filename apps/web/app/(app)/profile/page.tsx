import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    return <div>Пожалуйста, войдите в систему.</div>;
  }
  const [searches, favorites, holds] = await Promise.all([
    prisma.search.findMany({ where: { userId: (session.user as any).id }, orderBy: { createdAt: 'desc' }, take: 10 }),
    prisma.favoriteRoute.findMany({ where: { userId: (session.user as any).id }, take: 10 }),
    prisma.hold.findMany({ where: { userId: (session.user as any).id }, take: 10 })
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Профиль</h2>
      <div>
        <div className="font-medium mb-2">Мои поиски</div>
        <ul className="text-sm space-y-1">
          {searches.map((s) => (
            <li key={s.id} className="border rounded p-2">{s.originName} → {s.destinationName} · {s.dateOut.toISOString().slice(0,10)}</li>
          ))}
          {searches.length === 0 && <li className="text-slate-600">Нет данных</li>}
        </ul>
      </div>
      <div>
        <div className="font-medium mb-2">Избранные направления</div>
        <ul className="text-sm space-y-1">
          {favorites.map((f) => (
            <li key={f.id} className="border rounded p-2">{f.originName} → {f.destinationName}</li>
          ))}
          {favorites.length === 0 && <li className="text-slate-600">Нет данных</li>}
        </ul>
      </div>
      <div>
        <div className="font-medium mb-2">Псевдо-бррони</div>
        <ul className="text-sm space-y-1">
          {holds.map((h) => (
            <li key={h.id} className="border rounded p-2">{h.tripId} · {(h.priceMinor/100).toFixed(0)} {h.currency} · {h.status}</li>
          ))}
          {holds.length === 0 && <li className="text-slate-600">Нет данных</li>}
        </ul>
      </div>
    </div>
  );
}


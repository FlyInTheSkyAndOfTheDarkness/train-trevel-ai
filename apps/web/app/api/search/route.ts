import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getRailProvider } from '@/lib/rail';
import { cacheGet, cacheSet, makeRateLimiter } from '@/lib/cache';
import crypto from 'node:crypto';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

const rateLimit = makeRateLimiter(30, 60);

const Body = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  dateOut: z.string().min(1),
  dateBack: z.string().optional(),
  passengers: z.number().int().min(1).max(8)
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'ip';
  const rl = await rateLimit(ip);
  if (!('success' in rl ? rl.success : rl)) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });

  const json = await req.json();
  const { origin, destination, dateOut, dateBack, passengers } = Body.parse(json);
  const key = crypto.createHash('md5').update(JSON.stringify({ origin, destination, dateOut, passengers })).digest('hex');
  const cacheKey = `search:${key}`;
  const cached = await cacheGet(cacheKey);
  if (cached) return NextResponse.json(JSON.parse(cached));

  const provider = getRailProvider();
  const [originStations, destStations] = await Promise.all([
    provider.searchStations(origin),
    provider.searchStations(destination)
  ]);
  const o = originStations[0];
  const d = destStations[0];
  if (!o || !d) return NextResponse.json({ trips: [], error: 'Stations not found' }, { status: 404 });

  const trips = await provider.searchTrips({ originId: o.id, destinationId: d.id, date: dateOut });
  const result = { trips };
  await cacheSet(cacheKey, JSON.stringify(result), 60 * 5);

  try {
    const session = await auth();
    if (session?.user?.id) {
      await prisma.search.create({
        data: {
          userId: session.user.id,
          originId: o.id,
          originName: o.name,
          destinationId: d.id,
          destinationName: d.name,
          dateOut: new Date(dateOut),
          dateBack: dateBack ? new Date(dateBack) : null,
          passengers
        }
      });
    }
  } catch {}

  return NextResponse.json(result);
}


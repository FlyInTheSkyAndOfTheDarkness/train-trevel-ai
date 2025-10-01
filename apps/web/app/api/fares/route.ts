import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getRailProvider } from '@/lib/rail';
import { cacheGet, cacheSet, makeRateLimiter } from '@/lib/cache';
import crypto from 'node:crypto';

const rateLimit = makeRateLimiter(60, 60);

const Body = z.object({ tripId: z.string().min(1), date: z.string().min(1) });

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'ip';
  const rl = await rateLimit(ip);
  if (!('success' in rl ? rl.success : rl)) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });

  const json = await req.json();
  const { tripId, date } = Body.parse(json);
  const key = crypto.createHash('md5').update(`${tripId}:${date}`).digest('hex');
  const cacheKey = `fares:${key}`;
  const cached = await cacheGet(cacheKey);
  if (cached) return NextResponse.json(JSON.parse(cached));

  const provider = getRailProvider();
  const fares = await provider.getFares({ tripId, date });
  await cacheSet(cacheKey, JSON.stringify({ fares }), 60 * 5);
  return NextResponse.json({ fares });
}


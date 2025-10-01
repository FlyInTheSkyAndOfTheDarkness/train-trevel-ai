import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getRailProvider } from '@/lib/rail';

const Query = z.object({ q: z.string().min(1) });

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') || '';
  const { q: query } = Query.parse({ q });
  const provider = getRailProvider();
  const stations = await provider.searchStations(query);
  return NextResponse.json({ stations });
}


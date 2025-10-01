import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { env } from '@/lib/env.mjs';

type CacheValue = string;

let memoryStore = new Map<string, { value: CacheValue; exp: number }>();

export const redis = env.REDIS_URL && env.REDIS_TOKEN
  ? new Redis({ url: env.REDIS_URL, token: env.REDIS_TOKEN })
  : null;

export async function cacheGet(key: string): Promise<string | null> {
  if (redis) return (await redis.get<CacheValue>(key)) ?? null;
  const item = memoryStore.get(key);
  if (!item) return null;
  if (Date.now() > item.exp) {
    memoryStore.delete(key);
    return null;
  }
  return item.value;
}

export async function cacheSet(key: string, value: CacheValue, ttlSeconds: number): Promise<void> {
  if (redis) {
    await redis.set(key, value, { ex: ttlSeconds });
    return;
  }
  memoryStore.set(key, { value, exp: Date.now() + ttlSeconds * 1000 });
}

export function makeRateLimiter(limit: number, windowSeconds: number) {
  if (redis) {
    const limiter = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`) });
    return async (identifier: string) => limiter.limit(identifier);
  }
  // naive in-memory rate limit
  const buckets = new Map<string, number[]>();
  return async (identifier: string) => {
    const now = Date.now();
    const win = windowSeconds * 1000;
    const arr = (buckets.get(identifier) ?? []).filter((t) => now - t < win);
    arr.push(now);
    buckets.set(identifier, arr);
    return { success: arr.length <= limit } as { success: boolean };
  };
}


import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import * as cache from '@/lib/cache';
import { suggestCheapestDates } from '@/lib/ai/suggest';

describe('ai suggest', () => {
  beforeAll(() => {
    vi.spyOn(cache, 'cacheGet').mockResolvedValue(null);
    vi.spyOn(cache, 'cacheSet').mockResolvedValue();
    process.env.OPENAI_API_KEY = '';
  });
  afterAll(() => vi.restoreAllMocks());

  it('returns heuristic suggestions without OpenAI', async () => {
    const res = await suggestCheapestDates({ origin: 'Москва', destination: 'Санкт-Петербург' });
    expect(res.topDates.length).toBeGreaterThan(0);
    expect(res.summary).toBeTypeOf('string');
  });
});


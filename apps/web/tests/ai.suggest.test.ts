import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import * as cache from '@/lib/cache';
import { suggestCheapestDates } from '@/lib/ai/suggest';
import { getRailProvider } from '@/lib/rail';

// Mock fetch for SERPAPI calls
global.fetch = vi.fn();

describe('ai suggest', () => {
  beforeAll(() => {
    vi.spyOn(cache, 'cacheGet').mockResolvedValue(null);
    vi.spyOn(cache, 'cacheSet').mockResolvedValue();
    process.env.OPENAI_API_KEY = '';
    process.env.SERPAPI_API_KEY = '';
  });
  afterAll(() => vi.restoreAllMocks());

  it('returns heuristic suggestions without OpenAI', async () => {
    const res = await suggestCheapestDates({ origin: 'Москва', destination: 'Санкт-Петербург' });
    expect(res.topDates.length).toBeGreaterThan(0);
    expect(res.summary).toBeTypeOf('string');
    expect(res.summary).toContain('оценка');
  });

  it('uses calendar data when available', async () => {
    const provider = getRailProvider();
    const res = await suggestCheapestDates({ 
      origin: 'Москва', 
      destination: 'Санкт-Петербург', 
      month: '2025-10' 
    });
    expect(res.topDates.length).toBeGreaterThan(0);
    expect(res.summary).toBeTypeOf('string');
  });

  it('handles SERPAPI integration', async () => {
    // Mock SERPAPI response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        organic_results: [
          { title: 'Train Prices Guide', link: 'https://example.com' },
          { title: 'Railway Booking Tips', link: 'https://example2.com' }
        ]
      })
    });

    process.env.SERPAPI_API_KEY = 'test-key';
    
    const res = await suggestCheapestDates({ 
      origin: 'Москва', 
      destination: 'Санкт-Петербург' 
    });
    
    expect(res.sources).toBeDefined();
    expect(res.sources?.length).toBeGreaterThan(0);
  });

  it('handles OpenAI integration', async () => {
    // Mock OpenAI response
    const mockOpenAI = {
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [{ message: { content: 'AI-generated summary' } }]
          })
        }
      }
    };

    vi.doMock('openai', () => ({
      default: vi.fn().mockImplementation(() => mockOpenAI)
    }));

    process.env.OPENAI_API_KEY = 'test-key';
    
    const res = await suggestCheapestDates({ 
      origin: 'Москва', 
      destination: 'Санкт-Петербург' 
    });
    
    expect(res.summary).toBeTypeOf('string');
  });

  it('caches results properly', async () => {
    const cacheGetSpy = vi.spyOn(cache, 'cacheGet');
    const cacheSetSpy = vi.spyOn(cache, 'cacheSet');
    
    // First call should cache
    await suggestCheapestDates({ origin: 'Москва', destination: 'Санкт-Петербург' });
    expect(cacheSetSpy).toHaveBeenCalled();
    
    // Second call should use cache
    cacheGetSpy.mockResolvedValueOnce(JSON.stringify({
      summary: 'Cached result',
      topDates: [{ date: '2025-01-01', rationale: 'Cached' }]
    }));
    
    const res = await suggestCheapestDates({ origin: 'Москва', destination: 'Санкт-Петербург' });
    expect(res.summary).toBe('Cached result');
  });
});


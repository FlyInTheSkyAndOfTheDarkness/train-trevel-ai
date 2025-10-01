import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(1),
  DATABASE_URL: z.string().url(),
  RAIL_PROVIDER: z.enum(['mock', 'transportapi_uk']).default('mock'),
  RAIL_API_BASE: z.string().optional().default(''),
  RAIL_API_KEY: z.string().optional().default(''),
  REDIS_URL: z.string().optional(),
  REDIS_TOKEN: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  SERPAPI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().default('gpt-4o-mini')
});

export const env = envSchema.parse({
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  RAIL_PROVIDER: process.env.RAIL_PROVIDER ?? 'mock',
  RAIL_API_BASE: process.env.RAIL_API_BASE,
  RAIL_API_KEY: process.env.RAIL_API_KEY,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_TOKEN: process.env.REDIS_TOKEN,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  SERPAPI_API_KEY: process.env.SERPAPI_API_KEY,
  AI_MODEL: process.env.AI_MODEL ?? 'gpt-4o-mini'
});


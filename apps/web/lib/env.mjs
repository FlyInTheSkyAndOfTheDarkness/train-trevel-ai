import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url().optional().default('http://localhost:3000'),
  DATABASE_URL: z.string().url(),
  RAIL_PROVIDER: z.enum(['mock', 'transportapi_uk']).default('mock'),
  RAIL_API_BASE: z.string().optional().default(''),
  RAIL_API_KEY: z.string().optional().default(''),
  REDIS_URL: z.string().optional(),
  REDIS_TOKEN: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  SERPAPI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().default('gpt-4o-mini'),
  EMAIL_SERVER_HOST: z.string().optional().default('localhost'),
  EMAIL_SERVER_PORT: z.coerce.number().optional().default(1025),
  EMAIL_SERVER_USER: z.string().optional().default(''),
  EMAIL_SERVER_PASSWORD: z.string().optional().default(''),
  EMAIL_FROM: z.string().email().optional().default('noreply@traintravel.ai'),
  RATE_LIMIT_REQUESTS: z.coerce.number().optional().default(100),
  RATE_LIMIT_WINDOW: z.coerce.number().optional().default(3600)
});

export const env = envSchema.parse({
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  RAIL_PROVIDER: process.env.RAIL_PROVIDER ?? 'mock',
  RAIL_API_BASE: process.env.RAIL_API_BASE,
  RAIL_API_KEY: process.env.RAIL_API_KEY,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_TOKEN: process.env.REDIS_TOKEN,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  SERPAPI_API_KEY: process.env.SERPAPI_API_KEY,
  AI_MODEL: process.env.AI_MODEL ?? 'gpt-4o-mini',
  EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
  EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
  RATE_LIMIT_REQUESTS: process.env.RATE_LIMIT_REQUESTS,
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW
});


# TrainTravel AI (Monorepo)

Train tickets search app with AI advice (when to buy cheaper), built with Next.js 14, Prisma, NextAuth, Tailwind, next-intl, Redis cache, and OpenAI.

## Structure
- apps/web: Next.js app (App Router) with API routes, Prisma, providers, UI

## Quick start
1) Install deps and start Postgres/Redis:
```
pnpm i
cd apps/web
docker-compose up -d
```
2) Copy env and fill:
```
cd apps/web
cp .env.example .env
# set DATABASE_URL and NEXTAUTH_SECRET
```
3) Migrate and run:
```
cd apps/web
pnpm prisma migrate dev
pnpm dev
```
Open http://localhost:3000

## Providers
- Rail data provider interface in `apps/web/lib/rail/`. Default `mock` works out of the box. To add real API, copy `providerTemplate.ts` and set `RAIL_PROVIDER`.

## AI advice
- Logic in `apps/web/lib/ai/suggest.ts`. Uses OpenAI and optional SERPAPI. Caches for 6h (Redis or in-memory).

## Auth
- NextAuth (credentials + email magic link). Prisma Adapter enabled. For local email, run a dev SMTP like MailHog on `localhost:1025`.

## Environment (apps/web/.env)
```
NEXTAUTH_SECRET=changeme
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/traintravel
RAIL_PROVIDER=mock
RAIL_API_BASE=
RAIL_API_KEY=
REDIS_URL=
REDIS_TOKEN=
OPENAI_API_KEY=
SERPAPI_API_KEY=
AI_MODEL=gpt-4o-mini
```

## Deploy
- Set env vars and external Postgres/Redis on Vercel/Render/Fly. Dockerfile provided in `apps/web/Dockerfile`.

## Disclaimer
- Demo only: no payments, mock data not real. Do not use for real sales.

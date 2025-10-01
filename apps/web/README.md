# TrainTravel AI (apps/web)

## Быстрый старт

1. Скопируйте `.env.example` в `.env` и заполните переменные.
2. Установите зависимости и запустите БД/Redis.

### Пример `.env`

```
NEXTAUTH_SECRET=changeme
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/traintravel
RAIL_PROVIDER=mock
OPENAI_API_KEY=
SERPAPI_API_KEY=
REDIS_URL=
REDIS_TOKEN=
AI_MODEL=gpt-4o-mini
```

### Команды

```
pnpm i
cd apps/web
docker-compose up -d
pnpm prisma migrate dev
pnpm dev
```

Приложение: http://localhost:3000

## Провайдер ЖД данных

- Реализация в `lib/rail/`.
- По умолчанию `mock`. Переключение: `RAIL_PROVIDER`.
- Шаблон реального API: `lib/rail/providers/providerTemplate.ts`.

## ИИ-подсказки

- Логика: `lib/ai/suggest.ts`.
- `SERPAPI_API_KEY` — опциональные ссылки из SERPAPI.
- Модель OpenAI через `AI_MODEL`.
- Кэширование в Redis (если задан) или in-memory fallback.

## NextAuth

- Credentials + email magic link (SMTP dev: `localhost:1025`).
- Пользователи: хэш пароля или magic link.

## Деплой

- Vercel/Render/Fly: настройте переменные окружения и Postgres/Redis.
- Используйте `Dockerfile` при необходимости.

## Ограничения

- Демонстрация: без реальных платежей/договоров.
- Цены/расписания в mock — фиктивные.


# TrainTravel AI

Продакшн-готовый моно-репозиторий веб-приложения для поиска и покупки ЖД билетов с ИИ-ассистентом.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка окружения

```bash
cd apps/web
cp env.example .env
# Заполните переменные окружения
```

### 3. Запуск базы данных

```bash
cd apps/web
docker-compose up -d
```

### 4. Настройка базы данных

```bash
cd apps/web
npm run prisma:generate
npm run prisma:migrate:dev
```

### 5. Запуск приложения

```bash
cd apps/web
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## 📋 Основные переменные окружения

```env
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/traintravel
RAIL_PROVIDER=mock
OPENAI_API_KEY=your-openai-key
SERPAPI_API_KEY=your-serpapi-key
```

## 🏗️ Структура проекта

```
├── apps/
│   └── web/                 # Next.js приложение
│       ├── app/            # App Router
│       ├── components/     # React компоненты
│       ├── lib/           # Утилиты и логика
│       ├── prisma/        # База данных
│       └── tests/         # Тесты
├── package.json           # Корневой package.json
└── README.md             # Этот файл
```

## 🚂 Провайдеры ЖД данных

- **Mock провайдер** (по умолчанию) - работает из коробки
- **Единый интерфейс** для подключения реальных API
- **Шаблон** в `apps/web/lib/rail/providers/providerTemplate.ts`

## 🤖 ИИ-ассистент

- Подсказки по выгодным датам покупки
- Интеграция с OpenAI и SERPAPI
- Кэширование результатов
- Логика в `apps/web/lib/ai/suggest.ts`

## 🔐 Аутентификация

- NextAuth v5 с credentials и email magic link
- Prisma Adapter для хранения сессий
- Готовность к OAuth провайдерам

## 🌐 Интернационализация

- Поддержка ru, kk, en
- next-intl для локализации
- Переводы в `apps/web/app/i18n.ts`

## 🧪 Тестирование

```bash
cd apps/web
npm test
```

## 🐳 Docker

```bash
cd apps/web
docker-compose up -d
```

## 🚀 Деплой

Поддерживается деплой на:
- Vercel
- Render
- Fly.io
- Любую платформу с поддержкой Node.js

## ⚠️ Ограничения

- **Демонстрационный проект** - без реальных платежей
- **Тестовые данные** - цены и расписания фиктивные
- **Образовательные цели** - для изучения архитектуры

## 📚 Документация

Подробная документация доступна в `apps/web/README.md`

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте feature branch
3. Внесите изменения
4. Добавьте тесты
5. Создайте Pull Request

## 📄 Лицензия

MIT License

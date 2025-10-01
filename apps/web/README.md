# TrainTravel AI

Продакшн-готовый моно-репозиторий веб-приложения для поиска и покупки ЖД билетов с ИИ-ассистентом.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка окружения

Скопируйте `env.example` в `.env` и заполните переменные:

```bash
cp env.example .env
```

### 3. Запуск базы данных

```bash
# Запуск PostgreSQL и Redis
docker-compose up -d

# Или только база данных
docker-compose up -d db redis
```

### 4. Настройка базы данных

```bash
# Генерация Prisma клиента
npm run prisma:generate

# Применение миграций
npm run prisma:migrate:dev
```

### 5. Запуск приложения

```bash
# Режим разработки
npm run dev

# Сборка для продакшна
npm run build
npm start
```

Приложение будет доступно по адресу: http://localhost:3000

## 📋 Переменные окружения

### Обязательные

```env
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/traintravel
```

### Опциональные

```env
# ИИ сервисы
OPENAI_API_KEY=your-openai-key
SERPAPI_API_KEY=your-serpapi-key
AI_MODEL=gpt-4o-mini

# Redis (если не указан, используется in-memory кэш)
REDIS_URL=redis://localhost:6379
REDIS_TOKEN=

# Email для magic links
EMAIL_SERVER_HOST=localhost
EMAIL_SERVER_PORT=1025
EMAIL_FROM=noreply@traintravel.ai

# Провайдер ЖД данных
RAIL_PROVIDER=mock
RAIL_API_BASE=
RAIL_API_KEY=

# Rate limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600
```

## 🚂 Провайдеры ЖД данных

Система поддерживает различные провайдеры через единый интерфейс:

### Mock провайдер (по умолчанию)
- Реалистичные тестовые данные
- Работает из коробки без внешних API

### Подключение реального API

1. Скопируйте `lib/rail/providers/providerTemplate.ts`
2. Реализуйте методы интерфейса `RailProvider`
3. Установите `RAIL_PROVIDER=yourprovider`

```typescript
// lib/rail/providers/yourprovider.ts
export const yourProvider: RailProvider = {
  async searchStations(query: string) {
    // Ваша реализация
  },
  async searchTrips({ originId, destinationId, date }) {
    // Ваша реализация
  },
  async getFares({ tripId, date }) {
    // Ваша реализация
  },
  async getCheapestCalendar({ originId, destinationId, month }) {
    // Опционально: календарь цен
  }
};
```

## 🤖 ИИ-ассистент

### Функциональность
- Подсказки по выгодным датам покупки
- Альтернативные станции
- Календарь цен (если поддерживается провайдером)
- Интеграция с SERPAPI для дополнительных источников

### Настройка

1. **OpenAI**: Установите `OPENAI_API_KEY` для генерации текстовых рекомендаций
2. **SERPAPI**: Установите `SERPAPI_API_KEY` для поиска дополнительных источников
3. **Кэширование**: Результаты кэшируются на 6 часов

### Логика работы

```typescript
// lib/ai/suggest.ts
export async function suggestCheapestDates({ origin, destination, month }) {
  // 1. Проверка кэша
  // 2. Получение календаря цен (если доступен)
  // 3. Эвристики (будни vs выходные, окно покупки)
  // 4. SERPAPI поиск (если настроен)
  // 5. OpenAI генерация (если настроен)
  // 6. Кэширование результата
}
```

## 🔐 Аутентификация

### NextAuth v5
- **Credentials**: email + пароль
- **Email Magic Link**: вход по ссылке из email
- **OAuth**: готовность к подключению (Google, GitHub и др.)

### Настройка email
Для разработки используйте MailHog или аналогичный инструмент:

```bash
# Установка MailHog
brew install mailhog
mailhog

# Или через Docker
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

## 🌐 Интернационализация

Поддерживаемые языки:
- **ru** (по умолчанию) - Русский
- **kk** - Казахский  
- **en** - Английский

### Добавление нового языка

1. Добавьте переводы в `app/i18n.ts`
2. Обновите `locales` массив
3. Добавьте переключатель языка в UI

## 🧪 Тестирование

```bash
# Запуск тестов
npm test

# Тесты с покрытием
npm run test:coverage
```

### Тестируемые компоненты
- ИИ-подсказки (`tests/ai.suggest.test.ts`)
- Кэширование
- Интеграции с внешними API

## 🐳 Docker

### Разработка
```bash
docker-compose up -d
```

### Продакшн
```bash
# Сборка образа
docker build -t traintravel-ai .

# Запуск
docker run -p 3000:3000 --env-file .env traintravel-ai
```

## 🚀 Деплой

### Vercel
1. Подключите репозиторий
2. Настройте переменные окружения
3. Добавьте PostgreSQL и Redis (Upstash)

### Render
1. Создайте Web Service
2. Подключите PostgreSQL и Redis
3. Настройте переменные окружения

### Fly.io
```bash
# Установка Fly CLI
curl -L https://fly.io/install.sh | sh

# Деплой
fly launch
fly deploy
```

## 📁 Структура проекта

```
apps/web/
├── app/                    # Next.js App Router
│   ├── (app)/             # Основное приложение
│   ├── api/               # API роуты
│   └── i18n.ts           # Интернационализация
├── components/            # React компоненты
│   ├── ui/               # Базовые UI компоненты
│   ├── ai-assistant.tsx  # ИИ-ассистент
│   ├── filters.tsx       # Фильтры поиска
│   └── train-card.tsx    # Карточка поезда
├── lib/                   # Утилиты и логика
│   ├── ai/               # ИИ функциональность
│   ├── rail/             # Провайдеры ЖД данных
│   ├── auth.ts           # NextAuth конфигурация
│   ├── cache.ts          # Кэширование
│   └── env.mjs           # Типобезопасные env
├── prisma/               # База данных
│   ├── schema.prisma     # Схема БД
│   └── migrations/       # Миграции
└── tests/                # Тесты
```

## 🔧 API Endpoints

### Поиск
- `POST /api/search` - Поиск поездов
- `GET /api/stations?q=query` - Поиск станций
- `POST /api/fares` - Получение цен

### ИИ
- `POST /api/ai/suggest` - ИИ-подсказки

### Аутентификация
- `POST /api/auth/signin` - Вход
- `POST /api/auth/signout` - Выход
- `GET /api/auth/session` - Текущая сессия

## ⚠️ Ограничения и ответственность

### Демонстрационный проект
- **Без реальных платежей**: все бронирования являются псевдо-бронями
- **Тестовые данные**: цены и расписания в mock провайдере фиктивные
- **Образовательные цели**: проект создан для демонстрации архитектуры

### Безопасность
- Не храните реальные платежные данные
- Используйте HTTPS в продакшне
- Настройте rate limiting
- Валидируйте все входные данные

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте feature branch
3. Внесите изменения
4. Добавьте тесты
5. Создайте Pull Request

## 📄 Лицензия

MIT License - см. файл LICENSE

## 🆘 Поддержка

При возникновении проблем:
1. Проверьте переменные окружения
2. Убедитесь, что база данных запущена
3. Проверьте логи приложения
4. Создайте issue в репозитории


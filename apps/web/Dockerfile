FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app
COPY ../../pnpm-workspace.yaml ./
COPY ./package.json ./apps/web/package.json
RUN pnpm fetch

FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app
COPY ../../pnpm-workspace.yaml ./
COPY . ./apps/web
WORKDIR /app/apps/web
RUN pnpm install --frozen-lockfile && pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/package.json ./package.json
COPY --from=builder /app/apps/web/public ./public
EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]


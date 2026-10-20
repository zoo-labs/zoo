# Zoo Foundation (zoo.ngo) — static Next.js export (output:"export") served by nginx :80.
FROM mirror.gcr.io/library/node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm build
FROM mirror.gcr.io/library/nginx:1.27-alpine
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80

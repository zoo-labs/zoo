# Dockerfile for lux-dao api

FROM oven/bun:1.0.20 AS base
WORKDIR /app

# Build SDK first
FROM base AS sdk-builder
COPY ../sdk/package.json ../sdk/
COPY ../sdk/src ../sdk/src
COPY ../sdk/build.ts ../sdk/
COPY ../sdk/tsconfig.json ../sdk/
COPY ../sdk/tsconfig.cjs.json ../sdk/

WORKDIR /app/sdk
RUN bun install
RUN bun run build || true

# Install API dependencies
FROM base AS deps
COPY packages/decent-offchain/package.json packages/decent-offchain/
COPY --from=sdk-builder /app/sdk /app/sdk

WORKDIR /app/packages/decent-offchain
RUN bun install

# Build and run stage
FROM base AS production
COPY --from=deps /app /app
COPY packages/decent-offchain /app/packages/decent-offchain

WORKDIR /app/packages/decent-offchain

# Run database migrations on startup
RUN bun run push:onchain || true
RUN bun run push:offchain || true

ENV NODE_ENV=production
ENV PORT=3005

EXPOSE 3005

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3005/ || exit 1

CMD ["bun", "run", "src/api/index.ts"]

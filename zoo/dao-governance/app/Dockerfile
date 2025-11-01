# Dockerfile for lux-dao app

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git python3 make g++

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Copy contracts to satisfy dependency
COPY ../contracts /contracts

# Build the application (skip git hash for docker build)
RUN VITE_APP_GIT_HASH=docker NODE_OPTIONS=--max-old-space-size=8192 pnpm build || \
    (echo "Build failed, trying without contracts import" && \
     NODE_OPTIONS=--max-old-space-size=8192 vite build)

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install serve to run the built app
RUN npm install -g serve

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Serve the built application
CMD ["serve", "-s", "dist", "-l", "3000"]

# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git python3 make g++

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Expose port
EXPOSE 5173

# Start the development server
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

# Dockerfile for lux-dao contracts

FROM node:20-alpine

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

# Copy contract files
COPY . .

# Skip compilation in Docker - use pre-compiled artifacts
# Contracts should be compiled locally before building the image

# Default command - use the fresh-deploy script that works
CMD ["node", "scripts/fresh-deploy.mjs"]

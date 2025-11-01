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

# Compile contracts
RUN npx hardhat compile

# Default command - deploy contracts
CMD ["npx", "hardhat", "run", "scripts/deploy-local.ts", "--network", "localhost"]

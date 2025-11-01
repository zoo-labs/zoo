#!/bin/bash

# Start development environment with hot reload
set -e

echo "🚀 Starting Lux DAO development environment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kill any existing processes
echo "🔄 Cleaning up existing processes..."
pkill -f "anvil" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
lsof -ti:8545 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Start Anvil
echo -e "${YELLOW}⛓️  Starting Anvil local blockchain...${NC}"
anvil \
    --host 0.0.0.0 \
    --port 8545 \
    --chain-id 1337 \
    --accounts 10 \
    --balance 10000 \
    --gas-limit 30000000 \
    --no-cors > /tmp/dao-anvil.log 2>&1 &
ANVIL_PID=$!
echo "   Anvil PID: $ANVIL_PID"

# Wait for Anvil
echo "⏳ Waiting for Anvil to start..."
while ! curl -s http://localhost:8545 > /dev/null 2>&1; do
    sleep 1
done
echo -e "${GREEN}✅ Anvil is running${NC}"

# Deploy contracts
echo -e "${YELLOW}📦 Deploying contracts...${NC}"
cd contracts
npx hardhat run scripts/deploy-minimal.ts --network localhost
cd ..

# Start frontend with hot reload
echo -e "${YELLOW}🎨 Starting frontend (development mode)...${NC}"
cd app
pnpm dev > /tmp/dao-frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"
cd ..

# Save PIDs
echo "$ANVIL_PID" > /tmp/dao-pids.txt
echo "$FRONTEND_PID" >> /tmp/dao-pids.txt

# Wait for frontend
echo "⏳ Waiting for frontend to start..."
while ! curl -s http://localhost:3000 > /dev/null 2>&1; do
    sleep 1
done

echo -e "${GREEN}✅ Development environment is running!${NC}"
echo ""
echo "📝 Access points:"
echo "   - Frontend: http://localhost:3000"
echo "   - Anvil RPC: http://localhost:8545"
echo ""
echo "📋 Logs:"
echo "   - Anvil: tail -f /tmp/dao-anvil.log"
echo "   - Frontend: tail -f /tmp/dao-frontend.log"
echo ""
echo "🛑 To stop: make down"
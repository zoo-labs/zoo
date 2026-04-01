#!/bin/bash

# Zoo Ecosystem - Unified Development Script
# Runs all Zoo apps in parallel for integrated testing

set -e

echo "🦁 Starting Zoo Ecosystem Development Environment"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kill any existing processes on our ports
echo "${YELLOW}Cleaning up existing processes...${NC}"
lsof -ti:3000,3001,3002,3003,3004,3005,3007,8545 2>/dev/null | xargs kill -9 2>/dev/null || true
sleep 2

# Start blockchain (if not running)
echo ""
echo "${BLUE}Starting Zoo Blockchain (localhost:8545)...${NC}"
cd contracts
npx hardhat node > hardhat-node.log 2>&1 &
BLOCKCHAIN_PID=$!
echo "  Blockchain PID: $BLOCKCHAIN_PID"
sleep 5

# Deploy contracts
echo "${BLUE}Deploying ZK Governance Contracts...${NC}"
npx hardhat run scripts/deploy-zk-governance.js --network localhost
cd ..

# Start all apps in parallel
echo ""
echo "${GREEN}Starting Zoo Apps...${NC}"
echo ""

# 1. zoolabs.io (AI Research + Desktop App) - Port 3000
echo "${BLUE}[1/7] Starting zoolabs.io (AI Research)...${NC}"
cd app && pnpm dev > ../logs/zoolabs.log 2>&1 &
APP_PID=$!
echo "  → http://localhost:3000 (PID: $APP_PID)"
cd ..

# 2. zoo.ngo (Foundation) - Port 3002
echo "${BLUE}[2/7] Starting zoo.ngo (Foundation)...${NC}"
cd foundation && pnpm dev > ../logs/foundation.log 2>&1 &
FOUNDATION_PID=$!
echo "  → http://localhost:3002 (PID: $FOUNDATION_PID)"
cd ..

# 3. zoo.network (Blockchain Explorer) - Port 3003
echo "${BLUE}[3/7] Starting zoo.network (Explorer)...${NC}"
cd network && pnpm dev > ../logs/network.log 2>&1 &
NETWORK_PID=$!
echo "  → http://localhost:3003 (PID: $NETWORK_PID)"
cd ..

# 4. zoo.vote (DAO Governance) - Port 3004
echo "${BLUE}[4/7] Starting zoo.vote (DAO)...${NC}"
cd dao-governance/app && pnpm dev > ../../logs/vote.log 2>&1 &
DAO_PID=$!
echo "  → http://localhost:3004 (PID: $DAO_PID)"
cd ../..

# 5. zoo.fund (Fundraising Portal) - Port 3005
echo "${BLUE}[5/7] Starting zoo.fund (Fundraising)...${NC}"
cd fund && pnpm dev > ../logs/fund.log 2>&1 &
FUND_PID=$!
echo "  → http://localhost:3005 (PID: $FUND_PID)"
cd ..

# 6. zoo.computer (AI Hardware) - Port 3007
echo "${BLUE}[6/7] Starting zoo.computer (Hardware)...${NC}"
cd computer && pnpm dev > ../logs/computer.log 2>&1 &
COMPUTER_PID=$!
echo "  → http://localhost:3007 (PID: $COMPUTER_PID)"
cd ..

# 7. zoo.exchange (DEX) - Port 3002
# TODO: Implement when ready
# echo "${BLUE}[7/7] Starting zoo.exchange (DEX)...${NC}"
# cd exchange && pnpm dev > ../logs/exchange.log 2>&1 &
# EXCHANGE_PID=$!
# echo "  → http://localhost:3002 (PID: $EXCHANGE_PID)"
# cd ..

# Wait for all apps to start
echo ""
echo "${YELLOW}Waiting for apps to initialize...${NC}"
sleep 10

# Display status
echo ""
echo "${GREEN}=================================================="
echo "🎉 Zoo Ecosystem Running!"
echo "==================================================${NC}"
echo ""
echo "📱 Applications:"
echo "  • zoolabs.io:    http://localhost:3000"
echo "  • zoo.ngo:       http://localhost:3002"
echo "  • zoo.network:   http://localhost:3003"
echo "  • zoo.vote:      http://localhost:3004"
echo "  • zoo.fund:      http://localhost:3005"
echo "  • zoo.computer:  http://localhost:3007"
# echo "  • zoo.exchange:  http://localhost:3002"
echo ""
echo "⛓️  Blockchain:"
echo "  • Local Network: http://localhost:8545"
echo "  • Chain ID: 31337"
echo ""
echo "📊 Contract Addresses:"
if [ -f "contracts/deployments/localhost-zk-governance.json" ]; then
  echo "  • ZOO:      $(cat contracts/deployments/localhost-zk-governance.json | grep -o '"ZOO": "[^"]*' | cut -d'"' -f4)"
  echo "  • KEEPER:   $(cat contracts/deployments/localhost-zk-governance.json | grep -o '"KEEPER": "[^"]*' | cut -d'"' -f4)"
  echo "  • ZKStaking:$(cat contracts/deployments/localhost-zk-governance.json | grep -o '"ZKStaking": "[^"]*' | cut -d'"' -f4)"
  echo "  • Governor: $(cat contracts/deployments/localhost-zk-governance.json | grep -o '"Governor": "[^"]*' | cut -d'"' -f4)"
fi
echo ""
echo "📝 Logs:"
echo "  • Logs saved to ./logs/ directory"
echo ""
echo "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Create logs directory
mkdir -p logs

# Trap Ctrl+C and cleanup
cleanup() {
  echo ""
  echo "${YELLOW}Shutting down Zoo Ecosystem...${NC}"
  kill $APP_PID $FOUNDATION_PID $NETWORK_PID $DAO_PID $FUND_PID $COMPUTER_PID $BLOCKCHAIN_PID 2>/dev/null || true
  echo "${GREEN}All services stopped${NC}"
  exit 0
}

trap cleanup INT TERM

# Keep script running
wait

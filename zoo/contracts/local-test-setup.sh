#!/bin/bash

# Zoo DAO Local Testing Setup Script
# This script automates the setup of a local development environment

set -e

echo "🦒 Zoo DAO Local Testing Setup"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "hardhat.config.ts" ]; then
    echo "❌ Error: Please run this script from the contracts directory"
    echo "   cd ~/work/zoo/zoo/contracts"
    exit 1
fi

echo "${BLUE}Step 1: Installing dependencies...${NC}"
npm install --legacy-peer-deps
echo "${GREEN}✅ Dependencies installed${NC}"
echo ""

echo "${BLUE}Step 2: Compiling contracts...${NC}"
npx hardhat compile
echo "${GREEN}✅ Contracts compiled${NC}"
echo ""

echo "${BLUE}Step 3: Starting local blockchain...${NC}"
echo "${YELLOW}Starting Hardhat node in background...${NC}"

# Kill any existing hardhat node
pkill -f "hardhat node" 2>/dev/null || true
sleep 2

# Start hardhat node in background
npx hardhat node > hardhat-node.log 2>&1 &
HARDHAT_PID=$!
echo "  Hardhat node PID: $HARDHAT_PID"
echo "  Logs: hardhat-node.log"

# Wait for node to start
echo "  Waiting for node to start..."
sleep 5

# Check if node is running
if ! curl -s http://127.0.0.1:8545 > /dev/null 2>&1; then
    echo "❌ Failed to start Hardhat node"
    cat hardhat-node.log
    exit 1
fi

echo "${GREEN}✅ Local blockchain running on http://127.0.0.1:8545${NC}"
echo ""

echo "${BLUE}Step 4: Deploying governance contracts...${NC}"
npx hardhat run scripts/deploy-governance.ts --network localhost
echo "${GREEN}✅ Contracts deployed${NC}"
echo ""

echo "${GREEN}================================${NC}"
echo "${GREEN}✅ Setup Complete!${NC}"
echo "${GREEN}================================${NC}"
echo ""
echo "📋 What's Running:"
echo "  - Hardhat Node: http://127.0.0.1:8545 (PID: $HARDHAT_PID)"
echo "  - Chain ID: 31337"
echo "  - Logs: hardhat-node.log"
echo ""
echo "📝 Next Steps:"
echo "  1. Open a new terminal and start the frontend:"
echo "     cd ~/work/zoo/zoo/fund"
echo "     npm run dev"
echo ""
echo "  2. Visit http://localhost:3005"
echo ""
echo "  3. Connect MetaMask to:"
echo "     Network: Zoo Local"
echo "     RPC: http://127.0.0.1:8545"
echo "     Chain ID: 31337"
echo ""
echo "  4. Import test account from hardhat-node.log"
echo ""
echo "🛑 To stop the blockchain:"
echo "   kill $HARDHAT_PID"
echo ""
echo "📖 Full guide: README-LOCAL-TESTING.md"
echo ""

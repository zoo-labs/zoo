#!/bin/bash

# Zoo.vote - DAO Governance & Staking Platform
# Runs on port 3004

echo "🦁 Starting Zoo.vote - DAO Governance & Staking Platform"
echo "================================================"
echo ""

# Navigate to the app directory
cd app

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
else
    echo "✅ pnpm is installed"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies with pnpm..."
    pnpm install
else
    echo "✅ Dependencies already installed"
fi

# Check if local blockchain is running on port 8545
echo ""
echo "🔍 Checking for local blockchain on port 8545..."
if nc -z localhost 8545 2>/dev/null; then
    echo "✅ Local blockchain found at localhost:8545"
    echo "   Contract addresses loaded from:"
    echo "   ../contracts/deployments/localhost-zk-governance.json"
    echo ""
    echo "   ZOO Token:    0x4EE6eCAD1c2Dae9f525404De8555724e3c35d07B"
    echo "   KEEPER Token: 0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25"
    echo "   ZK Staking:   0xD84379CEae14AA33C123Af12424A37803F885889"
    echo "   Governor:     0xfbC22278A96299D91d41C453234d97b4F5Eb9B2d"
else
    echo "⚠️  Warning: Local blockchain not found at localhost:8545"
    echo "   Please start your local blockchain first for full functionality"
fi

echo ""
echo "🚀 Starting Zoo.vote development server on port 3004..."
echo "================================================"
echo ""

# Start the development server with pnpm
pnpm run dev

# The dev server will run on port 3004 as configured in vite.config.mts
#!/bin/bash

# DAO Local Development Setup Script
# This runs the DAO components locally using Anvil

set -e

echo "🚀 Starting DAO Local Development Environment with Anvil"
echo "========================================================="

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Check if anvil is installed
if ! command -v anvil &> /dev/null; then
    echo "📦 Installing Foundry (for Anvil)..."
    curl -L https://foundry.paradigm.xyz | bash
    source ~/.bashrc
    foundryup
fi

# Function to start a service in background
start_service() {
    local name=$1
    local dir=$2
    local cmd=$3
    
    echo "📦 Starting $name..."
    cd "$dir"
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "   Installing dependencies for $name..."
        pnpm install
    fi
    
    # Start the service
    echo "   Running: $cmd"
    eval "$cmd" &
    local pid=$!
    echo $pid >> /tmp/dao-pids.txt
    echo "   ✅ $name started (PID: $pid)"
    cd - > /dev/null
}

# Clean up any existing processes
if [ -f /tmp/dao-pids.txt ]; then
    echo "🧹 Cleaning up existing processes..."
    while read pid; do
        kill $pid 2>/dev/null || true
    done < /tmp/dao-pids.txt
    rm /tmp/dao-pids.txt
fi

# Kill any existing blockchain processes
pkill -f "anvil" || true
pkill -f "hardhat node" || true

# Create PID file
touch /tmp/dao-pids.txt

# Trap to clean up on exit
trap 'echo "🛑 Shutting down..."; while read pid; do kill $pid 2>/dev/null || true; done < /tmp/dao-pids.txt; rm /tmp/dao-pids.txt; pkill -f "anvil" || true' EXIT

echo ""
echo "📋 Starting Services..."
echo "----------------------"

# 1. Start Anvil local blockchain
echo "📦 Starting Anvil blockchain..."
anvil \
    --host 0.0.0.0 \
    --port 8545 \
    --chain-id 1337 \
    --accounts 10 \
    --balance 10000 \
    --gas-limit 30000000 \
    --no-cors &
ANVIL_PID=$!
echo $ANVIL_PID >> /tmp/dao-pids.txt
echo "   ✅ Anvil started (PID: $ANVIL_PID)"

echo "   Waiting for Anvil to start..."
sleep 3

# 2. Deploy contracts using Foundry/Forge
echo "📦 Deploying Contracts..."
(
    cd ./contracts
    
    # First, try to compile with Foundry if forge is available
    if command -v forge &> /dev/null; then
        echo "   Compiling with Forge..."
        forge build || true
    fi
    
    # Fall back to Hardhat deployment
    echo "   Deploying with Hardhat to Anvil..."
    export HARDHAT_NETWORK=localhost
    npx hardhat compile
    
    # Try different deployment methods
    if [ -f "./scripts/deploy.ts" ]; then
        npx hardhat run ./scripts/deploy.ts --network localhost
    elif [ -f "./deploy/deploy.ts" ]; then
        npx hardhat run ./deploy/deploy.ts --network localhost
    elif [ -d "./ignition" ]; then
        npx hardhat ignition deploy ./ignition/modules/DeployAll.ts --network localhost 2>/dev/null || \
        npx hardhat run ./scripts/deploy-local.ts --network localhost 2>/dev/null || \
        echo "   ⚠️  Skipping deployment - no deployment script found"
    else
        echo "   ⚠️  No deployment scripts found, skipping..."
    fi
) &

# Wait for deployment to complete
sleep 10

# 3. Start the API server (if exists)
if [ -d "./api/packages/offchain" ]; then
    start_service "API Server" "./api/packages/offchain" "pnpm dev"
    sleep 3
fi

# 4. Start the main app
start_service "DAO App" "./app" "pnpm dev"

echo ""
echo "========================================================="
echo "✅ DAO Local Environment is Running with Anvil!"
echo ""
echo "📍 Access Points:"
echo "   - DAO App:        http://localhost:3000"
echo "   - API Server:     http://localhost:4000"
echo "   - Anvil RPC:      http://localhost:8545"
echo ""
echo "💰 Test Accounts (10,000 ETH each):"
echo "   - Account 0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
echo "   - Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
echo ""
echo "💡 Tips:"
echo "   - Use Ctrl+C to stop all services"
echo "   - Check individual service logs for details"
echo "   - Anvil auto-mines blocks instantly"
echo ""
echo "🔧 Development Ready!"
echo "========================================================="

# Keep script running
wait
#!/bin/bash

# DAO Local Testing Script
# This script tests the complete DAO setup with Anvil

set -e

echo "🧪 Testing DAO Local Environment"
echo "================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run a test
run_test() {
    local name=$1
    local cmd=$2
    
    echo -n "   Testing $name... "
    if eval "$cmd" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗${NC}"
        ((TESTS_FAILED++))
    fi
}

echo ""
echo "1. Checking Prerequisites..."
echo "----------------------------"

run_test "Node.js installed" "command -v node"
run_test "pnpm installed" "command -v pnpm"
run_test "Anvil installed" "command -v anvil"

echo ""
echo "2. Testing Anvil Connection..."
echo "------------------------------"

# Start Anvil in background for testing
anvil --host 0.0.0.0 --port 8545 --chain-id 1337 > /dev/null 2>&1 &
ANVIL_PID=$!
sleep 3

run_test "Anvil RPC accessible" "curl -s -X POST http://localhost:8545 -H 'Content-Type: application/json' -d '{\"jsonrpc\":\"2.0\",\"method\":\"eth_chainId\",\"params\":[],\"id\":1}'"
run_test "Correct chain ID (1337)" "curl -s -X POST http://localhost:8545 -H 'Content-Type: application/json' -d '{\"jsonrpc\":\"2.0\",\"method\":\"eth_chainId\",\"params\":[],\"id\":1}' | grep -q '0x539'"

echo ""
echo "3. Testing Contract Compilation..."
echo "----------------------------------"

cd contracts
run_test "Hardhat compile" "npx hardhat compile"
cd ..

echo ""
echo "4. Testing Contract Deployment..."
echo "---------------------------------"

cd contracts
run_test "Deploy script exists" "test -f scripts/deploy-local.ts"
run_test "Contract deployment" "npx hardhat run scripts/deploy-local.ts --network localhost"
cd ..

echo ""
echo "5. Testing App Configuration..."
echo "-------------------------------"

cd app
run_test "Package.json exists" "test -f package.json"
run_test "Dependencies installed" "test -d node_modules"
run_test "Vite config exists" "test -f vite.config.ts"
cd ..

echo ""
echo "6. Running E2E Tests..."
echo "-----------------------"

if [ -f "playwright.config.ts" ]; then
    echo -e "${YELLOW}   Running Playwright E2E tests...${NC}"
    npx playwright test --reporter=list 2>/dev/null || true
else
    echo -e "${YELLOW}   Playwright config not found, skipping E2E tests${NC}"
fi

# Kill Anvil
kill $ANVIL_PID 2>/dev/null || true

echo ""
echo "================================"
echo "📊 Test Results:"
echo "   ✅ Passed: $TESTS_PASSED"
echo "   ❌ Failed: $TESTS_FAILED"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! The DAO is ready for local development.${NC}"
    echo ""
    echo "To start the full environment, run:"
    echo "   ./run-local.sh"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Please fix the issues above.${NC}"
    exit 1
fi
#!/bin/bash

# Stop the local development environment
set -e

echo "🛑 Stopping Lux DAO local environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Read PIDs from file
if [ -f /tmp/dao-pids.txt ]; then
    echo "📋 Reading PIDs from /tmp/dao-pids.txt..."
    while read pid; do
        if ps -p $pid > /dev/null 2>&1; then
            echo "   Killing process $pid..."
            kill $pid 2>/dev/null || true
        fi
    done < /tmp/dao-pids.txt
    rm /tmp/dao-pids.txt
fi

# Kill processes by name as fallback
echo "🔄 Cleaning up processes..."
pkill -f "anvil" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# Kill processes on ports
echo "🔌 Freeing up ports..."
lsof -ti:8545 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Clean up log files
echo "📄 Cleaning up log files..."
rm -f /tmp/dao-*.log

echo -e "${GREEN}✅ Local environment stopped successfully${NC}"
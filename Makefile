# Zoo Network - Unified Ecosystem Makefile
# Run entire ecosystem: blockchain + all 7 web apps

.PHONY: help dev stop clean install build test status wallet

# Default target
.DEFAULT_GOAL := help

# Colors for output
GREEN  := \033[0;32m
BLUE   := \033[0;34m
YELLOW := \033[1;33m
RED    := \033[0;31m
NC     := \033[0m # No Color

# Ports
BLOCKCHAIN_PORT := 8545
APP_PORT        := 3000
FOUNDATION_PORT := 3002
NETWORK_PORT    := 3003
VOTE_PORT       := 3004
FUND_PORT       := 3005
COMPUTER_PORT   := 3007
EXCHANGE_PORT   := 3008

# Test wallet (Hardhat account #0)
TEST_PRIVATE_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
TEST_ADDRESS     := 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

help: ## Show this help message
	@echo "$(BLUE)🦁 Zoo Network - Unified Ecosystem$(NC)"
	@echo ""
	@echo "$(GREEN)Available targets:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(BLUE)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

dev: ## Start entire ecosystem (blockchain + all apps)
	@echo "$(BLUE)🦁 Starting Zoo Ecosystem Development Environment$(NC)"
	@echo ""
	@$(MAKE) -s stop
	@sleep 2
	@$(MAKE) -s _start-blockchain
	@sleep 8
	@$(MAKE) -s _deploy-contracts
	@$(MAKE) -s _start-apps
	@echo ""
	@echo "$(GREEN)✨ Zoo Ecosystem Running!$(NC)"
	@echo ""
	@$(MAKE) -s status
	@echo ""
	@$(MAKE) -s wallet

_start-blockchain: ## Internal: Start Hardhat blockchain
	@echo "$(BLUE)⛓️  Starting Blockchain (localhost:$(BLOCKCHAIN_PORT))...$(NC)"
	@mkdir -p logs
	@cd contracts && npx hardhat node > ../logs/blockchain.log 2>&1 &
	@echo "  PID: $$!"

_deploy-contracts: ## Internal: Deploy ZK governance contracts
	@echo "$(BLUE)📝 Deploying ZK Governance Contracts...$(NC)"
	@cd contracts && npx hardhat run scripts/deploy-zk-governance.js --network localhost 2>&1 | tee ../logs/deploy.log
	@echo "  $(GREEN)✓$(NC) Contracts deployed"

_start-apps: ## Internal: Start all web applications
	@echo ""
	@echo "$(BLUE)🚀 Starting Web Applications...$(NC)"
	@echo ""
	@$(MAKE) -s _start-app DIR=app PORT=$(APP_PORT) NAME="zoolabs.io" LOG=zoolabs
	@$(MAKE) -s _start-app DIR=foundation PORT=$(FOUNDATION_PORT) NAME="zoo.ngo" LOG=foundation
	@$(MAKE) -s _start-app DIR=network PORT=$(NETWORK_PORT) NAME="zoo.network" LOG=network
	@$(MAKE) -s _start-app-dao PORT=$(VOTE_PORT) NAME="zoo.vote" LOG=vote
	@$(MAKE) -s _start-app DIR=fund PORT=$(FUND_PORT) NAME="zoo.fund" LOG=fund
	@$(MAKE) -s _start-app DIR=computer PORT=$(COMPUTER_PORT) NAME="zoo.computer" LOG=computer
	@$(MAKE) -s _start-app DIR=exchange PORT=$(EXCHANGE_PORT) NAME="zoo.exchange" LOG=exchange

_start-app: ## Internal: Start a single app
	@echo "  $(BLUE)→$(NC) Starting $(NAME) on port $(PORT)"
	@mkdir -p logs
	@cd $(DIR) && pnpm dev > ../logs/$(LOG).log 2>&1 &

_start-app-dao: ## Internal: Start DAO app (special path)
	@echo "  $(BLUE)→$(NC) Starting $(NAME) on port $(PORT)"
	@mkdir -p logs
	@cd dao-governance/app && pnpm dev > ../../logs/$(LOG).log 2>&1 &

stop: ## Stop all running services
	@echo "$(YELLOW)🛑 Stopping Zoo Ecosystem...$(NC)"
	@lsof -ti:$(BLOCKCHAIN_PORT),$(APP_PORT),$(FOUNDATION_PORT),$(NETWORK_PORT),$(VOTE_PORT),$(FUND_PORT),$(COMPUTER_PORT),$(EXCHANGE_PORT) 2>/dev/null | xargs kill -9 2>/dev/null || true
	@pkill -f "hardhat node" 2>/dev/null || true
	@pkill -f "next dev" 2>/dev/null || true
	@pkill -f "vite" 2>/dev/null || true
	@echo "  $(GREEN)✓$(NC) All services stopped"

clean: stop ## Stop services and clean build artifacts
	@echo "$(YELLOW)🧹 Cleaning build artifacts...$(NC)"
	@rm -rf logs/*.log
	@rm -rf app/.next
	@rm -rf foundation/.next
	@rm -rf network/.next
	@rm -rf dao-governance/app/.next
	@rm -rf fund/.next
	@rm -rf computer/dist
	@rm -rf contracts/artifacts
	@rm -rf contracts/cache
	@rm -rf contracts/deployments/localhost
	@echo "  $(GREEN)✓$(NC) Clean complete"

install: ## Install dependencies for all apps
	@echo "$(BLUE)📦 Installing dependencies...$(NC)"
	@echo ""
	@echo "  $(BLUE)→$(NC) Installing app (zoolabs.io)"
	@cd app && pnpm install
	@echo "  $(BLUE)→$(NC) Installing foundation (zoo.ngo)"
	@cd foundation && pnpm install
	@echo "  $(BLUE)→$(NC) Installing network (zoo.network)"
	@cd network && pnpm install
	@echo "  $(BLUE)→$(NC) Installing dao-governance (zoo.vote)"
	@cd dao-governance/app && pnpm install
	@echo "  $(BLUE)→$(NC) Installing fund (zoo.fund)"
	@cd fund && pnpm install
	@echo "  $(BLUE)→$(NC) Installing computer (zoo.computer)"
	@cd computer && pnpm install
	@echo "  $(BLUE)→$(NC) Installing exchange (zoo.exchange)"
	@cd exchange && npm install
	@echo "  $(BLUE)→$(NC) Installing contracts"
	@cd contracts && npm install
	@echo "  $(BLUE)→$(NC) Installing ui (@zoo/ui)"
	@cd ui && pnpm install
	@echo ""
	@echo "  $(GREEN)✓$(NC) All dependencies installed"

build: ## Build all applications
	@echo "$(BLUE)🔨 Building all applications...$(NC)"
	@cd app && pnpm build
	@cd foundation && pnpm build
	@cd network && pnpm build
	@cd dao-governance/app && pnpm build
	@cd fund && pnpm build
	@cd computer && pnpm build
	@cd ui && pnpm build
	@echo "  $(GREEN)✓$(NC) Build complete"

test: ## Run tests for all applications
	@echo "$(BLUE)🧪 Running tests...$(NC)"
	@cd contracts && npx hardhat test
	@cd fund && pnpm test || true
	@echo "  $(GREEN)✓$(NC) Tests complete"

status: ## Show status of all services
	@echo "$(GREEN)📊 Service Status:$(NC)"
	@echo ""
	@echo "$(BLUE)Blockchain:$(NC)"
	@curl -s http://localhost:$(BLOCKCHAIN_PORT) > /dev/null 2>&1 && echo "  $(GREEN)✓$(NC) Running on http://localhost:$(BLOCKCHAIN_PORT)" || echo "  $(RED)✗$(NC) Not running"
	@echo ""
	@echo "$(BLUE)Web Applications:$(NC)"
	@curl -s http://localhost:$(APP_PORT) > /dev/null 2>&1 && echo "  $(GREEN)✓$(NC) zoolabs.io    → http://localhost:$(APP_PORT)" || echo "  $(RED)✗$(NC) zoolabs.io (not running)"
	@curl -s http://localhost:$(FOUNDATION_PORT) > /dev/null 2>&1 && echo "  $(GREEN)✓$(NC) zoo.ngo       → http://localhost:$(FOUNDATION_PORT)" || echo "  $(RED)✗$(NC) zoo.ngo (not running)"
	@curl -s http://localhost:$(NETWORK_PORT) > /dev/null 2>&1 && echo "  $(GREEN)✓$(NC) zoo.network   → http://localhost:$(NETWORK_PORT)" || echo "  $(RED)✗$(NC) zoo.network (not running)"
	@curl -s http://localhost:$(VOTE_PORT) > /dev/null 2>&1 && echo "  $(GREEN)✓$(NC) zoo.vote      → http://localhost:$(VOTE_PORT)" || echo "  $(RED)✗$(NC) zoo.vote (not running)"
	@curl -s http://localhost:$(FUND_PORT) > /dev/null 2>&1 && echo "  $(GREEN)✓$(NC) zoo.fund      → http://localhost:$(FUND_PORT)" || echo "  $(RED)✗$(NC) zoo.fund (not running)"
	@curl -s http://localhost:$(COMPUTER_PORT) > /dev/null 2>&1 && echo "  $(GREEN)✓$(NC) zoo.computer  → http://localhost:$(COMPUTER_PORT)" || echo "  $(RED)✗$(NC) zoo.computer (not running)"
	@curl -s http://localhost:$(EXCHANGE_PORT) > /dev/null 2>&1 && echo "  $(GREEN)✓$(NC) zoo.exchange  → http://localhost:$(EXCHANGE_PORT)" || echo "  $(RED)✗$(NC) zoo.exchange (not running)"

wallet: ## Display test wallet information
	@echo "$(YELLOW)🔑 Test Wallet (Funded with 10,000 ETH):$(NC)"
	@echo ""
	@echo "  $(BLUE)Address:$(NC)"
	@echo "  $(TEST_ADDRESS)"
	@echo ""
	@echo "  $(BLUE)Private Key:$(NC)"
	@echo "  $(TEST_PRIVATE_KEY)"
	@echo ""
	@echo "  $(GREEN)Import this into MetaMask to test!$(NC)"
	@echo ""
	@echo "  $(YELLOW)MetaMask Setup:$(NC)"
	@echo "  1. Open MetaMask → Settings → Networks → Add Network"
	@echo "  2. Network Name: Zoo Localhost"
	@echo "  3. RPC URL: http://127.0.0.1:$(BLOCKCHAIN_PORT)"
	@echo "  4. Chain ID: 31337"
	@echo "  5. Currency Symbol: ETH"
	@echo "  6. Import account with private key above"

logs: ## Tail all service logs
	@echo "$(BLUE)📋 Tailing logs (Ctrl+C to stop)...$(NC)"
	@tail -f logs/*.log

logs-blockchain: ## Show blockchain logs
	@tail -f logs/blockchain.log

logs-app: ## Show zoolabs.io logs
	@tail -f logs/zoolabs.log

logs-fund: ## Show zoo.fund logs
	@tail -f logs/fund.log

logs-vote: ## Show zoo.vote logs
	@tail -f logs/vote.log

contracts-info: ## Show deployed contract addresses
	@echo "$(BLUE)📝 Deployed Contract Addresses:$(NC)"
	@echo ""
	@if [ -f contracts/deployments/localhost-zk-governance.json ]; then \
		cat contracts/deployments/localhost-zk-governance.json | jq -r 'to_entries[] | "  \(.key): \(.value)"'; \
	else \
		echo "  $(YELLOW)⚠$(NC)  No contracts deployed yet. Run 'make dev' first."; \
	fi

dev-app: ## Start only zoolabs.io
	@cd app && pnpm dev

dev-fund: ## Start only zoo.fund
	@cd fund && pnpm dev

dev-vote: ## Start only zoo.vote
	@cd dao-governance/app && pnpm dev

dev-chain: ## Start only blockchain
	@$(MAKE) -s stop
	@$(MAKE) -s _start-blockchain
	@sleep 5
	@$(MAKE) -s _deploy-contracts
	@$(MAKE) -s wallet

ps: ## Show running processes
	@echo "$(BLUE)📊 Running Zoo Processes:$(NC)"
	@echo ""
	@ps aux | grep -E "hardhat|next|vite" | grep -v grep || echo "  No Zoo processes running"

# Additional Hardhat test accounts (all funded with 10,000 ETH)
wallets: ## Show all 20 funded test wallets
	@echo "$(YELLOW)🔑 All Funded Test Wallets (10,000 ETH each):$(NC)"
	@echo ""
	@echo "$(BLUE)Account #0:$(NC)"
	@echo "  Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
	@echo "  Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
	@echo ""
	@echo "$(BLUE)Account #1:$(NC)"
	@echo "  Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
	@echo "  Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
	@echo ""
	@echo "$(BLUE)Account #2:$(NC)"
	@echo "  Address: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
	@echo "  Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
	@echo ""
	@echo "$(BLUE)Account #3:$(NC)"
	@echo "  Address: 0x90F79bf6EB2c4f870365E785982E1f101E93b906"
	@echo "  Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6"
	@echo ""
	@echo "$(GREEN)→ See full list at: https://hardhat.org/hardhat-network/docs/reference#accounts$(NC)"

version: ## Show version information
	@echo "$(BLUE)📦 Version Information:$(NC)"
	@echo ""
	@echo "  Node.js: $$(node --version)"
	@echo "  pnpm: $$(pnpm --version)"
	@echo "  npm: $$(npm --version)"
	@echo "  Hardhat: $$(cd contracts && npx hardhat --version)"
	@echo ""
	@echo "  Zoo Ecosystem: v1.0.0"

doctor: ## Check system requirements
	@echo "$(BLUE)🏥 System Check:$(NC)"
	@echo ""
	@command -v node >/dev/null 2>&1 && echo "  $(GREEN)✓$(NC) Node.js: $$(node --version)" || echo "  $(RED)✗$(NC) Node.js not found"
	@command -v pnpm >/dev/null 2>&1 && echo "  $(GREEN)✓$(NC) pnpm: $$(pnpm --version)" || echo "  $(RED)✗$(NC) pnpm not found (install: npm install -g pnpm)"
	@command -v npm >/dev/null 2>&1 && echo "  $(GREEN)✓$(NC) npm: $$(npm --version)" || echo "  $(RED)✗$(NC) npm not found"
	@command -v jq >/dev/null 2>&1 && echo "  $(GREEN)✓$(NC) jq installed" || echo "  $(YELLOW)⚠$(NC)  jq not found (optional, for contracts-info)"
	@echo ""
	@[ -d node_modules ] && echo "  $(GREEN)✓$(NC) Root dependencies installed" || echo "  $(YELLOW)⚠$(NC)  Run 'make install' to install dependencies"

reset: clean install ## Full reset: clean + reinstall everything
	@echo "$(GREEN)✓$(NC) Full reset complete. Run 'make dev' to start."

.PHONY: _start-blockchain _deploy-contracts _start-apps _start-app _start-app-dao

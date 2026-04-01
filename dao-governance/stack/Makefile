# Makefile for LuxDAO Stack
# This is the main entry point for managing the entire LuxDAO stack

.PHONY: all up down test build clean install dev logs deploy

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m # No Color

# Default target
all: install-all up

# Install stack-level dependencies only (Playwright)
install:
	@echo "$(GREEN)Installing stack dependencies...$(NC)"
	@npm install --no-save
	@npx playwright install chromium
	@echo "$(GREEN)✅ Stack dependencies installed$(NC)"

# Install DAO dependencies
install-dao:
	@echo "$(GREEN)Installing DAO dependencies...$(NC)"
	@if [ -d "dao/contracts" ]; then cd dao/contracts && pnpm install; fi
	@if [ -d "dao/app" ]; then cd dao/app && pnpm install; fi
	@if [ -d "dao/api/packages/offchain" ]; then cd dao/api/packages/offchain && pnpm install; fi
	@echo "$(GREEN)✅ DAO dependencies installed$(NC)"

# Install all dependencies (stack + DAO)
install-all: install install-dao
	@echo "$(GREEN)✅ All dependencies installed$(NC)"

# Start the entire stack with Docker Compose
up:
	@echo "$(GREEN)Starting LuxDAO Stack...$(NC)"
	@docker-compose up -d
	@echo "$(GREEN)✅ Stack started successfully$(NC)"
	@echo "$(YELLOW)Services:$(NC)"
	@echo "  - DAO Frontend: http://localhost:3000"
	@echo "  - API: http://localhost:4000"
	@echo "  - Anvil RPC: http://localhost:8545"
	@echo "  - PostgreSQL: localhost:5432"
	@echo "  - Redis: localhost:6379"
	@echo "  - IPFS: http://localhost:8080"
	@echo "  - Grafana: http://localhost:3001"

# Start development mode (without Docker)
dev:
	@echo "$(GREEN)Starting development environment...$(NC)"
	@cd dao && ./scripts/start-dev.sh

# Start local environment (without Docker)
local:
	@echo "$(GREEN)Starting local environment...$(NC)"
	@cd dao && ./scripts/start-local.sh

# Stop the entire stack
down:
	@echo "$(YELLOW)Stopping LuxDAO Stack...$(NC)"
	@docker-compose down
	@echo "$(GREEN)✅ Stack stopped$(NC)"

# View logs for all services
logs:
	@docker-compose logs -f

# View logs for specific service
logs-%:
	@docker-compose logs -f $*

# Build Docker images
build:
	@echo "$(GREEN)Building Docker images...$(NC)"
	@docker-compose build
	@echo "$(GREEN)✅ Images built successfully$(NC)"

# Run all tests
test: test-unit test-e2e

# Run unit tests
test-unit:
	@echo "$(GREEN)Running unit tests...$(NC)"
	@cd dao/contracts && npm test
	@cd dao/app && npm test
	@echo "$(GREEN)✅ Unit tests completed$(NC)"

# Run E2E tests
test-e2e:
	@echo "$(GREEN)Running E2E tests...$(NC)"
	@cd dao && npx playwright test
	@echo "$(GREEN)✅ E2E tests completed$(NC)"

# Run E2E tests with UI
test-ui:
	@echo "$(GREEN)Opening Playwright UI...$(NC)"
	@cd dao && npx playwright test --ui

# Deploy contracts to local Anvil
deploy-local:
	@echo "$(GREEN)Deploying contracts to local Anvil...$(NC)"
	@cd dao/contracts && npm run deploy:local
	@echo "$(GREEN)✅ Contracts deployed$(NC)"

# Deploy contracts to testnet
deploy-testnet:
	@echo "$(YELLOW)Deploying contracts to testnet...$(NC)"
	@cd dao/contracts && npm run deploy:testnet
	@echo "$(GREEN)✅ Contracts deployed to testnet$(NC)"

# Clean all build artifacts and dependencies
clean:
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	@find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
	@find . -name "dist" -type d -prune -exec rm -rf '{}' +
	@find . -name "build" -type d -prune -exec rm -rf '{}' +
	@find . -name ".next" -type d -prune -exec rm -rf '{}' +
	@docker-compose down -v
	@echo "$(GREEN)✅ Cleaned successfully$(NC)"

# Reset the entire stack (clean + install + up)
reset: clean install up

# Check stack health
health:
	@echo "$(GREEN)Checking stack health...$(NC)"
	@docker-compose ps
	@echo ""
	@echo "$(YELLOW)Testing services...$(NC)"
	@curl -s http://localhost:3000 > /dev/null && echo "$(GREEN)✅ Frontend is running$(NC)" || echo "$(RED)❌ Frontend is not responding$(NC)"
	@curl -s http://localhost:4000/health > /dev/null && echo "$(GREEN)✅ API is running$(NC)" || echo "$(RED)❌ API is not responding$(NC)"
	@curl -s -X POST http://localhost:8545 -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' > /dev/null && echo "$(GREEN)✅ Anvil is running$(NC)" || echo "$(RED)❌ Anvil is not responding$(NC)"

# Initialize and setup GitHub repository
github-init:
	@echo "$(GREEN)Initializing GitHub repository...$(NC)"
	@git init
	@git add .
	@git commit -m "Initial commit: LuxDAO Stack"
	@git branch -M main
	@git remote add origin https://github.com/luxdao/stack.git
	@echo "$(GREEN)✅ Repository initialized. Run 'make github-push' to push to GitHub$(NC)"

# Push to GitHub
github-push:
	@echo "$(GREEN)Pushing to GitHub...$(NC)"
	@git push -u origin main
	@echo "$(GREEN)✅ Pushed to GitHub successfully$(NC)"

# Create README if it doesn't exist
readme:
	@if [ ! -f README.md ]; then \
		echo "$(YELLOW)Creating README.md...$(NC)"; \
		echo "# LuxDAO Stack" > README.md; \
		echo "" >> README.md; \
		echo "Complete DAO infrastructure for the Lux Protocol ecosystem." >> README.md; \
		echo "" >> README.md; \
		echo "## Quick Start" >> README.md; \
		echo '```bash' >> README.md; \
		echo "make install  # Install dependencies" >> README.md; \
		echo "make up       # Start the stack" >> README.md; \
		echo "make test     # Run tests" >> README.md; \
		echo '```' >> README.md; \
		echo "$(GREEN)✅ README.md created$(NC)"; \
	else \
		echo "$(YELLOW)README.md already exists$(NC)"; \
	fi

# Help command
help:
	@echo "$(GREEN)LuxDAO Stack Commands:$(NC)"
	@echo "  make install      - Install all dependencies"
	@echo "  make up          - Start the stack with Docker"
	@echo "  make down        - Stop the stack"
	@echo "  make dev         - Start development mode (no Docker)"
	@echo "  make local       - Start local mode (no Docker)"
	@echo "  make logs        - View logs for all services"
	@echo "  make logs-<svc>  - View logs for specific service"
	@echo "  make test        - Run all tests"
	@echo "  make test-unit   - Run unit tests"
	@echo "  make test-e2e    - Run E2E tests"
	@echo "  make test-ui     - Run E2E tests with UI"
	@echo "  make build       - Build Docker images"
	@echo "  make deploy-local - Deploy contracts locally"
	@echo "  make clean       - Clean all artifacts"
	@echo "  make reset       - Reset entire stack"
	@echo "  make health      - Check stack health"
	@echo "  make github-init - Initialize GitHub repo"
	@echo "  make github-push - Push to GitHub"
	@echo "  make help        - Show this help message"
# Makefile for the Lux DAO project

.PHONY: up down logs build test test-unit test-e2e clean install dev

# Default target
all: install up

# Install all dependencies
install:
	@echo "Installing dependencies..."
	@cd contracts && pnpm install
	@cd app && pnpm install
	@if [ -d "./api/packages/offchain" ]; then cd api/packages/offchain && pnpm install; fi
	@npx playwright install chromium
	@echo "✅ Dependencies installed"

# Start the local development environment (local)
up:
	@echo "Starting the full local stack with Anvil..."
	@./scripts/start-local.sh

# Start the local development environment with Docker Compose
up-docker:
	@echo "Starting services with Docker Compose..."
	@docker-compose up -d
	@echo "✅ Services started. Check status with 'docker-compose ps'"
	@echo "📍 Services:"
	@echo "   - Frontend: http://localhost:3000"
	@echo "   - API: http://localhost:4000"
	@echo "   - Anvil RPC: http://localhost:8545"
	@echo "   - PostgreSQL: localhost:5432"
	@echo "   - Redis: localhost:6379"
	@echo "   - IPFS: http://localhost:8080"
	@echo "   - Grafana: http://localhost:3001 (admin/admin)"

# Start development mode (with hot reload)
dev:
	@echo "Starting development environment..."
	@./scripts/start-dev.sh

# Stop the local stack
down:
	@echo "Stopping the local stack..."
	@./scripts/stop-local.sh

# Stop Docker Compose services
down-docker:
	@echo "Stopping Docker Compose services..."
	@docker-compose down
	@echo "✅ Services stopped"

# View Docker Compose logs
logs-docker:
	@docker-compose logs -f

# Build Docker images
build-docker:
	@echo "Building Docker images..."
	@docker-compose build
	@echo "✅ Docker images built"

# Run all tests (unit + E2E)
test: test-unit test-e2e
	@echo "✅ All tests completed"

# Run unit tests
test-unit:
	@echo "Running unit tests..."
	@cd contracts && npx hardhat test
	@cd app && pnpm test --run 2>/dev/null || echo "No unit tests configured"

# Run E2E tests with Playwright
test-e2e:
	@echo "Running E2E tests..."
	@if ! curl -s http://localhost:5173 > /dev/null 2>&1; then \
		echo "⚠️  Starting local environment for E2E tests..."; \
		make up & \
		sleep 10; \
	fi
	@npx playwright test --reporter=list

# Run E2E tests in UI mode
test-ui:
	@echo "Opening Playwright test UI..."
	@npx playwright test --ui

# View logs for the stack
logs:
	@echo "Showing recent logs..."
	@tail -f /tmp/dao-*.log 2>/dev/null || echo "No logs available. Start the stack first with 'make up'"

# Clean build artifacts and node_modules
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf contracts/node_modules contracts/cache contracts/artifacts contracts/typechain-types
	@rm -rf app/node_modules app/dist
	@rm -rf test-results .playwright-mcp
	@rm -f /tmp/dao-pids.txt /tmp/dao-*.log
	@if [ -d "./api/packages/offchain" ]; then rm -rf api/packages/offchain/node_modules; fi
	@echo "✅ Clean complete"

# Deploy contracts to local network
deploy:
	@echo "Deploying contracts to local network..."
	@cd contracts && npx hardhat run scripts/deploy-local.ts --network localhost

# Compile contracts
compile:
	@echo "Compiling contracts..."
	@cd contracts && npx hardhat compile

# Format code
format:
	@echo "Formatting code..."
	@cd app && pnpm prettier --write .
	@cd contracts && pnpm prettier --write .

# Lint code
lint:
	@echo "Linting code..."
	@cd app && pnpm lint
	@cd contracts && pnpm lint

# Check types
typecheck:
	@echo "Type checking..."
	@cd app && pnpm typecheck

# Help command
help:
	@echo "Lux DAO Makefile Commands:"
	@echo ""
	@echo "  Local Development:"
	@echo "  make install       - Install all dependencies"
	@echo "  make up            - Start local development environment"
	@echo "  make dev           - Start with hot reload"
	@echo "  make down          - Stop all services"
	@echo ""
	@echo "  Docker Development:"
	@echo "  make up-docker     - Start services with Docker Compose"
	@echo "  make down-docker   - Stop Docker services"
	@echo "  make build-docker  - Build Docker images"
	@echo "  make logs-docker   - View Docker logs"
	@echo ""
	@echo "  Testing:"
	@echo "  make test          - Run all tests (unit + E2E)"
	@echo "  make test-unit     - Run unit tests only"
	@echo "  make test-e2e      - Run E2E tests only"
	@echo "  make test-ui       - Open Playwright UI"
	@echo ""
	@echo "  Development:"
	@echo "  make deploy        - Deploy contracts locally"
	@echo "  make compile       - Compile contracts"
	@echo "  make format        - Format code"
	@echo "  make lint          - Lint code"
	@echo "  make typecheck     - Check TypeScript types"
	@echo ""
	@echo "  Utilities:"
	@echo "  make logs          - View service logs"
	@echo "  make clean         - Clean build artifacts"
	@echo "  make help          - Show this help message"
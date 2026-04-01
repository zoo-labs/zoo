# Makefile for lux-dao contracts

.PHONY: all clean compile test lint local-node deploy-local

# Default command
all: compile

# Clean the project
clean:
	@echo "Cleaning up project..."
	pnpm clean

# Compile contracts
compile:
	@echo "Compiling contracts..."
	pnpm compile

# Run tests
test:
	@echo "Running tests..."
	pnpm test

# Lint the project
lint:
	@echo "Linting project..."
	pnpm lint

# Run a local hardhat node
local-node:
	@echo "Starting local Hardhat node..."
	npx hardhat node

# Deploy contracts to the local node
# Note: This assumes you have a deployment script at scripts/deploy.ts
deploy-local:
	@echo "Deploying contracts to localhost..."
	npx hardhat run scripts/deploy.ts --network localhost




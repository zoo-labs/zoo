# 🦁 Zoo Network - Unified Ecosystem

Complete Zoo ecosystem monorepo. All apps, contracts, and infrastructure in one place.

## 🚀 Quick Start

**Recommended: Use Make**
```bash
make dev
```

This starts the entire ecosystem: blockchain + all 7 web apps.

**Alternative: Shell Script**
```bash
./dev-all.sh
```

## 🔑 Test Wallet (Pre-Funded)

Use this wallet for local testing (10,000 ETH):

**Address:** `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
**Private Key:** `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

**MetaMask Setup:**
1. Add Network → Localhost
2. RPC URL: `http://127.0.0.1:8545`
3. Chain ID: `31337`
4. Import account with private key above

Get wallet info anytime: `make wallet` or `make wallets` (for all 20 test accounts)

## 📦 Makefile Commands

```bash
make help              # Show all available commands
make dev               # Start blockchain + all apps
make stop              # Stop all services
make status            # Show what's running
make wallet            # Show test wallet info
make wallets           # Show all 20 test wallets

# Individual apps
make dev-app           # Start only zoolabs.io
make dev-fund          # Start only zoo.fund
make dev-vote          # Start only zoo.vote
make dev-chain         # Start only blockchain

# Logs
make logs              # Tail all logs
make logs-blockchain   # Blockchain logs only
make logs-fund         # Fund app logs only

# Maintenance
make install           # Install all dependencies
make build             # Build all apps
make clean             # Clean build artifacts
make reset             # Full reset (clean + install)
make doctor            # Check system requirements

# Contracts
make contracts-info    # Show deployed contract addresses
```

## 📁 Apps

| App | Port | URL | Purpose |
|-----|------|-----|---------|
| **zoolabs.io** | 3000 | http://localhost:3000 | AI Research + Desktop App |
| **zoo.ngo** | 3002 | http://localhost:3002 | 501(c)(3) Foundation |
| **zoo.network** | 3003 | http://localhost:3003 | Blockchain Explorer |
| **zoo.vote** | 3004 | http://localhost:3004 | DAO Governance + Staking |
| **zoo.fund** | 3005 | http://localhost:3005 | Conservation Fundraising |
| **zoo.computer** | 3007 | http://localhost:3007 | AI Hardware Sales |
| **zoo.exchange** | 3008 | http://localhost:3008 | Decentralized Exchange |
| **Blockchain** | 8545 | http://localhost:8545 | Local Hardhat Node |

## 📚 Documentation

- **STAKING.md** - ZK staking system guide
- **ZOO_ECOSYSTEM_ARCHITECTURE.md** - Full technical architecture
- **ECOSYSTEM_STATUS.md** - Current deployment status
- **Makefile** - All available commands
- **fund/LLM.md** - AI assistant knowledge base

See individual app directories for more details.

## 🏗️ System Requirements

- Node.js ≥ 20.x
- pnpm ≥ 8.15.0
- npm (for contracts)

Check your system: `make doctor`

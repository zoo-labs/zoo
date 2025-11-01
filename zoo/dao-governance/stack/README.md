# LuxDAO Stack

Complete DAO infrastructure for the Lux Protocol ecosystem.

## Overview

LuxDAO Stack provides a comprehensive decentralized autonomous organization (DAO) platform with:
- 🏛️ **Governance**: On-chain voting and proposal management
- 💰 **Treasury**: Multi-sig treasury management
- 🔐 **Security**: Role-based access control with Hats Protocol
- 📊 **Analytics**: Real-time DAO metrics and insights
- 🌐 **Multi-chain**: Support for Ethereum, Optimism, Polygon, Base

## Quick Start

```bash
# Clone the repository
git clone https://github.com/luxdao/stack.git
cd stack

# Install dependencies
make install

# Start the stack
make up

# Run tests
make test
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | React-based DAO interface |
| API | 4000 | Backend API server |
| Anvil | 8545 | Local Ethereum blockchain |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache layer |
| IPFS | 8080 | Decentralized storage |
| Grafana | 3001 | Monitoring dashboard |

## Development

### Local Development (without Docker)
```bash
make dev  # Start with hot reload
```

### Running Tests
```bash
make test        # Run all tests
make test-unit   # Unit tests only
make test-e2e    # E2E tests only
make test-ui     # E2E tests with UI
```

### Deploying Contracts
```bash
make deploy-local    # Deploy to local Anvil
make deploy-testnet  # Deploy to testnet
```

## Architecture

```
luxdao/stack/
├── dao/
│   ├── app/          # Frontend React application
│   ├── contracts/    # Smart contracts (Solidity)
│   ├── api/          # Backend API
│   ├── sdk/          # TypeScript SDK
│   └── subgraph/     # Graph Protocol integration
├── docker-compose.yml
├── Makefile
└── README.md
```

## Key Features

### Smart Contracts
- **LinearERC20Voting**: Token-based voting mechanism
- **Azorius**: Modular governance framework
- **DecentAutonomousAdmin**: Autonomous admin functions
- **DecentHats**: Role management with Hats Protocol
- **KeyValuePairs**: On-chain key-value storage

### Frontend Features
- Web3 wallet integration (MetaMask, WalletConnect, etc.)
- Real-time proposal tracking
- Treasury management interface
- Role-based access control UI
- Multi-chain support

### Backend Services
- GraphQL API
- WebSocket subscriptions
- IPFS integration
- Database indexing
- Event processing

## Commands

```bash
# Stack Management
make up          # Start the stack
make down        # Stop the stack
make logs        # View logs
make health      # Check service health

# Development
make dev         # Start development mode
make build       # Build Docker images
make clean       # Clean all artifacts
make reset       # Reset entire stack

# Testing
make test        # Run all tests
make test-unit   # Run unit tests
make test-e2e    # Run E2E tests

# Deployment
make deploy-local    # Deploy locally
make deploy-testnet  # Deploy to testnet

# GitHub
make github-init  # Initialize repository
make github-push  # Push to GitHub
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Network Configuration
CHAIN_ID=1337
RPC_URL=http://localhost:8545

# API Configuration
API_URL=http://localhost:4000
DATABASE_URL=postgresql://luxdao:luxdao123@localhost:5432/luxdao
REDIS_URL=redis://localhost:6379

# IPFS Configuration
IPFS_GATEWAY=http://localhost:8080

# Contract Addresses (auto-populated after deployment)
GOVERNANCE_TOKEN=0x...
GOVERNOR=0x...
TREASURY=0x...
```

## Testing

### Unit Tests
```bash
cd dao/contracts && npm test
cd dao/app && npm test
```

### E2E Tests
```bash
npx playwright test
npx playwright test --ui  # With UI
```

### Manual Testing
1. Start the stack: `make up`
2. Visit http://localhost:3000
3. Connect your wallet
4. Create a test DAO
5. Submit proposals
6. Vote on proposals

## Deployment

### Local Deployment
```bash
make up  # Uses Docker Compose
```

### Production Deployment
1. Configure environment variables
2. Deploy contracts to mainnet
3. Update contract addresses
4. Deploy frontend to CDN
5. Deploy API to cloud provider

## Monitoring

### Grafana Dashboard
Access at http://localhost:3001 (admin/admin)

### Health Checks
```bash
make health  # Check all services
```

## Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check for conflicting services
lsof -i :3000
lsof -i :8545
```

**Clean restart:**
```bash
make reset  # Clean everything and restart
```

**View logs:**
```bash
make logs          # All services
make logs-frontend # Specific service
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `make test`
5. Submit a pull request

## Security

- Smart contracts audited by [Audit Firm]
- Bug bounty program: security@lux.vote
- Security policy: [SECURITY.md](./SECURITY.md)

## License

MIT License - see [LICENSE](./LICENSE) file

## Links

- Website: https://lux.vote
- Documentation: https://docs.lux.vote
- Discord: https://discord.gg/luxdao
- Twitter: https://twitter.com/luxdao

## Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue if needed
4. Join our Discord community

---

Built with ❤️ by the Lux Protocol team
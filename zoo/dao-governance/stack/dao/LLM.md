# LLM.md - Lux DAO Project Documentation

## Overview
Lux DAO is a decentralized autonomous organization platform built for the Lux Protocol ecosystem. It enables transparent, accountable governance that evolves with the community needs at lux.vote.

## Project Location
✅ **Isolated in luxdao/stack** - The DAO project is now isolated in `/Users/z/work/luxdao/stack/dao/` separate from the main Lux monorepo for easier independent development and deployment.

## Project Status
✅ **Successfully Running Locally** - All critical issues resolved
- Fixed Docker space issues with local development script
- Resolved all import errors (useDAOModal → useDecentModal, DAOTooltip → DecentTooltip)
- Fixed contract configuration for localhost deployment
- Flipped triangle logo to point downward as requested
- Updated favicon and branding to Lux Protocol
- Configured Playwright E2E tests for wallet connection
- **Monochromatic theme applied** - Using only black/white/grays with Inter font
- **Switched to Anvil** - Better performance than Hardhat for local development
- **E2E Tests Running** - 5/7 tests passing, wallet connection working
- **Scripts Organized** - All scripts moved to scripts/ directory, no one-off scripts
- **Makefile Complete** - Single entry point for all commands including `make test`
- **Docker Compose Ready** - Full stack with Anvil, API, indexer, PostgreSQL, Redis, IPFS
- **Contract Deployment** - Scripts support both local and Docker environments

## Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Chakra UI with custom Lux theme
- **Web3**: Wagmi, Viem, Web3Modal v3
- **Smart Contracts**: Hardhat + Solidity
- **Testing**: Playwright for E2E tests
- **State Management**: React Query + Zustand
- **Package Manager**: pnpm

### Project Structure
```
/dao/
├── app/                 # React frontend application
│   ├── src/
│   │   ├── assets/     # Icons, themes, images
│   │   ├── components/ # React components
│   │   ├── pages/      # Route pages
│   │   ├── providers/  # Context providers
│   │   └── utils/      # Utility functions
│   └── public/         # Static assets
├── contracts/          # Smart contracts
│   ├── contracts/      # Solidity contracts
│   ├── deploy/         # Deployment scripts
│   └── publish/        # Contract ABIs and addresses
├── api/                # Backend API
├── sdk/                # TypeScript SDK
├── subgraph/           # Graph Protocol integration
└── e2e/                # E2E test suites
```

## Key Components

### Branding & UI
- **Logo**: Inverted triangle (pointing downward) in Lux purple (#DCC8F0)
- **Theme**: Dark mode with Lux color palette
- **Icon**: `LuxTriangle` component used throughout the app
- **Favicon**: lux-triangle.svg

### Smart Contracts
- **LinearERC20Voting**: Token-based voting mechanism
- **Azorius**: Governance module
- **DecentAutonomousAdmin**: Admin functions
- **DecentHats**: Role management
- **DecentSablierStreamManagement**: Payment streams
- **ERC6551Registry**: Token-bound accounts
- **ERC20Claim**: Token claims
- **KeyValuePairs**: Key-value storage

### Network Configuration
- **Localhost**: Chain ID 1337 for development
- **Mainnet Support**: Ethereum, Optimism, Polygon, Base, Sepolia
- **RPC Endpoints**: Configured for each network
- **Contract Addresses**: Properly mapped per chain

## Development Workflow

### Local Development (Without Docker)
```bash
# Using Makefile (recommended)
make install       # Install dependencies
make up           # Start local development
make test         # Run all tests
make down         # Stop services

# Direct scripts
./scripts/start-local.sh    # Start services
./scripts/stop-local.sh     # Stop services
```

### Docker Development (Full Stack)
```bash
# Build and start all services
make build-docker  # Build Docker images
make up-docker     # Start with Docker Compose
make logs-docker   # View logs
make down-docker   # Stop services

# Services included:
# - Anvil blockchain (port 8545)
# - Frontend app (port 3000)
# - API backend (port 4000)
# - PostgreSQL database (port 5432)
# - Redis cache (port 6379)
# - IPFS storage (port 8080/5001)
# - Graph Node (optional, port 8000)
# - Grafana monitoring (optional, port 3001)
```

### Git Workflow
```bash
# Initial commit made with all fixes
git add -A
git commit -m "Initial commit: Lux DAO with flipped triangle logo and Lux Protocol branding"
```

## Recent Fixes & Improvements

### Import Path Fixes
1. **useDAOModal → useDecentModal**: Updated all imports across 150+ files
2. **DAOTooltip → DecentTooltip**: Fixed tooltip component references
3. **Created Missing Modules**:
   - `useDAOAPI.ts`: DAO search functionality
   - `DAOHourGlass.tsx`: Loading indicator component
   - `useDAOModules.ts`: DAO module management

### Contract Configuration
1. **ES Module Conversion**: Fixed CommonJS to ES module syntax in publish files
2. **Localhost Addresses**: Added proper chain ID 1337 configuration
3. **Null Safety**: Added checks to prevent undefined contract errors
4. **Deployables Export**: Fixed missing deployables property in exports

### UI/UX Updates
1. **Logo Orientation**: Flipped triangle to point downward (M10 20 L90 20 L50 90 Z)
2. **Favicon**: Created lux-triangle.svg with proper colors
3. **Theme Integration**: Applied Lux purple (#DCC8F0) consistently

## Testing

### E2E Tests
- **Framework**: Playwright
- **Test Location**: `/e2e/wallet-connection.spec.ts`
- **Coverage**: Wallet connection, homepage loading, logo verification
- **Screenshots**: Captured in `.playwright-mcp/` directory

### Running Tests
```bash
# Run E2E tests
npm test

# Run with UI
npx playwright test --ui

# Debug mode
npx playwright test --debug
```

## Known Issues & TODOs

### Current Warnings
1. **Public Asset Import**: Warning about importing from public directory
   - Solution: Move warning-yellow.svg to src/images/
2. **Contract Address Errors**: Some contract addresses return undefined
   - Temporary fix: Null checks added, needs proper contract deployment

### Future Improvements
1. Configure proper git remote for pushing to repository
2. Deploy contracts to testnet/mainnet
3. Implement Lux Consensus integration
4. Add comprehensive test coverage
5. Set up CI/CD pipeline
6. Document API endpoints

## Lux Consensus Integration

### Planned Features
1. **Consensus Parameters**: Configure for 21-node mainnet, 11-node testnet
2. **Chain Integration**: Connect to Lux L1/L2/L3 architecture
3. **Validator Support**: Enable validator participation in governance
4. **Cross-Chain**: Bridge governance tokens between chains

### Configuration
```typescript
// Future Lux integration
const luxConfig = {
  mainnet: {
    chainId: 96369,
    validators: 21,
    consensusTime: '9.63s'
  },
  testnet: {
    chainId: 96368,
    validators: 11,
    consensusTime: '6.3s'
  }
}
```

## Deployment

### Local Deployment
```bash
# Start all services
make up

# Or run individually
cd contracts && npx hardhat node
cd app && pnpm dev
```

### Production Deployment
- Domain: lux.vote
- Infrastructure: TBD
- SSL: Required for Web3 wallet connections
- CDN: Recommended for global distribution

## Security Considerations

1. **Smart Contract Audits**: Required before mainnet deployment
2. **Private Keys**: Never commit to repository
3. **RPC Endpoints**: Use environment variables
4. **CORS Configuration**: Properly configure for production
5. **Input Validation**: Sanitize all user inputs

## Contributing

### Code Style
- TypeScript strict mode enabled
- ESLint + Prettier configured
- Component naming: PascalCase
- File naming: kebab-case for utils, PascalCase for components

### Pull Request Process
1. Create feature branch from develop
2. Make changes and test locally
3. Run linter and fix issues
4. Create PR with detailed description
5. Ensure CI passes
6. Request review from maintainers

## Resources

- **Documentation**: https://lux.vote (future)
- **Smart Contracts**: Deployed addresses in `/contracts/publish/`
- **UI Components**: Chakra UI documentation
- **Web3 Integration**: Wagmi v2 documentation

## Maintenance Notes

### Regular Updates Required
1. Dependencies: Check for security updates monthly
2. Contract upgrades: Follow governance process
3. UI/UX improvements: Based on user feedback
4. Performance optimization: Monitor and improve

### Monitoring
- Error tracking: Implement Sentry or similar
- Analytics: Privacy-respecting analytics
- Performance: Web Vitals monitoring
- Uptime: Service availability checks

---

*Last Updated: 2025-08-19*
*Maintained for AI assistants and developers working on Lux DAO*
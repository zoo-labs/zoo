# E2E Test Setup Guide

## Prerequisites

- Node.js ≥20.x
- npm ≥11.x
- Git
- Hardhat (for blockchain tests)

## Installation

### 1. Install E2E Test Dependencies

```bash
cd /Users/z/work/zoo/zoo/e2e
npm install
npx playwright install
```

### 2. Fix Hardhat Dependency Issue

The contracts directory requires an additional dependency that has version conflicts. To resolve:

```bash
cd /Users/z/work/zoo/zoo/contracts

# Option 1: Install with legacy peer deps (recommended)
npm install --legacy-peer-deps

# Option 2: Install specific package if still needed
npm install --save-dev @ethersproject/hardware-wallets --legacy-peer-deps
```

### 3. Verify Installation

```bash
cd /Users/z/work/zoo/zoo/e2e
npm run test:setup
```

Expected output: `12 passed`

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test Suites
```bash
# Setup verification
npm run test:setup

# Infrastructure (blockchain) tests
npm run test:infrastructure

# Smart contract tests
npm run test:contracts

# dApp UI tests
npm run test:dapps

# Integration tests
npm run test:integration
```

### Development Mode
```bash
# UI mode (interactive)
npm run test:ui

# Headed mode (see browser)
npm run test:headed

# Debug mode
npm run test:debug
```

## Test Structure

```
e2e/
├── tests/
│   ├── 00-setup/                   # Environment verification
│   ├── 01-infrastructure/          # Blockchain tests
│   ├── 02-contracts/               # Smart contract tests
│   │   ├── tokens.spec.ts          # ZOO, KEEPER token tests
│   │   └── governance.spec.ts      # Governor, Timelock, Safe tests
│   ├── 03-dapps/                   # dApp UI tests
│   │   ├── zoo-computer.spec.ts    # E-commerce site tests
│   │   └── zoo-vote-dao.spec.ts    # DAO governance UI tests
│   └── 04-integration/             # Full end-to-end tests
├── fixtures/                       # Test utilities
│   ├── blockchain.ts               # Hardhat node management
│   ├── contracts.ts                # Contract deployment
│   ├── wallets.ts                  # Test wallets
│   └── apps.ts                     # dApp server management
└── helpers/                        # Test helpers
    ├── assertions.ts               # Custom assertions
    └── selectors.ts                # UI selectors
```

## Known Issues

### Issue 1: Hardhat Dependency Error

**Error:**
```
Error HH801: Plugin hardhat-deploy requires the following dependencies to be installed: @ethersproject/hardware-wallets.
```

**Solution:**
```bash
cd /Users/z/work/zoo/zoo/contracts
npm install --legacy-peer-deps
```

This resolves the peer dependency conflict between ethers v5 and v6.

### Issue 2: npm "Cannot read properties of null"

**Error:**
```
npm error Cannot read properties of null (reading 'matches')
```

**Solution:**
This is usually caused by corrupted npm cache. Fix with:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Issue 3: Port Already in Use

**Error:**
```
Error: Port 8545 is already in use
```

**Solution:**
```bash
# Find and kill process using port 8545
lsof -ti:8545 | xargs kill -9

# Or restart blockchain fixture (automatic in tests)
```

### Issue 4: Test Timeout

**Error:**
```
Error: Blockchain failed to start within 30000ms
```

**Solution:**
Increase timeout in test configuration or ensure Hardhat dependencies are installed properly.

## DAO Testing Workflow

### 1. Start Local Blockchain

```bash
cd /Users/z/work/zoo/zoo/contracts
npx hardhat node
```

This starts a local blockchain on port 8545 with 20 test accounts.

### 2. Deploy Governance Contracts

```bash
# In another terminal
cd /Users/z/work/zoo/zoo/contracts
npx hardhat run scripts/deploy-governance.ts --network localhost
```

This deploys:
- ZOO Token (governance token)
- Governor (proposal/voting)
- Timelock (execution delay)

### 3. Start Vote dApp

```bash
cd /Users/z/work/zoo/zoo/dao-governance/app
npm run dev
```

Visit: http://localhost:3004

### 4. Run DAO Tests

```bash
cd /Users/z/work/zoo/zoo/e2e
npm run test:dapps -- zoo-vote-dao.spec.ts
```

## Safe Multisig Setup

### Prerequisites

Safe multisig testing requires:
1. Safe master copy contract deployed
2. Safe proxy factory deployed
3. Multiple owner addresses
4. Threshold configuration

### Deployment

```javascript
// Example Safe configuration
const safeConfig = {
  owners: [address1, address2, address3],
  threshold: 2,  // 2 of 3 required
  to: ethers.constants.AddressZero,
  data: '0x',
  fallbackHandler: ethers.constants.AddressZero,
  paymentToken: ethers.constants.AddressZero,
  payment: 0,
  paymentReceiver: ethers.constants.AddressZero
};
```

### Testing

```bash
# Run Safe integration tests
npm run test:contracts -- governance.spec.ts
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          cd contracts && npm install --legacy-peer-deps
          cd ../e2e && npm install

      - name: Install Playwright
        run: cd e2e && npx playwright install --with-deps

      - name: Run tests
        run: cd e2e && npm test

      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: e2e/playwright-report/
```

## Performance Targets

- **Setup tests**: <1s ✅
- **Infrastructure tests**: ~30s
- **Contract tests**: ~60s
- **dApp tests**: ~180s (per browser)
- **Integration tests**: ~120s
- **Total suite**: <390s (6.5 minutes)

## Test Coverage

### Current Status

✅ **Setup (12 tests)** - All passing
- Environment verification
- Dependency checks
- Directory structure validation

⚠️ **Infrastructure (15 tests)** - Pending Hardhat fix
- Blockchain lifecycle
- Transaction handling
- State management

✅ **Contract Tests (30 tests)** - Ready
- Token contracts (15 tests)
- Governance contracts (15 tests)
- Safe multisig integration

✅ **dApp Tests (20 tests)** - Ready
- Zoo Computer e-commerce (10 tests)
- Zoo Vote DAO (10 tests)

📝 **Integration Tests** - To be implemented
- Full user journeys
- Cross-contract interactions
- Multi-dApp workflows

## Troubleshooting

### Debug Mode

```bash
# Enable verbose logging
DEBUG=pw:api npm test

# Run specific test with debug
npm run test:debug -- tests/02-contracts/governance.spec.ts
```

### View Test Report

```bash
npm run report
```

Opens HTML report with:
- Test results
- Screenshots (on failure)
- Videos (on failure)
- Trace files (on retry)

### Check Background Processes

```bash
# View running background processes
ps aux | grep -E 'hardhat|node|npm'

# Kill all node processes
killall node
```

## Contributing

When adding new tests:

1. Follow existing test patterns
2. Use fixtures for setup/teardown
3. Add helpful console.log statements
4. Update this SETUP.md if adding new requirements
5. Run full test suite before committing

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Hardhat Documentation](https://hardhat.org/)
- [OpenZeppelin Governor](https://docs.openzeppelin.com/contracts/4.x/governance)
- [Safe (Gnosis Safe)](https://docs.safe.global/)
- [Zoo Documentation](../README.md)

## Support

For issues or questions:
1. Check this SETUP.md
2. Review test output and error messages
3. Check [GitHub Issues](https://github.com/zoo-labs/zoo/issues)
4. Review Playwright traces for failed tests

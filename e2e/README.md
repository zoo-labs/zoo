# Zoo Ecosystem E2E Tests

Comprehensive end-to-end testing suite for the Zoo ecosystem, including blockchain infrastructure, smart contracts, and all 6 dApps.

## Architecture

The test suite is organized into 4 layers:

1. **Infrastructure Tests** (`01-infrastructure/`) - Blockchain, network, storage
2. **Contract Tests** (`02-contracts/`) - Smart contract interactions
3. **dApp Tests** (`03-dapps/`) - UI/UX testing for all 6 applications
4. **Integration Tests** (`04-integration/`) - Full end-to-end user journeys

## Prerequisites

- Node.js ≥20.x
- npm ≥11.x
- Hardhat (installed in `../contracts/`)
- All Zoo dApps available in parent directories

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Layers
```bash
# Infrastructure tests only
npm run test:infrastructure

# Contract tests only
npm run test:contracts

# dApp UI tests only
npm run test:dapps

# Integration tests only
npm run test:integration
```

### Development Mode
```bash
# Run with UI mode (great for debugging)
npm run test:ui

# Run in headed mode (see the browser)
npm run test:headed

# Run with debugger
npm run test:debug
```

### Test Reports
```bash
# View HTML report
npm run report
```

## Test Structure

```
e2e/
├── fixtures/               # Test fixtures
│   ├── blockchain.ts       # Hardhat node management
│   ├── contracts.ts        # Contract deployment
│   ├── wallets.ts          # Test wallet setup
│   └── apps.ts             # dApp server management
├── helpers/                # Helper utilities
│   ├── assertions.ts       # Custom assertions
│   └── selectors.ts        # UI selectors
├── tests/                  # Test files
│   ├── 01-infrastructure/  # Infrastructure tests
│   ├── 02-contracts/       # Contract tests
│   ├── 03-dapps/           # dApp UI tests
│   └── 04-integration/     # Integration tests
├── playwright.config.ts    # Playwright configuration
└── package.json            # Dependencies & scripts
```

## Test Fixtures

### Blockchain Fixture
Manages Hardhat local blockchain lifecycle:
```typescript
import { setupBlockchain, teardownBlockchain } from '../fixtures/blockchain';

const blockchain = await setupBlockchain();
// ... run tests
await teardownBlockchain(blockchain);
```

### Contracts Fixture
Deploys and manages smart contracts:
```typescript
import { deployContracts, initializeContracts } from '../fixtures/contracts';

const contracts = await deployContracts(blockchain.provider);
await initializeContracts(contracts, {
  mintAmount: ethers.utils.parseEther('1000000'),
  recipients: [alice.address, bob.address]
});
```

### Wallets Fixture
Creates deterministic test wallets:
```typescript
import { setupWallets } from '../fixtures/wallets';

const wallets = await setupWallets(blockchain.provider);
// wallets.deployer, wallets.alice, wallets.bob, etc.
```

### Apps Fixture
Starts all Zoo dApp servers:
```typescript
import { startApps, stopApps } from '../fixtures/apps';

const apps = await startApps({ parallel: true });
// apps.app (3000), apps.foundation (3002), apps.network (3003), etc.
await stopApps(apps);
```

## Writing Tests

### Example: Contract Test
```typescript
import { test, expect } from '@playwright/test';
import { setupBlockchain, teardownBlockchain } from '../../fixtures/blockchain';
import { deployContracts } from '../../fixtures/contracts';
import { setupWallets } from '../../fixtures/wallets';
import { assertTransactionSuccess, assertTokenBalance } from '../../helpers/assertions';

let blockchain, contracts, wallets;

test.beforeAll(async () => {
  blockchain = await setupBlockchain();
  contracts = await deployContracts(blockchain.provider);
  wallets = await setupWallets(blockchain.provider);
});

test.afterAll(async () => {
  await teardownBlockchain(blockchain);
});

test('should mint ZOO tokens', async () => {
  const amount = ethers.utils.parseEther('1000');
  const tx = await contracts.ZOO.mint(wallets.alice.address, amount);
  await assertTransactionSuccess(tx);
  await assertTokenBalance(contracts.ZOO, wallets.alice.address, amount);
});
```

### Example: dApp Test
```typescript
import { test, expect } from '@playwright/test';
import { startApps, stopApps } from '../../fixtures/apps';
import { VOTE, COMMON } from '../../helpers/selectors';

let apps;

test.beforeAll(async () => {
  apps = await startApps();
});

test.afterAll(async () => {
  await stopApps(apps);
});

test('should display proposals list', async ({ page }) => {
  await page.goto(apps.vote.url);
  await expect(page.locator(VOTE.proposalsList)).toBeVisible();
  await expect(page.locator(VOTE.proposalCard).first()).toBeVisible();
});
```

## CI/CD Integration

### GitHub Actions
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
      - run: cd e2e && npm install
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Performance Targets

- **Infrastructure Tests**: ~30s
- **Contract Tests**: ~60s
- **dApp Tests**: ~180s (per browser)
- **Integration Tests**: ~120s
- **Total Suite**: <390s (6.5 minutes)

## Debugging

### Enable Debug Logs
```bash
DEBUG=pw:api npm test
```

### Screenshot on Failure
Automatically captures screenshots on test failures in `test-results/` directory.

### Video Recording
Videos are recorded for failed tests (configured in `playwright.config.ts`).

### Trace Viewer
```bash
npx playwright show-trace test-results/.../trace.zip
```

## Common Issues

### Port Already in Use
If dApp servers fail to start, check for existing processes:
```bash
lsof -i :3000 -i :3002 -i :3003 -i :3004 -i :3005 -i :3007
```

### Hardhat Node Timeout
Increase timeout in fixture configuration:
```typescript
const blockchain = await setupBlockchain({ timeout: 60000 });
```

### Transaction Failures
Enable verbose ethers logging:
```typescript
ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.DEBUG);
```

## Test Data

### Test Mnemonic
```
test test test test test test test test test test test junk
```

### Test Accounts
- **Deployer**: Index 0 (10,000 ETH)
- **Alice**: Index 1 (10,000 ETH)
- **Bob**: Index 2 (10,000 ETH)
- **Charlie**: Index 3 (10,000 ETH)
- **Dave**: Index 4 (10,000 ETH)

### Chain ID
- **Local Hardhat**: 31337

## Contributing

1. Write tests following existing patterns
2. Use fixtures for setup/teardown
3. Use helper functions for assertions
4. Add comments for complex test logic
5. Run tests locally before committing
6. Update README if adding new features

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Hardhat Documentation](https://hardhat.org/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Zoo Ecosystem Architecture](../E2E_TEST_ARCHITECTURE.md)

## License

Apache 2.0

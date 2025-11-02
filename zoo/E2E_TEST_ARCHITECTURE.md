# Zoo Ecosystem E2E Test Architecture

## Overview

Comprehensive end-to-end testing strategy for the Zoo ecosystem that validates the full stack:
- **Blockchain Layer**: Local Hardhat chain
- **Smart Contracts**: ZOO, KEEPER, ZK staking, governance
- **dApps**: All 6 Zoo ecosystem applications

## Test Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    E2E Test Suite                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Test Orchestrator (Playwright)                     │    │
│  │  - Manages test lifecycle                           │    │
│  │  - Coordinates blockchain + dApp interactions       │    │
│  │  - Handles test fixtures and cleanup                │    │
│  └────────────────────────────────────────────────────┘    │
│                         │                                    │
│         ┌───────────────┼───────────────┐                  │
│         │               │               │                   │
│         ▼               ▼               ▼                   │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐              │
│  │Blockchain│   │Contracts │   │  dApps   │              │
│  │  Tests   │   │  Tests   │   │  Tests   │              │
│  └──────────┘   └──────────┘   └──────────┘              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Test Layers

### 1. Infrastructure Layer
**Purpose**: Blockchain and contract deployment

**Components**:
- Hardhat local node (port 8545)
- Contract deployment scripts
- Test wallet management
- Transaction utilities

**Test Scenarios**:
- ✅ Start local blockchain
- ✅ Deploy all contracts (ZOO, KEEPER, ZK, Governor, Timelock)
- ✅ Verify contract addresses
- ✅ Initialize contracts with test data
- ✅ Fund test wallets

### 2. Contract Interaction Layer
**Purpose**: Smart contract functionality validation

**Components**:
- Ethers.js contract interfaces
- Transaction signing
- Event listening
- State verification

**Test Scenarios**:
- ✅ Token minting (ZOO, KEEPER)
- ✅ Token transfers
- ✅ Staking ZOO+KEEPER → ZK
- ✅ Unstaking ZK → burn
- ✅ Governance proposal creation
- ✅ Governance voting
- ✅ Proposal execution

### 3. dApp UI Layer
**Purpose**: Frontend user interaction validation

**Components**:
- Playwright browser automation
- RainbowKit wallet connection
- UI component interaction
- Visual regression testing

**Test Scenarios**:
- ✅ Wallet connection (MetaMask simulation)
- ✅ Token balance display
- ✅ Staking UI workflow
- ✅ Governance UI workflow
- ✅ Cross-app navigation
- ✅ Transaction confirmation flows

### 4. Integration Layer
**Purpose**: End-to-end user journey validation

**Components**:
- Full stack orchestration
- User persona simulation
- Multi-app workflows
- Data consistency checks

**Test Scenarios**:
- ✅ New user onboarding
- ✅ Token purchase → stake → vote flow
- ✅ DAO proposal lifecycle
- ✅ Cross-app token balance sync
- ✅ Multi-wallet scenarios

## Test File Structure

```
zoo/
├── e2e/
│   ├── fixtures/
│   │   ├── blockchain.ts         # Hardhat node management
│   │   ├── contracts.ts          # Contract deployment
│   │   ├── wallets.ts            # Test wallet utilities
│   │   └── apps.ts               # dApp server management
│   ├── helpers/
│   │   ├── transactions.ts       # Transaction utilities
│   │   ├── assertions.ts         # Custom assertions
│   │   └── selectors.ts          # UI element selectors
│   ├── tests/
│   │   ├── 01-infrastructure/
│   │   │   ├── blockchain.spec.ts
│   │   │   └── contracts.spec.ts
│   │   ├── 02-contracts/
│   │   │   ├── tokens.spec.ts
│   │   │   ├── staking.spec.ts
│   │   │   └── governance.spec.ts
│   │   ├── 03-dapps/
│   │   │   ├── app.spec.ts         # Zoo AI (3000)
│   │   │   ├── foundation.spec.ts  # Zoo Foundation (3002)
│   │   │   ├── network.spec.ts     # Zoo Network (3003)
│   │   │   ├── vote.spec.ts        # Zoo Vote (3004)
│   │   │   ├── fund.spec.ts        # Zoo Fund (3005)
│   │   │   └── computer.spec.ts    # Zoo Computer (3007)
│   │   └── 04-integration/
│   │       ├── user-journey.spec.ts
│   │       ├── governance-flow.spec.ts
│   │       └── cross-app.spec.ts
│   ├── playwright.config.ts
│   └── README.md
```

## Key Test Fixtures

### 1. Blockchain Fixture
```typescript
export interface BlockchainFixture {
  provider: ethers.providers.JsonRpcProvider;
  chainId: number;
  blockNumber: number;
  hardhatProcess: ChildProcess;
}

export async function setupBlockchain(): Promise<BlockchainFixture> {
  // Start Hardhat node
  // Wait for chain ready
  // Return provider and metadata
}
```

### 2. Contracts Fixture
```typescript
export interface ContractsFixture {
  ZOO: Contract;
  KEEPER: Contract;
  ZKStaking: Contract;
  Governor: Contract;
  Timelock: Contract;
  addresses: Record<string, string>;
}

export async function deployContracts(
  provider: ethers.providers.JsonRpcProvider
): Promise<ContractsFixture> {
  // Deploy all contracts
  // Initialize contracts
  // Return contract instances
}
```

### 3. Wallets Fixture
```typescript
export interface WalletFixture {
  deployer: ethers.Wallet;
  alice: ethers.Wallet;
  bob: ethers.Wallet;
  charlie: ethers.Wallet;
}

export async function setupWallets(
  provider: ethers.providers.JsonRpcProvider
): Promise<WalletFixture> {
  // Create test wallets
  // Fund with ETH
  // Fund with tokens
  // Return wallet instances
}
```

### 4. Apps Fixture
```typescript
export interface AppsFixture {
  app: { url: string; process: ChildProcess };
  foundation: { url: string; process: ChildProcess };
  network: { url: string; process: ChildProcess };
  vote: { url: string; process: ChildProcess };
  fund: { url: string; process: ChildProcess };
  computer: { url: string; process: ChildProcess };
}

export async function startApps(): Promise<AppsFixture> {
  // Start all 6 dApps in parallel
  // Wait for health checks
  // Return app metadata
}
```

## Test Execution Flow

### Setup Phase
1. **Start Blockchain** (5s)
   ```bash
   cd contracts && npm run chain
   ```

2. **Deploy Contracts** (10s)
   ```bash
   cd contracts && npm run deploy
   ```

3. **Start dApps** (15s)
   ```bash
   ./dev-all.sh
   ```

### Test Phase
4. **Run Infrastructure Tests** (30s)
   - Verify blockchain connectivity
   - Verify contract deployments
   - Verify dApp availability

5. **Run Contract Tests** (60s)
   - Token operations
   - Staking operations
   - Governance operations

6. **Run dApp Tests** (120s)
   - Wallet connection
   - UI interactions
   - Transaction flows

7. **Run Integration Tests** (180s)
   - Full user journeys
   - Cross-app workflows
   - Data consistency

### Teardown Phase
8. **Cleanup** (5s)
   - Stop dApps
   - Stop blockchain
   - Clear test data

## Test Data Strategy

### Genesis State
```typescript
export const GENESIS_STATE = {
  tokens: {
    ZOO: {
      totalSupply: ethers.utils.parseEther('1000000000'), // 1B
      holders: [
        { address: 'alice', balance: ethers.utils.parseEther('100000') },
        { address: 'bob', balance: ethers.utils.parseEther('50000') },
        { address: 'charlie', balance: ethers.utils.parseEther('25000') }
      ]
    },
    KEEPER: {
      totalSupply: ethers.utils.parseEther('1000000000'), // 1B
      holders: [
        { address: 'alice', balance: ethers.utils.parseEther('100000') },
        { address: 'bob', balance: ethers.utils.parseEther('50000') },
        { address: 'charlie', balance: ethers.utils.parseEther('25000') }
      ]
    }
  },
  staking: {
    stakes: [
      {
        address: 'alice',
        zooAmount: ethers.utils.parseEther('10000'),
        keeperAmount: ethers.utils.parseEther('10000'),
        duration: 365 * 24 * 60 * 60, // 1 year
        zkAmount: ethers.utils.parseEther('19000') // 1.9x multiplier
      }
    ]
  },
  governance: {
    proposals: [
      {
        proposer: 'alice',
        title: 'Test Proposal #1',
        description: 'Increase staking rewards',
        targets: [],
        values: [],
        calldatas: [],
        state: 'Active'
      }
    ]
  }
};
```

## Test Assertions

### Contract Assertions
```typescript
export async function assertTokenBalance(
  token: Contract,
  address: string,
  expectedBalance: BigNumber
): Promise<void> {
  const balance = await token.balanceOf(address);
  expect(balance).to.equal(expectedBalance);
}

export async function assertStake(
  staking: Contract,
  address: string,
  expectedZK: BigNumber
): Promise<void> {
  const zkBalance = await staking.getZKBalance(address);
  expect(zkBalance).to.equal(expectedZK);
}
```

### UI Assertions
```typescript
export async function assertWalletConnected(
  page: Page,
  expectedAddress: string
): Promise<void> {
  const addressEl = await page.locator('[data-testid="wallet-address"]');
  const displayAddress = await addressEl.textContent();
  expect(displayAddress).toContain(expectedAddress.slice(0, 6));
}

export async function assertTokenDisplayed(
  page: Page,
  symbol: string,
  expectedBalance: string
): Promise<void> {
  const balanceEl = await page.locator(`[data-testid="balance-${symbol}"]`);
  const balance = await balanceEl.textContent();
  expect(balance).toContain(expectedBalance);
}
```

## Performance Targets

| Test Suite | Target Duration | Current |
|------------|----------------|---------|
| Infrastructure | <30s | TBD |
| Contracts | <60s | TBD |
| dApps | <120s | TBD |
| Integration | <180s | TBD |
| **Total** | **<390s (6.5min)** | **TBD** |

## CI/CD Integration

### GitHub Actions Workflow
```yaml
name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          cd zoo
          npm install
          cd contracts && npm install
          cd ../app && npm install
          # ... install all apps

      - name: Run E2E tests
        run: |
          cd zoo/e2e
          npm test

      - name: Upload test artifacts
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: zoo/e2e/playwright-report/
```

## Debugging & Troubleshooting

### Debug Mode
```bash
# Run with headed browser
PWDEBUG=1 npm test

# Run specific test
npm test -- tests/03-dapps/vote.spec.ts

# Run with video recording
npm test -- --video=on

# Run with trace
npm test -- --trace=on
```

### Common Issues

1. **Blockchain not ready**
   - Solution: Increase wait time in blockchain fixture
   - Check: `curl http://localhost:8545`

2. **Contract deployment fails**
   - Solution: Clear `deployments/` directory
   - Check: `hardhat compile` output

3. **dApp not accessible**
   - Solution: Check port availability
   - Check: `lsof -i :3000-3010`

4. **Wallet connection fails**
   - Solution: Verify MetaMask extension installed
   - Check: Browser console for errors

## Test Maintenance

### Adding New Tests
1. Identify test category (infrastructure/contracts/dapps/integration)
2. Create spec file in appropriate directory
3. Use existing fixtures and helpers
4. Follow naming convention: `feature.spec.ts`
5. Add test to CI workflow

### Updating Fixtures
1. Modify fixture file in `fixtures/`
2. Update fixture interface if needed
3. Run affected tests
4. Update documentation

### Performance Optimization
1. Run tests in parallel when possible
2. Reuse blockchain/contract state across tests
3. Use test.describe.serial() for dependent tests
4. Mock external dependencies

## Future Enhancements

### Phase 2
- [ ] Visual regression testing
- [ ] Performance benchmarking
- [ ] Load testing
- [ ] Security testing

### Phase 3
- [ ] Multi-chain testing (testnet, mainnet fork)
- [ ] Mobile browser testing
- [ ] Accessibility testing
- [ ] Localization testing

### Phase 4
- [ ] Chaos engineering
- [ ] Fuzz testing
- [ ] Property-based testing
- [ ] Mutation testing

## References

- [Playwright Documentation](https://playwright.dev/)
- [Hardhat Documentation](https://hardhat.org/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)

---

**Last Updated**: 2025-11-01
**Status**: 🚧 Design Phase
**Next Steps**: Implement fixtures and infrastructure tests

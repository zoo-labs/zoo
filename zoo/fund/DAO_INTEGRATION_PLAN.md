# DAO Infrastructure Integration Plan

## Overview
Integrate Lux DAO infrastructure into Zoo Fund for proper multi-nonprofit governance and operations.

## Current State Analysis

### Lux DAO Components (~/work/lux/dao)
1. **Smart Contracts** (Solidity)
   - LinearERC20Voting: Token-based voting
   - Azorius: Modular governance framework
   - DecentAutonomousAdmin: Autonomous admin functions
   - DecentHats: Role management with Hats Protocol
   - ERC6551Registry: Token-bound accounts
   - Freeze Guards & Voting modules
   - Account abstraction support

2. **Frontend** (React + TypeScript + Vite)
   - Chakra UI components
   - Wagmi/Viem for Web3 integration
   - Web3Modal v3 for wallet connections
   - React Query + Zustand for state

3. **SDK** (TypeScript)
   - Contract interfaces
   - Transaction builders
   - Type-safe interactions

4. **Infrastructure**
   - PostgreSQL (DAO state indexing)
   - Redis (caching)
   - IPFS (metadata storage)
   - Anvil (local blockchain)

### Zoo Fund Current State (~/work/zoo/zoo/fund)
- Next.js 14 with App Router
- RainbowKit for wallet connection
- TailwindCSS for styling
- Mock on-chain data (OnChainMetrics component)
- Self-service DAO onboarding form
- 8 conservation DAOs defined

## Integration Strategy

### Phase 1: Core Infrastructure Setup ✅ (In Progress)
1. Create directory structure:
   ```
   /fund/
   ├── contracts/       # Smart contracts from Lux DAO
   ├── sdk/            # TypeScript SDK
   ├── governance/     # Governance utilities
   └── blockchain/     # Blockchain interaction layer
   ```

2. Copy essential smart contracts:
   - Core governance (Azorius, LinearERC20Voting)
   - Treasury management (DecentAutonomousAdmin)
   - Role management (DecentHats)
   - Multisig integration (GnosisSafe)

3. Set up local blockchain:
   - Anvil for development
   - Contract deployment scripts
   - Test accounts and initial state

### Phase 2: Smart Contract Integration
1. **Adapt Contracts for Conservation DAOs**
   - Create ZooDAOFactory.sol (spawn new conservation DAOs)
   - Implement ConservationTreasury.sol (multisig with spending rules)
   - Add ImpactReporting.sol (on-chain impact metrics)
   - Create DonationReceipt.sol (501(c)(3) compliance)

2. **Deploy Strategy**
   - Local deployment for testing
   - Lux Network deployment for production
   - Multi-chain support (Ethereum, Optimism, Base)

3. **Configuration**
   - Each DAO gets unique token contract
   - Treasury multisig per DAO
   - Voting parameters per DAO type

### Phase 3: Frontend Integration
1. **Replace Mock Data**
   - Connect OnChainMetrics to real contracts
   - Query treasury balances from blockchain
   - Fetch proposals from Azorius
   - Display voting status

2. **Add Governance UI**
   - Proposal creation page
   - Voting interface
   - Treasury transaction approval
   - Role management dashboard

3. **Wallet Integration**
   - Keep RainbowKit (better UX than Web3Modal)
   - Add signature requests for proposals
   - Integrate with Gnosis Safe for multisig

### Phase 4: Backend Services
1. **Indexer Service**
   - Listen to blockchain events
   - Index proposals, votes, transactions
   - Store in PostgreSQL
   - Provide REST/GraphQL API

2. **Metadata Service**
   - Store large proposal content in IPFS
   - Cache frequently accessed data in Redis
   - Serve through API

3. **Notification Service**
   - Email notifications for proposal events
   - Discord webhooks for DAO activity
   - Real-time updates via WebSocket

### Phase 5: Onboarding Automation
1. **DAO Launcher Contract**
   - Self-service deployment from /launch page
   - Configurable parameters (voting period, quorum, etc.)
   - Automatic multisig setup
   - Initial token distribution

2. **Governance Setup**
   - Create initial roles (Admin, Member, Contributor)
   - Set voting parameters
   - Deploy treasury contract
   - Configure spending limits

3. **Integration with Zoo Foundation**
   - Parent-child DAO relationship
   - Shared infrastructure costs
   - Platform fee collection (5%)
   - Cross-DAO coordination

## Technical Decisions

### Why Keep Next.js + TailwindCSS?
- Modern App Router with better SEO
- TailwindCSS is faster and more maintainable than Chakra UI
- RainbowKit provides better wallet UX
- Easier to integrate with existing Zoo ecosystem

### What to Adapt from Lux DAO?
1. **Smart Contracts** - Core logic is chain-agnostic
2. **SDK** - Adapt for Next.js environment
3. **Contract ABIs** - Essential for interactions
4. **Test Suite** - Ensure contract correctness

### What to Build New?
1. **Conservation-specific contracts** (ImpactReporting, DonationReceipt)
2. **Next.js API routes** (replace separate API service)
3. **501(c)(3) compliance layer** (tax receipt generation)
4. **Multi-nonprofit coordination** (ZooDAO as parent)

## File Copy Strategy

### Essential Contracts (Copy to /contracts)
```bash
lux/dao/contracts/contracts/
├── deployables/
│   ├── autonomous-admin/DecentAutonomousAdmin.sol
│   ├── modules/LinearERC20Voting.sol
│   ├── modules/Azorius.sol
│   ├── strategies/
│   └── freeze-guard/
├── interfaces/ (all)
├── base/ (all base contracts)
└── utilities/ (all helpers)
```

### SDK Components (Adapt to /sdk)
```bash
lux/dao/sdk/
├── src/
│   ├── contracts/ (ABIs and typechain)
│   ├── hooks/ (wagmi hooks)
│   └── utils/ (encoding, decoding)
```

### Deployment Scripts (Adapt to /scripts)
```bash
lux/dao/contracts/scripts/
├── deploy-contracts.ts
├── verify-contracts.ts
└── local-setup.ts
```

## Configuration Files Needed

### 1. hardhat.config.ts
```typescript
import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    lux: {
      url: process.env.LUX_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
}

export default config
```

### 2. wagmi.config.ts (Zoo Fund)
```typescript
import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    hardhat({
      project: './contracts',
    }),
  ],
})
```

### 3. .env.local
```bash
# Blockchain
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_RPC_URL=http://localhost:8545

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# IPFS
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/

# API
NEXT_PUBLIC_API_URL=http://localhost:3005/api
```

## Implementation Timeline

### Week 1: Foundation ✅
- [x] Create directory structure
- [ ] Copy core smart contracts
- [ ] Set up Hardhat environment
- [ ] Configure local blockchain (Anvil)
- [ ] Deploy test contracts

### Week 2: Contract Integration
- [ ] Adapt contracts for conservation use cases
- [ ] Write deployment scripts
- [ ] Create test suite
- [ ] Deploy to testnet

### Week 3: Frontend Integration
- [ ] Connect OnChainMetrics to real data
- [ ] Build proposal creation UI
- [ ] Add voting interface
- [ ] Implement treasury dashboard

### Week 4: Backend Services
- [ ] Set up PostgreSQL indexer
- [ ] Create API routes
- [ ] Add IPFS integration
- [ ] Implement caching

### Week 5: Testing & Polish
- [ ] E2E tests
- [ ] Security audit
- [ ] Performance optimization
- [ ] Documentation

## Success Criteria

1. **Functional DAO Governance**
   - Create proposals
   - Cast votes
   - Execute approved proposals
   - Track participation

2. **Treasury Management**
   - View real-time balances
   - Submit spending proposals
   - Multisig approval workflow
   - Transaction history

3. **Self-Service Onboarding**
   - Launch new DAO from /launch page
   - Automatic smart contract deployment
   - Initial token distribution
   - Governance parameter configuration

4. **Compliance**
   - 501(c)(3) donation receipts
   - On-chain audit trail
   - Impact reporting
   - Tax documentation

5. **Performance**
   - < 2s page load times
   - Real-time blockchain data
   - Optimistic UI updates
   - Efficient caching

## Risk Mitigation

1. **Smart Contract Security**
   - Use audited Lux DAO contracts as base
   - Minimal custom logic
   - Comprehensive test coverage
   - Professional audit before mainnet

2. **Data Consistency**
   - Blockchain as source of truth
   - Indexer reconciliation
   - Graceful degradation
   - Fallback to RPC queries

3. **User Experience**
   - Progressive enhancement
   - Clear error messages
   - Loading states
   - Offline capabilities

4. **Scalability**
   - Efficient indexing
   - Strategic caching
   - CDN for static assets
   - Database optimization

## Next Steps (Immediate)

1. Copy core smart contracts to `/contracts`
2. Set up Hardhat configuration
3. Create deployment script for local testing
4. Deploy test contracts to Anvil
5. Update OnChainMetrics to query real data
6. Test wallet connection with deployed contracts

---

**Status**: Phase 1 In Progress (Directory structure created)
**Last Updated**: 2025-10-30
**Owner**: Zoo Labs Foundation

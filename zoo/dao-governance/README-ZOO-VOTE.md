# 🦁 Zoo.vote - DAO Governance & ZK Staking Platform

## Overview

Zoo.vote is the official DAO governance and staking platform for the Zoo Network. It enables users to:

- **Stake ZOO + KEEPER tokens** to receive ZK governance tokens
- **Create and vote on proposals** with weighted voting power
- **Track staking positions** with unlock times and rewards
- **View leaderboards** and voting power rankings
- **Manage DAO treasury** and protocol parameters

## Key Features

### ZK Staking Dashboard

The platform introduces a revolutionary staking mechanism:

```
ZOO + KEEPER → ZK (Governance Token)
```

**Staking Formula:**
- Base ZK Amount = ZOO Amount + KEEPER Amount
- Lock Bonus = 10% per 30 days locked
- Final ZK = Base Amount × (1 + Lock Bonus)

### Smart Contract Integration

The platform integrates with deployed contracts on localhost:8545:

| Contract | Address | Purpose |
|----------|---------|---------|
| ZOO Token | `0x4EE6eCAD1c2Dae9f525404De8555724e3c35d07B` | Ecosystem token |
| KEEPER Token | `0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25` | Utility token |
| ZK Staking | `0xD84379CEae14AA33C123Af12424A37803F885889` | Staking contract |
| Governor | `0xfbC22278A96299D91d41C453234d97b4F5Eb9B2d` | DAO governance |
| Timelock | `0x2B0d36FACD61B71CC05ab8F3D2355ec3631C0dd5` | Proposal execution |

## Installation

### Prerequisites

- Node.js v20+ (v24 recommended)
- pnpm package manager
- Local blockchain running on port 8545

### Quick Start

```bash
# Navigate to the project
cd /Users/z/work/zoo/zoo/dao-governance

# Install with pnpm
cd app
pnpm install

# Start the development server (port 3004)
pnpm run dev
```

Or use the convenience script:

```bash
# From dao-governance directory
./start-zoo-vote.sh
```

## Development Setup

### 1. Start Local Blockchain

```bash
cd /Users/z/work/zoo/zoo/contracts
npx hardhat node
```

### 2. Deploy Contracts (if needed)

```bash
cd /Users/z/work/zoo/zoo/contracts
npx hardhat run scripts/deploy-zk-governance.js --network localhost
```

### 3. Start Zoo.vote

```bash
cd /Users/z/work/zoo/zoo/dao-governance/app
pnpm run dev
```

The app will be available at: **http://localhost:3004**

## Architecture

### Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Chakra UI
- **Web3**: wagmi + viem
- **Wallet Connection**: RainbowKit
- **State Management**: Zustand + React Query
- **Build Tool**: Vite
- **Package Manager**: pnpm

### Project Structure

```
dao-governance/
├── app/                          # Main application
│   ├── src/
│   │   ├── components/
│   │   │   └── DaoStaking/      # Staking components
│   │   │       └── ZKStakingDashboard.tsx  # Main dashboard
│   │   ├── pages/               # Route pages
│   │   ├── hooks/               # Custom hooks
│   │   └── providers/           # Context providers
│   ├── package.json             # Dependencies
│   └── vite.config.mts         # Vite configuration
├── contracts/                   # Smart contracts
│   └── deployments/            # Deployment artifacts
│       └── localhost-zk-governance.json
└── start-zoo-vote.sh           # Launch script
```

## Features in Detail

### 1. Staking Interface

- **Input Fields**: Enter ZOO and KEEPER amounts
- **Lock Duration Slider**: 1-365 days with 10% bonus per 30 days
- **Real-time Calculation**: Shows ZK tokens to receive
- **Approval Flow**: Automatic token approval before staking

### 2. Active Stakes View

- **Position Tracking**: View all active stakes
- **Unlock Countdown**: Time remaining until unlock
- **Status Indicators**: Locked/Unlocked badges
- **One-click Unstaking**: When lock period expires

### 3. Voting Power Dashboard

- **Balance Display**: ZOO, KEEPER, and ZK balances
- **Power Metrics**: Your voting power percentage
- **Rank Display**: Position in the DAO hierarchy
- **Leaderboard**: Top stakers by voting power

### 4. Governance Integration

- **Proposal Creation**: Submit governance proposals
- **Voting Interface**: Cast votes with ZK tokens
- **Execution Queue**: Timelock-protected execution
- **Treasury Management**: Control protocol funds

## Testing

### Run Test Script

```bash
cd app
node test-staking.js
```

This will verify:
- Blockchain connection
- Contract deployments
- Network configuration
- Staking parameters

### Manual Testing

1. Connect MetaMask to localhost:8545
2. Import test accounts from Hardhat
3. Navigate to http://localhost:3004
4. Test staking flow:
   - Enter ZOO and KEEPER amounts
   - Adjust lock duration
   - Approve and stake tokens
   - View active positions
   - Check voting power

## Configuration

### Environment Variables

Create `.env.local` in the app directory:

```env
VITE_APP_NAME=Zoo.vote
VITE_APP_SITE_URL=http://localhost:3004
VITE_APP_CHAIN_ID=31337
VITE_APP_ALCHEMY_API_KEY=your_key
VITE_APP_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### Network Configuration

The app auto-detects localhost blockchain at port 8545.
Contract addresses are loaded from:
```
contracts/deployments/localhost-zk-governance.json
```

## Troubleshooting

### Port Already in Use

If port 3004 is busy, the app will use 3005. Check with:

```bash
lsof -ti:3004
# Kill if needed
kill <PID>
```

### Blockchain Not Found

Ensure Hardhat node is running:

```bash
cd /Users/z/work/zoo/zoo/contracts
npx hardhat node
```

### Contract Not Deployed

Deploy the governance contracts:

```bash
cd /Users/z/work/zoo/zoo/contracts
npx hardhat run scripts/deploy-zk-governance.js --network localhost
```

### Build Errors

Clear cache and reinstall:

```bash
rm -rf node_modules .pnpm-store
pnpm install
```

## Security Considerations

- **Audit Status**: Contracts pending audit
- **Test Network**: Use only on testnet/localhost
- **Private Keys**: Never commit private keys
- **Token Approvals**: Review before approving

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## License

MIT License - See LICENSE file

## Support

- **Discord**: [Zoo Network Community]
- **Documentation**: [docs.zoo.network]
- **Issues**: GitHub Issues

---

**Zoo.vote** - Empowering decentralized governance through innovative staking mechanics.

Built with 🦁 by the Zoo Network Team
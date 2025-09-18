# Zoo Universe - Web3 Gaming & NFT Infrastructure

Private production repository for Zoo Labs gaming ecosystem, NFT marketplace, and blockchain infrastructure.

## Repository Structure

```
zoo-labs/zoo/
├── apps/               # Gaming applications
│   ├── zoo-app/        # Main Zoo mobile/web app
│   ├── marketplace/    # NFT marketplace
│   ├── breeding/       # Breeding mechanics app
│   └── battles/        # Battle system app
├── services/           # Microservices
│   ├── zoo-node/       # Core blockchain node
│   ├── zips/           # Zoo Improvement Proposals Service
│   ├── hips/           # Habitat Improvement Proposals Service
│   └── lips/           # Loot Improvement Proposals Service
├── contracts/          # Smart contracts
│   ├── nft/            # NFT contracts (ERC-721, ERC-1155)
│   ├── tokens/         # Token contracts (ZOO, BAMBOO)
│   ├── defi/           # DeFi mechanics (staking, farming)
│   └── governance/     # DAO governance contracts
├── infrastructure/     # Infrastructure as Code
│   ├── kubernetes/     # K8s deployments
│   ├── ipfs/          # IPFS nodes configuration
│   └── subgraph/      # The Graph protocol indexers
├── game-assets/        # Game assets and metadata
│   ├── animals/        # Animal NFT metadata
│   ├── habitats/       # Habitat assets
│   └── items/          # In-game items
└── analytics/          # Analytics and monitoring
    ├── on-chain/       # On-chain analytics
    └── game-metrics/   # Game performance metrics
```

## Core Components

### Zoo App
Main gaming application with:
- NFT collection and management
- Breeding mechanics
- Battle system
- Marketplace integration
- Wallet connectivity (MetaMask, WalletConnect)

### Zoo Node
Blockchain infrastructure node:
- Custom EVM-compatible chain
- High-throughput for gaming transactions
- Low gas fees for gameplay
- Bridge to Ethereum mainnet

### Improvement Proposal Services

#### ZIPS (Zoo Improvement Proposals)
- Core protocol upgrades
- Governance proposals
- Economic model changes
- Technical standards

#### HIPS (Habitat Improvement Proposals)
- Habitat mechanics updates
- Environmental systems
- Resource generation rules
- Habitat NFT standards

#### LIPS (Loot Improvement Proposals)
- Item system updates
- Loot box mechanics
- Rarity algorithms
- Item NFT standards

## Technology Stack

### Blockchain
- **Networks**: Ethereum, Polygon, Arbitrum, Zoo Chain
- **Standards**: ERC-721, ERC-1155, ERC-20
- **Tools**: Hardhat, Foundry, OpenZeppelin
- **Indexing**: The Graph, Alchemy

### Backend
- **Runtime**: Node.js 20+
- **Framework**: NestJS
- **Database**: PostgreSQL, Redis
- **Queue**: BullMQ
- **Storage**: IPFS, Arweave

### Frontend
- **Framework**: Next.js 14
- **UI**: React 18, TailwindCSS
- **Web3**: ethers.js, wagmi, viem
- **State**: Zustand, React Query

### Gaming
- **Engine**: Phaser.js / Unity WebGL
- **Physics**: Matter.js
- **Animation**: Lottie, Rive
- **Audio**: Howler.js

## Development Setup

```bash
# Clone the repository
git clone git@github.com:zoo-labs/zoo.git
cd zoo

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Configure blockchain RPC endpoints and API keys

# Start local blockchain
pnpm run chain:local

# Deploy contracts
pnpm run contracts:deploy:local

# Start services
pnpm run dev

# Start Zoo Node
cd services/zoo-node
docker compose up -d
```

## Smart Contract Deployment

```bash
# Deploy to testnet
pnpm run deploy:goerli

# Deploy to mainnet (requires approval)
pnpm run deploy:mainnet

# Verify contracts
pnpm run verify:etherscan
```

## Zoo Node Operations

```bash
# Start validator node
./zoo-node --validator --stake 100000

# Run archive node
./zoo-node --archive --rpc-external

# Bridge assets
./scripts/bridge.sh --from ethereum --to zoo --amount 1000
```

## NFT Collections

### Genesis Animals
- Total Supply: 10,000
- Traits: 150+ unique traits
- Breeding: Enabled after 30 days
- Staking: 100 ZOO/day base rate

### Habitats
- Total Supply: 5,000
- Types: Jungle, Arctic, Desert, Ocean, Sky
- Capacity: 5-50 animals per habitat
- Resources: Generate BAMBOO tokens

### Items
- Dynamic supply based on gameplay
- Rarity: Common, Rare, Epic, Legendary, Mythic
- Uses: Consumable, Equipment, Breeding
- Trading: P2P marketplace enabled

## Tokenomics

### ZOO Token
- **Supply**: 1,000,000,000
- **Distribution**:
  - 30% - Play to Earn rewards
  - 20% - Staking rewards
  - 20% - Team & Advisors (4-year vest)
  - 15% - Ecosystem fund
  - 10% - Initial liquidity
  - 5% - Marketing

### BAMBOO Token
- **Supply**: Unlimited (inflation controlled)
- **Generation**: From habitats and staking
- **Uses**: Breeding, items, upgrades
- **Burn**: 50% of usage burned

## API Endpoints

### Public API
```
https://api.zoo.game/v1/
├── /animals           # Animal metadata
├── /habitats         # Habitat information
├── /marketplace      # Marketplace listings
├── /leaderboard      # Game rankings
└── /proposals        # ZIPS/HIPS/LIPS
```

### WebSocket Events
```
wss://ws.zoo.game/
├── battles          # Real-time battles
├── marketplace      # Live marketplace updates
├── breeding         # Breeding events
└── governance       # Proposal updates
```

## Security

- **Audits**: Certik, Trail of Bits
- **Bug Bounty**: Up to $100,000
- **Multi-sig**: 4/7 for treasury
- **Timelock**: 48-hour delay for upgrades

## Performance Targets

- **TPS**: 10,000+ transactions per second
- **Block Time**: 2 seconds
- **Gas Cost**: <$0.01 per transaction
- **Uptime**: 99.99% SLA

## Monitoring

- **Grafana**: https://monitoring.zoo.game
- **Status**: https://status.zoo.game
- **Analytics**: https://analytics.zoo.game
- **Explorer**: https://explorer.zoo.game

## License

Proprietary - Zoo Labs, Inc. All rights reserved.
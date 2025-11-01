# Zoo Fund - AI Assistant Knowledge Base

**Last Updated**: 2025-10-31
**Project**: zoo/fund
**Organization**: Zoo Network
**Status**: ✅ Active - Part of unified Zoo ecosystem

## Project Overview

**Zoo Fund** (zoo.fund) is the fundraising and discovery portal for conservation DAOs within the Zoo Network ecosystem. It enables users to discover, support, and participate in conservation initiatives through decentralized fundraising.

### Key Features
- Conservation DAO discovery and browsing
- Project fundraising interface
- Integration with zoo.vote for DAO governance
- Simplified navigation (Logo, Search, Menu, Connect Wallet)
- RainbowKit wallet connection
- Token integration (ZOO, KEEPER, ZK)

## Essential Commands

### Development
```bash
# Recommended: Use Makefile from monorepo root
cd /Users/z/work/zoo/zoo
make dev          # Start entire ecosystem (blockchain + all apps)
make dev-fund     # Start only fund app
make wallet       # Get test wallet info (10,000 ETH funded)

# Alternative: Direct app start
cd /Users/z/work/zoo/zoo/fund
pnpm install
pnpm dev

# Alternative: Shell script
cd /Users/z/work/zoo/zoo
./dev-all.sh  # Starts entire ecosystem including fund
```

### Build & Deploy
```bash
pnpm build          # Production build
pnpm start          # Start production server
pnpm lint           # Run linter
pnpm type-check     # TypeScript type checking
```

## Architecture

### Ecosystem Integration

Zoo Fund is part of the unified Zoo Network monorepo:

```
zoo/
├── app/                    # zoolabs.io (port 3000) - AI Research
├── foundation/             # zoo.ngo (port 3002) - 501(c)(3) Foundation
├── network/                # zoo.network (port 3003) - Blockchain Explorer
├── dao-governance/app/     # zoo.vote (port 3004) - DAO Governance
├── fund/                   # zoo.fund (port 3005) - THIS PROJECT
├── computer/               # zoo.computer (port 3007) - AI Hardware
├── exchange/               # zoo.exchange (port 3008) - DEX
├── contracts/              # Smart contracts (Hardhat)
└── ui/                     # @zoo/ui shared components
```

### Technology Stack

**Frontend**:
- Next.js 15.0.3 (App Router)
- React 18.3.1
- TypeScript 5.7.2
- TailwindCSS 3.4.16

**Web3**:
- RainbowKit 2.2.0 (wallet connection)
- wagmi 2.13.0 (Ethereum hooks)
- viem 2.21.45 (Ethereum library)
- ethers 6.13.4 (contract interaction)

**UI Components**:
- Radix UI (accessible primitives)
- Lucide React (icons)
- Framer Motion 11.11.17 (animations)
- next-themes 0.4.4 (dark mode)

**Development**:
- Playwright 1.49.0 (E2E testing)
- ESLint (linting)
- PostCSS + Autoprefixer

### Key Directories

```
fund/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Web3 providers
├── components/            # React components
│   ├── header.tsx         # Simplified header (Logo, Search, Menu, Connect)
│   ├── footer.tsx         # Unified footer with ecosystem links
│   └── ui/                # Radix UI components
├── lib/                   # Utilities
│   └── utils.ts           # Helper functions
├── public/                # Static assets
│   └── logos/             # Zoo logos
├── styles/               # CSS files
│   └── globals.css        # Global styles + Tailwind
├── tests/                # Playwright tests
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Token Integration

### Three-Token System

1. **ZOO Token** (1B supply)
   - Base governance token
   - Paired 1:1 with KEEPER for staking

2. **KEEPER Token** (1B supply)
   - Governance enabler
   - Required alongside ZOO for staking

3. **ZK Token** (deflationary)
   - Voting power token
   - Minted when staking ZOO+KEEPER
   - Burned when unstaking
   - Time bonus: 1x to 10x (0 to 10 years)

### Staking Formula

```
ZK Amount = (ZOO + KEEPER) × Time Bonus
```

| Lock Duration | Multiplier |
|---------------|------------|
| 0 days        | 1.0x       |
| 1 year        | 1.9x       |
| 2 years       | 2.8x       |
| 5 years       | 5.5x       |
| 10 years      | 10.0x      |

**Note**: ZK supply is deflationary - tokens are burned on unstake, supply decreases over time.

## Development Workflow

### Starting the Ecosystem

1. **Option 1: Entire Ecosystem**
   ```bash
   cd /Users/z/work/zoo/zoo
   ./dev-all.sh
   ```
   This starts:
   - Blockchain (localhost:8545)
   - Deploys ZK governance contracts
   - All 7 web apps in parallel

2. **Option 2: Fund App Only**
   ```bash
   cd /Users/z/work/zoo/zoo/fund
   pnpm dev
   ```
   Runs on http://localhost:3005

### Testing User Flows

**Conservation DAO Discovery Flow**:
1. Visit http://localhost:3005
2. Browse available conservation DAOs
3. Click "Connect Wallet" (RainbowKit)
4. View DAO details and funding progress
5. Navigate to zoo.vote for governance participation

**Cross-App Navigation**:
- Header links to other Zoo properties
- Footer provides ecosystem-wide navigation
- Shared wallet connection state
- Unified design language

### Header Simplification (Applied)

Per user requirements, the header now has minimal surface area:
- **Logo** (left): Links to homepage
- **Search** (center): cmd+k trigger for quick navigation
- **Menu** (right): Mobile/hamburger menu
- **Connect Wallet** (right): RainbowKit button

Desktop navigation is moved to:
- Search command palette (cmd+k)
- Mobile menu
- Footer links

## Smart Contract Integration

### Deployed Contracts (Localhost)

```json
{
  "network": "localhost",
  "chainId": 31337,
  "contracts": {
    "ZOO": "0x4EE6eCAD1c2Dae9f525404De8555724e3c35d07B",
    "KEEPER": "0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25",
    "ZKStaking": "0xD84379CEae14AA33C123Af12424A37803F885889",
    "Timelock": "0x2B0d36FACD61B71CC05ab8F3D2355ec3631C0dd5",
    "Governor": "0xfbC22278A96299D91d41C453234d97b4F5Eb9B2d"
  }
}
```

### Contract Interaction

Fund app interacts with:
- **ZKStaking**: For displaying user voting power
- **ZooGovernor**: For proposal creation/voting
- **ZOO/KEEPER**: For token balances and transfers

## User Flows

### Primary Flow: Discover & Fund Conservation DAOs

1. **Discovery**:
   - User lands on zoo.fund homepage
   - Browses featured conservation DAOs
   - Filters by category, funding goal, etc.

2. **Connection**:
   - Clicks "Connect Wallet"
   - Selects wallet (MetaMask, WalletConnect, etc.)
   - RainbowKit handles connection

3. **Participation**:
   - Views DAO details and funding progress
   - Can contribute directly to DAO
   - Link to zoo.vote for governance participation

4. **Governance** (via zoo.vote):
   - Stakes ZOO + KEEPER → receives ZK
   - Uses ZK to vote on proposals
   - Participates in DAO decision-making

### Secondary Flows

**Learning About Zoo**:
- Footer link to zoo.ngo (foundation)
- Footer link to zoolabs.io (AI research)
- Footer link to zoo.network (blockchain explorer)

**Buying AI Hardware**:
- Footer link to zoo.computer (NVIDIA DGX Sparks)

**Trading Tokens**:
- Footer link to zoo.exchange (DEX)

## Key Technologies

### Web3 Stack
- **wagmi**: React hooks for Ethereum
- **viem**: TypeScript Ethereum library
- **RainbowKit**: Wallet connection UI
- **ethers**: Contract interaction

### UI/UX
- **Next.js 15**: App Router, server components
- **Radix UI**: Accessible components
- **TailwindCSS**: Utility-first CSS
- **Framer Motion**: Animations

### Testing
- **Playwright**: E2E testing
- **TypeScript**: Type safety

## Related Documentation

- **STAKING.md** - Complete ZK staking system documentation
- **ZOO_ECOSYSTEM_ARCHITECTURE.md** - Full ecosystem architecture
- **ECOSYSTEM_STATUS.md** - Current deployment status
- **ZIP-004** - Unified ecosystem specification

## Context for All AI Assistants

This file (`LLM.md`) is symlinked as:
- `.AGENTS.md`
- `CLAUDE.md`
- `QWEN.md`
- `GEMINI.md`

All files reference the same knowledge base. Updates here propagate to all AI systems.

## Rules for AI Assistants

1. **ALWAYS** update LLM.md with significant discoveries
2. **NEVER** commit symlinked files (.AGENTS.md, CLAUDE.md, etc.) - they're in .gitignore
3. **NEVER** create random summary files - update THIS file
4. **Zoo Fund is part of unified ecosystem** - changes should consider cross-app compatibility
5. **Use pnpm** - NOT npm or yarn (per project standards)
6. **Test-driven development** - show passing tests, not just "done"
7. **Header is simplified** - Logo, Search, Menu, Connect only

## Recent Changes

### 2025-10-31: Ecosystem Unification & Makefile Improvements
- ✅ Migrated to pnpm from npm
- ✅ Updated dependencies to latest versions
- ✅ Simplified header per user requirements
- ✅ Integrated with unified dev-all.sh script
- ✅ Added to monorepo documentation
- ✅ Cross-linked with other Zoo properties
- ✅ Fixed Makefile status check (now uses curl instead of lsof)
- ✅ All 6 web apps confirmed working with `make dev`

### Token Economics Corrections
- ✅ Fixed time bonus: 1x to 10x (not 3x)
- ✅ Removed ZK minting as rewards (deflationary economics)
- ✅ ZK now only burned on unstake

---

**Note**: This file serves as the single source of truth for all AI assistants working on zoo.fund.

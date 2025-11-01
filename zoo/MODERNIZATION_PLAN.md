# Zoo Apps Modernization Plan

## Goal
Standardize all Zoo apps to use consistent, modern patterns that integrate seamlessly with @hanzo/ui and work well together.

## Target Architecture

### Technology Stack (Standardized)

```
┌─────────────────────────────────────────┐
│         @hanzo/ui (source of truth)      │
│  React 19 + TailwindCSS 4 + Radix UI    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│              @zoo/ui                     │
│  Zoo-specific components extending       │
│  @hanzo/ui with Zoo branding             │
└─────────────────────────────────────────┘
                    ↓
┌──────────────────┬──────────────────────┐
│   Next.js Apps   │   Vite Apps          │
│  (most apps)     │   (computer only)    │
└──────────────────┴──────────────────────┘
```

### Standard Dependencies (All Apps)

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@zoo/ui": "workspace:*",
    "@rainbow-me/rainbowkit": "^2.2.0",
    "wagmi": "^2.13.0",
    "viem": "^2.21.0",
    "tailwindcss": "^4.1.16",
    "@radix-ui/react-*": "latest"
  },
  "devDependencies": {
    "typescript": "^5.7.2"
  }
}
```

## App-by-App Modernization

### ✅ Already Modern (Keep As-Is)

1. **zoo.fund** (3005)
   - Next.js 15.0.3
   - React 18 (can upgrade to 19)
   - TailwindCSS 3 (can upgrade to 4)
   - RainbowKit 2.2.0
   - **Status**: Minor updates needed

2. **zoo.computer** (3007)
   - Vite 6.2.0
   - React 19.2.0
   - TailwindCSS 4.1.16
   - **Status**: Perfect, use as Vite template

3. **zoo.network** (3003)
   - Next.js 15
   - Modern setup
   - **Status**: Good

### ⚠️ Needs Modernization

#### zoo.vote (3004) - High Priority

**Current Issues:**
- Old Vite setup with complex Cloudflare Workers integration
- Mixed dependencies (@luxdao/contracts)
- SES lockdown conflicts
- Node.js version requirement (wants 24, have 20)

**Modernization Strategy:**

**Option A: Convert to Next.js 15** (Recommended)
- Easier to maintain consistency
- Better SSR for SEO
- Simpler deployment
- Matches other apps

**Option B: Modernize Vite Setup**
- Keep Vite but clean up
- Remove Cloudflare Workers complexity
- Simplify to match zoo.computer

**Recommended: Option A**

#### zoo.exchange (3008) - Not Started

**Strategy**: Use zoo.computer as template (Vite 6 + React 19)

## Implementation Plan

### Phase 1: Upgrade @zoo/ui (Foundation)

```bash
cd /Users/z/work/zoo/zoo/ui

# Upgrade to match @hanzo/ui
pnpm add react@^19.2.0 react-dom@^19.2.0
pnpm add tailwindcss@^4.1.16
pnpm add @radix-ui/react-*@latest
```

**Create zoo-specific theme:**

```typescript
// ui/src/theme/zoo-theme.ts
export const zooTheme = {
  colors: {
    primary: '#667eea',    // Zoo purple
    secondary: '#764ba2',  // Zoo gradient
    background: '#000000', // Dark
    foreground: '#ffffff', // Light
  },
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
}
```

### Phase 2: Standardize Next.js Apps

**Template package.json:**

```json
{
  "name": "@zoo/[app-name]",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p [PORT]",
    "build": "next build",
    "start": "next start -p [PORT]",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.0.3",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@zoo/ui": "workspace:*",
    "@rainbow-me/rainbowkit": "^2.2.0",
    "@tanstack/react-query": "^5.61.1",
    "wagmi": "^2.13.0",
    "viem": "^2.21.0",
    "ethers": "^6.13.4",
    "framer-motion": "^11.11.17",
    "lucide-react": "^0.456.0",
    "next-themes": "^0.4.4"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "eslint-config-next": "15.0.3",
    "postcss": "^8.4.49",
    "tailwindcss": "^4.1.16",
    "typescript": "^5.7.2"
  }
}
```

**Standard next.config.js:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@zoo/ui'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
}

module.exports = nextConfig
```

**Standard tailwind.config.js:**

```javascript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../ui/src/**/*.{js,ts,jsx,tsx}', // Include @zoo/ui
  ],
  theme: {
    extend: {
      colors: {
        zoo: {
          purple: '#667eea',
          gradient: '#764ba2',
        },
      },
    },
  },
  plugins: [],
}

export default config
```

### Phase 3: Convert zoo.vote to Next.js 15

**Step-by-step:**

1. **Create new Next.js 15 app structure**
```bash
cd /Users/z/work/zoo/zoo
mkdir dao-governance/app-next
cd dao-governance/app-next
pnpm create next-app@latest . --typescript --tailwind --app --no-src-dir
```

2. **Copy components from old app**
```bash
# Copy and adapt components
cp -r ../app/components ./app/components
cp -r ../app/lib ./lib
cp -r ../app/hooks ./hooks
```

3. **Migrate contract interactions**
```typescript
// app/providers.tsx
'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { hardhat } from 'wagmi/chains'

const config = getDefaultConfig({
  appName: 'Zoo Vote',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [hardhat],
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

4. **Create staking page**
```typescript
// app/stake/page.tsx
'use client'

import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { ZKStakingABI } from '@/lib/abis'

export default function StakePage() {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  const stake = async (amount: bigint, lockDuration: number) => {
    await writeContract({
      address: ZK_STAKING_ADDRESS,
      abi: ZKStakingABI,
      functionName: 'stake',
      args: [amount, lockDuration],
    })
  }

  return (
    <div>
      {/* Staking UI */}
    </div>
  )
}
```

5. **Update Makefile**
```makefile
_start-app-vote: ## Internal: Start vote app (Next.js version)
	@echo "  $(BLUE)→$(NC) Starting $(NAME) on port $(PORT)"
	@mkdir -p logs
	@cd dao-governance/app-next && pnpm dev > ../../logs/$(LOG).log 2>&1 &
```

### Phase 4: Build zoo.exchange

**Use zoo.computer as template:**

```bash
cd /Users/z/work/zoo/zoo
cp -r computer exchange
cd exchange

# Update package.json
sed -i '' 's/@zoo\/computer/@zoo\/exchange/g' package.json
sed -i '' 's/3007/3008/g' package.json

# Install dependencies
pnpm install
```

**Add DEX-specific components:**

```typescript
// src/components/SwapInterface.tsx
import { useState } from 'react'
import { useSwapQuote } from '@/hooks/useSwapQuote'

export function SwapInterface() {
  const [fromToken, setFromToken] = useState('ZOO')
  const [toToken, setToToken] = useState('KEEPER')
  const [amount, setAmount] = useState('0')

  const quote = useSwapQuote(fromToken, toToken, amount)

  return (
    <div className="p-6 bg-black border border-zoo-purple rounded-lg">
      {/* Swap UI */}
    </div>
  )
}
```

## Execution Timeline

### Week 1: Foundation
- [ ] Upgrade @zoo/ui to match @hanzo/ui
- [ ] Create standard templates
- [ ] Document patterns

### Week 2: Modernize zoo.vote
- [ ] Set up Next.js 15 structure
- [ ] Migrate staking components
- [ ] Migrate governance components
- [ ] Test end-to-end
- [ ] Deploy to port 3004

### Week 3: Build zoo.exchange
- [ ] Copy zoo.computer template
- [ ] Build swap interface
- [ ] Add liquidity pools
- [ ] Add analytics
- [ ] Test with ZOO/KEEPER pairs

### Week 4: Integration & Testing
- [ ] Test all apps together
- [ ] Verify wallet connection works across all
- [ ] Test contract interactions
- [ ] Update documentation
- [ ] Final QA

## Quick Win: Immediate Fixes

While planning the full modernization, we can do these quick fixes now:

### 1. Fix zoo.vote Immediately

```bash
# Just disable the problematic imports
cd /Users/z/work/zoo/zoo/dao-governance/app

# Remove SES lockdown (causing conflicts)
rm -f public/lockdown-install.js

# Update vite.config.ts to exclude problematic deps
```

### 2. Update All Apps to Use @zoo/ui

```bash
# For each Next.js app:
pnpm add @zoo/ui@workspace:*

# Then import components:
import { Header, Footer } from '@zoo/ui'
```

### 3. Standardize Environment Variables

Create `.env.template` in root:

```env
# Blockchain
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545

# Contracts
NEXT_PUBLIC_ZOO_ADDRESS=0x...
NEXT_PUBLIC_KEEPER_ADDRESS=0x...
NEXT_PUBLIC_ZK_STAKING_ADDRESS=0x...

# Services
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key
```

## Maintenance Going Forward

### File Structure Standard

```
app-name/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Homepage
│   ├── stake/          # Feature pages
│   └── providers.tsx   # Web3 providers
├── components/         # React components
│   ├── ui/            # UI primitives
│   └── features/      # Feature components
├── lib/               # Utilities
│   ├── abis/         # Contract ABIs
│   ├── contracts.ts  # Contract addresses
│   └── utils.ts      # Helper functions
├── hooks/             # Custom React hooks
├── public/            # Static assets
├── styles/            # Global styles
├── next.config.js    # Next.js config
├── tailwind.config.js # Tailwind config
├── tsconfig.json     # TypeScript config
└── package.json      # Dependencies
```

### Component Pattern

```typescript
// components/features/StakeCard.tsx
'use client'

import { Button } from '@zoo/ui'
import { useStake } from '@/hooks/useStake'

interface StakeCardProps {
  amount: string
  lockDuration: number
}

export function StakeCard({ amount, lockDuration }: StakeCardProps) {
  const { stake, isLoading } = useStake()

  return (
    <div className="p-6 bg-black border border-zoo-purple">
      <Button onClick={() => stake(amount, lockDuration)} loading={isLoading}>
        Stake
      </Button>
    </div>
  )
}
```

## Benefits of This Approach

1. **Consistency**: All apps use same patterns
2. **Maintainability**: Easy to update one app based on others
3. **Reusability**: Share components via @zoo/ui
4. **Modern**: Latest React 19, Next.js 15, TailwindCSS 4
5. **Type Safety**: Full TypeScript throughout
6. **Performance**: Optimized builds with Next.js/Vite
7. **Developer Experience**: Hot reload, fast builds

## Migration Script

Create `scripts/modernize-app.sh`:

```bash
#!/bin/bash
# Modernize a Zoo app to latest standards

APP_NAME=$1
PORT=$2

echo "Modernizing $APP_NAME..."

cd "$APP_NAME"

# Upgrade dependencies
pnpm add next@15.0.3 react@^19.2.0 react-dom@^19.2.0
pnpm add tailwindcss@^4.1.16 @zoo/ui@workspace:*
pnpm add typescript@^5.7.2 -D

# Copy standard configs
cp ../templates/next.config.js ./
cp ../templates/tailwind.config.js ./
cp ../templates/tsconfig.json ./

# Update package.json port
sed -i '' "s/dev\":.*/dev\": \"next dev -p $PORT\"/g" package.json

echo "✓ $APP_NAME modernized!"
```

## Next Steps

Would you like me to:
1. **Start with zoo.vote modernization** (convert to Next.js 15)?
2. **Build zoo.exchange** from zoo.computer template?
3. **Upgrade @zoo/ui** to match @hanzo/ui?
4. **Create the standard templates** first?

Let me know which approach you prefer!

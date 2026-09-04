# Zoo Network Explorer

A blockchain explorer for the Zoo Network (chain **200200**), reading the live
C-Chain over JSON-RPC.

## Every figure is a measurement

The rule this app is built around: **a number that was not read from the chain
must not appear.** Not as a placeholder, not as a fallback, not as a
plausible-looking constant.

It is enforced by the type, not by review. `lib/measure.ts` defines a `Measure`,
which braids a value together with what is known about it — one of `pending`,
`live`, `stale`, `idle`, `empty`, `unknown` or `unavailable`. The three absence
constructors take **no value argument at all**, so there is nowhere to put a
fallback, and `<Stat>` accepts a `Measure` rather than a string or a number. A
figure whose read failed therefore has nothing to render but the word for why.

Every `Measure` also carries a required `source` — the RPC method it came from —
so "where did this number come from" is always answerable on the page itself.

### What is measured

| Figure | Source |
| --- | --- |
| Block height | `eth_getBlockByNumber('latest')`, controlled by `eth_blockNumber` |
| Last block age | head block `timestamp` |
| Block interval | mean over the timestamps of the last 10 blocks |
| Txns in last block | head block `transactions.length` |
| Gas price | `eth_gasPrice` |
| Gas used | head block `gasUsed ÷ gasLimit` |
| Chain ID | `eth_chainId` |
| Validators | `platform.getCurrentValidators` (P-Chain) |
| Block list / tx list | the last 10 blocks, one batched request |

### What is NOT measured, and why

Rendered on the page as an explicit "not shown, and why" note, each with a
control that proves the field is unserved rather than zero — see `UNSERVED` in
`lib/measure.ts`.

- **Total transactions** and **account count** need an indexer. None is
  deployed; `https://explore.zoo.network/api/v2/stats` returns HTTP 404.
- **ZOO price** needs an oracle or market feed. Neither exists for this network,
  so no price is shown at all.

### Degraded states

The chain not producing blocks is a normal condition and is rendered as one. A
head outside its freshness budget can never grade `live`: `grade()` in
`lib/chain.ts` returns `idle` when the node is caught up, and `degraded` when it
is behind (`eth_syncing`) or when `eth_blockNumber` runs ahead of the head that
can actually be served — blocks built but not finalized. An unreachable endpoint
yields `unavailable` for every figure, never a last-known number.

## Other features

- **Block explorer**: browse blocks with miner, gas usage and transaction count
- **Transaction list**: real hashes, addresses and ZOO values from recent blocks
- **Dark/light theme**
- **Wallet integration** via RainbowKit
- **Responsive design**

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **RainbowKit**: Wallet connection interface
- **Wagmi & Viem**: Ethereum interaction libraries
- **Framer Motion**: Animation library
- **Recharts**: Data visualization

## Installation

```bash
# Install dependencies with pnpm
pnpm install

# Run development server on port 3003
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start
```

## Configuration

### Network Configuration

Endpoints and the chain ID live in `lib/chain.ts` and are re-used by
`lib/wagmi.ts`, so the wallet and the explorer can never disagree about which
chain they are on.

The JSON-RPC path on this estate is **`/v1/chain/c`**. It is not `/v1/chain/c`
(HTTP 404) and the P-Chain is a different VM at `/v1/chain/p`.

### Environment Variables

All optional; the defaults point at Zoo mainnet.

```env
NEXT_PUBLIC_ZOO_RPC_URL=https://rpc.zoo.network/v1/chain/zoo
NEXT_PUBLIC_ZOO_P_RPC_URL=https://rpc.zoo.network/v1/chain/p
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

## Testing

```bash
pnpm test        # node --test, no test-runner dependency
pnpm type-check
```

`test/no-fabricated-stats.test.ts` is a guard: it fails if `Math.random()`, one
of the literals that previously shipped, or invented trend copy is reintroduced
into `app/`, `components/` or `lib/`, and it asserts that figures still render
through `<Stat>`/`chainFigures`. `test/chain.test.ts` drives the client against
recorded real responses and asserts that every degraded path yields a `Measure`
with no value.

## Project Structure

```
/network
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Global providers
│   ├── blocks/           # Blocks page
│   └── transactions/     # Transactions page
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── navigation.tsx    # Navigation bar
│   ├── search-bar.tsx    # Search functionality
│   ├── network-stats.tsx # Network statistics
│   ├── block-list.tsx    # Block listing
│   └── transaction-list.tsx # Transaction listing
│   └── stat.tsx          # <Stat>/<Legend>/<Notice> — the ONE figure renderer
├── lib/                   # Utilities
│   ├── measure.ts        # Measure type + UNSERVED register
│   ├── chain.ts          # The ONE chain client (transport, probe, figures)
│   ├── use-chain.tsx     # ChainProvider — one poll for the whole app
│   ├── utils.ts          # Helper functions
│   └── wagmi.ts          # Wagmi configuration
├── test/                  # node --test suites
└── public/               # Static assets
```

## Available Routes

- `/` - Home page with overview
- `/blocks` - All blocks
- `/transactions` - All transactions
- `/block/[number]` - Block details (coming soon)
- `/tx/[hash]` - Transaction details (coming soon)
- `/address/[address]` - Address details (coming soon)
- `/contracts` - Smart contracts (coming soon)
- `/accounts` - Accounts overview (coming soon)

## Development

### Adding New Pages

Create a new folder in `/app` with a `page.tsx` file:

```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page Content</div>
}
```

### Creating Components

Add components to `/components` and UI primitives to `/components/ui`:

```typescript
// components/my-component.tsx
export function MyComponent() {
  return <div>Component</div>
}
```

### Styling

Use Tailwind CSS classes for styling:

```tsx
<div className="p-4 bg-background text-foreground">
  Content
</div>
```

## Production Deployment

1. Build the application:
   ```bash
   pnpm run build
   ```

2. Start the production server:
   ```bash
   pnpm run start
   ```

3. The explorer will be available at `http://localhost:3003`

## Contributing

Contributions are welcome! Please ensure:

- Code follows TypeScript best practices
- Components are properly typed
- `pnpm test` and `pnpm type-check` pass before submitting PRs
- Documentation is updated

If you are adding a figure to the page, add it to `ChainFigures` in
`lib/chain.ts` and render it with `<Stat>`. If the value cannot be read from the
chain, register it in `UNSERVED` with a control that proves it — do not reach
for a placeholder.

## License

MIT
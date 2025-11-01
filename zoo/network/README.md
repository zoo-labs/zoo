# Zoo Network Explorer

A modern blockchain explorer for the Zoo Network, providing real-time insights into blocks, transactions, and network statistics.

## Features

- **Real-time Network Statistics**: Monitor block height, transactions per second, active validators, and gas prices
- **Block Explorer**: Browse blocks with detailed information about miners, gas usage, and rewards
- **Transaction Tracking**: View all transactions with status, method calls, and value transfers
- **Account/Wallet Viewing**: Inspect account balances and transaction history
- **Dark/Light Theme**: Toggle between dark and light modes for optimal viewing
- **Wallet Integration**: Connect via RainbowKit with support for multiple wallets
- **Responsive Design**: Works seamlessly on desktop and mobile devices

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

The Zoo Network configuration is located in `/lib/wagmi.ts`:

```typescript
export const zooMainnet = {
  id: 200, // Zoo chain ID
  name: 'Zoo Network',
  nativeCurrency: {
    name: 'ZOO',
    symbol: 'ZOO',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['http://localhost:8545'] }, // Update with actual RPC
    public: { http: ['http://localhost:8545'] },
  },
  blockExplorers: {
    default: { name: 'Zoo Explorer', url: 'http://localhost:3003' },
  },
  testnet: false,
}
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

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
├── lib/                   # Utilities
│   ├── utils.ts          # Helper functions
│   └── wagmi.ts          # Wagmi configuration
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

## Integration with Zoo Blockchain

To connect to the actual Zoo blockchain:

1. Update the RPC URL in `/lib/wagmi.ts`
2. Configure the actual chain ID
3. Set up proper API endpoints for fetching blockchain data
4. Replace mock data in components with real blockchain queries

## Contributing

Contributions are welcome! Please ensure:

- Code follows TypeScript best practices
- Components are properly typed
- Tests pass before submitting PRs
- Documentation is updated

## License

MIT
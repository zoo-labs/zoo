# @zoo/ui

Unified UI components for all Zoo Network properties.

## Installation

```bash
npm install @zoo/ui
# or
yarn add @zoo/ui
# or
pnpm add @zoo/ui
```

## Setup

### 1. Install peer dependencies

```bash
npm install react react-dom @rainbow-me/rainbowkit wagmi viem tailwindcss
```

### 2. Configure TailwindCSS

Add the UI package to your tailwind.config.js content array:

```js
module.exports = {
  content: [
    // ... your app's content paths
    './node_modules/@zoo/ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
}
```

### 3. Setup RainbowKit (for wallet connection)

Wrap your app with RainbowKit providers:

```tsx
import { RainbowKitProvider, getDefaultWallets, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'Your App Name',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum],
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Usage

### Header Component

```tsx
import { Header } from '@zoo/ui';

function App() {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Handle search logic
  };

  return (
    <Header
      onSearch={handleSearch}
      // Optional: customize logo
      logo={<YourCustomLogo />}
      // Optional: customize navigation links
      customLinks={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        // ...
      ]}
    />
  );
}
```

### Footer Component

```tsx
import { Footer } from '@zoo/ui';

function App() {
  return (
    <Footer
      // Optional: customize logo
      logo={<YourCustomLogo />}
      // Optional: add social links
      socials={{
        twitter: 'https://twitter.com/youraccount',
        discord: 'https://discord.gg/yourinvite',
        github: 'https://github.com/yourorg',
        telegram: 'https://t.me/yourchannel',
        medium: 'https://medium.com/@youraccount',
      }}
      // Optional: customize copyright text
      copyright="© 2025 Your Company. All rights reserved."
      // Optional: customize footer sections
      customSections={[
        {
          title: 'Products',
          links: [
            { label: 'Feature 1', href: '/feature1' },
            { label: 'Feature 2', href: '/feature2' },
          ]
        },
        // ...
      ]}
    />
  );
}
```

### Complete Layout Example

```tsx
import { Header, Footer } from '@zoo/ui';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16"> {/* Account for fixed header */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

## Features

### Header
- **Logo**: Customizable logo component
- **Search**: Global search with CMD+K shortcut
- **Navigation**: Desktop and mobile responsive menu
- **Wallet Connection**: Integrated RainbowKit connect button
- **Mobile Menu**: Hamburger menu for mobile devices

### Footer
- **Multi-column Layout**: Responsive grid layout
- **Social Links**: Support for Twitter, Discord, Telegram, GitHub, Medium
- **Custom Sections**: Fully customizable footer sections
- **Legal Links**: Terms, Privacy, Cookies links
- **Copyright**: Customizable copyright text

## Styling

The components use TailwindCSS v4.x for styling. The color scheme follows a monochrome design with:
- Background: Black (`bg-black`)
- Borders: Neutral 800 (`border-neutral-800`)
- Text: White and neutral shades
- Hover effects: Smooth transitions

## TypeScript Support

The package is fully typed. Import types for better IDE support:

```tsx
import type { HeaderProps, FooterProps, FooterSection } from '@zoo/ui';
```

## Properties

### All Zoo Network Properties

The default navigation links to all Zoo properties:
- **zoo.ngo** - Zoo Foundation NGO site
- **zoolabs.io** - Zoo Labs platform
- **zoo.vote** - Governance voting platform
- **zoo.fund** - Investment fund platform
- **zoo.exchange** - DEX platform
- **zoo.network** - Main network site

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode for development
npm run dev
```

## License

MIT © Zoo Foundation
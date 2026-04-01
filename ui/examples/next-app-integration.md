# Next.js App Integration Guide

This guide shows how to integrate @zoo/ui components into your Next.js application.

## 1. Installation

```bash
# Install the UI package and dependencies
npm install @zoo/ui @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
```

## 2. Setup Providers (app/providers.tsx)

```tsx
'use client'

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { mainnet, bsc, polygon } from 'wagmi/chains'
import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'Zoo Network App',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from https://cloud.walletconnect.com
  chains: [mainnet, bsc, polygon],
  ssr: true,
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

## 3. Root Layout (app/layout.tsx)

```tsx
import './globals.css'
import { Providers } from './providers'
import { Header, Footer } from '@zoo/ui'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>
          <Header />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
```

## 4. TailwindCSS Config (tailwind.config.ts)

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Include @zoo/ui components
    './node_modules/@zoo/ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
    },
  },
  plugins: [],
}

export default config
```

## 5. Global Styles (app/globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-black text-white;
  }
}
```

## 6. Example Page with Search (app/page.tsx)

```tsx
'use client'

import { useState } from 'react'
import { Header, Footer } from '@zoo/ui'

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<string | null>(null)

  const handleSearch = (query: string) => {
    // Implement your search logic
    setSearchResults(`Searching for: ${query}`)
    // Could redirect to search page or fetch results
  }

  return (
    <>
      <Header onSearch={handleSearch} />

      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Zoo Network</h1>

          {searchResults && (
            <div className="bg-neutral-900 rounded-lg p-4 mb-8">
              {searchResults}
            </div>
          )}

          {/* Your content here */}
        </div>
      </main>

      <Footer
        socials={{
          twitter: 'https://twitter.com/zooprotocol',
          discord: 'https://discord.gg/zoo',
          github: 'https://github.com/zoo-labs',
        }}
      />
    </>
  )
}
```

## 7. Custom Theme Example

```tsx
// app/components/ThemedLayout.tsx
import { Header, Footer } from '@zoo/ui'

// Custom logo component
const CustomLogo = () => (
  <div className="flex items-center space-x-2">
    <img src="/logo.png" alt="Logo" className="h-10 w-10" />
    <span className="text-2xl font-bold">MyApp</span>
  </div>
)

export function ThemedLayout({ children }: { children: React.ReactNode }) {
  // Custom navigation
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  // Custom footer sections
  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact', href: '/contact' },
        { label: 'Status', href: '/status' },
      ]
    }
  ]

  return (
    <>
      <Header
        logo={<CustomLogo />}
        customLinks={navLinks}
        className="bg-gradient-to-r from-black to-neutral-900"
      />

      <main className="pt-16">{children}</main>

      <Footer
        logo={<CustomLogo />}
        customSections={footerSections}
        copyright="© 2025 MyApp. All rights reserved."
      />
    </>
  )
}
```

## 8. Environment Variables (.env.local)

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## Common Issues & Solutions

### Issue: Hydration errors
**Solution**: Ensure all providers are marked with 'use client' directive

### Issue: Styles not loading
**Solution**: Check that @zoo/ui path is included in tailwind.config.ts content array

### Issue: Wallet connection not working
**Solution**: Ensure you have a valid WalletConnect project ID

### Issue: TypeScript errors
**Solution**: Install type definitions:
```bash
npm install --save-dev @types/react @types/react-dom
```

## Advanced Usage

### Server-Side Rendering (SSR)

For SSR support, configure wagmi with ssr:

```tsx
const config = getDefaultConfig({
  appName: 'Zoo Network App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, bsc],
  ssr: true, // Enable SSR
})
```

### Dynamic Imports

For better performance, dynamically import heavy components:

```tsx
import dynamic from 'next/dynamic'

const Header = dynamic(
  () => import('@zoo/ui').then(mod => mod.Header),
  { ssr: false }
)
```

## Support

For issues or questions:
- GitHub: https://github.com/zoo-labs/zoo-ui
- Discord: https://discord.gg/zoo
- Docs: https://docs.zoo.network
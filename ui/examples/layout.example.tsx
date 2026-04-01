/**
 * Example integration of @zoo/ui components in a Next.js app
 */

import React from 'react'
import { Header, Footer } from '@zoo/ui'

// Example custom logo component
const ZooLogo = () => (
  <a href="/" className="flex items-center space-x-3">
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="text-white"
    >
      <circle cx="20" cy="20" r="20" fill="currentColor" />
      <text x="20" y="26" fontSize="20" fontWeight="bold" textAnchor="middle" fill="black">
        Z
      </text>
    </svg>
    <span className="text-white font-bold text-2xl">Zoo Network</span>
  </a>
)

// Example layout component
export function AppLayout({ children }: { children: React.ReactNode }) {
  // Search handler
  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
    // Implement your search logic here
    // Could redirect to search page, filter content, etc.
  }

  // Custom navigation links (optional)
  const customNavLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Markets', href: '/markets' },
    { label: 'Governance', href: '/governance' },
    { label: 'Docs', href: 'https://docs.zoo.network' },
  ]

  // Social links
  const socialLinks = {
    twitter: 'https://twitter.com/zooprotocol',
    discord: 'https://discord.gg/zoo',
    github: 'https://github.com/zoo-labs',
    telegram: 'https://t.me/zooprotocol',
  }

  // Custom footer sections (optional)
  const footerSections = [
    {
      title: 'Products',
      links: [
        { label: 'Zoo NGO', href: 'https://zoo.ngo' },
        { label: 'Zoo Labs', href: 'https://zoolabs.io' },
        { label: 'Zoo Vote', href: 'https://zoo.vote' },
        { label: 'Zoo Fund', href: 'https://zoo.fund' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: 'https://docs.zoo.network' },
        { label: 'API', href: 'https://api.zoo.network' },
        { label: 'GitHub', href: 'https://github.com/zoo-labs' },
        { label: 'Blog', href: 'https://blog.zoo.network' },
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'Twitter', href: 'https://twitter.com/zooprotocol' },
        { label: 'Discord', href: 'https://discord.gg/zoo' },
        { label: 'Forum', href: 'https://forum.zoo.network' },
        { label: 'Telegram', href: 'https://t.me/zooprotocol' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Disclaimer', href: '/disclaimer' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with custom props */}
      <Header
        logo={<ZooLogo />}
        onSearch={handleSearch}
        customLinks={customNavLinks}
        className="backdrop-blur-md bg-black/80"
      />

      {/* Main content area */}
      <main className="pt-16"> {/* pt-16 to account for fixed header */}
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      {/* Footer with custom props */}
      <Footer
        logo={<ZooLogo />}
        socials={socialLinks}
        customSections={footerSections}
        copyright={`© ${new Date().getFullYear()} Zoo Foundation. All rights reserved.`}
        className="mt-20"
      />
    </div>
  )
}

// Example page component
export function ExamplePage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to Zoo Network</h1>
        <p className="text-neutral-400 text-lg mb-6">
          This is an example page using the unified @zoo/ui components.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <h3 className="text-xl font-semibold mb-3">Unified Header</h3>
            <p className="text-neutral-400 text-sm">
              Responsive header with search, navigation, and wallet connection.
            </p>
          </div>

          <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <h3 className="text-xl font-semibold mb-3">Unified Footer</h3>
            <p className="text-neutral-400 text-sm">
              Comprehensive footer with all Zoo properties and social links.
            </p>
          </div>

          <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <h3 className="text-xl font-semibold mb-3">Customizable</h3>
            <p className="text-neutral-400 text-sm">
              Both components support custom logos, links, and styling.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
'use client'

import React from 'react'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  className?: string
  logo?: React.ReactNode
  customSections?: FooterSection[]
  socials?: {
    twitter?: string
    discord?: string
    telegram?: string
    github?: string
    medium?: string
  }
  copyright?: string
}

export const Footer: React.FC<FooterProps> = ({
  className = '',
  logo,
  customSections,
  socials = {},
  copyright
}) => {
  const defaultSections: FooterSection[] = [
    {
      title: 'Ecosystem',
      links: [
        { label: 'Zoo NGO', href: 'https://zoo.ngo' },
        { label: 'Zoo Labs', href: 'https://zoolabs.io' },
        { label: 'Zoo Vote', href: 'https://zoo.vote' },
        { label: 'Zoo Fund', href: 'https://zoo.fund' },
        { label: 'Zoo Exchange', href: 'https://zoo.exchange' },
        { label: 'Zoo Network', href: 'https://zoo.network' },
      ]
    },
    {
      title: 'Products',
      links: [
        { label: 'Governance', href: 'https://zoo.vote' },
        { label: 'DeFi', href: 'https://zoo.exchange' },
        { label: 'NFT Marketplace', href: 'https://zoolabs.io/marketplace' },
        { label: 'Staking', href: 'https://zoo.exchange/stake' },
        { label: 'Launchpad', href: 'https://zoo.fund/launch' },
      ]
    },
    {
      title: 'Developers',
      links: [
        { label: 'Documentation', href: 'https://docs.zoo.network' },
        { label: 'GitHub', href: 'https://github.com/zoo-labs' },
        { label: 'SDK', href: 'https://github.com/zoo-labs/zoo-sdk' },
        { label: 'Smart Contracts', href: 'https://github.com/zoo-labs/contracts' },
        { label: 'API', href: 'https://api.zoo.network' },
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'Blog', href: 'https://blog.zoo.network' },
        { label: 'Twitter', href: 'https://twitter.com/zooprotocol' },
        { label: 'Discord', href: 'https://discord.gg/zoo' },
        { label: 'Telegram', href: 'https://t.me/zooprotocol' },
        { label: 'Forum', href: 'https://forum.zoo.network' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'About', href: 'https://zoo.ngo/about' },
        { label: 'Whitepaper', href: 'https://zoo.ngo/whitepaper' },
        { label: 'Roadmap', href: 'https://zoo.ngo/roadmap' },
        { label: 'Terms', href: 'https://zoo.ngo/terms' },
        { label: 'Privacy', href: 'https://zoo.ngo/privacy' },
      ]
    }
  ]

  const sections = customSections || defaultSections
  const currentYear = new Date().getFullYear()
  const copyrightText = copyright || `© ${currentYear} Zoo Foundation. All rights reserved.`

  return (
    <footer className={`bg-black border-t border-neutral-800 ${className}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            {logo ? (
              logo
            ) : (
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">Z</span>
                </div>
                <span className="text-white font-bold text-2xl">Zoo</span>
              </div>
            )}
            <p className="text-neutral-400 text-sm mb-6">
              Building the future of decentralized finance and NFTs.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
              {socials.discord && (
                <a href={socials.discord} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
              )}
              {socials.telegram && (
                <a href={socials.telegram} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </a>
              )}
              {socials.github && (
                <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {socials.medium && (
                <a href={socials.medium} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-neutral-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-500 text-sm">{copyrightText}</p>
            <div className="flex items-center space-x-6">
              <a href="https://zoo.ngo/terms" className="text-neutral-500 hover:text-white text-sm transition-colors">
                Terms
              </a>
              <a href="https://zoo.ngo/privacy" className="text-neutral-500 hover:text-white text-sm transition-colors">
                Privacy
              </a>
              <a href="https://zoo.ngo/cookies" className="text-neutral-500 hover:text-white text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
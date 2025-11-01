'use client'

import React, { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export interface HeaderProps {
  logo?: React.ReactNode
  className?: string
  onSearch?: (query: string) => void
  customLinks?: Array<{ label: string; href: string }>
}

export const Header: React.FC<HeaderProps> = ({ 
  logo, 
  className = '', 
  onSearch,
  customLinks = []
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { address, isConnected } = useAccount()

  // Keyboard shortcut for search (cmd+k)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const defaultLinks = [
    { label: 'Zoo NGO', href: 'https://zoo.ngo' },
    { label: 'Labs', href: 'https://zoolabs.io' },
    { label: 'Vote', href: 'https://zoo.vote' },
    { label: 'Fund', href: 'https://zoo.fund' },
    { label: 'Exchange', href: 'https://zoo.exchange' },
    { label: 'Network', href: 'https://zoo.network' },
  ]

  const links = customLinks.length > 0 ? customLinks : defaultLinks

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-black border-b border-neutral-800 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              {logo ? (
                logo
              ) : (
                <a href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">Z</span>
                  </div>
                  <span className="text-white font-bold text-xl hidden sm:block">Zoo</span>
                </a>
              )}

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm font-medium"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
                aria-label="Search (⌘K)"
              >
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-neutral-400 text-sm">Search</span>
                <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs text-neutral-500 bg-neutral-800 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Connect Wallet Button */}
              <div className="hidden sm:block">
                <ConnectButton 
                  chainStatus="icon"
                  accountStatus="avatar"
                  showBalance={false}
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-400 hover:text-white"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-800 bg-black">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors py-2"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 border-t border-neutral-800">
                  <button
                    onClick={() => {
                      setIsSearchOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 w-full py-2 text-neutral-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                  </button>
                </div>
                <div className="pt-3 sm:hidden">
                  <ConnectButton 
                    chainStatus="icon"
                    accountStatus="full"
                    showBalance={false}
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search Dialog */}
      <Dialog.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
          <Dialog.Content className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl z-[101]">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center px-4 py-3 border-b border-neutral-800">
                <svg className="w-5 h-5 text-neutral-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Zoo Network..."
                  className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none text-lg"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-3 text-neutral-500 hover:text-neutral-300"
                >
                  <kbd className="px-2 py-1 text-xs bg-neutral-800 rounded">ESC</kbd>
                </button>
              </div>
              {searchQuery && (
                <div className="p-4">
                  <button
                    type="submit"
                    className="w-full text-left px-3 py-2 hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    <span className="text-neutral-400 text-sm">Search for:</span>
                    <span className="text-white ml-2">{searchQuery}</span>
                  </button>
                </div>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
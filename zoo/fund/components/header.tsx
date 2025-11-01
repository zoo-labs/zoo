'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { GlobalSearch, SearchTrigger } from './global-search'

export function Header() {
  const [bannerVisible, setBannerVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Announcement Banner */}
      {bannerVisible && (
        <div className="bg-gradient-to-r from-[#667eea]/30 to-[#764ba2]/30 border-b border-white/10 relative">
          <div className="container py-4 text-center">
            <p className="text-base md:text-lg">
              <span className="text-white/90">🚀 Launch your conservation DAO in minutes → </span>
              <Link href="/launch" className="font-semibold text-white hover:text-[#667eea] transition-colors underline">
                Get started now!
              </Link>
            </p>
            <button
              onClick={() => setBannerVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              aria-label="Dismiss banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Simplified Header - Logo, Search, Connect */}
      <header className="border-b border-white/10 bg-black/95 backdrop-blur-md sticky top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 gap-2 min-w-0">
              <Image
                src="/logos/logo-64.png"
                alt="Zoo Fund"
                width={40}
                height={40}
                className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                priority
              />
              <span className="text-lg sm:text-xl font-bold hidden sm:inline">Zoo Fund</span>
            </Link>

            {/* Right Side - Search + Menu + Wallet */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden min-[375px]:block">
                <SearchTrigger />
              </div>

              {/* Hamburger Menu Button - Shows navigation links */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hamburger-button p-1.5 sm:p-2 text-white/70 hover:text-white transition-colors touch-target"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Connect Button */}
              <ConnectButton />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Slide-out */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="mobile-menu fixed top-0 right-0 bottom-0 w-[280px] bg-black border-l border-white/10 z-50 overflow-y-auto">
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="mb-8 p-2 text-white/60 hover:text-white transition-colors touch-target ml-auto block"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Links */}
              <nav className="space-y-1 mb-8">
                <Link
                  href="https://zoo.ngo/animals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all touch-target"
                >
                  Animals
                </Link>
                <Link
                  href="https://zoo.ngo/experiences"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all touch-target"
                >
                  Connect
                </Link>
                <Link
                  href="https://zoo.ngo/getinvolved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all touch-target"
                >
                  Get Involved
                </Link>
                <Link
                  href="https://zoo.ngo/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all touch-target"
                >
                  Mission
                </Link>
                <Link
                  href="/zoolabs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all touch-target"
                >
                  ZooLabs
                </Link>
                <Link
                  href="/ai"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all touch-target"
                >
                  AI Research
                </Link>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-[#667eea] font-semibold hover:bg-[#667eea]/10 rounded-lg transition-all touch-target"
                >
                  Fund
                </Link>
              </nav>

              {/* Social Links */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-white/40 mb-3 px-4">Follow Us</p>
                <div className="flex gap-4 px-4">
                  <Link
                    href="https://twitter.com/zoo_labs"
                    target="_blank"
                    className="text-white/60 hover:text-white transition-colors touch-target"
                    aria-label="Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </Link>
                  <Link
                    href="https://discord.gg/AqrYhChx5b"
                    target="_blank"
                    className="text-white/60 hover:text-white transition-colors touch-target"
                    aria-label="Discord"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Global Search Modal */}
      <GlobalSearch />
    </>
  )
}

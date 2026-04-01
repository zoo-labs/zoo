'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { daos } from '@/lib/daos'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  category: 'dao' | 'page' | 'action'
  emoji?: string
}

const searchableItems: SearchResult[] = [
  // DAOs
  ...daos.map(dao => ({
    id: dao.id,
    title: dao.name,
    description: dao.tagline,
    url: `/${dao.id}`,
    category: 'dao' as const,
    emoji: dao.emoji
  })),
  // Pages
  { id: 'home', title: 'Home', description: 'Conservation DAO funding platform', url: '/', category: 'page', emoji: '🏠' },
  { id: 'zoolabs', title: 'ZooLabs', description: 'Research hub for conservation science', url: '/zoolabs', category: 'page', emoji: '🔬' },
  { id: 'launch', title: 'Launch DAO', description: 'Create your conservation DAO', url: '/launch', category: 'action', emoji: '🚀' },
  // External links
  { id: 'papers', title: 'Research Papers', description: 'Published conservation research', url: 'https://papers.zoo.ngo', category: 'page', emoji: '📄' },
  { id: 'zips', title: 'Research Datasets', description: 'Downloadable research artifacts', url: 'https://zips.zoo.ngo', category: 'page', emoji: '📦' },
  { id: 'zenlm', title: 'ZenLM', description: 'AI for conservation', url: 'https://zenlm.org', category: 'page', emoji: '🤖' },
]

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  // Filter results based on query
  const results = query.trim() === ''
    ? searchableItems.slice(0, 8) // Show first 8 when empty
    : searchableItems.filter(item => {
        const searchText = `${item.title} ${item.description}`.toLowerCase()
        return searchText.includes(query.toLowerCase())
      }).slice(0, 8)

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
        setQuery('')
        setSelectedIndex(0)
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      }

      if (!isOpen) return

      // Arrow navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % results.length)
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length)
      }

      // Enter to select
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        handleSelect(results[selectedIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex])

  const handleSelect = useCallback((item: SearchResult) => {
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(0)

    if (item.url.startsWith('http')) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    } else {
      router.push(item.url)
    }
  }, [router])

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      dao: 'DAO',
      page: 'Page',
      action: 'Action'
    }
    return labels[category] || category
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      dao: 'bg-[#667eea]/20 text-[#667eea]',
      page: 'bg-white/10 text-white/70',
      action: 'bg-[#764ba2]/20 text-[#764ba2]'
    }
    return colors[category] || 'bg-white/10 text-white/70'
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Search Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
        <div
          className="w-full max-w-2xl bg-black border border-white/20 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="border-b border-white/10">
            <div className="flex items-center gap-3 px-6 py-4">
              <span className="text-2xl">🔍</span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder="Search DAOs, pages, or actions..."
                className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-white/40"
                autoFocus
              />
              <kbd className="hidden sm:block px-2 py-1 text-xs bg-white/5 border border-white/10 rounded">
                ESC
              </kbd>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-6 py-12 text-center text-white/40">
                <p className="text-lg mb-2">No results found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full px-6 py-3 flex items-center gap-4 text-left transition-colors ${
                      index === selectedIndex
                        ? 'bg-[#667eea]/20'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {/* Emoji/Icon */}
                    <div className="text-3xl shrink-0">
                      {item.emoji}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white truncate">
                          {item.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${getCategoryColor(item.category)}`}>
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      <p className="text-sm text-white/60 truncate">
                        {item.description}
                      </p>
                    </div>

                    {/* Enter indicator */}
                    {index === selectedIndex && (
                      <kbd className="hidden sm:block px-2 py-1 text-xs bg-white/5 border border-white/10 rounded shrink-0">
                        ↵
                      </kbd>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 px-6 py-3">
            <div className="flex items-center justify-between text-xs text-white/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↓</kbd>
                  <span className="ml-1">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↵</kbd>
                  <span className="ml-1">Select</span>
                </span>
              </div>
              <span className="hidden sm:block">
                Press{' '}
                <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">
                  {typeof navigator !== 'undefined' && navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
                </kbd>
                {' '}+{' '}
                <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">K</kbd>
                {' '}to open
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Search trigger button component
export function SearchTrigger() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    // Trigger the Command+K event
    window.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true
    }))
  }

  if (!mounted) {
    return (
      <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60">
        Search...
      </button>
    )
  }

  const isMac = typeof navigator !== 'undefined' && navigator.platform.includes('Mac')

  return (
    <button
      onClick={handleClick}
      className="group px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
    >
      <span className="hidden md:inline">Search...</span>
      <span className="md:hidden">🔍</span>
      <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-xs group-hover:border-white/20 transition-colors">
        {isMac ? '⌘K' : 'Ctrl+K'}
      </kbd>
    </button>
  )
}

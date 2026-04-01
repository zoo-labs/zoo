'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from './ui/button'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Detect search type based on input
    if (query.startsWith('0x')) {
      if (query.length === 42) {
        // Address
        router.push(`/address/${query}`)
      } else if (query.length === 66) {
        // Transaction hash
        router.push(`/tx/${query}`)
      }
    } else if (!isNaN(Number(query))) {
      // Block number
      router.push(`/block/${query}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Address / Txn Hash / Block"
          className="w-full pl-10 pr-24 h-12 rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-2"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
'use client'

import { BlockList } from '@/components/block-list'

export default function BlocksPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blocks</h1>
        <p className="text-muted-foreground">
          Browse all blocks on the Zoo Network
        </p>
      </div>
      <BlockList />
    </div>
  )
}
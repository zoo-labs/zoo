'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { formatHash, timeAgo, formatNumber } from '@/lib/utils'
import { Blocks } from 'lucide-react'

interface Block {
  number: number
  hash: string
  timestamp: number
  miner: string
  transactions: number
  gasUsed: number
  gasLimit: number
  reward: number
}

export function BlockList() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate mock data - replace with actual blockchain data
    const mockBlocks: Block[] = []
    const baseNumber = 1234567
    const now = Date.now()

    for (let i = 0; i < 10; i++) {
      mockBlocks.push({
        number: baseNumber - i,
        hash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
        timestamp: now - (i * 2000), // 2 seconds per block
        miner: `0x${Math.random().toString(16).substring(2, 42).padEnd(40, '0')}`,
        transactions: Math.floor(Math.random() * 200) + 50,
        gasUsed: Math.floor(Math.random() * 15000000),
        gasLimit: 30000000,
        reward: 2 + Math.random() * 0.5,
      })
    }

    setBlocks(mockBlocks)
    setLoading(false)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBlocks(prev => {
        const newBlock: Block = {
          number: prev[0].number + 1,
          hash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
          timestamp: Date.now(),
          miner: `0x${Math.random().toString(16).substring(2, 42).padEnd(40, '0')}`,
          transactions: Math.floor(Math.random() * 200) + 50,
          gasUsed: Math.floor(Math.random() * 15000000),
          gasLimit: 30000000,
          reward: 2 + Math.random() * 0.5,
        }
        return [newBlock, ...prev.slice(0, 9)]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading blocks...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Blocks className="h-5 w-5" />
          Latest Blocks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blocks.map((block) => (
            <div
              key={block.number}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <Blocks className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/block/${block.number}`}
                      className="font-medium hover:text-primary"
                    >
                      Block #{block.number}
                    </Link>
                    <Badge variant="secondary" className="text-xs">
                      {timeAgo(block.timestamp)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Hash: {formatHash(block.hash)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Validator: <Link href={`/address/${block.miner}`} className="hover:text-primary">
                      {formatHash(block.miner, 8)}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{block.transactions} txns</div>
                <div className="text-sm text-muted-foreground">
                  {((block.gasUsed / block.gasLimit) * 100).toFixed(1)}% gas used
                </div>
                <div className="text-sm text-green-600">
                  {block.reward.toFixed(4)} ZOO
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/blocks" className="text-primary hover:underline">
            View all blocks →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
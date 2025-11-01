'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { formatHash, timeAgo, formatAddress } from '@/lib/utils'
import { Activity, ArrowRight, Check, X } from 'lucide-react'

interface Transaction {
  hash: string
  from: string
  to: string
  value: number
  gas: number
  gasPrice: number
  timestamp: number
  status: 'success' | 'failed' | 'pending'
  method?: string
  blockNumber: number
}

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate mock data - replace with actual blockchain data
    const mockTxs: Transaction[] = []
    const now = Date.now()
    const methods = ['Transfer', 'Swap', 'Approve', 'Mint', 'Stake', 'Claim']

    for (let i = 0; i < 10; i++) {
      mockTxs.push({
        hash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
        from: `0x${Math.random().toString(16).substring(2, 42).padEnd(40, '0')}`,
        to: `0x${Math.random().toString(16).substring(2, 42).padEnd(40, '0')}`,
        value: Math.random() * 100,
        gas: Math.floor(Math.random() * 100000) + 21000,
        gasPrice: Math.random() * 50 + 10,
        timestamp: now - (i * 1000),
        status: Math.random() > 0.1 ? 'success' : 'failed',
        method: methods[Math.floor(Math.random() * methods.length)],
        blockNumber: 1234567 - Math.floor(i / 3),
      })
    }

    setTransactions(mockTxs)
    setLoading(false)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTransactions(prev => {
        const newTx: Transaction = {
          hash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
          from: `0x${Math.random().toString(16).substring(2, 42).padEnd(40, '0')}`,
          to: `0x${Math.random().toString(16).substring(2, 42).padEnd(40, '0')}`,
          value: Math.random() * 100,
          gas: Math.floor(Math.random() * 100000) + 21000,
          gasPrice: Math.random() * 50 + 10,
          timestamp: Date.now(),
          status: 'pending',
          method: methods[Math.floor(Math.random() * methods.length)],
          blockNumber: 1234567,
        }
        return [newTx, ...prev.slice(0, 9)]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading transactions...</div>
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Check className="h-4 w-4 text-green-600" />
      case 'failed':
        return <X className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-yellow-600 animate-pulse" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'success':
        return 'default' as const
      case 'failed':
        return 'destructive' as const
      default:
        return 'secondary' as const
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Latest Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.hash}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  {getStatusIcon(tx.status)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/tx/${tx.hash}`}
                      className="font-medium hover:text-primary"
                    >
                      {formatHash(tx.hash, 10)}
                    </Link>
                    <Badge variant={getStatusVariant(tx.status)} className="text-xs">
                      {tx.status}
                    </Badge>
                    {tx.method && (
                      <Badge variant="outline" className="text-xs">
                        {tx.method}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Link href={`/address/${tx.from}`} className="hover:text-primary">
                      {formatAddress(tx.from)}
                    </Link>
                    <ArrowRight className="h-3 w-3" />
                    <Link href={`/address/${tx.to}`} className="hover:text-primary">
                      {formatAddress(tx.to)}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{tx.value.toFixed(4)} ZOO</div>
                <div className="text-sm text-muted-foreground">
                  {timeAgo(tx.timestamp)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Block #{tx.blockNumber}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/transactions" className="text-primary hover:underline">
            View all transactions →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
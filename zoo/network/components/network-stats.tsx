'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import {
  Server,
  Cpu,
  HardDrive,
  Network,
  Zap,
  Clock,
  TrendingUp,
  Globe
} from 'lucide-react'

export function NetworkStats() {
  const [stats, setStats] = useState({
    tps: 0,
    blockTime: 2000,
    gasPrice: 0,
    nodeCount: 0,
    diskUsage: 0,
    memoryUsage: 0,
    networkLoad: 0,
    avgBlockSize: 0,
  })

  useEffect(() => {
    // Simulated live data updates
    const interval = setInterval(() => {
      setStats({
        tps: Math.floor(Math.random() * 50) + 100,
        blockTime: 2000 + Math.floor(Math.random() * 500) - 250,
        gasPrice: Math.random() * 50 + 10,
        nodeCount: Math.floor(Math.random() * 10) + 95,
        diskUsage: Math.random() * 30 + 40,
        memoryUsage: Math.random() * 20 + 30,
        networkLoad: Math.random() * 40 + 30,
        avgBlockSize: Math.floor(Math.random() * 100) + 200,
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">TPS</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.tps}</div>
          <p className="text-xs text-muted-foreground">
            Transactions per second
          </p>
          <Progress value={stats.tps / 2} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Block Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(stats.blockTime / 1000).toFixed(2)}s</div>
          <p className="text-xs text-muted-foreground">
            Average block time
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gas Price</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.gasPrice.toFixed(1)} Gwei</div>
          <p className="text-xs text-muted-foreground">
            Current gas price
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Nodes</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.nodeCount}</div>
          <p className="text-xs text-muted-foreground">
            Connected validators
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
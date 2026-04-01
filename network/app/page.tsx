'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity, Blocks, DollarSign, Users, TrendingUp, Globe } from 'lucide-react'
import { NetworkStats } from '@/components/network-stats'
import { BlockList } from '@/components/block-list'
import { TransactionList } from '@/components/transaction-list'
import { SearchBar } from '@/components/search-bar'

export default function HomePage() {
  const [networkStats, setNetworkStats] = useState({
    blockHeight: 0,
    transactions: 0,
    accounts: 0,
    validators: 0,
    marketCap: 0,
    price: 0,
  })

  useEffect(() => {
    // Simulated data - will be replaced with actual blockchain data
    setNetworkStats({
      blockHeight: 1234567,
      transactions: 5678901,
      accounts: 123456,
      validators: 100,
      marketCap: 1000000000,
      price: 25.50,
    })
  }, [])

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight">Zoo Network Explorer</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore blocks, transactions, and accounts on the Zoo Network -
          The decentralized AI blockchain infrastructure
        </p>
        <SearchBar />
      </div>

      {/* Network Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Block Height</CardTitle>
            <Blocks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.blockHeight.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+1 block every ~2s</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.transactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.accounts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5.2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ZOO Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${networkStats.price.toFixed(2)}</div>
            <p className="text-xs text-green-600">+8.5% (24h)</p>
          </CardContent>
        </Card>
      </div>

      {/* Network Overview */}
      <NetworkStats />

      {/* Latest Blocks and Transactions */}
      <Tabs defaultValue="blocks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="blocks">Latest Blocks</TabsTrigger>
          <TabsTrigger value="transactions">Latest Transactions</TabsTrigger>
          <TabsTrigger value="validators">Validators</TabsTrigger>
        </TabsList>
        <TabsContent value="blocks" className="space-y-4">
          <BlockList />
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <TransactionList />
        </TabsContent>
        <TabsContent value="validators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Validators</CardTitle>
              <CardDescription>
                {networkStats.validators} validators securing the network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">Validator list coming soon...</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
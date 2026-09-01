'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity, Blocks, Clock, Fuel, Users } from 'lucide-react'
import { NetworkStats } from '@/components/network-stats'
import { BlockList } from '@/components/block-list'
import { TransactionList } from '@/components/transaction-list'
import { SearchBar } from '@/components/search-bar'
import { Legend, Notice, Stat, UnservedNote } from '@/components/stat'
import { useChainState } from '@/lib/use-chain'
import { chainFigures, grade, UNSERVED } from '@/lib/chain'
import { HEALTH_LABEL, HEALTH_CLASS } from '@/lib/measure'

export default function HomePage() {
  const { probe, validators } = useChainState()
  const f = chainFigures(probe, validators)
  const status = probe ? grade(probe) : { health: 'checking' as const, reason: 'reading the chain' }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight">Zoo Network Explorer</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore blocks, transactions, and accounts on the Zoo Network —
          The decentralized AI blockchain infrastructure
        </p>
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${HEALTH_CLASS[status.health]}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            {/* No chain id here on purpose — it is a measurement, and it is
                rendered as one (from eth_chainId) in the stats row below. */}
            Zoo mainnet · {HEALTH_LABEL[status.health]}
          </span>
        </div>
        <SearchBar />
      </div>

      {/*
        When the chain is not producing, say so before showing a single number.
        The figures below are all true; without this line a true-but-old height
        reads as a live one, which is the same lie in a quieter voice.
      */}
      {(status.health === 'degraded' || status.health === 'down' || status.health === 'idle') && (
        <Notice tone={status.health === 'down' ? 'bad' : 'warn'}>
          {status.health === 'down'
            ? <>The Zoo RPC endpoint could not be read — {status.reason}. No figure below is a measurement; each says so itself.</>
            : <>The chain is not currently producing blocks — {status.reason}. Every figure below is the real state of the last block produced, not an estimate.</>}
        </Notice>
      )}

      <Legend />

      {/* The figures. Every one of these is a read; none is a literal. */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Stat label="Block Height" m={f.height} icon={<Blocks className="h-4 w-4 text-muted-foreground" />} />
        <Stat label="Last Block" m={f.lastBlock} icon={<Clock className="h-4 w-4 text-muted-foreground" />} />
        <Stat label="Gas Price" m={f.gasPrice} icon={<Fuel className="h-4 w-4 text-muted-foreground" />} />
        <Stat label="Validators" m={f.validators} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
      </div>

      <NetworkStats />

      {/*
        Total transactions, account count and ZOO price were the other three
        tiles here. All three were literals. None can be measured from a
        JSON-RPC node, so they are named and explained rather than invented.
      */}
      <UnservedNote items={[UNSERVED.totalTransactions, UNSERVED.accounts, UNSERVED.price]} />

      {/* Latest blocks and transactions */}
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
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Active Validators
              </CardTitle>
              <CardDescription>
                Read from the P-Chain with platform.getCurrentValidators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Stat label="Current validator set" m={f.validators} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

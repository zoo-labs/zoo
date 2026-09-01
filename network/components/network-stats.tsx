'use client'

import { Activity, Clock, Fuel, Hash } from 'lucide-react'
import { Stat } from './stat'
import { useChainState } from '@/lib/use-chain'
import { chainFigures } from '@/lib/chain'

// Every figure on this row used to be Math.random(), re-rolled every 3 seconds:
// TPS was `Math.floor(Math.random() * 50) + 100`, block time `2000 ± 250`ms, gas
// price `Math.random() * 50 + 10`, node count `Math.random() * 10 + 95`. Disk,
// memory and network-load meters were invented the same way and are gone
// entirely — a public JSON-RPC node does not report a validator's disk usage, so
// there is nothing to replace them WITH.
//
// What remains is what the chain actually answers, derived from the same single
// poll the rest of the page uses.

export function NetworkStats() {
  const { probe, validators } = useChainState()
  const f = chainFigures(probe, validators)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Stat label="Chain ID" m={f.chainId} icon={<Hash className="h-4 w-4 text-muted-foreground" />} />
      <Stat label="Block Interval" m={f.blockInterval} icon={<Clock className="h-4 w-4 text-muted-foreground" />} />
      <Stat label="Txns in Last Block" m={f.headTxs} icon={<Activity className="h-4 w-4 text-muted-foreground" />} />
      <Stat label="Gas Used" m={f.gasUsed} icon={<Fuel className="h-4 w-4 text-muted-foreground" />} />
    </div>
  )
}

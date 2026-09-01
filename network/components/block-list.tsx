'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { formatHash, timeAgo } from '@/lib/utils'
import { Blocks } from 'lucide-react'
import { useChainState } from '@/lib/use-chain'
import { blockRows, grade } from '@/lib/chain'

// These rows used to be invented: block numbers counted down from a literal
// 1234567, hashes were `Math.random().toString(16)`, validators were random hex,
// tx counts `Math.random() * 200 + 50`, and a fresh fake block was pushed on a
// 2-second timer so the list looked alive. Every link went to a block that did
// not exist — /block/1234567 is a 404 on this chain.
//
// Now the rows are the blocks the chain returns, and when there are none the
// list says why rather than manufacturing something to show.

export function BlockList() {
  const { probe } = useChainState()
  const rows = blockRows(probe)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Blocks className="h-5 w-5" />
          Latest Blocks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <Empty probe={probe} />
        ) : (
          <div className="space-y-4">
            {rows.map((block) => (
              <div
                key={block.hash}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                    <Blocks className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link href={`/block/${block.number}`} className="font-medium hover:text-primary">
                        Block #{block.number.toLocaleString('en-US')}
                      </Link>
                      <Badge variant="secondary" className="text-xs">
                        {timeAgo(block.timestamp * 1000)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Hash: {formatHash(block.hash)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Validator:{' '}
                      <Link href={`/address/${block.miner}`} className="hover:text-primary">
                        {formatHash(block.miner, 8)}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium tabular-nums">{block.txCount} txns</div>
                  <div className="text-sm text-muted-foreground tabular-nums">
                    {block.gasLimit > 0
                      ? `${((block.gasUsed / block.gasLimit) * 100).toFixed(1)}% gas used`
                      : 'gas limit not reported'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 text-center">
          <Link href="/blocks" className="text-primary hover:underline">
            View all blocks →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Why the list is empty, never a placeholder row.
 *
 * "Loading blocks..." forever was the old failure mode — indistinguishable from
 * a broken endpoint. These three states are distinguishable.
 */
function Empty({ probe }: { probe: ReturnType<typeof useChainState>['probe'] }) {
  if (!probe) return <p className="py-6 text-center text-muted-foreground">Reading the chain…</p>
  if (!probe.ok) {
    return (
      <p className="py-6 text-center text-red-500">
        Blocks are unavailable — {grade(probe).reason}
      </p>
    )
  }
  return (
    <p className="py-6 text-center text-muted-foreground">
      The endpoint returned no blocks. It answered, so this is the chain&apos;s state, not a failed read.
    </p>
  )
}

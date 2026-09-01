'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { formatHash, timeAgo, formatAddress } from '@/lib/utils'
import { Activity, ArrowRight } from 'lucide-react'
import { useChainState } from '@/lib/use-chain'
import { txRows, formatZoo, grade } from '@/lib/chain'

// These rows were invented too: random hashes and addresses, `Math.random() *
// 100` ZOO values, a random status that failed 10% of the time, and a "method"
// picked at random from ['Transfer','Swap','Approve','Mint','Stake','Claim'] —
// a label the chain never supplied for any of them.
//
// Now they are the transactions inside the blocks already read, so the list
// costs no extra request and can never disagree with the block list beside it.
// The method column is gone: decoding a call into a name needs the contract ABI,
// which this explorer does not have, and guessing was the whole problem.

export function TransactionList() {
  const { probe } = useChainState()
  const rows = txRows(probe)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Latest Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <Empty probe={probe} />
        ) : (
          <div className="space-y-4">
            {rows.map((tx) => (
              <div
                key={tx.hash}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link href={`/tx/${tx.hash}`} className="font-medium hover:text-primary">
                        {formatHash(tx.hash, 10)}
                      </Link>
                      <Badge variant="secondary" className="text-xs">
                        in block
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Link href={`/address/${tx.from}`} className="hover:text-primary">
                        {formatAddress(tx.from)}
                      </Link>
                      <ArrowRight className="h-3 w-3" />
                      {tx.to ? (
                        <Link href={`/address/${tx.to}`} className="hover:text-primary">
                          {formatAddress(tx.to)}
                        </Link>
                      ) : (
                        <span title="This transaction created a contract">contract creation</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium tabular-nums">{formatZoo(tx.valueWei)} ZOO</div>
                  <div className="text-sm text-muted-foreground">{timeAgo(tx.timestamp * 1000)}</div>
                  <div className="text-xs text-muted-foreground tabular-nums">
                    Block #{tx.blockNumber.toLocaleString('en-US')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 text-center">
          <Link href="/transactions" className="text-primary hover:underline">
            View all transactions →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function Empty({ probe }: { probe: ReturnType<typeof useChainState>['probe'] }) {
  if (!probe) return <p className="py-6 text-center text-muted-foreground">Reading the chain…</p>
  if (!probe.ok) {
    return (
      <p className="py-6 text-center text-red-500">
        Transactions are unavailable — {grade(probe).reason}
      </p>
    )
  }
  return (
    <p className="py-6 text-center text-muted-foreground">
      The most recent blocks carried no transactions. They were read successfully, so this is the
      chain&apos;s real content.
    </p>
  )
}

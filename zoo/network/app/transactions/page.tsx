'use client'

import { TransactionList } from '@/components/transaction-list'

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          View all transactions on the Zoo Network
        </p>
      </div>
      <TransactionList />
    </div>
  )
}
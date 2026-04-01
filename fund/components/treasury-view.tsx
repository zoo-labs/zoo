'use client'

import { useState } from 'react'

export interface Asset {
  symbol: string
  name: string
  balance: string
  value: string
  logo?: string
  address: string
}

export interface Transaction {
  id: string
  type: 'incoming' | 'outgoing'
  amount: string
  asset: string
  from: string
  to: string
  timestamp: string
  txHash: string
}

interface TreasuryViewProps {
  daoId: string
  assets: Asset[]
  transactions: Transaction[]
  multisigAddress: string
}

export function TreasuryView({
  daoId,
  assets,
  transactions,
  multisigAddress,
}: TreasuryViewProps) {
  const [selectedAsset, setSelectedAsset] = useState<string>('all')
  const [showTransactions, setShowTransactions] = useState(20)

  const totalValue = assets.reduce((sum, asset) => {
    const value = parseFloat(asset.value.replace(/[$,]/g, ''))
    return sum + value
  }, 0)

  const filteredTransactions = transactions
    .filter(tx => selectedAsset === 'all' || tx.asset === selectedAsset)
    .slice(0, showTransactions)

  return (
    <div className="space-y-8">
      {/* Treasury Overview */}
      <div className="bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 border border-[#667eea]/20 rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Total Treasury Value</h3>
            <p className="text-4xl font-black text-[#667eea]">
              ${totalValue.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60 mb-1">Multisig Address</p>
            <a
              href={`https://basescan.org/address/${multisigAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-[#667eea] hover:text-[#764ba2] transition-colors"
            >
              {multisigAddress.slice(0, 6)}...{multisigAddress.slice(-4)}
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-xs text-white/60 mb-1">Assets</p>
            <p className="text-2xl font-bold">{assets.length}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-xs text-white/60 mb-1">Transactions</p>
            <p className="text-2xl font-bold">{transactions.length}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-xs text-white/60 mb-1">Incoming (24h)</p>
            <p className="text-2xl font-bold text-green-400">
              {
                transactions.filter(
                  tx =>
                    tx.type === 'incoming' &&
                    new Date(tx.timestamp).getTime() > Date.now() - 86400000
                ).length
              }
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-xs text-white/60 mb-1">Outgoing (24h)</p>
            <p className="text-2xl font-bold text-red-400">
              {
                transactions.filter(
                  tx =>
                    tx.type === 'outgoing' &&
                    new Date(tx.timestamp).getTime() > Date.now() - 86400000
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      {/* Assets Section */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map(asset => (
            <div
              key={asset.address}
              className="bg-white/3 border border-white/10 rounded-xl p-6 hover:border-[#667eea]/50 hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                {asset.logo ? (
                  <img
                    src={asset.logo}
                    alt={asset.symbol}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#667eea]/20 flex items-center justify-center">
                    <span className="text-xl font-bold">{asset.symbol[0]}</span>
                  </div>
                )}
                <div>
                  <h4 className="font-bold">{asset.symbol}</h4>
                  <p className="text-xs text-white/60">{asset.name}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-[#667eea]">{asset.balance}</p>
                <p className="text-sm text-white/60">{asset.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h3 className="text-2xl font-bold">Recent Transactions</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedAsset('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedAsset === 'all'
                  ? 'bg-[#667eea] text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              All Assets
            </button>
            {assets.slice(0, 3).map(asset => (
              <button
                key={asset.address}
                onClick={() => setSelectedAsset(asset.symbol)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedAsset === asset.symbol
                    ? 'bg-[#667eea] text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {asset.symbol}
              </button>
            ))}
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 bg-white/3 border border-white/10 rounded-xl">
            <p className="text-white/60">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map(tx => (
              <div
                key={tx.id}
                className="bg-white/3 border border-white/10 rounded-xl p-4 hover:border-[#667eea]/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          tx.type === 'incoming'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {tx.type === 'incoming' ? '↓ Incoming' : '↑ Outgoing'}
                      </span>
                      <span className="text-lg font-bold">
                        {tx.amount} {tx.asset}
                      </span>
                    </div>
                    <div className="text-sm text-white/60 space-y-1">
                      <p>
                        From:{' '}
                        <span className="font-mono">
                          {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                        </span>
                      </p>
                      <p>
                        To:{' '}
                        <span className="font-mono">
                          {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm text-white/60">
                      {new Date(tx.timestamp).toLocaleString()}
                    </p>
                    <a
                      href={`https://basescan.org/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#667eea] hover:text-[#764ba2] transition-colors"
                    >
                      View on Basescan →
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {filteredTransactions.length < transactions.length && (
              <button
                onClick={() => setShowTransactions(prev => prev + 20)}
                className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
              >
                Load More Transactions
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

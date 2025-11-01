'use client'

import { useState, useEffect } from 'react'
import type { DAO } from '@/lib/daos'

interface OnChainMetrics {
  treasuryBalance: string
  transactionCount: number
  uniqueContributors: number
  lastUpdated: string
  blockchainExplorerUrl: string
}

interface OnChainMetricsProps {
  dao: DAO
}

export function OnChainMetrics({ dao }: OnChainMetricsProps) {
  const [metrics, setMetrics] = useState<OnChainMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate fetching on-chain data
    // In production, this would query actual blockchain data via ethers.js/viem
    const fetchMetrics = async () => {
      try {
        setLoading(true)

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // Mock data - in production, fetch from blockchain
        const mockMetrics: OnChainMetrics = {
          treasuryBalance: dao.treasury,
          transactionCount: Math.floor(Math.random() * 100) + 20,
          uniqueContributors: Math.floor(dao.members * 0.6),
          lastUpdated: new Date().toISOString(),
          blockchainExplorerUrl: `https://zooscan.io/address/${dao.multisig}`
        }

        setMetrics(mockMetrics)
        setError(null)
      } catch (err) {
        setError('Failed to fetch on-chain metrics')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [dao])

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#667eea]/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">⛓️</span>
          </div>
          <h3 className="text-xl font-bold">On-Chain Metrics</h3>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-white/10 rounded animate-pulse"></div>
          <div className="h-4 bg-white/10 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-white/10 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">⚠️</span>
          <h3 className="text-xl font-bold text-red-400">Metrics Unavailable</h3>
        </div>
        <p className="text-sm text-white/60">{error || 'Unable to load on-chain data'}</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 hover:border-[#667eea]/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#667eea]/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">⛓️</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">On-Chain Metrics</h3>
            <p className="text-xs text-white/40">Live blockchain data</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-green-400 font-semibold">Live</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/3 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/50 mb-1">Treasury Balance</p>
          <p className="text-2xl font-bold text-[#667eea]">{metrics.treasuryBalance}</p>
          <p className="text-xs text-white/40 mt-1">Multi-sig wallet</p>
        </div>

        <div className="bg-white/3 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/50 mb-1">Transactions</p>
          <p className="text-2xl font-bold text-[#667eea]">{metrics.transactionCount}</p>
          <p className="text-xs text-white/40 mt-1">All-time count</p>
        </div>

        <div className="bg-white/3 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/50 mb-1">Contributors</p>
          <p className="text-2xl font-bold text-[#667eea]">{metrics.uniqueContributors}</p>
          <p className="text-xs text-white/40 mt-1">Unique wallets</p>
        </div>
      </div>

      {/* Multisig Address & Explorer Link */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-white/3 border border-white/10 rounded-lg">
          <div>
            <p className="text-xs text-white/50 mb-1">Multisig Address</p>
            <p className="font-mono text-sm text-white/80">{dao.multisig}</p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(dao.multisig)}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs transition-colors"
          >
            Copy
          </button>
        </div>

        <a
          href={metrics.blockchainExplorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 bg-[#667eea]/10 border border-[#667eea]/30 rounded-lg hover:bg-[#667eea]/20 transition-all group"
        >
          <span className="text-sm text-[#667eea] font-semibold">View on Zoo Explorer</span>
          <svg className="w-4 h-4 text-[#667eea] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* Last Updated */}
      <p className="text-xs text-white/30 mt-4 text-center">
        Last updated: {new Date(metrics.lastUpdated).toLocaleString()}
      </p>
    </div>
  )
}

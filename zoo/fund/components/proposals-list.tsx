'use client'

import { useState } from 'react'
import Link from 'next/link'

export type ProposalStatus = 'active' | 'passed' | 'rejected' | 'executed' | 'expired'

export interface Proposal {
  id: string
  title: string
  description: string
  proposer: string
  status: ProposalStatus
  votesFor: string
  votesAgainst: string
  totalVotes: string
  quorum: string
  startDate: string
  endDate: string
  executionDate?: string
  actions?: {
    target: string
    value: string
    signature: string
    calldata: string
  }[]
}

interface ProposalsListProps {
  daoId: string
  proposals: Proposal[]
}

const statusColors: Record<ProposalStatus, string> = {
  active: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  passed: 'bg-green-500/20 text-green-300 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
  executed: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  expired: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
}

const statusLabels: Record<ProposalStatus, string> = {
  active: 'Active',
  passed: 'Passed',
  rejected: 'Rejected',
  executed: 'Executed',
  expired: 'Expired',
}

export function ProposalsList({ daoId, proposals }: ProposalsListProps) {
  const [filter, setFilter] = useState<ProposalStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')

  const filteredProposals = proposals
    .filter(p => filter === 'all' || p.status === filter)
    .sort((a, b) => {
      const aDate = new Date(a.startDate).getTime()
      const bDate = new Date(b.startDate).getTime()
      return sortBy === 'newest' ? bDate - aDate : aDate - bDate
    })

  const calculateProgress = (proposal: Proposal) => {
    const forVotes = parseFloat(proposal.votesFor.replace(/,/g, ''))
    const againstVotes = parseFloat(proposal.votesAgainst.replace(/,/g, ''))
    const total = forVotes + againstVotes
    if (total === 0) return { forPercent: 0, againstPercent: 0 }
    return {
      forPercent: (forVotes / total) * 100,
      againstPercent: (againstVotes / total) * 100,
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-[#667eea] text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            All
          </button>
          {(Object.keys(statusLabels) as ProposalStatus[]).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === status
                  ? 'bg-[#667eea] text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {statusLabels[status]}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('newest')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'newest'
                ? 'bg-[#667eea] text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy('oldest')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'oldest'
                ? 'bg-[#667eea] text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Oldest
          </button>
        </div>
      </div>

      {/* Proposals List */}
      {filteredProposals.length === 0 ? (
        <div className="text-center py-12 bg-white/3 border border-white/10 rounded-xl">
          <p className="text-white/60">No proposals found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProposals.map(proposal => {
            const { forPercent, againstPercent } = calculateProgress(proposal)
            return (
              <Link
                key={proposal.id}
                href={`/${daoId}/proposals/${proposal.id}`}
                className="block group"
              >
                <div className="bg-white/3 border border-white/10 rounded-xl p-6 hover:border-[#667eea]/50 hover:bg-white/5 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold group-hover:text-[#667eea] transition-colors">
                          {proposal.title}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[proposal.status]}`}
                        >
                          {statusLabels[proposal.status]}
                        </span>
                      </div>
                      <p className="text-sm text-white/60 line-clamp-2">
                        {proposal.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 text-sm">
                      <p className="text-white/60">
                        Started: {new Date(proposal.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-white/60">
                        {proposal.status === 'active'
                          ? `Ends: ${new Date(proposal.endDate).toLocaleDateString()}`
                          : `Ended: ${new Date(proposal.endDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">
                        For: {proposal.votesFor} ({forPercent.toFixed(1)}%)
                      </span>
                      <span className="text-red-400">
                        Against: {proposal.votesAgainst} ({againstPercent.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden flex">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: `${forPercent}%` }}
                      />
                      <div
                        className="bg-red-500 h-full"
                        style={{ width: `${againstPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Total Votes: {proposal.totalVotes}</span>
                      <span>Quorum: {proposal.quorum}</span>
                    </div>
                  </div>

                  {/* Proposer */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-white/60">
                      Proposed by:{' '}
                      <span className="text-white/80 font-mono">
                        {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import type { DAO } from '@/lib/daos'

interface FundingCardProps {
  dao: DAO
}

export function FundingCard({ dao }: FundingCardProps) {
  const { isConnected } = useAccount()
  const [amount, setAmount] = useState('')

  const raisedAmount = parseFloat(dao.raised.replace(/[$,]/g, ''))
  const goalAmount = parseFloat(dao.goal.replace(/[$,]/g, ''))
  const percentage = Math.round((raisedAmount / goalAmount) * 100)

  const handleFund = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    // In production, this would interact with smart contracts
    console.log(`Funding ${dao.name} with $${amount}`)
    alert(`Thank you for your contribution to ${dao.name}!\n\nAmount: $${amount}\nEIN: 88-3538992\n\nYour donation supports wildlife conservation efforts.`)
    setAmount('')
  }

  return (
    <div className="bg-white/3 border border-white/10 rounded-2xl p-8 sticky top-20 animate-scaleIn">
      <div className="mb-6">
        <div className="flex justify-between mb-3">
          <span className="text-3xl font-bold">{dao.raised}</span>
          <span className="text-sm text-white/60">{percentage}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/60">
          <span>Raised of {dao.goal}</span>
          <span>Ongoing</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Contribution Amount (USD)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-200"
          />
        </div>

        <button
          onClick={handleFund}
          className="w-full bg-white text-black font-semibold py-3.5 rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-200"
        >
          Fund This Project
        </button>

        <div className="flex gap-3">
          <button className="flex-1 bg-white/5 border border-white/10 text-white py-2.5 rounded-lg text-sm hover:bg-white/8 hover:scale-105 transition-all duration-200">
            Share on 𝕏
          </button>
          <button className="flex-1 bg-white/5 border border-white/10 text-white py-2.5 rounded-lg text-sm hover:bg-white/8 hover:scale-105 transition-all duration-200">
            Copy Link
          </button>
        </div>
      </div>
    </div>
  )
}

import { Proposal } from '@/components/proposals-list'
import { Asset, Transaction } from '@/components/treasury-view'

// Sample proposals data for each DAO
export const daoProposals: Record<string, Proposal[]> = {
  ocean: [
    {
      id: 'prop-1',
      title: 'Fund Marine DNA Sequencing Project in the Pacific',
      description:
        'Allocate $500,000 to expand our eDNA sampling coverage across the Pacific Ocean, focusing on deep-sea ecosystems and coral reef biodiversity hotspots.',
      proposer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      status: 'active',
      votesFor: '2,450,000',
      votesAgainst: '125,000',
      totalVotes: '2,575,000',
      quorum: '2,000,000',
      startDate: '2025-01-20T10:00:00Z',
      endDate: '2025-02-03T10:00:00Z',
    },
    {
      id: 'prop-2',
      title: 'Partnership with Ocean Conservancy for Plastic Cleanup',
      description:
        'Establish a joint initiative with Ocean Conservancy to deploy AI-powered plastic tracking systems in 50 coastal regions.',
      proposer: '0x8fa3b4570B4C96f8e1C6D2a5E4D9c7b5A3f2D8e1',
      status: 'passed',
      votesFor: '3,200,000',
      votesAgainst: '450,000',
      totalVotes: '3,650,000',
      quorum: '2,000,000',
      startDate: '2025-01-05T10:00:00Z',
      endDate: '2025-01-19T10:00:00Z',
      executionDate: '2025-01-20T12:00:00Z',
    },
    {
      id: 'prop-3',
      title: 'Deploy Underwater AI Monitoring Stations',
      description:
        'Install 100 autonomous AI monitoring stations to track marine biodiversity and ocean health metrics in real-time.',
      proposer: '0x9c7A5E2D8B4F6c3A1E9f8D7c6B5A4F3e2D1C0B9',
      status: 'executed',
      votesFor: '4,100,000',
      votesAgainst: '200,000',
      totalVotes: '4,300,000',
      quorum: '2,000,000',
      startDate: '2024-12-10T10:00:00Z',
      endDate: '2024-12-24T10:00:00Z',
      executionDate: '2024-12-25T14:00:00Z',
    },
  ],
  zen: [
    {
      id: 'prop-1',
      title: 'Release ZenLM 1.0 - Edge AI Model for Conservation',
      description:
        'Deploy the first production-ready ZenLM model optimized for wildlife monitoring on edge devices with minimal power consumption.',
      proposer: '0x5D3f9E2A8C4b6F1D0e9A8C7B5d4F3E2a1B0C9D8',
      status: 'active',
      votesFor: '1,850,000',
      votesAgainst: '75,000',
      totalVotes: '1,925,000',
      quorum: '1,500,000',
      startDate: '2025-01-22T10:00:00Z',
      endDate: '2025-02-05T10:00:00Z',
    },
    {
      id: 'prop-2',
      title: 'Grant Program for AI Conservation Applications',
      description:
        'Establish a $2M grant program to fund developers building conservation tools using ZenLM and related AI technologies.',
      proposer: '0x6E4A8B3C9D7F2E1A0B5C8D6E9F1A2B4C7D0E3F5',
      status: 'passed',
      votesFor: '2,300,000',
      votesAgainst: '150,000',
      totalVotes: '2,450,000',
      quorum: '1,500,000',
      startDate: '2025-01-08T10:00:00Z',
      endDate: '2025-01-22T10:00:00Z',
    },
  ],
  shark: [
    {
      id: 'prop-1',
      title: 'Expand Shark Tagging Program to 500 New Individuals',
      description:
        'Increase our tagging efforts to include great whites, hammerheads, and whale sharks across 10 new ocean regions.',
      proposer: '0x7F5B9D4E2A8C6F3B1D0E9A7C5F4E3B2A1D0C8B7',
      status: 'active',
      votesFor: '980,000',
      votesAgainst: '45,000',
      totalVotes: '1,025,000',
      quorum: '750,000',
      startDate: '2025-01-18T10:00:00Z',
      endDate: '2025-02-01T10:00:00Z',
    },
  ],
  sparrow: [
    {
      id: 'prop-1',
      title: 'Urban Bird Monitoring Network Expansion',
      description:
        'Deploy 1,000 AI-powered monitoring stations in 50 cities to track urban bird population trends and habitat usage.',
      proposer: '0x8G6C0E5B3A9D7F4C2E1B0A8D6F5C4E3B2A1D0C9',
      status: 'active',
      votesFor: '650,000',
      votesAgainst: '30,000',
      totalVotes: '680,000',
      quorum: '500,000',
      startDate: '2025-01-21T10:00:00Z',
      endDate: '2025-02-04T10:00:00Z',
    },
  ],
}

// Sample treasury data for each DAO
export const daoAssets: Record<string, Asset[]> = {
  ocean: [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '2,450,000',
      value: '$2,450,000',
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '125.5',
      value: '$315,000',
      address: '0x0000000000000000000000000000000000000000',
    },
    {
      symbol: 'OCEAN',
      name: 'OceanDAO Token',
      balance: '5,000,000',
      value: '$1,250,000',
      address: '0x1234567890abcdef1234567890abcdef12345678',
    },
  ],
  zen: [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '1,800,000',
      value: '$1,800,000',
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '85.2',
      value: '$214,000',
      address: '0x0000000000000000000000000000000000000000',
    },
    {
      symbol: 'ZEN',
      name: 'ZenDAO Token',
      balance: '10,000,000',
      value: '$2,500,000',
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
    },
  ],
  shark: [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '750,000',
      value: '$750,000',
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '42.8',
      value: '$107,500',
      address: '0x0000000000000000000000000000000000000000',
    },
  ],
  sparrow: [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '620,000',
      value: '$620,000',
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '35.6',
      value: '$89,000',
      address: '0x0000000000000000000000000000000000000000',
    },
  ],
}

export const daoTransactions: Record<string, Transaction[]> = {
  ocean: [
    {
      id: 'tx-1',
      type: 'incoming',
      amount: '500,000',
      asset: 'USDC',
      from: '0x9c7A5E2D8B4F6c3A1E9f8D7c6B5A4F3e2D1C0B9',
      to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      timestamp: '2025-01-25T14:30:00Z',
      txHash: '0xabc123def456789abc123def456789abc123def456789abc123def456789abc1',
    },
    {
      id: 'tx-2',
      type: 'outgoing',
      amount: '150,000',
      asset: 'USDC',
      from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      to: '0x5D3f9E2A8C4b6F1D0e9A8C7B5d4F3E2a1B0C9D8',
      timestamp: '2025-01-24T10:15:00Z',
      txHash: '0xdef456789abc123def456789abc123def456789abc123def456789abc123de2',
    },
    {
      id: 'tx-3',
      type: 'incoming',
      amount: '25.5',
      asset: 'ETH',
      from: '0x6E4A8B3C9D7F2E1A0B5C8D6E9F1A2B4C7D0E3F5',
      to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      timestamp: '2025-01-23T16:45:00Z',
      txHash: '0x789abc123def456789abc123def456789abc123def456789abc123def456783',
    },
  ],
  zen: [
    {
      id: 'tx-1',
      type: 'incoming',
      amount: '300,000',
      asset: 'USDC',
      from: '0x7F5B9D4E2A8C6F3B1D0E9A7C5F4E3B2A1D0C8B7',
      to: '0x5D3f9E2A8C4b6F1D0e9A8C7B5d4F3E2a1B0C9D8',
      timestamp: '2025-01-26T09:20:00Z',
      txHash: '0x456789abc123def456789abc123def456789abc123def456789abc123def454',
    },
  ],
  shark: [
    {
      id: 'tx-1',
      type: 'incoming',
      amount: '200,000',
      asset: 'USDC',
      from: '0x8G6C0E5B3A9D7F4C2E1B0A8D6F5C4E3B2A1D0C9',
      to: '0x7F5B9D4E2A8C6F3B1D0E9A7C5F4E3B2A1D0C8B7',
      timestamp: '2025-01-27T11:00:00Z',
      txHash: '0x123def456789abc123def456789abc123def456789abc123def456789abc125',
    },
  ],
  sparrow: [
    {
      id: 'tx-1',
      type: 'incoming',
      amount: '150,000',
      asset: 'USDC',
      from: '0x9c7A5E2D8B4F6c3A1E9f8D7c6B5A4F3e2D1C0B9',
      to: '0x8G6C0E5B3A9D7F4C2E1B0A8D6F5C4E3B2A1D0C9',
      timestamp: '2025-01-28T13:30:00Z',
      txHash: '0xabc789def123abc789def123abc789def123abc789def123abc789def123ab6',
    },
  ],
}

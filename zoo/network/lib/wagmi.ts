import { createConfig, http } from 'wagmi'
import { mainnet, bsc, bscTestnet } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Define Zoo custom chain
export const zooMainnet = {
  id: 200, // Zoo chain ID
  name: 'Zoo Network',
  nativeCurrency: {
    name: 'ZOO',
    symbol: 'ZOO',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['http://localhost:8545'] }, // Will be updated with actual RPC
    public: { http: ['http://localhost:8545'] },
  },
  blockExplorers: {
    default: { name: 'Zoo Explorer', url: 'http://localhost:3003' },
  },
  testnet: false,
} as const

export const config = getDefaultConfig({
  appName: 'Zoo Network Explorer',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [zooMainnet, bsc, bscTestnet, mainnet],
  transports: {
    [zooMainnet.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
})
import { http } from 'wagmi'
import { mainnet, bsc, bscTestnet } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { CHAIN_ID, RPC_URL } from './chain'

// Zoo mainnet.
//
// This was declared as chain id 200 pointing at http://localhost:8545 with a
// "will be updated with actual RPC" comment, so a connected wallet was on the
// wrong network and every read went nowhere. Verified against the live endpoint:
// eth_chainId → 0x30e08 = 200200.
export const zooMainnet = {
  id: CHAIN_ID,
  name: 'Zoo Network',
  nativeCurrency: {
    name: 'ZOO',
    symbol: 'ZOO',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [RPC_URL] },
    public: { http: [RPC_URL] },
  },
  blockExplorers: {
    default: { name: 'Zoo Network Explorer', url: 'https://zoo.network' },
  },
  testnet: false,
} as const

export const config = getDefaultConfig({
  appName: 'Zoo Network Explorer',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [zooMainnet, bsc, bscTestnet, mainnet],
  transports: {
    [zooMainnet.id]: http(RPC_URL),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
})

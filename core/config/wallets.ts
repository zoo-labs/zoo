//import { AbstractConnector } from '@web3-react/abstract-connector'
import { ChainId } from '@zoolabs/zdk'
//import { InjectedConnector } from '@web3-react/injected-connector'
// import { NetworkConnector } from '../entities/NetworkConnector'
import RPC from './rpc'
import { AVAILABLE_NETWORKS, SUPPORTED_NETWORKS } from './networks'
//import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask'
//import { hooks as walletConnectHooks, walletConnect } from '../connectors/walletConnect'
//import { coinbaseWallet } from '../connectors/coinbaseWallet'
// export const network = new NetworkConnector({
//   defaultChainId: 1,
//   urls: RPC,
// })

const supportedChainIds = Object.values(AVAILABLE_NETWORKS) as number[]

//export const injected = new InjectedConnector({
//  supportedChainIds,
//})

// export interface WalletInfo {
//   connector?: (() => Promise<AbstractConnector>) | AbstractConnector
//   name: string
//   iconName: string
//   description: string
//   href: string | null
//   color: string
//   primary?: true
//   mobile?: true
//   mobileOnly?: true
// }

// export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
//   INJECTED: {
//     connector: injected,
//     name: 'Injected',
//     iconName: 'injected.svg',
//     description: 'Injected web3 provider.',
//     href: null,
//     color: '#010101',
//     primary: true,
//   },
//   METAMASK: {
//     connector: injected,
//     name: 'MetaMask',
//     iconName: 'metamask.png',
//     description: 'Easy-to-use browser extension.',
//     href: null,
//     color: '#E8831D',
//   },
//   WALLET_CONNECT: {
//     connector: async () => {
//       const WalletConnectConnector = (await import('@web3-react/walletconnect-connector')).WalletConnectConnector
//       return new WalletConnectConnector({
//         rpc: RPC,
//         bridge: 'https://bridge.walletconnect.org',
//         qrcode: true,
//         // pollingInterval: 15000,
//       })
//     },
//     name: 'WalletConnect',
//     iconName: 'wallet-connect.svg',
//     description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
//     href: null,
//     color: '#4196FC',
//     mobile: true,
//   },
//   WALLET_LINK: {
//     connector: async () => {
//       const WalletLinkConnector = (await import('@web3-react/walletlink-connector')).WalletLinkConnector
//       return new WalletLinkConnector({
//         url: RPC[ChainId.MAINNET],
//         appName: 'SushiSwap',
//         appLogoUrl: 'https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png',
//       })
//     },
//     name: 'Coinbase Wallet',
//     iconName: 'coinbase.svg',
//     description: 'Use Coinbase Wallet app on mobile device',
//     href: null,
//     color: '#315CF5',
//   },
//   COINBASE_LINK: {
//     name: 'Open in Coinbase Wallet',
//     iconName: 'coinbase.svg',
//     description: 'Open in Coinbase Wallet app.',
//     href: 'https://go.cb-w.com',
//     color: '#315CF5',
//     mobile: true,
//     mobileOnly: true,
//   },
//   Binance: {
//     connector: async () => {
//       const BscConnector = (await import('@binance-chain/bsc-connector')).BscConnector
//       return new BscConnector({
//         supportedChainIds: [56],
//       })
//     },
//     name: 'Binance',
//     iconName: 'bsc.jpg',
//     description: 'Login using Binance hosted wallet',
//     href: null,
//     color: '#F0B90B',
//     mobile: true,
//   },
// }

export interface WalletInfo {
  connector?: (() => Promise<any>) | any
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}
export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  // INJECTED: {
  //   connector: injected,
  //   name: 'Injected',
  //   iconName: 'injected.svg',
  //   description: 'Injected web3 provider.',
  //   href: null,
  //   color: '#010101',
  //   primary: true,
  // },
  METAMASK: {
    //connector: metaMask,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
    mobile: true
  },
  WALLET_CONNECT: {
    mobile: true,
    //connector: walletConnect,
    name: 'WalletConnect',
    iconName: 'wallet-connect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
  },
  COINBASE: {
    //connector: coinbaseWallet,
    name: 'Coinbase Wallet',
    iconName: 'coinbase.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbase.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true,
  },
  Binance: {
    //connector: async () => {
    //  const BscConnector = (await import('@binance-chain/bsc-connector')).BscConnector
    //  return new BscConnector({
    //    supportedChainIds: [56],
    //  })
    //},
    name: 'Binance',
    iconName: 'bsc.jpg',
    description: 'Login using Binance hosted wallet',
    href: null,
    color: '#F0B90B',
    mobile: true,
  },
  TrustWallet: {
    mobile: true,
    //connector: walletConnect,
    name: 'TrustWallet',
    iconName: 'trust-wallet.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
  }
}

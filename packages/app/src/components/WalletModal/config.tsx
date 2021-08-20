import Metamask from './icons/Metamask'
import WalletConnect from './icons/WalletConnect'
import { Config, ConnectorNames } from './types'

const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
  },
  // {
  //   title: "TrustWallet",
  //   icon: TrustWallet,
  //   connectorId: ConnectorNames.Injected,
  // },
  // {
  //   title: "MathWallet",
  //   icon: MathWallet,
  //   connectorId: ConnectorNames.Injected,
  // },
  // {
  //   title: "TokenPocket",
  //   icon: TokenPocket,
  //   connectorId: ConnectorNames.Injected,
  // },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
  // {
  //   title: "Binance Chain Wallet",
  //   icon: BinanceChain,
  //   connectorId: ConnectorNames.BSC,
  // },
  // {
  //   title: "SafePal Wallet",
  //   icon: SafePalWallet,
  //   connectorId: ConnectorNames.Injected,
  // },
]

export default connectors
export const connectorLocalStorageKey = 'connectorId'

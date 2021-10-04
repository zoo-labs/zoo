import { BscConnector } from '@binance-chain/bsc-connector'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ConnectorNames } from 'components'
import { getRandomNode } from './getRandomNode'

const POLLING_INTERVAL = 12000
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 97)

const supportedChainIds = [
  1337, // Hardhat
  56, // BSC Mainnet
  97, // BSC Testnet
]

const injected = new InjectedConnector({ supportedChainIds })

const walletConnect = new WalletConnectConnector({
  rpc: { [chainId]: getRandomNode(chainId) },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({ supportedChainIds: [56, 97] })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletConnect,
  [ConnectorNames.BSC]: bscConnector,
}

export const getLibrary = (provider): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

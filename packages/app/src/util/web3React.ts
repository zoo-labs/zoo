import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import Web3 from 'web3'
import { ConnectorNames } from 'components'
import { getRandomNode } from './getRandomNode'

const POLLING_INTERVAL = 12000
const chainID = parseInt(process.env.REACT_APP_CHAIN_ID, 97)

const supportedChainIds = [
  1337, // Hardhat
  56, // BSC Mainnet
  97, // BSC Testnet
]

const injected = new InjectedConnector({ supportedChainIds })

const walletConnect = new WalletConnectConnector({
  rpc: { [chainID]: getRandomNode(chainID) },
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

export const getLibrary = (provider): Web3 => {
  return provider
}
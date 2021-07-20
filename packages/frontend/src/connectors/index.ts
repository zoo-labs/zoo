import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export enum ConnectorNames {
    Metamask = 'Metamask',
    WalletConnect = 'WalletConnect'
}

const POLLING_INTERVAL = 12000
const RPC_URLS: { [chainId: number]: string } = {
    1: process.env.REACT_APP_RPC_URL_1 as string,
    3: process.env.REACT_APP_RPC_URL_3 as string,
    4: process.env.REACT_APP_RPC_URL_4 as string,
    42: process.env.REACT_APP_RPC_URL_42 as string,
}

export const injected = new InjectedConnector({ supportedChainIds: [5777, 1337, 31337, 42, 4] })

export const walletconnect = new WalletConnectConnector({
    qrcode: true,
    infuraId: process.env.REACT_APP_INFURA_ID,
    rpc: { 42: RPC_URLS[42] }, // TODO: make this dynamic
    chainId: 42,
    supportedChainIds: [1,3,4,42]
})

export const connectorsByName: { [ name in ConnectorNames ]: any } = {
    [ConnectorNames.Metamask]: injected,
    [ConnectorNames.WalletConnect]: walletconnect
}
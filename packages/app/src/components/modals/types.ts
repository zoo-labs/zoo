import { AbstractConnector } from '@web3-react/abstract-connector'
import { SvgProps } from 'components'
import { FC } from 'react'

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  BSC = 'bsc',
}

export type Login = (connectorId: ConnectorNames) => void

export interface Config {
  title: string
  icon: FC<SvgProps>
  connectorId: ConnectorNames
  connector: AbstractConnector
  color: string
}

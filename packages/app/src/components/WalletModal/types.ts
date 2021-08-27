import { FC } from 'react'
import { SvgProps } from '../../components/Svg/types'
import { AbstractConnector } from '@web3-react/abstract-connector'

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

import { TranslatableText } from 'state/types'

export interface Address {
  1337?: string // Localhost
  97?: string // BSC Testnet
  56?: string // BSC Mainnet
}

export interface Token {
  name?: string
  symbol?: string
  address?: Address
  decimals?: number
  projectLink?: string
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type PageMeta = {
  title: string
  description: string
  image: string
}

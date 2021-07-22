import { TranslatableText } from 'state/types'

export interface Address {
    1?: string      // ETH Mainnet
    42?: string     // ETH Kovan
    31337?: string  // StarterApp Devnet
    4?: string      // ETH Rinkeby
    97?: string     // BSC Testnet
    56?: string
    80001?: string  // Mumbai
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

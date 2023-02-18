import { CurrencyAmount, Token } from '@zoolabs/sdk'

type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token>>

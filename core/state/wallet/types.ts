import { CurrencyAmount, Token } from '@zoolabs/zdk'

type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token>>

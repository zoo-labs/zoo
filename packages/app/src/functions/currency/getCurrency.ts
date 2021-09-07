import { AddressZero } from '@ethersproject/constants'
import { ChainId } from '../../constants/Chains'

type Currency = { address: string; decimals: number }

// Pricing currency
// TODO: Check decimals and finish table
export const USD_CURRENCY: { [chainId in ChainId]?: Currency } = {
  [ChainId.MAINNET]: {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
  },
  [ChainId.RINKEBY]: {
    address: '0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02',
    decimals: 6,
  },
  [ChainId.BSC]: {
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    decimals: 18,
  },
  [ChainId.BSC_TESTNET]: {
    address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
    decimals: 18,
  },
}

export function getCurrency(chainId: ChainId | void): Currency {
  return (
    USD_CURRENCY[chainId || 1] || {
      address: AddressZero,
      decimals: 18,
    }
  )
}

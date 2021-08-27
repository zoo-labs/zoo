import { ChainId, JSBI, Percent } from '@sushiswap/sdk'

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))
export const rarityTable = {
    1000: 'COMMON',
    100: 'RARE',
    10: 'EPIC',
    1: 'LEGENDARY',
  }
  
export const breedTimeouts = {
    0: { days: 0, hours: 0 },
    1: { days: 0, hours: 0.0056 }, // changed for demo, originally 1 day
    2: { days: 0, hours: 0.0112 }, // changed for demo, originally 2 days
    3: { days: 0, hours: 0.0224 }, // changed for demo, originally 3 days
    4: { days: 0, hours: 0.0224 }, // changed for demo, originally 4 days
    5: { days: 0, hours: 0.0224 }, // changed for demo, originally 5 days
}
  
  export const eggTimeout = { days: 0, hours: 0.0028 } // changed for demo, originally 1 day 12 hours
  export const ZERO_PERCENT = new Percent('0')
  export const ONE_HUNDRED_PERCENT = new Percent('1')
  export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30
  export const INITIAL_ALLOWED_SLIPPAGE = 50
  export const BIG_INT_ZERO = JSBI.BigInt(0)

  export const EIP_1559_ACTIVATION_BLOCK: { [chainId in ChainId]?: number } = {
    [ChainId.ROPSTEN]: 10499401,
    [ChainId.GÖRLI]: 5062605,
    [ChainId.RINKEBY]: 8897988,
  }
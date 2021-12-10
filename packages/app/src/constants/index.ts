import { ChainId, JSBI, Percent } from '@zoolabs/sdk'

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))
export const rarityTable = {
  1000: 'COMMON',
  100: 'RARE',
  10: 'EPIC',
  1: 'LEGENDARY',
}
export const NetworkContextName = 'NETWORK'

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
  [ChainId.RINKEBY]: 8897988,
}

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)

// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%

// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%

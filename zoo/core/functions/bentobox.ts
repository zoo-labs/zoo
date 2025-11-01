import { BigNumber } from '@ethersproject/bignumber'

export function toAmount(token: any, shares: BigNumber): BigNumber {
  return shares.mul(token.bentoAmount).div(token.bentoShare)
}

export function toShare(token: any, amount: BigNumber): BigNumber {
  return amount.mul(token.bentoShare).div(token.bentoAmount)
}

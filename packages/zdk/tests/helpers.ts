import {
  ERC20__factory,
  Market__factory,
  Media__factory,
} from '@cryptozoo/contracts/types'
import { Wallet } from '@ethersproject/wallet'
import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { MaxUint256 } from '@ethersproject/constants'

export type ZooConfiguredAddresses = {
  media: string
  market: string
  currency: string
}

export async function setupZoo(
  wallet: Wallet,
  testWallets: Array<Wallet>
): Promise<ZooConfiguredAddresses> {
  const market = await (await new Market__factory(wallet).deploy()).deployed()
  const marketAddress = market.address

  const media = await (
    await new Media__factory(wallet).deploy('ZooAnimals', 'ANML', market.address)
  ).deployed()
  const mediaAddress = media.address

  await market.configure(mediaAddress)

  const currency = await (
    await new ERC20__factory(wallet).deploy('TEST', 'TEST', BigNumber.from(18))
  ).deployed()
  const currencyAddress = currency.address

  for (const toWallet of testWallets) {
    await mintCurrency(
      wallet,
      currencyAddress,
      toWallet.address,
      BigNumber.from('10000000000000000000000')
    )
    await approveCurrency(toWallet, currencyAddress, marketAddress)
  }

  return {
    media: mediaAddress,
    market: marketAddress,
    currency: currencyAddress,
  }
}

export async function mintCurrency(
  wallet: Wallet,
  tokenAdress: string,
  to: string,
  amount: BigNumber
): Promise<ContractTransaction> {
  return BaseErc20Factory.connect(tokenAdress, wallet).mint(to, amount)
}

export async function approveCurrency(
  wallet: Wallet,
  tokenAddress: string,
  to: string
): Promise<ContractTransaction> {
  return BaseErc20Factory.connect(tokenAddress, wallet).approve(to, MaxUint256)
}

export async function deployCurrency(
  wallet: Wallet,
  name: string,
  symbol: string,
  decimals: number
): Promise<string> {
  const currency = await (
    await new BaseErc20Factory(wallet).deploy(name, symbol, BigNumber.from(decimals))
  ).deployed()
  return currency.address
}

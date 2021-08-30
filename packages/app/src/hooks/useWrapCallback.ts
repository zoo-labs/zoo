import { ChainId, Currency, NATIVE, WNATIVE } from '@sushiswap/sdk'

<<<<<<< HEAD
import { tryParseAmount } from '../functions/parse'
import { useMemo } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useWETH9Contract } from './useContract'
import { useWeb3React } from '@web3-react/core'
import { useCurrencyBalance } from './useWallet'
=======
import { WETH9_EXTENDED } from '../constants/tokens'
import { tryParseAmount } from '../functions/parse'
import { useActiveWeb3React } from './useActiveWeb3React'
import { useCurrencyBalance } from '../state/wallet/hooks'
import { useMemo } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useWETH9Contract } from './useContract'
>>>>>>> acaaf34 (New app interface)

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
<<<<<<< HEAD
  typedValue: string | undefined,
=======
  typedValue: string | undefined
>>>>>>> acaaf34 (New app interface)
): {
  wrapType: WrapType
  execute?: undefined | (() => Promise<void>)
  inputError?: string
} {
<<<<<<< HEAD
  const { chainId, account } = useWeb3React()
=======
  const { chainId, account } = useActiveWeb3React()
>>>>>>> acaaf34 (New app interface)
  const wethContract = useWETH9Contract()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()

  return useMemo(() => {
<<<<<<< HEAD
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency || chainId === ChainId.CELO) return NOT_APPLICABLE
=======
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency || chainId === ChainId.CELO)
      return NOT_APPLICABLE
>>>>>>> acaaf34 (New app interface)
    const weth = WNATIVE[chainId]
    if (!weth) return NOT_APPLICABLE

    const hasInputAmount = Boolean(inputAmount?.greaterThan('0'))
    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

    if (inputCurrency.isNative && weth.equals(outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await wethContract.deposit({
                    value: `0x${inputAmount.quotient.toString(16)}`,
                  })
                  addTransaction(txReceipt, {
<<<<<<< HEAD
                    summary: `Wrap ${inputAmount.toSignificant(6)} ${NATIVE[chainId].symbol} to ${WNATIVE[chainId].symbol}`,
=======
                    summary: `Wrap ${inputAmount.toSignificant(6)} ${NATIVE[chainId].symbol} to ${
                      WNATIVE[chainId].symbol
                    }`,
>>>>>>> acaaf34 (New app interface)
                  })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
<<<<<<< HEAD
        inputError: sufficientBalance ? undefined : hasInputAmount ? `Insufficient ${NATIVE[chainId].symbol} balance` : `Enter ${NATIVE[chainId].symbol} amount`,
=======
        inputError: sufficientBalance
          ? undefined
          : hasInputAmount
          ? `Insufficient ${NATIVE[chainId].symbol} balance`
          : `Enter ${NATIVE[chainId].symbol} amount`,
>>>>>>> acaaf34 (New app interface)
      }
    } else if (weth.equals(inputCurrency) && outputCurrency.isNative) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await wethContract.withdraw(`0x${inputAmount.quotient.toString(16)}`)
                  addTransaction(txReceipt, {
<<<<<<< HEAD
                    summary: `Unwrap ${inputAmount.toSignificant(6)} ${WNATIVE[chainId].symbol} to ${NATIVE[chainId].symbol}`,
=======
                    summary: `Unwrap ${inputAmount.toSignificant(6)} ${WNATIVE[chainId].symbol} to ${
                      NATIVE[chainId].symbol
                    }`,
>>>>>>> acaaf34 (New app interface)
                  })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
<<<<<<< HEAD
        inputError: sufficientBalance ? undefined : hasInputAmount ? `Insufficient ${WNATIVE[chainId].symbol} balance` : `Enter ${WNATIVE[chainId].symbol} amount`,
=======
        inputError: sufficientBalance
          ? undefined
          : hasInputAmount
          ? `Insufficient ${WNATIVE[chainId].symbol} balance`
          : `Enter ${WNATIVE[chainId].symbol} amount`,
>>>>>>> acaaf34 (New app interface)
      }
    } else {
      return NOT_APPLICABLE
    }
  }, [wethContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction])
}

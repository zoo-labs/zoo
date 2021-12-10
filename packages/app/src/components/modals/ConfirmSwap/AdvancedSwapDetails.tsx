import { ChainId, Currency, CurrencyAmount, Ether, Percent, TradeType, Trade as V2Trade } from '@zoolabs/sdk'
import React, { useMemo } from 'react'

import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'
import { computeRealizedLPFeePercent } from '../../../functions/prices'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useWeb3React } from '@web3-react/core'
import QuestionHelper from 'components/Header/QuestionHelper'

export interface AdvancedSwapDetailsProps {
  trade?: V2Trade<Currency, Currency, TradeType>
  allowedSlippage: Percent
  minerBribe?: string
}

export function AdvancedSwapDetails({ trade, allowedSlippage, minerBribe }: AdvancedSwapDetailsProps) {
  const { i18n } = useLingui()

  const { chainId } = useWeb3React()

  const { realizedLPFee, priceImpact } = useMemo(() => {
    if (!trade) return { realizedLPFee: undefined, priceImpact: undefined }

    const realizedLpFeePercent = computeRealizedLPFeePercent(trade)
    const realizedLPFee = trade.inputAmount.multiply(realizedLpFeePercent)

    const priceImpact = trade.priceImpact.subtract(realizedLpFeePercent)

    return { priceImpact, realizedLPFee }
  }, [trade])

  return !trade ? null : (
    <div className='flex flex-col space-y-2'>
      <div className='flex flex-row items-center justify-between'>
        <span className='flex items-center'>
          <div className='text-sm text-secondary'>{i18n._(t`Route`)}</div>
          <QuestionHelper show text={i18n._(t`Routing through these tokens resulted in the best price for your trade.`)} />
        </span>
        <SwapRoute trade={trade} />
      </div>

      <div>
        <div>
          <div className='text-sm text-secondary'>{trade.tradeType === TradeType.EXACT_INPUT ? i18n._(t`Minimum received`) : i18n._(t`Maximum sent`)}</div>
          <QuestionHelper show text={i18n._(t`Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.`)} />
        </div>
        <div>
          <div className='text-sm font-bold text-high-emphesis'>
            {trade.tradeType === TradeType.EXACT_INPUT
              ? `${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${trade.outputAmount.currency.symbol}`
              : `${trade.maximumAmountIn(allowedSlippage).toSignificant(6)} ${trade.inputAmount.currency.symbol}`}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className='text-sm text-secondary'>{i18n._(t`Price Impact`)}</div>
          <QuestionHelper show text={i18n._(t`The difference between the market price and estimated price due to trade size.`)} />
        </div>
        <FormattedPriceImpact priceImpact={priceImpact} />
      </div>

      <div>
        <div>
          <div className='text-sm text-secondary'>{i18n._(t`Liquidity Provider Fee`)}</div>
          <QuestionHelper show text={i18n._(t`A portion of each trade (0.25%) goes to liquidity providers as a protocol incentive.`)} />
        </div>
        <div className='text-sm font-bold text-high-emphesis'>
          {realizedLPFee ? `${realizedLPFee.divide(6).multiply(5).toSignificant(4)} ${realizedLPFee.currency.symbol}` : '-'}
        </div>
      </div>

      <div>
        <div>
          <div className='text-sm text-secondary'>{i18n._(t`xSUSHI Fee`)}</div>
          <QuestionHelper show text={i18n._(t`A portion of each trade (0.05%) goes to xSUSHI holders as a protocol incentive.`)} />
        </div>
        <div className='text-sm font-bold text-high-emphesis'>{realizedLPFee ? `${realizedLPFee.divide(6).toSignificant(4)} ${realizedLPFee.currency.symbol}` : '-'}</div>
      </div>

      <div>
        <div>
          <div className='text-sm text-secondary'>{i18n._(t`Slippage tolerance`)}</div>
          <QuestionHelper show text={i18n._(t`Slippage tolerance...`)} />
        </div>
        <div className='text-sm font-bold text-high-emphesis'>{allowedSlippage.toFixed(2)}%</div>
      </div>

      {minerBribe && (
        <div>
          <div>
            <div className='text-sm text-secondary'>{i18n._(t`Miner Tip`)}</div>
            <QuestionHelper show text={i18n._(t`Tip to encourage miners to select this transaction.`)} />
          </div>
          <div className='text-sm font-bold text-high-emphesis'>{CurrencyAmount.fromRawAmount(Ether.onChain(ChainId.MAINNET), minerBribe).toFixed(4)} ETH</div>
        </div>
      )}
    </div>
  )
}

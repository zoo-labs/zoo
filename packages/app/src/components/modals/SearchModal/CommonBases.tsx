import { ChainId, Currency, Token, currencyEquals } from '@zoolabs/sdk'

import { Button } from '../../Button'
import { COMMON_BASES } from '../../../config/routing'
import React from 'react'
import { currencyId } from '../../../functions'
import QuestionHelper from 'components/Header/QuestionHelper'
import CurrencyLogo from 'components/CurrencyInputPanel/CurrencyLogo'

export default function CommonBases({ chainId, onSelect, selectedCurrency }: { chainId?: number; selectedCurrency?: Currency | null; onSelect: (currency: Currency) => void }) {
  const bases = typeof chainId !== 'undefined' ? COMMON_BASES[chainId] ?? [] : []

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex flex-row'>
        <QuestionHelper show text='These tokens are commonly paired with other tokens.'>
          <div> Common bases</div>
        </QuestionHelper>
      </div>
      <div className='flex flex-wrap'>
        {bases.map((currency: Currency) => {
          const isSelected = selectedCurrency?.equals(currency)
          return (
            <Button
              variant='empty'
              type='button'
              onClick={() => !isSelected && onSelect(currency)}
              disabled={isSelected}
              key={currencyId(currency)}
              className='flex items-center p-2 m-1 space-x-2 rounded bg-dark-800 hover:bg-dark-700 disabled:bg-dark-1000 disabled:cursor-not-allowed'>
              <CurrencyLogo currency={currency} />
              <h5 className='font-semibold'>{currency.symbol}</h5>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

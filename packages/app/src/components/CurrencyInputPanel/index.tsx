import { Currency, CurrencyAmount, Pair, Percent, Token } from '@zoolabs/sdk'
import React, { ReactNode, useCallback, useState } from 'react'
import { formatCurrencyAmount } from '../../functions'
import selectCoinAnimation from '../../assets/animations/select-coin.json'

import CurrencyLogo from './CurrencyLogo'
import CurrencySearchModal from '../modals/SearchModal/CurrencySearchModal'
import DoubleCurrencyLogo from './DoubleLogo'
import { FiatValue } from './FiatValue'
// import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useWeb3React } from '@web3-react/core'
import { ChevronDownIcon } from 'components/Svg'
import { useCurrencyBalance } from 'hooks/useWallet'
import Lottie from 'lottie-react'

import './index.css'

interface CurrencyInputPanelProps {
  value?: string
  onUserInput?: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  fiatValue?: CurrencyAmount<Token> | null
  priceImpact?: Percent
  id: string
  showCommonBases?: boolean
  renderBalance?: (amount: CurrencyAmount<Currency>) => ReactNode
  locked?: boolean
  customBalanceText?: string
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'Input',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  otherCurrency,
  id,
  showCommonBases,
  renderBalance,
  fiatValue,
  priceImpact,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  locked = false,
  customBalanceText,
}: CurrencyInputPanelProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const newCurrency = currency && currency.symbol === ('ETH' || 'SUSHI') ? { ...currency, symbol: 'ZOO' } : { ...currency, symbol: 'ZOO' }
  return (
    <div id={id} className={`${hideInput ? 'p-4' : 'p-5'} rounded bg-dark-800`}>
      <div className='flex flex-col justify-between space-y-3 sm:space-y-0 sm:flex-row'>
        <div className={'w-full sm:w-2/5'}>
          <button
            type='button'
            className={`${
              !!currency ? 'text-primary' : 'text-high-emphesis'
            } open-currency-select-button h-full outline-none select-none cursor-pointer border-none text-xl font-medium items-center`}
            onClick={() => {
              if (onCurrencySelect) {
                // setModalOpen(true)
              }
            }}>
            <div className='flex'>
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={54} margin={true} />
              ) : currency ? (
                <div className='flex items-center'>
                  {currency.symbol === 'USDT' || currency.symbol === 'SUSHI' ? (
                    currency.chainId === 1 ? (
                      <img src='https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fbsc-network.jpg&w=64&q=75' className='rounded' style={{ width: 54, height: 54 }} />
                    ) : (
                      <img src='/static/images/networks/eth.jpg' className='rounded' style={{ width: 54, height: 54 }} />
                    )
                  ) : (
                    <CurrencyLogo currency={currency} size={'54px'} className='rounded' />
                  )}
                  {/* <CurrencyLogo currency={currency} size={'54px'} className='rounded' /> */}
                </div>
              ) : (
                <div className='rounded bg-dark-700' style={{ maxWidth: 54, maxHeight: 54 }}>
                  <div style={{ width: 54, height: 54 }}>
                    <Lottie animationData={selectCoinAnimation} autoplay loop />
                  </div>
                </div>
              )}
              {pair ? (
                <span className={`pair-name-container ${Boolean(currency && currency.symbol) ? 'text-2xl' : 'text-xs'}`}>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </span>
              ) : (
                <div className='flex flex-1 flex-col items-start justify-center mx-3.5'>
                  {label && <div className='text-xs font-medium text-secondary whitespace-nowrap'>{label}</div>}
                  <div className='flex items-center'>
                    <div className='text-lg font-bold token-symbol-container md:text-2xl'>
                      {(newCurrency && newCurrency.symbol && newCurrency.symbol.length > 20
                        ? newCurrency.symbol.slice(0, 4) + '...' + newCurrency.symbol.slice(newCurrency.symbol.length - 5, newCurrency.symbol.length)
                        : newCurrency?.symbol) || (
                        <div className='px-2 py-1 mt-1 text-xs font-medium bg-transparent border rounded-full hover:bg-primary border-low-emphesis text-secondary whitespace-nowrap '>
                          Select a token
                        </div>
                      )}
                    </div>

                    {/* {!disableCurrencySelect && newCurrency && <ChevronDownIcon width={16} height={16} className='ml-2 stroke-current' />} */}
                  </div>
                </div>
              )}
            </div>
          </button>
        </div>
        {!hideInput && (
          <div className='flex items-center w-full space-x-3 rounded bg-dark-900 focus:bg-dark-700 p-3 sm:w-3/5'>
            <>
              {showMaxButton && selectedCurrencyBalance && (
                <button onClick={onMax} className='text-xs font-medium bg-transparent border rounded-full hover:bg-primary border-low-emphesis text-secondary whitespace-nowrap'>
                  Max
                </button>
              )}
              <input
                id='token-amount-input'
                value={value}
                onChange={(e) => onUserInput(e.target.value)}
                className='relative font-bold outline-none border-none flex-auto overflow-hidden overflow-ellipsis placeholder-low-emphesis focus:placeholder-primary w-0 p-0 text-2xl bg-transparent'
                placeholder='0.0'
                min={1}
                max={79}
                type='number'
                pattern='^[0-9]*[.,]?[0-9]*$'
                title='Token Amount'
                inputMode='decimal'
                style={{ WebkitAppearance: 'none', margin: 0, MozAppearance: 'none' }}
              />
              {!hideBalance && currency && selectedCurrencyBalance ? (
                <div className='flex flex-col'>
                  <div onClick={onMax} className='text-xs font-medium text-right cursor-pointer text-low-emphesis'>
                    {renderBalance ? (
                      renderBalance(selectedCurrencyBalance)
                    ) : (
                      <>
                        {`Balance:`} {formatCurrencyAmount(selectedCurrencyBalance, 4)} {currency.symbol}
                      </>
                    )}
                  </div>
                  <FiatValue fiatValue={fiatValue} priceImpact={priceImpact} />
                </div>
              ) : null}
            </>
          </div>
        )}
      </div>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </div>
  )
}

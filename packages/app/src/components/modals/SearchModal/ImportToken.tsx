import { Currency, Token } from '@zoolabs/sdk'

import { AlertTriangle } from 'react-feather'
import { Button } from '../../Button'
import ListLogo from '../../ListLogo'
import React from 'react'
import { TokenList } from '@uniswap/token-lists/dist/types'
import { getExplorerLink } from '../../../functions/explorer'
import { shortenAddress } from '../../../functions'
import styled from 'styled-components'
import { t, plural } from '@lingui/macro'
import { transparentize } from 'polished'
import { useAddUserToken } from '../../../state/user/hooks'
import { useLingui } from '@lingui/react'
import { useWeb3React } from '@web3-react/core'
import ModalHeader from 'components/NewModal/Header'
import CurrencyLogo from 'components/CurrencyInputPanel/CurrencyLogo'

interface ImportProps {
  tokens: Token[]
  list?: TokenList
  onBack?: () => void
  onDismiss?: () => void
  handleCurrencySelect?: (currency: Currency) => void
}

export function ImportToken({ tokens, list, onBack, onDismiss, handleCurrencySelect }: ImportProps) {
  const { chainId } = useWeb3React()
  const { i18n } = useLingui()

  const addToken = useAddUserToken()
  return (
    <div className='relative w-full space-y-3 overflow-auto'>
      <ModalHeader onBack={onBack} onClose={onDismiss} title={`Import ${plural(tokens.length, { one: 'Token', many: 'Tokens' })}`} />
      <h6 className='text-center'>{i18n._(t`This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade.`)}</h6>
      {tokens.map((token) => {
        return (
          <div key={'import' + token.address} className='.token-warning-container rounded p-5'>
            <div>
              <CurrencyLogo currency={token} size={'32px'} />
              <div>
                <div className='mx-2 text-xl font-medium text-high-emphesis'>{token.symbol}</div>
                <div className='text-sm font-light text-secondary'>{token.name}</div>
              </div>
              {chainId && <a href={getExplorerLink(chainId, token.address, 'address')}>{shortenAddress(token.address)}</a>}
              {list !== undefined ? (
                <div>
                  {list.logoURI && <ListLogo logoURI={list.logoURI} size='16px' />}
                  <div className='ml-2 text-sm text-secondary'>via {list.name}</div>
                </div>
              ) : (
                <div>
                  <div>
                    <AlertTriangle className='stroke-current text-red' size={24} />
                    <div className='ml-1 text-xs font-semibold text-red'>Unknown Source</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
      <Button
        color='gradient'
        onClick={() => {
          tokens.map((token) => addToken(token))
          handleCurrencySelect && handleCurrencySelect(tokens[0])
        }}
        className='.token-dismiss-button'>
        {i18n._(t`Import`)}
      </Button>
    </div>
  )
}

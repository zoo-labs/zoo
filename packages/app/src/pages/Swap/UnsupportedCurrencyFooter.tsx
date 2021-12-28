import { Currency, Token } from '@zoolabs/sdk'
import React, { useState } from 'react'
import { getExplorerLink } from '../../functions/explorer'
import styled from 'styled-components'
import { useUnsupportedTokens } from '../../hooks/Tokens'
import { useWeb3React } from '@web3-react/core'
import { CloseIcon } from 'components'
import Modal from 'components/NewModal'
import CurrencyLogo from 'components/CurrencyInputPanel/CurrencyLogo'

const DetailsFooter = styled.div<{ show: boolean }>`
  padding-top: calc(16px + 2rem);
  padding-bottom: 20px;
  margin-top: -2rem;
  width: 100%;
  //max-width: 400px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: -1;

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
  text-align: center;
`

export default function UnsupportedCurrencyFooter({ show, currencies }: { show: boolean; currencies: (Currency | undefined)[] }) {
  const { chainId } = useWeb3React()
  const [showDetails, setShowDetails] = useState(false)

  const tokens =
    chainId && currencies
      ? currencies.map((currency) => {
          return currency?.wrapped
        })
      : []

  const unsupportedTokens: { [address: string]: Token } = useUnsupportedTokens()

  return (
    <DetailsFooter show={show}>
      <Modal isOpen={showDetails} onDismiss={() => setShowDetails(false)}>
        <div style={{ padding: '2rem' }}>
          <div>
            <div>
              <div>Unsupported Assets</div>

              <CloseIcon onClick={() => setShowDetails(false)} />
            </div>
            {tokens.map((token) => {
              return (
                token &&
                unsupportedTokens &&
                Object.keys(unsupportedTokens).includes(token.address) && (
                  <div className='border border-dark-700' key={token.address?.concat('not-supported')}>
                    <div>
                      <div>
                        <CurrencyLogo currency={token} size={'24px'} />
                        <div className='font-medium'>{token.symbol}</div>
                      </div>
                      {chainId && (
                        <a href={getExplorerLink(chainId, token.address, 'address')}>
                          <p>{token.address}</p>
                        </a>
                      )}
                    </div>
                  </div>
                )
              )
            })}
            <div>
              <div className='font-medium'>
                Some assets are not available through this interface because they may not work well with our smart contract or we are unable to allow trading for legal reasons.
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <button style={{ padding: '0px' }} onClick={() => setShowDetails(true)}>
        <div>Read more about unsupported assets</div>
      </button>
    </DetailsFooter>
  )
}

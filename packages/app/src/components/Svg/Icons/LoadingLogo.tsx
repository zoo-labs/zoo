import React, { memo } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey } from '../../WalletModal/config'
import Logo from './Logo'
import { SvgProps } from '../types'
import Page from '../../layout/Page'

const StarterAppLoadingLogo = styled(Logo)`
  height: 150px;
  width: 150px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 150px;
    width: 150px;
  }
  margin-top: 150px;
  box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
  animation: 5s pulse ease-out infinite;
  fill: white;
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0px fade(@buttonshadow, 30%), 0 0 0 0px fade(@buttonshadow, 20%);
      transform: scale(1);
    }
    50% {
      transform: scale(1.6);
    }
    100% {
      box-shadow: 0 0 0 16px fade(@buttonshadow, 0), 0 0 0 27px fade(@buttonshadow, 0);
      transform: scale(1);
    }
  }
`

const LoadingLogo: React.FC<SvgProps> = memo(() => {
  const Wrapper = styled(Page)`
    display: flex;
    justify-content: center;
    align-content: center;
  `

  let userAccount

  if (window.localStorage.getItem(connectorLocalStorageKey)) {
    const { account } = useWeb3React()
    userAccount = account
  }

  if (!userAccount) {
    return (
      <Wrapper>
        {' '}
        <StarterAppLoadingLogo />{' '}
      </Wrapper>
    )
  }

  return <Wrapper>{userAccount && <StarterAppLoadingLogo />}</Wrapper>
})

export default LoadingLogo

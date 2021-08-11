import React from 'react'
import styled from 'styled-components'
// import { LinkExternalCustom } from 'toolkitUI'
import { useWeb3React } from '@web3-react/core'
// import {scanLinks} from '../../../../constants'

export interface TxHashProps {
  txHash: string
}

// const TxHashWrapper = styled.div`
//   color: ${({ theme }) => theme.colors.text};
//   width: auto;
//   text-align: right;

//   ${({ theme }) => theme.mediaQueries.sm} {
//     text-align: left;
//   }
// `

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 7px;
    }
  }
`

/* const StyledLinkExternal = styled(LinkExternalCustom)`
  font-weight: 400;
` */

const TxHash: React.FunctionComponent<TxHashProps> = ({ txHash }) => {
  /* const { chainId } = useWeb3React()

  const displayTxHash = txHash ? abbreviateAddress(txHash.toLowerCase()) : '-'
  // const TranslateString = useI18n()

  const base = scanLinks[chainId] ? scanLinks[chainId] : 'https://etherscan.io'
  const esc = `${base}/tx/${txHash}`

  function abbreviateAddress(address = "", lengthStart = 6, lengthEnd = 4) {
   return `${address.substring(0, lengthStart)}...${address.substring(
      address.length - lengthEnd,
      address.length
   )}`;
} */

  return (
    <Container>
      {/* <TxHashWrapper>{displayTxHash}</TxHashWrapper> */}
      {/* <StyledLinkExternal href={esc}>{displayTxHash}</StyledLinkExternal> */}
      {/* <Tooltip
        content={
          <div>
            {TranslateString(999, 'A unique identifier that is generated whenever a transaction is performed')}
          </div>
        }
      >
        <HelpIcon color="textSubtle" />
      </Tooltip> */}
    </Container>
  )
}

export default TxHash

import React from 'react'
import styled from 'styled-components'
// import { LinkExternalCustom } from 'components'
import { useWeb3React } from '@web3-react/core'
// import { scanLinks } from '../../../../constants'

export interface BlockProps {
  block: number
}

const BlockWrapper = styled.div`
  // min-width: 110px;
  width: auto;
  font-weight: 600;
  text-align: right;

  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
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

const Block: React.FunctionComponent<BlockProps> = ({ block }) => {
  const { chainId } = useWeb3React()

  const displayBlock = block ? `${Number(block)}` : '-'

  /*   const base = scanLinks[chainId] ? scanLinks[chainId] : 'https://etherscan.io'
  const escBlock = `${base}/block/${block}` */

  return (
    <Container>
      <BlockWrapper>
        {/* <Text>{displayBlock}</Text> */}
        {/* <StyledLinkExternal href={escBlock}>{displayBlock}</StyledLinkExternal> */}
      </BlockWrapper>
      {/* <Tooltip content={TranslateString(999, 'batches of transactions with a hash of the previous block in the chain')}>
        <HelpIcon color="textSubtle" />
      </Tooltip> */}
    </Container>
  )
}

export default Block

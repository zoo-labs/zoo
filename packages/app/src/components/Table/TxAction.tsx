import React from 'react'
import styled from 'styled-components'
import { Text as UIText } from 'components'
import { GiFlame } from 'react-icons/gi'
import { GrMoney } from 'react-icons/gr'

export interface TxActionProps {
  txAction: string
  isShortened?: boolean
}

const TxActionWrapper = styled.div`
  // min-width: 110px;
  width: auto;
  min-width: 100px;
  font-weight: 600;
  text-align: left;
  display: flex;
  text-transform: capitalize;
  flex-direction: row-reverse;
`

const Container = styled.div`
  display: flex;
  justify-content: center;

  svg {
    margin-left: 4px;
    margin-right: 7px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 7px;
      margin-right: 7px;
    }
  }
`
const IconWrapper = styled.div<{ action: boolean }>`
  display: flex;
  align-items: center;
  & svg {
    & path{
      stroke: ${({ theme, action }) => (action ? theme.colors.secondaryDark : null)};
      fill: ${({ action }) => (action ? null : 'red')};
};
    }
  }
`

const Text = styled(UIText)`
  line-height: 1.2;
`

const TxAction: React.FunctionComponent<TxActionProps> = ({ txAction, isShortened }) => {
  const action = txAction.includes('Bond')
  const toName = action ? txAction.toLowerCase().split('mint')[1] : txAction.toLowerCase().split('burn')[1]

  return (
    <Container>
      <TxActionWrapper>
        <Text style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} pt={isShortened ? '10px' : '0px'}>
          {isShortened ? toName : txAction}
        </Text>
        <IconWrapper action={action}>{action ? <GrMoney /> : <GiFlame />}</IconWrapper>
      </TxActionWrapper>
    </Container>
  )
}

export default TxAction

import React from 'react'
import styled from 'styled-components'
import { CloseCircleIcon, CheckmarkCircleIcon } from 'components/Svg'
import { Text as UIText } from 'components'

export interface StatusProps {
  status: string
}

const StatusWrapper = styled.div`
  // min-width: 110px;
  width: auto;
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
    margin-right: 2px;
  }
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled(UIText)`
  line-height: 1.2;
`

const Status: React.FunctionComponent<StatusProps> = ({ status }) => {
  const displayStatus = status ? String(status.toLowerCase()) : '-'
  const statusIcon = displayStatus === 'success' ? <CheckmarkCircleIcon color='secondary' /> : displayStatus === 'failed' ? <CloseCircleIcon color='failure' /> : <></>

  return (
    <Container>
      <StatusWrapper>
        <Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', marginLeft: '4px' }}>{displayStatus}</Text>
        <IconWrapper>{statusIcon}</IconWrapper>
      </StatusWrapper>
    </Container>
  )
}

export default Status

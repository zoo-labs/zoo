import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const eggURL = window.location.origin + '/static/images/white-egg.png'

const LogoContainer = styled.button<{ width?: string }>`
  cursor: pointer;
  background: transparent;
  border: none;
  width: 100%;
`

const MaxHeightLogo = styled.img`
  height: 100%;
  z-index: 100;
`

export interface ZooHomeButtonProps {
  width?: string
}

const ZooHomeButton: React.FC<ZooHomeButtonProps> = ({ width }) => {
  const history = useHistory()
  const handleClick = () => {
    history.push('/')
  }

  return (
    <LogoContainer width={width}>
      <MaxHeightLogo src={eggURL} alt='Back Home' onClick={() => handleClick()} />
    </LogoContainer>
  )
}

export default ZooHomeButton

import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import logo from 'media/ZooEggLogoWhite.png'

const LogoContainer = styled.button<{ width?: string }>`
  cursor: pointer;
  border-radius: 30px;
  background: transparent;
  border: none;
  width: 100%;
`

const MaxHeightLogo = styled.img`
  width: 60px;
  height: 60px;
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
      <MaxHeightLogo src={logo} alt='zoo-logo' onClick={() => handleClick()} />
    </LogoContainer>
  )
}

export default ZooHomeButton

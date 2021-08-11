import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { scales, variants } from './types'
import Button from './Button'

const BtnContainer = styled.div<{ useHeaderGradient?: boolean }>`
  cursor: pointer;
  display: flex;
  width: 100%;
  align-items: center;
  * {
    background: ${(props) => props.theme.colors.gradients.starterAppMarble};
    box-shadow: 0px 1px 7px #c3cbd869;
  }
`

const TipButton = (props): JSX.Element => {
  const { disabled, scale } = props
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()

  const toggling = (e) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }
  return (
    <>
      {disabled ? (
        <Button {...props} />
      ) : (
        <BtnContainer>
          <Button minWidth={scale === scales.XS ? '40px' : '80px'} onClick={toggling} {...props} />
        </BtnContainer>
      )}
    </>
  )
}

TipButton.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.SM,
  disabled: false,
  useHeaderTheme: false,
}

export default TipButton

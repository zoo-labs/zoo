import React from 'react'
import styled from 'styled-components'
import { scales, variants } from './types'
import Button from './Button'

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  * {
    background: ${({ theme }) => theme.colors.gradients.starterAppMarble};
    border: 0px;
  }
  button {
    svg {
      background: transparent;
    }
  }
`

const GradientButton = (props): JSX.Element => {
  const { disabled } = props
  return (
    <>
      {disabled ? (
        <Button {...props} />
      ) : (
        <BtnContainer>
          <Button {...props} />
        </BtnContainer>
      )}
    </>
  )
}

GradientButton.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
}

export default GradientButton

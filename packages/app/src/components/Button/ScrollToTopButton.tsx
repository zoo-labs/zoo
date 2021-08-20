import React from 'react'
import styled from 'styled-components'
import { scales, variants } from './types'
import Button from './Button'

export const TopInvisibleDiv = styled.div`
  background: transparent;
  width: 40px;
  height: 40px;
  position: fixed;
  top: 10%;
  left: 0%;
`

// const ScrollDisplayDiv = styled.div`
//   background: ${({ theme }) => theme.colors.gradients.bubblegum};
//   width: 40px;
//   height: 40px;
//   position: fixed;
//   top: 80%;
//   left: 0%;
//   border: 2px solid ${({ theme }) => theme.colors.gradients.bubblegum};
//   border-radius: 30px;
//   z-index: 99;
// `

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`

const ScrollToTopButton = (props): JSX.Element => {
  return (
    <ScrollButtonContainer>
      <Button {...props} />
    </ScrollButtonContainer>
  )
}

ScrollToTopButton.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
}

export default ScrollToTopButton

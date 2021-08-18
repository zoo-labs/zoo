import { useMatchBreakpoints } from 'hooks'
import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { scales, variants } from './types'

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  * {
    background: black;
    font-weight: 600;
    &:hover {
      transition: all 0.2s;
      // border: ${({ theme }) => `2px solid ${theme.colors.primaryDark}`};
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  button {
    text-transform: uppercase;
    //   border: 2px solid #FFFFFF;
    border-radius: 0px;
    height: 100%;
    //   padding: revert;
    letter-spacing: 3px;
    align-items: center;
    transition: all 0.2s;
    background: black;
    margin-top: 1rem;
  }
`

const BlackBorderButton = (props): JSX.Element => {
  const { disabled } = props
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm

  return (
    <>
      {disabled ? (
        <Button scale={isMobile ? scales.XS : scales.MD} {...props} />
      ) : (
        <BtnContainer>
          <Button scale={isMobile ? scales.XS : scales.MD} {...props} />
        </BtnContainer>
      )}
    </>
  )
}

BlackBorderButton.defaultProps = {
  isLoading: false,
  external: false,
  // variant: variants.PRIMARY,
  // scale: scales.SM,
  disabled: false,
}

export default BlackBorderButton

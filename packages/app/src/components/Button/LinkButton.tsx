import { useMatchBreakpoints } from 'hooks'
import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { scales, variants } from './types'

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  
    * {
    background: transparent;
    font-weight: 600;
     &:hover {
        transition: all 0.2s;
        border: 2px solid #a0ec0e;
        color: #a0ec0e;
    }
  }
 

  button {
      text-decoration: underline;
      border: 2px solid white;
      border-radius: 0px;
      height: 100%;
      padding: revert;
      letter-spacing: 3px;
      align-items: center;
      line-height: 1.5;
      transition: all 0.2s;
      position: relative;

      >
      
      
  }

`

const LinkButton = (props): JSX.Element => {
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

LinkButton.defaultProps = {
  isLoading: false,
  external: false,
  // variant: variants.PRIMARY,
  // scale: scales.SM,
  disabled: false,
}

export default LinkButton

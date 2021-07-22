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
    
  }

  button {
      text-transform: uppercase;
      border: 2px solid white;
      border-radius: 0px;
      height: 100%;
      padding: revert;
      letter-spacing: 4px;
      align-items: center;
      line-height: 1.5;
      transition: all 0.2s;
      position: relative;

      >
      
      &:hover {
        transition: all 0.2s;
        border: 2px solid gold;
        color: gold;
  }
  }

`

const BorderButton = (props): JSX.Element => {
    const { disabled } = props;
    return (
        <>
            {disabled ? <Button {...props} />
                : <BtnContainer>
                        <Button {...props} />
                </BtnContainer>
            }

        </>
    )
}

BorderButton.defaultProps = {
    isLoading: false,
    external: false,
    variant: variants.PRIMARY,
    scale: scales.MD,
    disabled: false,
}

export default BorderButton

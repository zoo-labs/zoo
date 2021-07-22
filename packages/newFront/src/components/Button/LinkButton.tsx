import { useMatchBreakpoints } from 'hooks'
import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { scales } from './types'

const BtnContainer = styled.div`
  
    * {
    background: transparent;
    font-weight: 550;
    
     &:hover {
        transition: all 0.2s;
        color: #a0ec0e;
    }
  }

  button {
      text-decoration: underline;
      text-transform: uppercase;
      letter-spacing: 3px;
      transition: all 0.2s;
      
      >
  }

`

const LinkButton = (props): JSX.Element => {
    const { disabled } = props;
    const { isXs, isSm } = useMatchBreakpoints()
    const isMobile = isXs || isSm
    
    return (
        <>
            {disabled ? <Button scale={isMobile ? scales.XS : scales.MD} {...props} />
                : <BtnContainer>
                        <Button scale={isMobile ? scales.XS : scales.MD} {...props} />
                </BtnContainer>
            }

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

import { useMatchBreakpoints } from 'hooks'
import styled from 'styled-components'
import Button from './Button'
import { scaleVariants } from './theme'
import { scales, variants } from './types'

const BtnContainer = styled.div`
  max-width: 200px;
  * {
    &:hover {
      transition: all 0.2s;
      // border: ${({ theme }) => `2px solid ${theme.colors.primaryDark}`};
      background: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    margin-top: -2px;
    align-items: center;
    background: #df4c97;
    text-transform: uppercase;
    border-radius: 8px;
    transition: all 0.2s;
    display: inline-block;
    text-shadow: x-offset y-offset blur color;
    text-decoration: none;
    /* font-weight: bold;
    background-color: #538fbe;
    padding: 20px 70px;
    font-size: 24px; */
    border: 1px solid #230616;
    -webkit-box-shadow: 0px 2px 0px #461e34, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    -moz-box-shadow: 0px 2px 0px #461e34, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    box-shadow: 0px 2px 0px #461e34, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }
  button:active {
    -webkit-box-shadow: 0px 0px 0px #461e34, 0px 1px 6px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    -moz-box-shadow: 0px 0px 0px #461e34, 0px 1px 6px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 0px #461e34, 0px 1px 6px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    -webkit-transform: translate(0, 3px);
    -moz-transform: translate(0, 3px);
    transform: translate(0, 3px);
  }
`

const BorderButton = (props): JSX.Element => {
  const { variant, scale } = props
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm

  return (
    <>
      <BtnContainer>
        <Button
          variant={variant === null ? variants.PRIMARY : variant}
          scale={scale === null ? (isMobile ? scales.XS : scales.MD) : scale}
          {...props}
          // style={{ fontSize: `${isMobile ? "14px" : "16px"}` }}
        />
      </BtnContainer>
    </>
  )
}

BorderButton.defaultProps = {
  scale: scaleVariants,
  variant: variants,
}

export default BorderButton

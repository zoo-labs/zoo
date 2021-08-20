import { useMatchBreakpoints } from 'hooks'
import styled from 'styled-components'
import Button from './Button'
import { scales } from './types'

const BtnContainer = styled.div`
  justify-content: space-around;
  position: relative;

  * {
    &:hover {
      transition: all 0.2s;
      color: ${({ theme }) => theme.colors.primaryPop};
      border: 0px;
      background: transparent;
    }
  }

  button {
    background: transparent;
    text-transform: uppercase;
    border: 0px;
    color: white;
    transition: all 0.2s;
  }
`

const TextButton = (props): JSX.Element => {
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm

  return (
    <>
      <BtnContainer>
        <Button variant='primary' scale={isMobile ? scales.XS : scales.MD} {...props} />
      </BtnContainer>
    </>
  )
}

export default TextButton

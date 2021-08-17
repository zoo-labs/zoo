import { useMatchBreakpoints } from 'hooks'
import styled from 'styled-components'

const StickyBottomMenuWrapper = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  box-shadow: 0px 5px 10px #040404ba;
  background: ${({ theme }) => theme.colors.primaryPop};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: calc(100vh - 74px);
  right: 12px;
  z-index: 100;
  transition: all 0.2s;
  display: inline-block;
  text-shadow: x-offset y-offset blur color;
  text-decoration: none;
  border: 1px solid #2d6898;
  -webkit-box-shadow: 0px 3px 0px #136071, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
  -moz-box-shadow: 0px 3px 0px #136071, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
  box-shadow: 0px 3px 0px #136071, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  svg {
    width: 25px;
    height: 25px;
    color: #ffffff;
  }
  :hover {
    transition: all 0.2s;
    // border: ${({ theme }) => `2px solid ${theme.colors.primaryDark}`};
    background: ${({ theme }) => theme.colors.secondary};
  }
  :active {
    -webkit-box-shadow: 0px 0px 0px #136071, 0px 1px 6px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    -moz-box-shadow: 0px 0px 0px #136071, 0px 1px 6px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 0px #136071, 0px 1px 6px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    -webkit-transform: translate(0, 3px);
    -moz-transform: translate(0, 3px);
    transform: translate(0, 3px);
  }
`

const StickyBottomMenu = ({ children, onClick }): JSX.Element => {
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm

  return (
    <>
      <StickyBottomMenuWrapper onClick={onClick}>{children}</StickyBottomMenuWrapper>
    </>
  )
}

export default StickyBottomMenu

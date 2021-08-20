import React from 'react'
import styled from 'styled-components'
import PanelBody from './PanelBody'
import PanelFooter from './PanelFooter'
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from '../config'
import { PanelProps, PushedProps } from '../types'

interface Props extends PanelProps, PushedProps {
  showMenu: boolean
  isMobile: boolean
}

const StyledPanel = styled.div<{ isPushed: boolean; showMenu: boolean; isMobile: boolean }>`
  position: fixed;
  // padding-top: ${({ showMenu }) => (showMenu ? '80px' : 0)};
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.background};
  width: ${({ isPushed, isMobile }) => (isPushed ? (!isMobile ? `${SIDEBAR_WIDTH_FULL}px` : `${0.8 * SIDEBAR_WIDTH_FULL}px`) : 0)};
  height: 100vh;
  transition: padding-top 0.2s, width 0.2s;
  // border-right: 2px solid #FFFFFF;
  z-index: 90;
  overflow: ${({ isPushed }) => (isPushed ? 'initial' : 'hidden')};
  transform: translate3d(0, 0, 0);

  ${({ theme }) => theme.mediaQueries.nav} {
    z-index: 1;

    width: ${({ isPushed, isMobile }) => `${isPushed ? (!isMobile ? `${SIDEBAR_WIDTH_FULL}px` : `${0.8 * SIDEBAR_WIDTH_FULL}px`) : SIDEBAR_WIDTH_REDUCED}px`};
  }
`
// ${({ isPushed }) => (isPushed ? "2px solid #FFFFFF" : "2px solid #2B2B2B")};
const Panel: React.FC<Props> = (props) => {
  const { isPushed, showMenu, isMobile } = props
  return (
    <StyledPanel isPushed={isPushed} showMenu={showMenu} isMobile={isMobile}>
      <PanelBody {...props} />
      <PanelFooter {...props} />
    </StyledPanel>
  )
}

export default Panel

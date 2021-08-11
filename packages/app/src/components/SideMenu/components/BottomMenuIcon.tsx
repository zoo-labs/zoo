import React from 'react'
import { FaHome } from 'react-icons/fa'
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
  bottom: 10px;
  right: 10px;
  z-index: 100;

  svg {
    width: 25px;
    height: 25px;
    color: #ffffff;
  }
`

export interface BottomMenuIconProps {
  isOpen: boolean
  togglePush: () => void
  isDark: boolean
  href: string
}

const BottomMenuIcon: React.FC<BottomMenuIconProps> = ({ isOpen, togglePush, isDark, href }) => {
  return (
    <StickyBottomMenuWrapper onClick={togglePush}>
      <FaHome />
    </StickyBottomMenuWrapper>
  )
}

export default React.memo(BottomMenuIcon, (prev, next) => prev.isOpen === next.isOpen && prev.isDark === next.isDark)

import React from 'react'
import styled from 'styled-components'
// import { CogIcon } from "../../../components/Svg";
// import IconButton from "../../../components/Button/IconButton";
import { MENU_ENTRY_HEIGHT } from '../config'
import { PanelProps, PushedProps } from '../types'
import ThemeSwitcher from './ThemeSwitcher'
// import SocialLinks from "./SocialLinks";

interface Props extends PanelProps, PushedProps {}

const Container = styled.div`
  flex: none;
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.colors.background};
`

const SettingsEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
`

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 16px;
`

const PanelFooter: React.FC<Props> = ({ isPushed, toggleTheme, isDark }) => {
  if (!isPushed) {
    return (
      <Container>
        {/* <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton> */}
      </Container>
    )
  }

  return (
    <Container>
      {/* <SocialEntry>
        <SocialLinks />
      </SocialEntry> */}
      <SettingsEntry>
        <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
      </SettingsEntry>
    </Container>
  )
}

export default PanelFooter

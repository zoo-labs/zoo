/* eslint-disable no-unused-expressions */
import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { SvgProps } from '../../../components/Svg'
import * as IconModule from '../icons'
import Accordion from './Accordion'
import { MenuEntry, LinkLabel, LinkStatus } from './MenuEntry'
import MenuLink from './MenuLink'
import { PanelProps, PushedProps } from '../types'
import Logo from './Logo'

interface Props extends PanelProps, PushedProps {
  isMobile: boolean
}

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> }

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  justify-content: center;
  padding-bottom: 29vh;
  a {
    padding-bottom: 20px;
  }
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 16px;
  margin-right: 8px;
`

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation()

  // Close the menu when a user clicks a link on mobile
  const handleClick = () => {
    isMobile ? () => pushNav(false) : undefined
  }

  return (
    <Container>
      {links.map((entry) => {
        const Icon = entry.icon.length > 0 ? Icons[entry.icon] : null
        const iconElement = <> </> /* 
          entry.icon.length > 0 ? (
            <IconContainer>
              <Icon width="24px" />
            </IconContainer>
          ) : (
            <></>
          ) */

        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined

        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname)
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0
          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              initialOpenState={initialOpenState}
              className={calloutClass}
              isActive={entry.items.some((item) => item.href === location.pathname)}>
              {isPushed &&
                entry.items.map((item, idx) => {
                  const SubIcon = entry.icon.length > 0 ? Icons[entry.items[idx].icon] : null
                  const subIconElement =
                    entry.icon.length > 0 ? (
                      <IconContainer>
                        <SubIcon width='20px' />
                      </IconContainer>
                    ) : (
                      <></>
                    )
                  return (
                    <MenuEntry key={item.href} secondary isActive={false} onClick={handleClick}>
                      <MenuLink href={item.href} key={item.href}>
                        {subIconElement}
                        <LinkLabel isPushed={isPushed}>{item.label}</LinkLabel>
                        {item.status && (
                          <LinkStatus color={item.status.color} fontSize='18px'>
                            {item.status.text}
                          </LinkStatus>
                        )}
                      </MenuLink>
                    </MenuEntry>
                  )
                })}
            </Accordion>
          )
        }
        return (
          // <MenuEntry key={entry.label} isActive={location.pathname.includes(entry.href)} className={calloutClass}>
          <MenuLink key={entry.href} href={entry.href} onClick={handleClick}>
            {entry.icon.length > 0 && iconElement}
            <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
            {entry.status && (
              <LinkStatus color={entry.status.color} fontSize='14px'>
                {entry.status.text}
              </LinkStatus>
            )}
          </MenuLink>
          // </MenuEntry>
        )
      })}
    </Container>
  )
}

export default PanelBody

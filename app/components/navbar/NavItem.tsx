/* eslint-disable */
import { Text } from 'components/primitives'
import React from 'react';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

type NavItemProps = {
  active?: boolean
  children: ReactNode
}

const NavItem = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof Text> & NavItemProps
>(({ children, active, ...props }, forwardedRef) => (
  <Text
    {...props}
    ref={forwardedRef}
    css={{
      color: active ? '$gray12' : '$gray10',
      cursor: 'pointer',
      '&:hover': {
        color: '$gray11',
      },
    }}
    as="p"
    style="subtitle1"
  >
    {children}
  </Text>
))

export default NavItem

import { LinkStatus } from './types'

export const status = {
  LIVE: <LinkStatus>{
    text: 'LIVE',
    color: 'failure',
  },
  SOON: <LinkStatus>{
    text: 'SOON',
    color: 'warning',
  },
  NEW: <LinkStatus>{
    text: 'NEW',
    color: 'success',
  },
}

export const links = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
]

export const socials = [
  {
    label: 'Twitter',
    icon: 'TwitterIcon',
    href: 'https://twitter.com/StarterAppProtocol',
  },
  {
    label: 'Telegram',
    icon: 'TelegramIcon',
    href: 'https://t.me/StarterAppOracles',
  },
  {
    label: 'Discord',
    icon: 'DiscordIcon',
    href: 'https://discord.gg/pvHzemX',
  },
]

export const MENU_HEIGHT = 64
export const MENU_ENTRY_HEIGHT = 48
export const SIDEBAR_WIDTH_FULL = 220
export const SIDEBAR_WIDTH_REDUCED = 0

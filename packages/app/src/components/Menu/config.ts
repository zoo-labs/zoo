import { MenuEntry } from './types'

let defaultConf = [
  {
    label: 'My Account',
    icon: 'AccountIcon',
    href: '/account',
  },
  {
    label: 'Bank',
    icon: 'BankIcon',
    href: '/bank',
  },
  {
    label: 'Feed',
    icon: 'MarketIcon',
    href: '/feed',
  },
]

let config: () => MenuEntry[] = () => defaultConf

export const MENU_HEIGHT = 64
export const MENU_ENTRY_HEIGHT = 48
export const SIDEBAR_WIDTH_FULL = 240
export const SIDEBAR_WIDTH_REDUCED = 56

export default config

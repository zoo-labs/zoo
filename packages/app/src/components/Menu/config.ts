import { MenuEntry } from './types'

let defaultConf = [
  {
    label: 'Home',
    icon: 'AccountIcon',
    href: '/home',
  },
  {
    label: 'Bank',
    icon: 'BankIcon',
    href: '/bank',
  },
  {
    label: 'My Zoo',
    icon: 'MarketIcon',
    href: '/myzoo',
  },
  {
    label: 'Market',
    icon: 'MarketIcon',
    href: '/market',
  },
]

let config: () => MenuEntry[] = () => defaultConf

export const MENU_HEIGHT = 64
export const MENU_ENTRY_HEIGHT = 48
export const SIDEBAR_WIDTH_FULL = 240
export const SIDEBAR_WIDTH_REDUCED = 56

export default config

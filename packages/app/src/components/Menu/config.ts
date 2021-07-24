import { MenuEntry } from './types'

const config: () => MenuEntry[] = () => [

  // {
  //   label: 'My Zoo',
  //   icon: '',
  //   href: '/myzoo',
  // },
  {
    label: 'My Account',
    icon: '',
    href: '/account',
  },
  {
    label: 'Feed',
    icon: '',
    href: '/feed',
  },
]


export const MENU_HEIGHT = 64;
export const MENU_ENTRY_HEIGHT = 48;
export const SIDEBAR_WIDTH_FULL = 240;
export const SIDEBAR_WIDTH_REDUCED = 56;

export default config

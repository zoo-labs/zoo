import { MenuEntry } from './types'


let defaultConf =  [

  {
    label: 'Bank',
    icon: '',
    href: '/bank',
  },
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

	
if (process.env.NODE_ENV !== "production") {
defaultConf = [].concat(defaultConf, {
	label: 'Zoo Faucet',
	icon: '',
	href: '/faucet'
});
}

let config: () => MenuEntry[] = () => defaultConf;

export const MENU_HEIGHT = 64;
export const MENU_ENTRY_HEIGHT = 48;
export const SIDEBAR_WIDTH_FULL = 240;
export const SIDEBAR_WIDTH_REDUCED = 56;

export default config

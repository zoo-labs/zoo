import { MenuEntry } from './types'

const config: () => MenuEntry[] = () => [

  {
    label: 'My Zoo',
    icon: 'SearchDollarIcon',
    href: '/pricefeed',
  },
  {
    label: 'My Account',
    icon: 'HardHatIcon',
    href: '/miningevents',
  },
  {
    label: 'Marketplace',
    icon: 'BlockExplorerIcon',
    href: '/labs/blockexplorer',
  },
 
  // {
  //   label: 'NFTz',
  //   icon: 'MarketIcon',
  //   initialOpenState: false,
  //   items: [
  //     {
  //       label: 'NFTz Market',
  //       icon: 'MarketIcon',
  //       href: '/nftmarket',
  //     },
  //     {
  //       label: 'NFTz Wizard',
  //       // TODO: change 
  //       icon: 'NewTokenIcon',
  //       href: '/nftwizard',
  //     },
  //     {
  //       label: 'NFTz Profile',
  //       // TODO: "
  //       icon: 'MarketIcon',
  //       href: '/profile',
  //     },
  //   ],
  // },
  {
    label: 'Cryptozoo Docs',
    icon: 'DocsIcon',
    href: '/docs',
  },
]


export const MENU_HEIGHT = 64;
export const MENU_ENTRY_HEIGHT = 48;
export const SIDEBAR_WIDTH_FULL = 240;
export const SIDEBAR_WIDTH_REDUCED = 56;

export default config

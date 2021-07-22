import { MenuEntry } from './types'

const config: () => MenuEntry[] = () => [
  // {
  //   label: 'Bonding Curve Tokens',
  //   icon: 'MarketIcon',
  //   href: '/labs/curvetokens',
  // },
  // {
  //   label: 'New Token Wizard',
  //   icon: 'NewTokenIcon',
  //   href: '/labs/newtoken',
  // },
  // {
  //   label: 'Block Explorer',
  //   icon: 'BlockExplorerIcon',
  //   href: '/labs/blockexplorer',
  // },
  {
    label: 'Price Feed',
    icon: 'SearchDollarIcon',
    href: '/pricefeed',
  },
  {
    label: 'Mining Events',
    icon: 'HardHatIcon',
    href: '/miningevents',
  },
  // {
  //   label: 'NFTz',
  //   icon: 'MarketIcon',
  //   href: '/nftmarket',
  // },
  // {
  //   label: 'NFTz Wizard',
  //   // TODO: change 
  //   icon: 'NewTokenIcon',
  //   href: '/nftwizard',
  // },
  // {
  //   label: 'NFTz Creator Profile',
  //   // TODO: "
  //   icon: 'MarketIcon',
  //   href: '/profile',
  // },
  {
    label: 'Block Explorer',
    icon: 'BlockExplorerIcon',
    href: '/labs/blockexplorer',
  },
  {
    label: 'StarterApp Labs',
    icon: 'TradeIcon',
    initialOpenState: false,
    items: [
      {
        label: 'Bonding Curve Tokens',
        icon: 'MarketIcon',
        href: '/labs/curvetokens',
      },
      {
        label: 'New Token Wizard',
        icon: 'NewTokenIcon',
        href: '/labs/newtoken',
      },
      {
        label: 'Block Explorer',
        icon: 'BlockExplorerIcon',
        href: '/labs/blockexplorer',
      },
    ],
  },
  {
    label: 'NFTz',
    icon: 'MarketIcon',
    initialOpenState: false,
    items: [
      {
        label: 'NFTz Market',
        icon: 'MarketIcon',
        href: '/nftmarket',
      },
      {
        label: 'NFTz Wizard',
        // TODO: change 
        icon: 'NewTokenIcon',
        href: '/nftwizard',
      },
      {
        label: 'NFTz Profile',
        // TODO: "
        icon: 'MarketIcon',
        href: '/profile',
      },
    ],
  },
  {
    label: 'StarterApp Docs',
    icon: 'DocsIcon',
    href: '/docs',
  },
]


export const MENU_HEIGHT = 64;
export const MENU_ENTRY_HEIGHT = 48;
export const SIDEBAR_WIDTH_FULL = 240;
export const SIDEBAR_WIDTH_REDUCED = 56;

export default config

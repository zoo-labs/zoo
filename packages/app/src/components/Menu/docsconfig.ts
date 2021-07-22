import { MenuEntry } from './types'

const config: MenuEntry[] = [
  {
    label: 'Back to dApp',
    icon: 'HomeIcon',
    href: '/',
  },
  // {
  //   label: 'FAQs',
  //   icon: '',
  //   href: '/docs/faq',
  // },
  // {
  //   label: 'General',
  //   icon: '',
  //   href: '/docs/general',
  // },
  // {
  //   label: 'Whitepaper',
  //   icon: '',
  //   href: '/docs/whitepaper',
  // },
  {
    label: 'Overview',
    icon: '',
    href: '/docs/overview',
  },
  {
    label: 'Faucet',
    icon: '',
    href: '/docs/faucet',
  },
  {
    label: 'Oracles',
    icon: '',
    initialOpenState: true,
    items: [
      {
        label: 'Miner Workflow',
        href: '/docs/minerworkflow',
      },
      // {
      //   label: 'Miner CLI',
      //   href: '/docs/minercli',
      // },
      // {
      //   label: 'Query for Data',
      //   href: '/docs/minerquerydata',
      // },
      {
        label: 'Miner Rewards',
        href: '/docs/minerrewards',
      },
      {
        label: 'How to Tip',
        href: '/docs/tipping',
      },
      {
        label: 'How to Mine',
        href: '/docs/howtomine',
      },
      {
        label: 'How to Dispute',
        href: '/docs/howtodispute',
      },
      // {
      //   label: 'Adding a Tip',
      //   href: '/docs/tipping',
      // },
      {
        label: 'Withdraw Stake',
        href: '/docs/withdrawstake',
      },
    ],
  },
  {
    label: 'StarterApp Labs Docs',
    icon: '',
    initialOpenState: true,
    items: [
      {
        label: 'Token Wizard',
        href: '/docs/tokenwizard',
      },
      {
        label: 'Bonding & Unbonding',
        href: '/docs/bonding',
      },
      // {
      //   label: 'Unbonding',
      //   href: '/docs/unbonding',
      // },
      {
        label: 'Block Explorer',
        href: '/docs/blockexplorer',
      },
    ],
  },
  {
    label: 'Social Media',
    icon: '',
    href: '/docs/socialmedia',
  },
  {
    label: 'Privacy Policy',
    icon: '',
    href: '/docs/privacypolicy',
  },
]

export default config

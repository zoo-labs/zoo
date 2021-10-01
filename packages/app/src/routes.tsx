// import Account from './views/Home/Account'
import Home from './views/Home'
// import Bank from './views/Home/Bank'
import Feed from './views/Feed'
import FeedAsset from './views/Feed/FeedAsset'
import Swap from './views/Swap'
import Pool from './views/Pool'
import Market from './views/Market'
let indexRoutes = [
  // { path: '/account', name: 'Account', component: Home },
  { path: '/home', name: 'Home', component: Home },
  { path: '/bank', name: 'Bank', component: Home, exact: false },
  // { path: '/market', name: 'Market', component: Market },

  // { path: '/feed', name: 'Feed', component: Feed, exact: true },
  // { path: '/feed/:account/:tokenId', name: 'Feed Asset', component: FeedAsset },

  // { path: '/swap', name: 'Swap', component: Swap },
  // { path: '/limit-order', name: 'Limit', component: Swap },
  // { path: '/liquidity', name: 'Liquidity', component: Swap },
  // { path: '/pool', name: 'Pool', component: Pool },
]
export default indexRoutes

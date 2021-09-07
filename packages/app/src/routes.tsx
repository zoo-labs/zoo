// import Account from './views/Home/Account'
import Home from './views/Home'
// import Bank from './views/Home/Bank'
import Feed from './views/Feed'
import FeedAsset from './views/Feed/FeedAsset'
import Swap from './views/Swap'
import Pool from './views/Pool'
import Marketplace from './views/Marketplace'
let indexRoutes = [
  { path: '/account', name: 'Account', component: Home },
  // { path: '/home', name: 'Home', component: Home },
  { path: '/bank', name: 'Bank', component: Home },
  { path: '/marketplace', name: 'Marketplace', component: Marketplace },

  { path: '/feed', name: 'Feed', component: Feed, exact: true },
  { path: '/feed/:account/:tokenId', name: 'Feed Asset', component: FeedAsset },

  { path: '/bridge', name: 'Bridge', component: Swap },
  { path: '/limit-order', name: 'Limit', component: Swap },
  { path: '/liquidity', name: 'Liquidity', component: Swap },
  { path: '/pool', name: 'Pool', component: Pool },
]
export default indexRoutes

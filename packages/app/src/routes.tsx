// import Account from './views/Home/Account'
import Home from './views/Home'
// import Bank from './views/Home/Bank'
import Feed from './views/Feed'
import Swap from './views/Swap'
import Pool from './views/Pool'
let indexRoutes = [
  // { path: '/account', name: 'Account', component: Account },
  { path: '/home', name: 'Home', component: Home },
  // { path: '/bank', name: 'Bank', component: Bank },
  { path: '/feed', name: 'Feed', component: Feed },
  { path: '/swap', name: 'Swap', component: Swap },
  { path: '/limit-order', name: 'Limit', component: Swap },
  { path: '/liquidity', name: 'Liquidity', component: Swap },
  { path: '/pool', name: 'Pool', component: Pool },
]
export default indexRoutes

import Test from 'views/Test'
import Account from './views/Account/Index'
import Bank from './views/Bank'
import Feed from './views/Feed'

let indexRoutes = [
  { path: '/account', name: 'Account', component: Account },
  { path: '/home', name: 'Home', component: Account },
  { path: '/bank', name: 'Bank', component: Bank },
  { path: '/feed', name: 'Feed', component: Feed },
  { path: '/test', name: 'Test', component: Test },
]
export default indexRoutes

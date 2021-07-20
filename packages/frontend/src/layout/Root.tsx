import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Profile } from './'
import { Header, PrivateRoute, TransactionProgress, Homepage  } from '../components'

import { Web3RootProvider } from '../components'

export const Root = () => {


  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Web3RootProvider>
          <div>
            <Switch>
              <PrivateRoute path="/profile" component={Profile} />
              <Route exact path="/" component={Homepage} />
            </Switch>
            <TransactionProgress />
          </div>
        
      </Web3RootProvider>
    </Router>
  )
}
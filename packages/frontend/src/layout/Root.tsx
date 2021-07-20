import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { Profile, Connect } from './'
import { Header, PrivateRoute, TransactionProgress, Homepage  } from '../components'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export const Root = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Connect>
          <div>
            <Switch>
              <PrivateRoute path="/profile" component={Profile} />
              <Route exact path="/" component={Homepage} />
            </Switch>
            <TransactionProgress />
          </div>
        </Connect>
      </Web3ReactProvider>
    </Router>
  )
}
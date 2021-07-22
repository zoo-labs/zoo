import React, { Suspense, useEffect, lazy } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import  ResetCSS  from './components/ResetCSS'
import GlobalStyle from './components/style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/Svg/Icons/LoadingLogo'
import history from './routerHistory'
import { PrivateRoute } from 'components/PrivateRoute'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Account = lazy(() => import('./views/Account'))
const Login = lazy(() => import('./views/Login'))
const Marketplace = lazy(() => import('./views/Marketplace'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: bottom 24px center;
  background-size: 90%;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-repeat: no-repeat;
    background-position: center 420px, 10% 230px, 90% 230px;
    background-size: contain, 266px, 266px;
    min-height: 90vh;
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const App: React.FC = () => {
  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released

  useEffect(() => {
    console.warn = () => null
  }, [])

  useEagerConnect()

  const signedIn = window.localStorage.getItem("connectorId")

  return (
    <Suspense fallback={null}>
      <Router history={history}>
        <ResetCSS />
        <GlobalStyle />
        <Menu>
          <SuspenseWithChunkError fallback={<PageLoader />}>
            <Switch>
              {/* Zswap Routes  */}
              {/* <Route path="/marketplace" exact>
                
                <Marketplace />
              </Route>
              <Route path="/account" exact>
                
                <Account />
              </Route> */}

              <Route exact path="/login">
                {signedIn? <Redirect to="/account" />: <Login/>}
              </Route>
              <Route exact path="/account">
                {signedIn? <Account /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/marketplace">
                {signedIn? <Marketplace /> : <Redirect to="/login" />}
              </Route>
              <Route  path="/">
                {signedIn? <Redirect to="/account" />: <Login />}
              </Route>
              {/* <Route exact path="/login" component={Login} />
              <Route exact path="/account" component={signedIn? Account : <Redirect to="/docs/overview" />} />
              <Route exact path="/market" component={signedIn? Marketplace : <Redirect to="/docs/overview" />} />
              <Route exact path="/" component={signedIn? Account : <Redirect to="/docs/overview" />} /> */}
              {/* <PrivateRoute path="/marketplace" component={Marketplace} />
              <PrivateRoute path="/account" component={Account} />
              <PrivateRoute path="/" component={Account} /> */}
              {/* <AppWrapper>
                <BodyWrapper>
                  <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/find" component={PoolFinder} />
                  <Route exact strict path="/pool" component={Pool} />
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                </BodyWrapper>
              </AppWrapper> */}

                {/* <Route component={NotFound} /> */}
            </Switch>
          </SuspenseWithChunkError>
          <Marginer />
        </Menu>
        <ToastListener />
      </Router>
    </Suspense>
  )
}

export default React.memo(App)
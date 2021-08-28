import React, { Suspense, useEffect, lazy } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import ResetCSS from './components/ResetCSS'
import GlobalStyle from './components/style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/Svg/Icons/LoadingLogo'
import history from './routerHistory'
import { PrivateRoute } from 'components/PrivateRoute'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { clearZoo } from 'state/zoo'
import { addEggs, addAnimals, addEgg, addAnimal, burnEgg, burnAnimal } from 'state/actions'
import Moralis from 'moralis'
import { useMoralisSubscription } from 'react-moralis'
import { Egg, Animal } from 'types/zoo'
import { getZooKeeper } from 'util/contracts'
import useWeb3 from 'hooks/useWeb3'

import { mapEgg, mapAnimal, queryEggs, queryAnimals } from 'util/moralis'
import Header from 'components/Header'
import indexRoutes from 'routes'

const Account = lazy(() => import('./views/Account'))
const Login   = lazy(() => import('./views/Login'))
const Bank    = lazy(() => import('./views/Bank'))
const Feed    = lazy(() => import('./views/Feed'))

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
  useEagerConnect()
  const web3 = useWeb3()
  const { chainID } = web3
  const dispatch = useDispatch()
  const signedIn = chainID && window.localStorage.getItem('connectorId')

  const getEggs = async () => {
    console.log('GETTING EGGS')
    try {
      const eggs = []
      for (const egg of await queryEggs()) {
        eggs.push(mapEgg(egg))
      }
      dispatch(addEggs(eggs))
    } catch (e) {
      console.error('ISSUE GETTING EGGS \n', e)
    }
  }

  const getAnimals = async () => {
    console.log('GETTING ANIMALS')

    try {
      const animals = []
      for (const animal of await queryAnimals()) {
        animals.push(mapAnimal(animal))
      }
      dispatch(addAnimals(animals))
    } catch (e) {
      console.error('ISSUE GETTING ANIMAL \n', e)
    }
  }

  const createEgg = async (data) => {
    console.log('CREATING EGG', mapEgg(data))
    try {
      dispatch(addEgg(mapEgg(data)))
    } catch (e) {
      console.error('ISSUE CREATING EGG:', e)
    }
  }

  const updateEgg = async (data) => {
    console.log('UPDATING EGG', mapEgg(data))
    try {
      dispatch(addEgg(mapEgg(data)))
    } catch (e) {
      console.error('ISSUE UPDATING EGG:', e)
    }
  }

  const createAnimal = async (data) => {
    console.log('CREATING ANIMAL', mapAnimal(data))
    try {
      dispatch(addAnimal(mapAnimal(data)))
    } catch (e) {
      console.error('ISSUE CREATING ANIMAL:', e)
    }
  }

  const updateAnimal = async (data) => {
    console.log('UPDATING ANIMAL', mapAnimal(data))
    try {
      dispatch(addAnimal(mapAnimal(data)))
    } catch (e) {
      console.error('ISSUE UPDATING ANIMAL:', e)
    }
  }

  const deleteAnimal = async (data) => {
    console.log('DELETING ANIMAL', mapAnimal(data))
    try {
      dispatch(burnAnimal(mapAnimal(data)))
    } catch (e) {
      console.error('ISSUE DELETING ANIMAL:', e)
    }
  }

  const deleteEgg = async (data) => {
    console.log('DELETING EGG', mapEgg(data))
    try {
      dispatch(burnEgg(mapEgg(data)))
    } catch (e) {
      console.error('ISSUE DELETING EGG:', e)
    }
  }

  useMoralisSubscription('Eggs', (q) => q, [], {
    onCreate: (data) => createEgg(data),
    onUpdate: (data) => updateEgg(data),
    onDelete: (data) => deleteEgg(data),
  })

  useMoralisSubscription('Animals', (q) => q, [], {
    onCreate: (data) => createAnimal(data),
    onUpdate: (data) => updateAnimal(data),
    onDelete: (data) => deleteAnimal(data),
  })

  // Only render once and reset when chainID changes
  useEffect(() => {
    console.warn = () => null // TODO: fix MaxListenersExceededWarning
    dispatch(clearZoo())
  }, [chainID])

  useEffect(() => {
    getEggs()
  }, [chainID])

  useEffect(() => {
    getAnimals()
  }, [chainID])

  return (
    <Suspense fallback={null}>
      <Router history={history}>
        <ResetCSS />
        <GlobalStyle />
        <Switch>
          <Route exact path='/login'>
            {signedIn ? <Redirect to='/home' /> : <Login />}
          </Route>

          <SuspenseWithChunkError fallback={<></>}>
            <div
            //  className='z-0 flex flex-col items-center w-full h-screen pb-16 lg:pb-0'
            >
              <div className='flex sticky top-0 justify-between flex-nowrap w-full z-20 flex-shrink-0 w-full'>
                <Header />
              </div>

              <Switch>
                {indexRoutes.map((prop, key) => (signedIn ? <Route path={prop.path} key={key} component={prop.component} /> : <Redirect to='/login' />))}
                <Redirect from='/' to={signedIn ? '/home' : '/login'} />
                <Redirect from='' to={signedIn ? '/home' : '/login'} />
              </Switch>
            </div>
            {/* <Route exact path='/account'>
              {signedIn ? (
                <>
                  <div className='flex fixed top-0 justify-between flex-nowrap w-full'>
                    <Header />
                  </div>
                  <Account />
                </>
              ) : (
                <Redirect to='/login' />
              )}
            </Route>

            <Route path='/feed'>{signedIn ? <Feed /> : <Redirect to='/login' />}</Route>
            <Route path='/myzoo'>{signedIn ? <Feed /> : <Redirect to='/login' />}</Route>
            <Route path='/market'>{signedIn ? <Feed /> : <Redirect to='/login' />}</Route>

            <Route exact path='/bank'>
              {signedIn ? (
                <>
                  <div className='flex fixed top-0 justify-between flex-nowrap w-full'>
                    <Header />
                  </div>
                  <Bank />
                </>
              ) : (
                <Redirect to='/login' />
              )}
            </Route>

            <Route exact path='/'>
              {signedIn ? <Redirect to='/home' /> : <Redirect to='/login' />}
            </Route>

            <Route exact path=''>
              {signedIn ? <Redirect to='/account' /> : <Redirect to='/login' />}
            </Route> */}
          </SuspenseWithChunkError>
        </Switch>
        <ToastListener />
      </Router>
    </Suspense>
  )
}

export default React.memo(App)

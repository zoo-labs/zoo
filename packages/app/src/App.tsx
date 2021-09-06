import React, { Suspense, useEffect, lazy, useMemo } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useEagerConnect, { useEagerConnectAlt } from 'hooks/useEagerConnect'
import ResetCSS from './components/ResetCSS'
import GlobalStyle from './components/style/Global'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { useDispatch } from 'react-redux'
import { clearZoo, updatZooBalnce } from 'state/zoo'
import { addEggs, addAnimals, addEgg, addAnimal, burnEgg, burnAnimal, getZooBalance, getMyEggs, getMyTransactions } from 'state/zoo/actions'
import Moralis from 'moralis'
import { useMoralisSubscription } from 'react-moralis'
import { Egg, Animal } from 'types/zoo'
import { getToken, getZooKeeper } from 'util/contracts'
import useWeb3 from 'hooks/useWeb3'

import { mapEgg, mapAnimal, queryEggs, queryAnimals } from 'util/moralis'
import Header from 'components/Header'
import indexRoutes from 'routes'
import { useWeb3React } from '@web3-react/core'

const Login = lazy(() => import('./views/Login'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  // useEagerConnect()
  useEagerConnectAlt()
  const web3 = useWeb3()
  const dispatch = useDispatch()
  const { library, chainID, account } = web3

  const valid = useMemo(() => {
    if (library && chainID) {
      return true
    }
    return false
  }, [library, chainID])
  /* Set signedIn to true if chainID and window.localStorage.getItem('connectorId') exist */
  const signedIn = chainID !== undefined && window.localStorage.getItem('connectorId') !== undefined
  const zooToken = getToken(web3)

  const getEggs = async (account) => {
    try {
      const eggs = []

      for (const egg of await queryEggs()) {
        eggs.push(mapEgg(egg))
      }
      dispatch(addEggs(eggs))
      dispatch(getMyEggs(account, eggs))
    } catch (e) {
      console.log('issue gett')
      console.error('ISSUE GETTING EGGS \n', e)
    }
  }

  const getAnimals = async () => {
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
      dispatch(addEgg({ data: mapEgg(data), account }))
    } catch (e) {
      console.error('ISSUE CREATING EGG:', e)
    }
  }

  const updateEgg = async (data) => {
    console.log('UPDATING EGG', mapEgg(data))
    try {
      dispatch(addEgg({ data: mapEgg(data), account }))
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
    // console.log('DELETING ANIMAL', mapAnimal(data))
    try {
      dispatch(burnAnimal(mapAnimal(data)))
    } catch (e) {
      console.error('ISSUE DELETING ANIMAL:', e)
    }
  }

  const deleteEgg = async (data) => {
    // console.log('DELETING EGG', mapEgg(data))
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
  const getValues = (account) => {
    dispatch(clearZoo())
    dispatch(getZooBalance(account, zooToken))
    dispatch(getMyTransactions(account))
    getEggs(account)
    getAnimals()
  }
  useEffect(() => {
    console.log('account passing from useffect is', account)
    getValues(account)
  }, [chainID, account, valid])
  return (
    <Suspense fallback={<></>}>
      <Router>
        <ResetCSS />
        <GlobalStyle />
        <Switch>
          <Route exact path='/login'>
            {signedIn && valid ? <Redirect to='/account' /> : <Login />}
          </Route>

          <SuspenseWithChunkError fallback={<></>}>
            <div className='z-0 flex flex-col items-center w-full h-screen pl-4 pr-4 pb-16 lg:pb-0'>
              <div className='flex sticky top-0 justify-between flex-nowrap w-full z-20 flex-shrink-0 w-full'>
                <Header />
              </div>

              <Switch>
                {indexRoutes.map((prop, key) =>
                  signedIn ? <Route exact={prop.exact} path={prop.path} key={prop.path} component={prop.component} /> : <Redirect key={key} to='/login' />,
                )}
                <Redirect from='/' to={signedIn ? '/account' : '/login'} />
                <Redirect from='' to={signedIn ? '/account' : '/login'} />
              </Switch>
            </div>
          </SuspenseWithChunkError>
        </Switch>
        {/* <ToastListener /> */}
      </Router>
    </Suspense>
  )
}

export default React.memo(App)

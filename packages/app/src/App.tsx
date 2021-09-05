import React, { Suspense, useEffect, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import ResetCSS from './components/ResetCSS'
import GlobalStyle from './components/style/Global'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { useDispatch } from 'react-redux'
import { clearZoo, updatZooBalnce } from 'state/zoo'
import { addEggs, addAnimals, addEgg, addAnimal, burnEgg, burnAnimal, getZooBalance } from 'state/zoo/actions'
import Moralis from 'moralis'
import { useMoralisSubscription } from 'react-moralis'
import { Egg, Animal } from 'types/zoo'
import { getToken, getZooKeeper } from 'util/contracts'
import useWeb3 from 'hooks/useWeb3'
import myVideo from './components/EggCard/media/spinning_egg_animation.mov'

import { mapEgg, mapAnimal, queryEggs, queryAnimals } from 'util/moralis'
import Header from 'components/Header'
import indexRoutes from 'routes'

const Login = lazy(() => import('./views/Login'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  useEagerConnect()
  const web3 = useWeb3()
  const { chainID } = web3
  const dispatch = useDispatch()

  /* Set signedIn to true if chainID and window.localStorage.getItem('connectorId') exist */
  const signedIn = chainID !== undefined && window.localStorage.getItem('connectorId') !== undefined
  const zooToken = getToken(web3)

  const getEggs = async () => {
    try {
      const eggs = []

      for (const egg of await queryEggs()) {
        eggs.push(mapEgg(egg))
      }
      dispatch(addEggs(eggs))
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

  useEffect(() => {
    dispatch(clearZoo())
    dispatch(getZooBalance(web3.account, zooToken))
    getEggs()
    getAnimals()
  }, [chainID, web3.account])
  const history = useHistory()
  return (
    <Suspense
      fallback={
        <div className='h-full flex justify-center items-center' style={{ height: '100vh' }}>
          <div style={{ margin: 0, position: 'absolute', width: '108%' }}>
            <video
              autoPlay
              loop
              muted
              style={{
                height: '235%',
                width: '235%',
                alignSelf: 'center',
              }}>
              <source src={myVideo} type='video/mp4'></source>
            </video>
          </div>
        </div>
      }>
      <Router>
        <ResetCSS />
        <GlobalStyle />
        <Switch>
          <Route exact path='/login'>
            {signedIn ? <Redirect to='/account' /> : <Login />}
          </Route>

          <SuspenseWithChunkError fallback={<></>}>
            <div className='z-0 flex flex-col items-center w-full h-screen pl-4 pr-4 pb-16 lg:pb-0'>
              <div className='flex sticky top-0 justify-between flex-nowrap w-full z-20 flex-shrink-0 w-full'>
                <Header />
              </div>

              <Switch>
                {indexRoutes.map((prop, key) => (signedIn ? <Route path={prop.path} key={prop.path} component={prop.component} /> : <Redirect key={key} to='/login' />))}
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

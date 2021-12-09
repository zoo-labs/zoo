import BigNumber from 'bignumber.js'
import Header from 'components/Header'
import { useZooToken } from 'hooks/useContract'
import { useEagerConnectAlt } from 'hooks/useEagerConnect'
import useWeb3 from 'hooks/useWeb3'
import React, { lazy, Suspense, useCallback, useEffect, useMemo } from 'react'
import { useMoralisSubscription } from 'react-moralis'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import indexRoutes from 'routes'
import { updateGasPrice } from 'state/network/actions'
import { clearZoo } from 'state/zoo'
import { addAnimal, addAnimals, addEgg, addEggs, burnAnimal, burnEgg, getMyEggs, getMyTransactions, getZooBalance } from 'state/zoo/actions'
import { mapAnimal, mapEgg, queryAnimals, queryEggs } from 'util/moralis'
import ResetCSS from './components/ResetCSS'
import GlobalStyle from './components/style/Global'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { useQuery, gql } from "@apollo/client";

const Login = lazy(() => import('./views/Login'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  // useEagerConnect()
  useEagerConnectAlt()
  const { library, chainId, account } = useWeb3()
  const dispatch = useDispatch()

  // Test hitting subgraph
  const GET_MEDIAS = gql`
  query GetMedias {
    medias {
      id
    }
  }
  `;
  const { loading, error, data } = useQuery(GET_MEDIAS);
  console.log('Subgraph Data', data);

  const valid = useMemo(() => {
    if (library && chainId) {
      return true
    }
    return false
  }, [library, chainId])
  /* Set signedIn to true if chainId and window.localStorage.getItem('connectorId') exist */
  const signedIn = chainId !== undefined && window.localStorage.getItem('connectorId') !== undefined
  // const zooToken = useContract('ZOO')
  const zooToken = useZooToken()
  // const zooToken = getToken(web3)

  const getEggs = async (account) => {
    try {
      const eggs = []

      for (const egg of await queryEggs()) {
        eggs.push(mapEgg(egg))
      }
      dispatch(addEggs(eggs))
      dispatch(getMyEggs(account, eggs))
    } catch (e) {
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
    try {
      dispatch(addEgg({ data: mapEgg(data), account }))
    } catch (e) {
      console.error('ISSUE CREATING EGG:', e)
    }
  }

  const updateEgg = async (data) => {
    try {
      dispatch(addEgg({ data: mapEgg(data), account }))
    } catch (e) {
      console.error('ISSUE UPDATING EGG:', e)
    }
  }

  const createAnimal = async (data) => {
    try {
      dispatch(addAnimal(mapAnimal(data)))
    } catch (e) {
      console.error('ISSUE CREATING ANIMAL:', e)
    }
  }

  const updateAnimal = async (data) => {
    try {
      dispatch(addAnimal(mapAnimal(data)))
    } catch (e) {
      console.error('ISSUE UPDATING ANIMAL:', e)
    }
  }

  const deleteAnimal = async (data) => {
    try {
      dispatch(burnAnimal(mapAnimal(data)))
    } catch (e) {
      console.error('ISSUE DELETING ANIMAL:', e)
    }
  }

  const deleteEgg = async (data) => {
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
  const getValues = useCallback(
    (account) => {
      dispatch(updateGasPrice(library))
      dispatch(clearZoo())
      // @TODO the following calls are using moralis.
      // re-enable them after the changeover to subgraph
      // dispatch(getZooBalance(account, zooToken))
      // dispatch(getMyTransactions(account))
      // getEggs(account)
      // getAnimals()
    },
    [dispatch, getAnimals, getEggs, library, zooToken],
  )

  useEffect(() => {
    getValues(account)
  }, [chainId, account, getValues])

  return (
    <Suspense fallback={<></>}>
      <Router>
        <ResetCSS />
        <GlobalStyle />
        <Switch>
          <Route exact path='/login'>
            {signedIn && valid ? <Redirect to='/home' /> : <Login />}
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
                <Redirect from='/' to={signedIn ? '/home' : '/login'} />
                <Redirect from='' to={signedIn ? '/home' : '/login'} />
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

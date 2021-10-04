import { NETWORK_SYMBOL, NETWORK_URL } from 'constants/networks'
import { useWeb3 } from 'hooks'
import { useFaucet, useZooToken } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { AppState } from 'state'
import { getZooBalance } from 'state/zoo/actions'
import Account from './Account'
import Bank from './Bank'

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const [tab, setTab] = useState('home')
  const { account, chainId, library } = useWeb3()
  const [wait, setWait] = useState(false)
  const faucet = useFaucet()
  const [balance, setBalance] = useState(0.0)
  const { toastSuccess, toastError, toastInfo, clear } = useToast()
  const toastClear = () => {
    clear()
  }
  const dispatch = useDispatch()
  const zooToken = useZooToken()
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>((state) => state.zoo.zooBalance)

  const handleFaucet = () => {
    try {
      const acc = library.account
      console.log(acc)
      setWait(true)
      toastClear()
      toastInfo('Sending ZOO...')
      faucet.methods
        .fund(acc)
        .send({ from: acc })
        .then(async () => {
          setWait(false)
          dispatch(getZooBalance(account, zooToken))
          toastClear()
          toastSuccess('Got ZOO!')
        })
        .catch((e) => {
          console.error('ISSUE USING FAUCET \n', e)
          setWait(false)
          toastClear()
          toastInfo('Canceled request for ZOO.')
        })
    } catch (e) {
      console.error('ISSUE USING FAUCET \n', e)
      toastClear()
      toastError('Unable to process transaction. Try again later.')
    }
  }
  const handleFunds = () => {
    if (balance == 0)
      return toastError(
        `You do not have sufficient ${NETWORK_SYMBOL[chainId]} to get Zoo`,
        `<a href='${NETWORK_URL[chainId]}' target='__blank'>Click here to buy ${NETWORK_SYMBOL[chainId]}</a>`,
      )

    switch (chainId) {
      case 1338:
        handleFaucet()
        break
      case 1337:
        handleFaucet()
        break
      case 97:
        handleFaucet()
        break
      case 4:
        handleFaucet()
        break
      default:
        window.open('https://pancakeswap.info/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13', '_blank')
    }
  }

  const getBalance = async () => {
    try {
      // const decimals = await zooToken.methods.decimals().call()
      await library.eth.getBalance(account).then((val) => {
        console.log('CHAIN-ID ' + chainId)
        const divisor = parseFloat(Math.pow(10, 18).toString())
        const balance = parseFloat(val) / divisor
        setBalance(parseFloat(balance.toFixed(4)))
      })
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
    }
  }

  let location = useLocation()
  useEffect(() => {
    setTab(location.pathname.split('/')[1])
  }, [location])

  useEffect(() => {
    if (!account) return
    getBalance()
  }, [account, chainId])

  return (
    <main className='flex flex-col  flex-grow w-full h-full lg:p-16 lg:m-4 p-0 m-0 lg:pr-0 lg:mr-0 space-y-4 rounded-lg  flex flex-col relative filter drop-shadow z-10'>
      {/* <div className='flex lg:p-0 p-4 justify-center lg:justify-start items-end flex-wrap'>
        <div>
          <div
            className={`self-center items-center grid grid-flow-col w-max rounded-xl p-1 m-1 justify-self-center ${
              isMobile ? 'justify-between z-10 fixed -bottom-0 right-2/4 transform translate-x-2/4 -translate-y-1/2 gap-0' : 'gap-6'
            }`}
            style={{ backgroundColor: 'rgb(25, 27, 31)' }}>
            {[
              { name: 'Account', id: 'account' },
              { name: 'Bank', id: 'bank' },
            ].map((type, index) => {
              const selected = tab == type.id
              return (
                <div
                  key={type.name}
                  className={`items-left rounded-xl cursor-pointer text-md font-normal flex text-gray-300 ${
                    selected && 'font-semibold text-white bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary'
                  }`}
                  style={{ padding: '10px 14px' }}
                  onClick={() => setTab(type.id)}>
                  <span>{type.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div> */}
      <div className='flex'>{tab === 'home' ? <Account handleFunds={() => handleFunds()} wait={wait} balance={zooBalance} /> : <Bank />}</div>
      <div
        style={{
          width: '50vw',
          height: '50vh',
          top: '0%',
          right: '-15%',
          zIndex: -1,
        }}
        className='absolute  bg-primary opacity-10  rounded-full z-0 filter  blur-3xl'></div>
      <div
        style={{
          width: '50vw',
          height: '50vh',
          left: '-15%',
          right: 0,
          bottom: '0%',
          zIndex: -1,
        }}
        className='absolute  bg-pink rounded-full opacity-10  z-0 filter  blur-3xl'></div>
    </main>
  )
}

export default Index

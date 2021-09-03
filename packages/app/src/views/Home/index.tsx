import { numberWithCommas } from 'components/Functions'
import { useWeb3 } from 'hooks'
import useToast from 'hooks/useToast'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { getFaucet, getToken } from 'util/contracts'
import Account from './Account'
import Bank from './Bank'

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const [tab, setTab] = useState(0)
  const web3 = useWeb3()
  const { chainID, account } = web3
  const [balance, setBalance] = useState(0.0)

  const [wait, setWait] = useState(false)
  const faucet = getFaucet(web3)
  const { toastSuccess, toastError, toastInfo, clear } = useToast()
  const toastClear = () => {
    clear()
  }
  const zooToken = getToken(web3)

  const getBalance = async () => {
    const acc = web3.account
    if (!acc) {
      setBalance(0.0)
      return
    }
    try {
      const decimals = await zooToken.methods.decimals().call()
      const rawBalance = await zooToken.methods.balanceOf(acc).call()
      const divisor = parseFloat(Math.pow(10, decimals).toString())
      const balance = rawBalance / divisor
      setBalance(parseFloat(balance.toFixed(4)))
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
      toastClear()
      toastError('Failed to load ZOO balance')
    }
  }

  const handleFaucet = () => {
    try {
      const acc = web3.account
      setWait(true)
      toastClear()
      toastInfo('Sending ZOO...')
      faucet.methods
        .fund(acc)
        .send({ from: acc })
        .then(async () => {
          setWait(false)
          await getBalance()
          toastClear()
          toastSuccess('Sent ZOO!')
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
    switch (chainID) {
      case 1337:
        handleFaucet()
        break
      case 97:
        handleFaucet()
        break
      default:
        window.open('https://pancakeswap.info/token/0x19263f2b4693da0991c4df046e4baa5386f5735e', '_blank')
      // redirectWindow.location
    }
  }
  useEffect(() => {
    getBalance()
  }, [])
  return (
    // className='lg:p-16 p-4 pr-0 lg:pr-0 mr-0 space-y-4 rounded-lg  m-4 flex flex-col relative filter drop-shadow z-10'
    <main className='flex flex-col  flex-grow w-full h-full lg:p-16 lg:m-4 p-0 m-0 lg:pr-0 lg:mr-0 space-y-4 rounded-lg  flex flex-col relative filter drop-shadow z-10'>
      <div className='flex lg:p-0 p-4 justify-center lg:justify-start items-end flex-wrap'>
        <div>
          <div
            className={`self-center items-center grid grid-flow-col w-max rounded-xl p-1 m-1 justify-self-center ${
              isMobile ? 'justify-between z-10 fixed -bottom-0 right-2/4 transform translate-x-2/4 -translate-y-1/2 gap-0' : 'gap-6'
            }`}
            style={{ backgroundColor: 'rgb(25, 27, 31)' }}>
            {[
              { name: 'Account', id: 0 },
              { name: 'Bank', id: 1 },
            ].map((type, index) => {
              const selected = tab == type.id
              return (
                <div
                  key={type.name}
                  className={`items-left rounded-xl cursor-pointer text-md font-normal flex text-gray-300 ${
                    selected && 'font-semibold text-white bg-gradient-to-r from-btn1 to-btn2 hover:from-primary hover:to-primary'
                  }`}
                  style={{ padding: '10px 14px' }}
                  onClick={() => setTab(type.id)}>
                  <span>{type.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='flex'>{tab === 0 ? <Account handleFunds={() => handleFunds()} wait={wait} /> : <Bank />}</div>
    </main>
  )
}

export default Index

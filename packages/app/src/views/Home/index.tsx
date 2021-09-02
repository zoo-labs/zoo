import { numberWithCommas } from 'components/Functions'
import { useWeb3 } from 'hooks'
import useToast from 'hooks/useToast'
import React, { useEffect, useState } from 'react'
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
    try {
      const decimals = await zooToken.methods.decimals().call()
      const rawBalance = await zooToken.methods.balanceOf(account).call()
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
      setWait(true)
      toastClear()
      toastInfo('Sending ZOO...')
      faucet.methods
        .fund(account)
        .send({ from: account })
        .then(() => {
          setWait(false)
          getBalance()
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
        window.open('https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997', '_blank')
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
          <div className=' grid grid-cols-2 rounded-lg bg-dark-800 h-[46px] gap-2' style={{ height: 40 }}>
            {[
              { name: 'Account', id: 0 },
              { name: 'Bank', id: 1 },
            ].map((type, index) => {
              return (
                <div className={`flex items-center   ${type.id === 1 ? 'justify-center' : 'justify-start'} cursor-pointer`} onClick={() => setTab(type.id)}>
                  <span
                    className={`w-full flex items-center justify-center px-2 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis ${
                      tab === type.id &&
                      'font-bold border rounded-lg text-high-emphesis border-dark-800 bg-gradient-to-r from-primary to-pink hover:from-blue-600 hover:to-pink-600 h-full'
                    }`}>
                    {type.name}
                  </span>
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

import { numberWithCommas } from 'components/Functions'
import { useWeb3 } from 'hooks'
import useToast from 'hooks/useToast'
import React, { useEffect, useState } from 'react'
import { getZooFaucet, getZooToken } from 'util/contracts'
import Account from './Account'
import Bank from './Bank'

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  const [tab, setTab] = useState(0)
  const web3 = useWeb3()
  const { chainID, account } = web3
  const [balance, setBalance] = useState(0.0)

  const [wait, setWait] = useState(false)
  const faucet = getZooFaucet(web3)
  const { toastSuccess, toastError, toastInfo, clear } = useToast()
  const toastClear = () => {
    clear()
  }
  const zooToken = getZooToken(web3)

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
        const redirectWindow = window.open('https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997', '_blank')
        redirectWindow.location
    }
  }
  useEffect(() => {
    getBalance()
  }, [])
  return (
    // className='lg:p-16 p-4 pr-0 lg:pr-0 mr-0 space-y-4 rounded-lg  m-4 flex flex-col relative filter drop-shadow z-10'
    <main className='flex flex-col  flex-grow w-full h-full lg:p-16 lg:m-4 p-0 m-0 lg:pr-0 lg:mr-0 space-y-4 rounded-lg  flex flex-col relative filter drop-shadow z-10'>
      <div className='flex lg:p-16 p-4 justify-center lg:justify-between items-end flex-wrap'>
        <div className='flex-1 '>
          <div className='text-base font-bold currentColor mb-2'>{numberWithCommas(balance)} ZOO</div>
          <div className='flex items-center  cursor-pointer' onClick={() => handleFunds()}>
            <span
              className={`flex items-center justify-center px-4 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis font-bold border rounded-lg text-high-emphesis border-dark-800 bg-dark-700  hover:bg-primary h-full
                `}
              style={{ minHeight: 40 }}>
              {chainID !== 97 && chainID !== 1337 ? 'Add Funds' : wait ? 'Processing' : 'Get Zoo'}
            </span>
          </div>
        </div>
        <div>
          <div className='flex-1 grid grid-cols-2 rounded-lg bg-dark-800 h-[46px] gap-2' style={{ height: 40 }}>
            {[
              { name: 'Account', id: 0 },
              { name: 'Bank', id: 1 },
            ].map((type, index) => {
              return (
                <div className={`flex items-center   ${type.id === 1 ? 'justify-center' : 'justify-start'} cursor-pointer`} onClick={() => setTab(type.id)}>
                  <span
                    className={`w-full flex items-center justify-center px-2 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis ${
                      tab === type.id &&
                      'font-bold border rounded-lg text-high-emphesis border-dark-800 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 h-full'
                    }`}>
                    {type.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='flex'>{tab === 0 ? <Account /> : <Bank />}</div>
    </main>
  )
}

export default index

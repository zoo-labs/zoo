import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BidsComp from '../Cards/BidsCard'
import { useZoobalance } from 'state/zoo/hooks'

const CardWithTabs = ({
  TabAName = 'My Wallet',
  TabBName = 'My Bids',
  TabCName = 'My Auctions',
  TabA = 'use Prop TabA to render here',
  TabB = 'use Prop TabB to render here',
  TabC = 'use Prop TabC to render here',
}: any) => {
  const { zooBalance } = useSelector((state: any) => state.zoo)
  const getZooBalance = useZoobalance()

  // console.log('zooBalance', zooBalance)
  useEffect(() => {
    getZooBalance()
  }, [getZooBalance])
  const [Tab, setTab] = useState(1)

  const HandleChangeTab = (value) => {
    setTab(value)
  }

  useEffect(() => {
    console.log(TabAName)
    console.log(TabBName)
    console.log(TabCName)

    return () => {}
  }, [Tab])

  return (
    <div className="w-full flex flex-col items-start px-5 md:px-10">
      <div className=" bg-bid-gradient grid grid-cols-3 w-full md:w-[500px] gap-1 h-[70px] md:h-[50px] rounded-xl p-1 mb-6">
        <div
          className={`flex flex-col p-2  justify-center items-center ${
            Tab === 1 ? 'bg-transparent' : 'bg-black'
          } hover:bg-transparent rounded-l-lg cursor-pointer`}
          onClick={(value) => {
            console.log(value)
            HandleChangeTab(1)
          }}
        >
          <button value={1} className="text-xs md:text-base text-white font-bold focus:bg-transparent">
            {TabAName}
          </button>
        </div>
        <div
          className={`flex flex-col p-2   justify-center items-center ${
            Tab === 2 ? 'bg-transparent' : 'bg-black'
          } hover:bg-transparent cursor-pointer`}
          onClick={() => {
            HandleChangeTab(2)
          }}
        >
          <button value={2} className="text-xs md:text-base text-white font-bold focus:bg-transparent">
            {TabBName}
          </button>
        </div>
        <div
          className={`flex flex-col p-2  justify-center items-center ${
            Tab === 3 ? 'bg-transparent' : 'bg-black'
          } hover:bg-transparent rounded-r-lg cursor-pointer`}
          onClick={() => {
            HandleChangeTab(3)
          }}
        >
          <button value={3} className="text-xs md:text-base text-white font-bold">
            {TabCName}
          </button>
        </div>
      </div>
      <p className="text-2xl text-white font-medium">
        Wallet balance:{' '}
        <span className="font-black text-lg text-primary-green">
          {' '}
          {zooBalance?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          })}{' '}
          $ZOO{' '}
        </span>
      </p>

      <div className="w-full mt-7">
        {Tab === 1 ? <div className="w-full flex flex-col items-center  ">{TabA}</div> : ''}
        {Tab === 2 ? <div className="w-full flex flex-col items-center ">{TabB}</div> : ''}
        {Tab === 3 ? <div className="w-full flex flex-col items-center  ">{TabC}</div> : ''}
      </div>
    </div>
  )
}

export default CardWithTabs

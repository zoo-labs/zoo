/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import CardNft from 'marketplace/Cards/CardNft'
import Carousel from 'components/Carousel'
import { SwiperSlide } from 'swiper/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { abbreviateNumber } from 'functions/abbreviateNumbers'
import { AvailableEggs } from 'types'
import { useCallback } from 'react'
import {
  useBuyEgg,
  useBuyEggWithBnB,
  useBuyZoo,
  useGetAvailableEggs,
  useTransferZoo,
  useZoobalance,
} from 'state/zoo/hooks'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import { useWalletModalToggle } from 'state/application/hooks'

const ModelViewer = dynamic(() => import('components/ModelViewer'), {
  ssr: false,
})

const Item = () => {
  const router = useRouter()
  const { id } = router.query
  const { account } = useActiveWeb3React()
  const [egg, setEgg] = React.useState<AvailableEggs>(null)
  const [withZoo, setWithZoo] = React.useState(true)
  const { availableEggs, loading, zooBalance } = useSelector((state: any) => state.zoo)
  const buyZoo = useBuyZoo()
  const buyEgg = useBuyEgg()
  const transferZoo = useTransferZoo()
  const buyEggWithBnB = useBuyEggWithBnB()
  const getZooBalance = useZoobalance()
  const getAvailableEggs = useGetAvailableEggs()
  const toggleWallet = useWalletModalToggle()

  useEffect(() => {
    getAvailableEggs()
    getZooBalance()
  }, [getAvailableEggs, getZooBalance])

  const handleBuyZoo = useCallback(() => {
    console.log('Clicked')
    if (account) {
      buyZoo()
    } else {
      toggleWallet()
    }
  }, [account, buyZoo, toggleWallet])

  const handleBuyEgg = useCallback(
    (eggId, quantity) => {
      console.log('Clicked')
      if (account) {
        if (withZoo) {
          buyEgg(eggId, quantity, () => router.push('/dashboard'))
        } else {
          buyEggWithBnB(eggId, quantity, () => router.push('/dashboard'))
          // buyEgg(eggId, quantity, () => router.push('/dashboard'))
        }
      } else {
        toggleWallet()
      }
    },
    [account, buyEgg, buyEggWithBnB, router, toggleWallet, withZoo]
  )

  useEffect(() => {
    const _egg = availableEggs.find((e: any) => e.id?.toString() === id?.toString())
    setEgg(_egg)
  }, [availableEggs, id])

  console.log('Item', { egg, availableEggs, withZoo })
  console.log('comparison', {
    price: egg?.price,
    zooBalance,
  })
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-11 lg:items-center px-5 lg:px-10 mt-20 max-w-7xl mx-auto">
        <div className="rounded-xl p-px h-full bg-view-gradient w-full lg:w-[40%]">
          <div className="bg-black rounded-xl min-h-[466px] h-full w-full px-12 py-12 flex flex-col justify-center items-center">
            {/* <ModelViewer></ModelViewer> */}
            <img src="/img/egg.png" alt="" />
            {/* <img src={egg?.data?.tokenURI} alt="Egg" /> */}
          </div>
        </div>
        <div className="rounded-xl p-px h-full bg-transparent px-5 py-3 w-full lg:w-[60%]">
          <div className="flex flex-col gap-9 items-start text-white mb-7">
            <div className="flex items-center gap-x-4 space-y-3 flex-wrap w-full">
              <div className="w-full">
                <p className="font-semibold text-[52px]">{egg?.name}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Image src="/icons/status.svg" alt="" height={26} width={20} />
                <div>
                  <p className="font-medium text-sm">Status</p>
                  <p className="font-medium text-[10px]">Endangered</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Image src="/icons/population.svg" alt="" height={26} width={20} />
                <div>
                  <p className="font-medium text-sm">Population</p>
                  <p className="font-medium text-[10px]">2,400-2,800</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Image src="/icons/react.svg" alt="" height={26} width={20} />
                <div>
                  <p className="font-medium text-sm">Scientific Name</p>
                  <p className="font-medium text-[10px]">Elephas Maximus Sumatrensis</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Image src="/icons/shape.svg" alt="" height={26} width={20} />
                <div>
                  <p className="font-medium text-sm">Size</p>
                  <p className="font-medium text-[10px]">6.6 - 10.5 Feet</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Image src="/icons/habitat.svg" alt="" height={26} width={20} />
                <div>
                  <p className="font-medium text-sm">Habitats</p>
                  <p className="font-medium text-[10px]">Tropical Forests</p>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center gap-3 mb-2.5">
              <div className="w-full lg:w-3/4">
                <div className="w-full py-2 5 px-6 flex flex-col md:flex-row md:items-center md:justify-between bg-dark-400 rounded-lg ">
                  <div>
                    <p className="text-xs font-normal">Current price</p>
                    <p className="text-xl font-medium">{abbreviateNumber(egg?.price)} ZOO</p>
                  </div>
                  <button
                    className="rounded-full bg-c-grey-200 inline-flex items-center justify-between w-[85px] p-1 pr-2 cursor-pointer"
                    onClick={() => setWithZoo(!withZoo)}
                  >
                    <div className="inline-flex items-center">
                      {withZoo ? (
                        <>
                          <Image src="/images/wallets/bsc.jpg" alt="" width={20} height={20} className="rounded-full" />
                          <p className="text-xs font-semibold ml-1">BNB</p>
                        </>
                      ) : (
                        <>
                          <Image src="/luxlogo.png" alt="" width={20} height={20} className="rounded-full" />
                          <p className="text-xs font-semibold ml-1">ZOO</p>
                        </>
                      )}
                    </div>
                    <img src="/icons/caret-right.png" alt="" className="rounded-full" />
                  </button>
                </div>
                <p className="text-right text-c-grey-100 text-xs">
                  Your Wallet Balance: {withZoo ? `${zooBalance} ZOO` : '4.34 BNB'}
                </p>
              </div>
              {Number(egg?.price) > zooBalance && (
                <button className=" bg-dark-400 rounded-lg px-2 py-2" onClick={() => handleBuyZoo()}>
                  Buy more
                </button>
              )}
            </div>
            <div className="text-sm w-full">
              <p className="w-full border-b border-[#605E5E] pb-2 mb-5">Description</p>
              <p className="mb-7">
                Introducing Only1 Genesis NFTs and Creator Staking Pool - where Defi meets social in only1. Each creator
                passed KYC will be minted a Genesis-NFT, which they can associate with perks and rewards and trade it in
                the marketplace. Users on the platform can stake $LIKE tokens on individual creators and earn based on
                the pool’s APY, which adjusts according to the creator’s engagement.
              </p>
              <p>
                Only1 believes that the future of NFTs will serve a key function within the tech world and that utility
                NFTs will inevitably spill into other verticals outside gaming. They also think art and collectible NFTs
                will slowly be replaced by utility NFTs, and hence have made them an integral part of their concept and
                earning mechanisms. There are two main methods that Only1 uses to prioritize social engagement between
                fans and influencers. ‍
              </p>
            </div>
            <button
              className={`py-3.5 w-full rounded-lg bg-bid-gradient disabled:cursor-not-allowed ${
                loading && 'opacity-30'
              }`}
              disabled={loading || Number(egg?.price) > zooBalance}
              onClick={() => handleBuyEgg(id, 1)}
            >
              {loading ? 'Loading...' : Number(egg?.price) > zooBalance ? 'Insuficient balance' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item

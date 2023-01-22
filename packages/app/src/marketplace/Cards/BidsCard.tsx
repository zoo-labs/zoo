import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEditAuctionModalToggle, useIncreaseBidModalToggle } from 'state/application/hooks'
const ModelViewer = dynamic(() => import('../../components/ModelViewer'), {
  ssr: false,
})

const BidsCard = ({
  glb = '',
  usdz = '',
  itemId = 1,
  ownerAdd = '8xbxbddb',
  CurrentBid = 3,
  StartingBid = 2,
  greenNum = '10200',
  AuctionTime = '6:20:00',
  typeOfNft = 'Egg',
  bid = true,
}) => {
  const router = useRouter()
  const timeLeft = AuctionTime.split(':')
  const toggleEditAuctionModal = useEditAuctionModalToggle()
  const toggleIncreaseBidModal = useIncreaseBidModalToggle()

  const handleFunc = () => {
    if (bid) {
      toggleIncreaseBidModal()
    } else {
      toggleEditAuctionModal()
    }
  }

  return (
    <div className="w-full min-h-full  grid grid-cols-1 md:grid-cols-2">
      <div className="  w-[300px] md:w-full lg:w-full h-[700px] flex flex-col justify-center items-center ">
        <div className=" borderGrad  w-[300px]  h-[500px]">
          <div className="w-full h-full bg-back rounded-[0.225rem]">
            <ModelViewer zoom="35deg"></ModelViewer>
          </div>
        </div>
      </div>

      <div className=" w-[300px] md:w-full lg:w-full  h-[700px] flex flex-col justify-center items-center ">
        <div className="w-[300px] lg:w-[400px]">
          <h1 className="text-6xl font-medium mb-5 text-white ">{typeOfNft}</h1>
        </div>
        <div className="w-[300px] lg:w-[400px] grid grid-cols-2 mb-6">
          <div className="flex items-center gap-1.5">
            <div className="rounded-full bg-ball-gradient h-12 w-12" />
            <div>
              <p className="text-sm text-muted font-medium">Owner</p>
              <p className="text-2xl text-white font-medium">{ownerAdd}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Image src="/icons/coin.png" alt="" width={50} height={50} />
            <div>
              <h1 className="text-sm text-muted font-medium">Reserve Price</h1>
              <h1 className="text-lg font-bold text-white ">
                {StartingBid} ETH <span className="text-primary-green">$6800</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="min-h-[300px] w-[300px] lg:w-[400px] bg-[#1F2030]  p-2 rounded-xl">
          <div className="h-[300px] flex flex-col justify-center align-middle">
            <h1 className="text-center text-white font-medium">Current Bid</h1>

            <h1 className=" text-6xl font-bold my-2 text-white text-center ">{Number(CurrentBid).toFixed(2)} ETH</h1>
            <h1 className="text-primary-green text-xl font-black text-center mb-10">
              $
              {Number(greenNum)?.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </h1>

            <h1 className="text-center text-white font-medium">Auction ending in</h1>
            {/* <h1 className="p-2 m-2 text-center ">{AuctionTime}</h1> */}
            <div className="flex items-center justify-center gap-7">
              <div className="flex flex-col items-center">
                <h1 className="text-[44px] leading-[3rem] lg:leading-4 text-white font-medium">{timeLeft[0]}</h1>
                <p className="text-muted">Hrs</p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-[44px] leading-[3rem] lg:leading-4 text-white font-medium">{timeLeft[1]}</h1>
                <p className="text-muted">Min</p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-[44px] leading-[3rem] lg:leading-4 text-white font-medium">{timeLeft[2]}</h1>
                <p className="text-muted">Sec</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[98px] w-[300px] lg:w-[400px] flex flex-col rounded-xl mt-2">
          <button className="py-3 bg-[#2517FF] mt-3 border-transparent rounded-md" onClick={handleFunc}>
            {bid ? 'INCREASE BID' : 'EDIT AUCTION'}
          </button>

          <button
            className="py-3 bg-transparent border border-white  rounded-md mt-3"
            onClick={() =>
              router.push({
                pathname: '/marketplace/[ownerId]/[itemId]',
                query: {
                  ownerId: ownerAdd,
                  itemId,
                },
              })
            }
          >
            {bid ? 'VIEW BID' : 'VIEW ITEM'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BidsCard

import React, { useCallback, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "components/Modal";
import { fadeInOnScroll } from "animation";
import { Auction } from "types";
import dynamic from "next/dynamic";
import { useEditAuction, useZoobalance } from "state/zoo/hooks";
import { useZooKeeper } from "hooks";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import Web3 from "web3";
import useCountDown from "react-countdown-hook";
import { useWalletModalToggle } from "state/application/hooks";

const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

const MyAuctionSection = ({ auction }: { auction: Auction }) => {
  const [openMoal, setOpenModal] = React.useState(false);
  const [reservePrice, setReservePrice] = useState<number | undefined>();
  const comingSoonRef = React.useRef();
  const { account } = useActiveWeb3React();
  const getZooBalance = useZoobalance();
  const zooKeeper = useZooKeeper();
  const editAuction = useEditAuction();
  const toggleWallet = useWalletModalToggle();
  const [zooBnbPrice, setZooBnbPrice] = useState(0);

  const getZooBnbPrice = useCallback(async () => {
    const price = await zooKeeper?.BNBPrice();
    const value = Web3.utils.fromWei(price?.toString(), "ether");
    setZooBnbPrice(parseFloat(value));
  }, [zooKeeper]);

  useEffect(() => {
    getZooBalance();
    getZooBnbPrice();
  }, [getZooBalance, getZooBnbPrice]);

  const amountPriceBNB = zooBnbPrice * Number(auction?.amount);
  const reservePriceBNB = zooBnbPrice * Number(auction?.reservePrice);

  useEffect(() => {
    fadeInOnScroll(comingSoonRef.current);
  }, []);

  console.log("THE_SINGLE_AUCC", auction);

  const interval = 1000;
  const [initialTime, setInitialTime] = useState(0);
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );

  useEffect(() => {
    const endDate = new Date(auction.firstBidTime + auction.duration);
    setInitialTime(endDate.getTime());
  }, [auction]);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setReservePrice(auction?.reservePrice);
    // start();
  }, [auction?.reservePrice]);

  const timer = useMemo(() => {
    if (auction?.firstBidTime) {
      console.log("THE_TIME_LEFT", new Date(timeLeft * 1000));
      const now = new Date();
      const timeLeft_ = new Date(timeLeft * 1000).getTime() - now.getTime();
      const days = Math.floor(timeLeft_ / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      return (
        <div className="flex items-center justify-between max-w-md">
          <div className="mr-3 text-center">
            <p className="text-2xl font-medium lg:text-4xl ">{days}</p>
            <p className="font-medium text-grey">Days</p>
          </div>
          <div className="mr-3 text-center">
            <p className="text-2xl font-medium lg:text-4xl ">{hours}</p>
            <p className="font-medium text-grey">Hrs</p>
          </div>
          <div className="mr-3 text-center">
            <p className="text-2xl font-medium lg:text-4xl ">{minutes}</p>
            <p className="font-medium text-grey">Min</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium lg:text-4xl">{seconds}</p>
            <p className="font-medium text-grey">Sec</p>
          </div>
        </div>
      );
    } else return "Auction has not started yet";
  }, [auction?.firstBidTime, timeLeft]);

  const successCallback = useCallback(() => {
    console.log("success");
    setOpenModal(false);
  }, []);

  const handleEditAuction = useCallback(
    (e) => {
      e.preventDefault();
      if (auction.reservePrice !== reservePrice) {
        if (account) {
          editAuction(auction.auctionId, reservePrice, () => {
            successCallback();
          });
        } else {
          toggleWallet();
        }
      }
    },
    [account, auction, editAuction, reservePrice, successCallback, toggleWallet]
  );

  return (
    <>
      <section className="flex flex-col gap-24 my-16 lg:flex-row lg:justify-between lg:px-48">
        <div className="bg-nft-gradient p-0.5 flex flex-col basis-1/2 justify-center rounded-xl">
          <div className="flex flex-col justify-center h-full bg-black rounded-xl">
            {auction.kind === 0 ? (
              <video
                autoPlay
                loop
                src={auction.animation_url}
                width={300}
                height={350}
              />
            ) : (
              <div className="h-[450px] w-[300px]">
                <ModelViewer
                  glb={auction?.glb_animation_url}
                  usdz={auction?.usdz_animation_url}
                ></ModelViewer>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col basis-1/2">
          <h2 className="mb-4 text-4xl lg:text-4xl">{auction?.name}</h2>
          {/* Address and Price */}
          <div className="flex justify-between mb-4">
            <div className="flex money">
              <Image
                src="/img/reserved-price.png"
                width={51}
                height={51}
                alt=""
              />
              <div className="ml-3">
                <p className="text-grey">Reserve Price</p>
                <p className="font-bold">
                  {auction?.reservePrice} ZOO{" "}
                  <span className="text-green">{reservePriceBNB} BNB</span>
                </p>
              </div>
            </div>
          </div>
          {/* Card */}
          <div className="flex flex-col items-center px-4 py-8 mb-6 rounded card bg-black100">
            <p className="mb-6 text-xs">Current Bid</p>
            <h1 className="mb-4 text-4xl font-bold lg:text-6xl">
              {auction?.amount} ZOO
            </h1>
            <p className="font-bold text-green lg:text-xl mb-9">
              {amountPriceBNB} BNB
            </p>
            {auction.firstBidTime ? (
              <p className="mb-2 font-medium text-white">Auction ending in</p>
            ) : (
              ""
            )}
            {/* Countdown */}
            {timer}
            {/* <div className="flex items-center justify-between max-w-md">
              <div className="mr-3 text-center">
                <p className="text-2xl font-medium lg:text-4xl ">{days}</p>
                <p className="font-medium text-grey">Days</p>
              </div>
              <div className="mr-3 text-center">
                <p className="text-2xl font-medium lg:text-4xl ">{hours}</p>
                <p className="font-medium text-grey">Hrs</p>
              </div>
              <div className="mr-3 text-center">
                <p className="text-2xl font-medium lg:text-4xl ">{minutes}</p>
                <p className="font-medium text-grey">Min</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-medium lg:text-4xl">{seconds}</p>
                <p className="font-medium text-grey">Sec</p>
              </div>
            </div> */}
          </div>
          {!auction.firstBidTime && (
            <button
              className="py-2 mb-4 font-semibold text-white rounded bg-blue"
              onClick={() => setOpenModal(true)}
            >
              Edit Auction
            </button>
          )}
          <Link href="/nft-info" passHref>
            <button className="py-2 font-semibold border border-white rounded">
              View Item
            </button>
          </Link>
        </div>
      </section>

      <Modal onDismiss={() => setOpenModal(false)} isOpen={openMoal}>
        <div>
          <div className="my-4">
            <p className="font-bold text-white">Edit Auction</p>
          </div>
          <div>
            <form onSubmit={(e: any) => handleEditAuction(e)}>
              <div className="mb-4">
                <p className="mb-2 text-xs font-bold">Reserved Price</p>
                <div className="flex flex-row justify-between px-4 py-2 border rounded items center border-black100 bg-black100">
                  <input
                    type="number"
                    value={reservePrice}
                    onChange={(e: any) => setReservePrice(e.target.value)}
                    className="bg-transparent border-0 outline-0"
                  />
                  <Image
                    src="/img/eth-icon.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </div>
              </div>

              {/* <div>
                <p className="mb-2 text-xs font-bold">Start time</p>
                <div className="flex justify-center gap-4 overflow-hidden">
                  <div className="py-2 border rounded border-black100 bg-black100 basis-1/2">
                    <input
                      type="text"
                      value="25 Jan 2022"
                      className="bg-transparent border-0 outline-0"
                    />
                  </div>

                  <div className="py-2 border rounded border-black100 bg-black100 basis-1/2">
                    <input
                      type="text"
                      value="12:27 PM GMT"
                      className="bg-transparent border-0 outline-0"
                    />
                  </div>
                </div>
              </div> */}

              <button
                className="w-full px-4 py-2 mt-8 font-bold text-center text-white rounded bg-blue disabled:cursor-not-allowed cursor-pointer"
                disabled={auction.reservePrice === reservePrice}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </Modal>

      {/* <div className="py-20">
        <PopularNftsSection />
        <div className="mt-12 text-xl text-center">
          <a href="/animal-list" className="underline text-green ">
            View All
          </a>
        </div>
      </div> */}
    </>
  );
};

// const MyAuctionSection = () => {
//   return (
//     <section className="flex flex-col lg:flex-row lg:justify-between">
//       <div className="flex flex-col justify-center basis-1/2">
//         <Image src="/img/egg.png" width={200} height={400} alt="" objectFit="contain" />
//       </div>
//       <div className="flex flex-col basis-1/2">
//         <h2 className="mb-4 text-4xl lg:text-7xl">Egg</h2>
// 				{/* Address and Price */}
//         <div className="flex justify-between mb-4">
//           <div className="flex items-center address">
//             <div className="mr-3">
//               <Image src="/img/round-bg.svg" width={48} height={48} alt="" />
//             </div>
//             <div className="owner">
//               <p className="text-grey">Owner</p>
//               <p>0xd0ae…e3e0</p>
//             </div>
//           </div>
//           <div className="flex money">
//             <Image
//               src="/img/reserved-price.png"
//               width={51}
//               height={51}
//               alt=""
//             />
//             <div className="ml-3">
//               <p className="text-grey">Reserve Price</p>
//               <p className="font-bold">
//                 3.5 ETH <span className="text-green">$6800</span>
//               </p>
//             </div>
//           </div>
//         </div>
// 				{/* Card */}
//         <div className="flex flex-col items-center px-4 py-8 mb-6 rounded card bg-black100">
//           <p className="mb-6 text-xs">Current Bid</p>
//           <h1 className="mb-4 text-4xl font-bold lg:text-7xl">1.00 ETH</h1>
//           <p className="mb-12 font-bold text-green lg:text-xl">$3,618.36</p>

//           <p className="mb-4 text-grey">Auction ending in</p>
//           <div className="flex items-center justify-between max-w-md">
//             <div className="text-center">
//               <p className="mr-3 text-2xl font-bold lg:text-4xl">01</p>
//               <p className="font-bold text-grey">Hrs</p>
//             </div>
//             <div className="text-center">
//               <p className="mr-3 text-2xl font-bold lg:text-4xl">23</p>
//               <p className="font-bold text-grey">Min</p>
//             </div>
//             <div className="text-center">
//               <p className="mr-3 text-2xl font-bold lg:text-4xl"> 17</p>
//               <p className="font-bold text-grey">Sec</p>
//             </div>
//           </div>
//         </div>
//         <button className="py-2 mb-4 font-semibold text-white rounded bg-blue">
//           Edit Auction
//         </button>
//         <button className="py-2 font-semibold border border-white rounded">
//           View Item
//         </button>
//       </div>
//     </section>
//   );
// };

export default MyAuctionSection;

import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
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
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const interval = 1000;
  const [initialTime, setInitialTime] = useState<undefined | number>();
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
  }, [initialTime]);

  useEffect(() => {
    setReservePrice(auction?.reservePrice);
    // start();
  }, [auction?.reservePrice]);

  // console.log("CHANGEABLE_STUFFS", {
  //   initialTime,
  //   timeLeft,
  // });

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
      // setTime({
      //   days,
      //   hours,
      //   minutes,
      //   seconds,
      // });
      console.log("CHANGEABLE_STUFFS", {
        initialTime,
        timeLeft,
      });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const Ref = useRef(null);

  // The state for our timer
  const [timer2, setTimer] = useState<any>();

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(String(new Date()));
    // console.log("TOTALe__", total);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = useCallback((e) => {
    let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        <div className="flex items-center justify-between max-w-md">
          {/* <div className="mr-3 text-center">
            <p className="text-2xl font-medium lg:text-4xl ">{days}</p>
            <p className="font-medium text-grey">Days</p>
          </div> */}
          <div className="mr-3 text-center">
            <p className="text-2xl font-medium lg:text-4xl ">
              {hours > 9 ? hours : "0" + hours}
            </p>
            <p className="font-medium text-grey">Hrs</p>
          </div>
          <div className="mr-3 text-center">
            <p className="text-2xl font-medium lg:text-4xl ">
              {minutes > 9 ? minutes : "0" + minutes}
            </p>
            <p className="font-medium text-grey">Min</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium lg:text-4xl">
              {seconds > 9 ? seconds : "0" + seconds}
            </p>
            <p className="font-medium text-grey">Sec</p>
          </div>
        </div>
      );
    }
  }, []);

  const clearTimer = useCallback(
    (e) => {
      // If you adjust it you should also need to
      // adjust the Endtime formula we are about
      // to code next
      // setTimer("00:00:10");

      // If you try to remove this line the
      // updating of timer Variable will be
      // after 1000ms or 1sec
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
        startTimer(e);
      }, 1000);
      Ref.current = id;
    },
    [startTimer]
  );

  const getDeadTime = (t) => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + t);
    return deadline;
  };

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = useCallback(
    (t) => {
      clearTimer(getDeadTime(t));
    },
    [clearTimer]
  );

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    const endDate = new Date(
      auction.firstBidTime * 1000 + auction.duration * 1000
    );
    // clearTimer(getDeadTime(endDate.getTime()));
    startTimer(endDate.getTime());
    console.log("SUPPOSED_END_DATE", endDate);
    // return () => {
    //   onClickReset(endDate.getTime());
    //   clearInterval(Ref.current);
    // };
  }, [auction, clearTimer, onClickReset, startTimer]);

  console.log("TIMER__", String(timer2));

  // TIMER 3 LFGGGGGGGG!
  const calculateTimeLeft = () => {
    const endDate = new Date(
      auction.firstBidTime * 1000 + auction.duration * 1000
    );
    const difference = +new Date(endDate) - +new Date();

    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [ttimeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(interval);
  }, []);

  console.log("TIMER_COMPONENTS__", ttimeLeft);

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
        <div className="flex flex-col basis-1/2 w-full">
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
            {/* {timer} */}
            {/* {timer2} */}
            {/* {timerComponents.length ? timerComponents : <span>6 Weeks</span>} */}

            <div className="flex items-center justify-between max-w-md">
              <div className="mr-3 text-center">
                <p className="text-2xl font-medium lg:text-4xl ">
                  {ttimeLeft.d > 9 ? ttimeLeft.d : "0" + ttimeLeft.d}
                </p>
                <p className="font-medium text-grey">Days</p>
              </div>
              <div className="mr-3 text-center">
                <p className="text-2xl font-medium lg:text-4xl ">
                  {ttimeLeft.h > 9 ? ttimeLeft.h : "0" + ttimeLeft.h}
                </p>
                <p className="font-medium text-grey">Hrs</p>
              </div>
              <div className="mr-3 text-center">
                <p className="text-2xl font-medium lg:text-4xl ">
                  {ttimeLeft.m > 9 ? ttimeLeft.m : "0" + ttimeLeft.m}
                </p>
                <p className="font-medium text-grey">Min</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-medium lg:text-4xl">
                  {ttimeLeft.s > 9 ? ttimeLeft.s : "0" + ttimeLeft.s}
                </p>
                <p className="font-medium text-grey">Sec</p>
              </div>
            </div>
          </div>
          {!auction.firstBidTime && (
            <button
              className="py-2 mb-4 font-semibold text-white rounded bg-blue"
              onClick={() => setOpenModal(true)}
            >
              Edit Auction
            </button>
          )}
          <Link href={`/market/auctions/${auction.auctionId}`} passHref>
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

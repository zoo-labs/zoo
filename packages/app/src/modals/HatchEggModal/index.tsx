/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  useHatchEggModal,
  useModalOpen,
  useWalletModalToggle,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";
import ModalHeader from "../../components/ModalHeader";
import { useSelector } from "react-redux";
import { useHatch } from "state/zoo/hooks";
import { useMedia, useZooToken } from "hooks";

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
};

export default function HatchEggModal({ nftItem, success }) {
  // important that these are destructed from the account-specific web3-react context
  console.log("NFT_TO_HATCH", nftItem);
  const hatchEggWaitPeriod: number = Number(
    process.env.NEXT_PUBLIC_HATCH_EGG_WAIT_PERIOD
  );
  const { account } = useWeb3React();
  const { loading } = useSelector((state: any) => state.zoo);
  const media = useMedia();
  const zookeeper = useZooToken();
  const hatchEggModalOpen = useModalOpen(ApplicationModal.HATCH_EGG);

  const toggleModal = useHatchEggModal();
  const hatchEgg = useHatch();
  const toggleWallet = useWalletModalToggle();
  const handleHatchEgg = useCallback(() => {
    console.log("Clicked");
    if (account) {
      console.log("Hatching", {
        nftItem,
      });
      hatchEgg(
        nftItem.dropId,
        // nftItem.kind === 0 ? nftItem.id : nftItem.dropEgg,
        nftItem.id,
        () => success()
      );
    } else {
      toggleWallet();
    }
  }, [account, hatchEgg, nftItem, success, toggleWallet]);

  // const calculateTimeLeft = useCallback(() => {
  //   const startDate = new Date(nftItem?.timestamp * 1000);
  //   const endDate = startDate.setHours(
  //     startDate.getHours() + hatchEggWaitPeriod
  //   );
  //   const difference = +new Date(endDate) - +new Date();

  //   let timeLeft: any = {};

  //   if (difference > 0) {
  //     timeLeft = {
  //       d: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       h: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       m: Math.floor((difference / 1000 / 60) % 60),
  //       s: Math.floor((difference / 1000) % 60),
  //     };
  //     return timeLeft;
  //   } else {
  //     return false;
  //   }
  // }, [hatchEggWaitPeriod, nftItem?.timestamp]);

  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     !timeLeft && clearInterval(interval);
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearTimeout(interval);
  // }, [calculateTimeLeft, timeLeft]);

  function getModalContent() {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 bg-black rounded-xl relative h-[80vh]">
        <div className="absolute w-3/5 font-semibold right-8 top-7">
          <ModalHeader
            title="Ready to Hatch?"
            className="w-full"
            onClose={toggleModal}
          />
        </div>
        <div className="w-full h-px bg-white opacity-10" />
        <div className="w-full flex flex-col items-center justify-center space-y-6 max-w-[486px]">
          <div className="bg-black rounded-xl h-[310px] w-full flex flex-col justify-center items-center">
            <video
              autoPlay
              loop
              src={nftItem?.token_uri}
              width={"340px"}
              height={"340px"}
              className="rounded overflow-hidden object-cover max-h-[310px]"
              style={{
                zoom: "0.7",
              }}
            />
            <img
              src="/videoes/StealthEggHatch.mp4"
              alt=""
              className="absolute top-10 inset-x-[35%]"
              style={{ height: 219 }}
            />
          </div>
          {/* <p className="text-sm font-normal text-[#BDBDBD] text-center">
            Hatch Egg text
          </p> */}
          <button
            className={`py-4 w-52 bg-blue rounded-xl mb-7 disabled:cursor-not-allowed ${
              loading && "opacity-60"
            }`}
            // disabled={loading || timeLeft}
            disabled={loading}
            onClick={handleHatchEgg}
          >
            {/* {loading
              ? "Hatching..."
              : !timeLeft
              ? "Hatch Egg"
              : "Hatch Egg in " +
                timeLeft.h +
                "h " +
                timeLeft.m +
                "m " +
                timeLeft.s +
                "s"} */}
            {loading ? "Hatching..." : "Hatch Egg"}
          </button>
        </div>
      </div>

      // <div className="flex flex-col space-y-4">
      //   <ModalHeader title={`Ready to Hatch ${name}`} onClose={toggleModal} />
      //   <div className="flex flex-col items-center space-y-6">
      //     <div className="relative mb-" style={{ width: 258 }}>
      //       <video
      //         autoPlay
      //         loop
      //         src={nftItem?.token_uri}
      //         width={300}
      //         height={350}
      //       />
      //       <img
      //         src="/videoes/StealthEggHatch.mp4"
      //         alt=""
      //         className="absolute top-10 inset-x-[35%]"
      //         style={{ height: 219 }}
      //       />
      //     </div>
      //     <button
      //       className={`py-4 w-52 bg-bid-gradient rounded-xl mb-7 disabled:cursor-not-allowed ${
      //         loading && "opacity-60"
      //       }`}
      //       disabled={loading || timeLeft}
      //       onClick={handleHatchEgg}
      //     >
      //       {loading
      //         ? "Hatching..."
      //         : !timeLeft
      //         ? "Hatch Egg"
      //         : "Hatch Egg in " +
      //           timeLeft.h +
      //           "h " +
      //           timeLeft.m +
      //           "m " +
      //           timeLeft.s +
      //           "s"}
      //     </button>
      //   </div>
      // </div>
    );
  }

  return (
    <Modal
      isOpen={hatchEggModalOpen}
      onDismiss={toggleModal}
      minHeight={80}
      maxHeight={100}
      padding={0}
      maxWidth={569}
    >
      {getModalContent()}
    </Modal>
  );
}

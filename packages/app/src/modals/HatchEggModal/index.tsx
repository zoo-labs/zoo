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

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
};

export default function HatchEggModal({ nftItem, success }) {
  // important that these are destructed from the account-specific web3-react context
  const { account } = useWeb3React();
  const { loading } = useSelector((state: any) => state.zoo);

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
      hatchEgg(nftItem.dropId, nftItem.id, () => success());
    } else {
      toggleWallet();
    }
  }, [account, hatchEgg, success, toggleWallet]);

  const calculateTimeLeft = () => {
    const startDate = new Date(nftItem.timestamp * 1000);
    const endDate = startDate.setHours(startDate.getHours() + 4);
    const difference = +new Date(endDate) - +new Date();

    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
      return timeLeft;
    } else {
      return false;
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      !timeLeft && clearInterval(interval);
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(interval);
  }, []);

  function getModalContent() {
    return (
      <div className="flex flex-col space-y-4">
        <ModalHeader title={`Ready to Hatch ${name}`} onClose={toggleModal} />
        <div className="flex flex-col items-center space-y-6">
          <div className="relative mb-" style={{ width: 258 }}>
            <video
              autoPlay
              loop
              src={nftItem.token_uri}
              width={300}
              height={350}
            />
            <img
              src="/videoes/StealthEggHatch.mp4"
              alt=""
              className="absolute top-10 inset-x-[35%]"
              style={{ height: 219 }}
            />
          </div>
          <button
            className={`py-4 w-52 bg-bid-gradient rounded-xl mb-7 disabled:cursor-not-allowed ${
              loading && "opacity-60"
            }`}
            disabled={loading || timeLeft}
            onClick={handleHatchEgg}
          >
            {loading
              ? "Hatching..."
              : !timeLeft
              ? "Hatch Egg"
              : "Hatch Egg in " +
                timeLeft.h +
                "h " +
                timeLeft.m +
                "m " +
                timeLeft.s +
                "s"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={hatchEggModalOpen}
      onDismiss={toggleModal}
      minHeight={0}
      maxHeight={90}
    >
      {getModalContent()}
    </Modal>
  );
}

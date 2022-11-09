/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useModalOpen,
  useWalletModalToggle,
  useNetworkMigrationModalToggle,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";
import ModalHeader from "../../components/ModalHeader";
import { useSelector } from "react-redux";
import { useFreeNFT, useTransferZoo } from "state/zoo/hooks";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Web3 from "web3";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

export default function NetworkMigrationModal() {
  const networkMigrationModalOpen = useModalOpen(
    ApplicationModal.NETWORK_MIGRATION
  );
  const toggleModal = useNetworkMigrationModalToggle();
  // important that these are destructed from the account-specific web3-react context
  const [copied, setCopied] = useState(false);
  const { loading, zooBalance } = useSelector((state: any) => state.zoo);
  const transferTokens = useTransferZoo();

  const calculateTimeLeft = () => {
    const endDate = new Date("11-09-2022 00:00").toUTCString();
    const difference = +new Date(endDate) - +new Date();

    let timeLeft: any = {};

    if (difference >= 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        // s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  const [ttimeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      if (ttimeLeft.d === 0 && ttimeLeft.h === 0 && ttimeLeft.m === 0) {
        clearInterval(interval);
      }
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearTimeout(interval);
  }, []);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1500);
    }
  }, [copied]);

  const copyBurnAddress = () => {
    navigator.clipboard
      .writeText("0x000000000000000000000000000000000000dEaD")
      .then(() => setCopied(true));
  };

  const handleBurn = () => {
    console.log("mi__Ballakss", zooBalance);
    transferTokens(
      "0x000000000000000000000000000000000000dEaD",
      "0x" +
        Web3.utils
          .toBN(
            Web3.utils.toWei(
              zooBalance?.toString(),
              "ether"
            ) as unknown as string
          )
          .toString(16)
    );
  };

  const renderCountDown = useMemo(() => {
    return (
      <div className="flex items-start justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold mb-2">{ttimeLeft.d ?? 0}</p>
          <p className="text-xs">DAYS</p>
        </div>
        <p className="text-3xl font-semibold ml-4">:</p>
        <div className="mx-4 flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold mb-2">{ttimeLeft.h ?? 0}</p>
          <p className="text-xs">HOURS</p>
        </div>
        <p className="text-3xl font-semibold mr-4">:</p>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold mb-2">{ttimeLeft.m ?? 0}</p>
          <p className="text-xs">MINUTES</p>
        </div>
      </div>
    );
  }, [ttimeLeft]);

  function getModalContent() {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 bg-black rounded-xl">
        <div className="absolute right-8 top-7">
          <ModalHeader onClose={toggleModal} />
        </div>
        <div className="flex flex-col text-center items-center justify-center space-y-6 max-w-[486px] py-10 px-10">
          <p className="mb-4 text-4xl font-bold">ETH NETWORK MIGRATION</p>
          <div className="flex flex-col justify-center items-center">
            <p className="mb-5">TIME LEFT TO BURN</p>
            {renderCountDown}
          </div>
          <p className="text-base font-normal text-white text-center">
            *** YOU MUST BURN YOUR TOKENS TO ENSURE YOU HAVE THE NEW TOKEN
            AIRDROPPED TO YOU!
          </p>
          <button
            onClick={handleBurn}
            disabled={loading}
            className={`py-4 w-full bg-[#2517FF] rounded-full mb-3 outline-none focus:outline-none ${
              loading && "opacity-30 disabled:cursor-not-allowed"
            }`}
          >
            {loading ? "Burning $ZOO tokens..." : " Burn Your $ZOO Tokens"}
          </button>
          <a
            onClick={copyBurnAddress}
            className="flex items-center justify-center cursor-pointer"
          >
            <p className="mr-1.5">Copy Burn Adddress</p>
            {copied ? (
              <CheckRoundedIcon style={{ fontSize: 14 }} />
            ) : (
              <ContentCopyOutlinedIcon style={{ fontSize: 14 }} />
            )}
          </a>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={networkMigrationModalOpen}
      onDismiss={toggleModal}
      minHeight={0}
      maxHeight={90}
      padding={0}
      maxWidth={600}
      // backgroundColor="transparent"
    >
      {getModalContent()}
    </Modal>
  );
}

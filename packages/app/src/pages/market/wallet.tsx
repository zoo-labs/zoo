import { numberWithCommas } from "functions";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

// animation
import { fadeInOnScroll } from "animation";

import { useDispatch, useSelector } from "react-redux";
import { AppState } from "state";
import { useBuyZoo } from "state/zoo/hooks";
// import AssetSaleModal from "zoo/AssetSaleModal";
import { useModal } from "react-morphing-modal";
import { useRouter } from "next/router";
import { useTokenTypes } from "zoo/state";
import { useActiveWeb3React, useZooKeeper, useZooToken } from "hooks";
import {
  useBuyEggModalToggle,
  useBuyZooModalToggle,
} from "state/application/hooks";
import useAllowance from "hooks/useBentoBoxAllowance";
import BuyEggModal from "modals/MarketModals/BuyEggModal";
import BuyZooModal from "modals/MarketModals/BuyZooModal";
import { useETHBalances } from "state/wallet/hooks";
import { NETWORK_LABEL } from "config/networks";
import { useFaucet } from "hooks";
import { getZooBalance } from "state/zoo/actions";
import { useAppDispatch } from "state/hooks";

import Notification from "../../modals/NotificationModal";
import { handleFunds } from "../../utils/handleFunds";
import HatchEggModal from "modals/HatchEggModal";

interface WalletProps {}

const Wallet: React.FC<WalletProps> = ({}) => {
  const zooBalance = useSelector<AppState, AppState["zoo"]["zooBalance"]>(
    (state) => state.zoo.zooBalance
  );
  const { account, library, chainId } = useActiveWeb3React();
  const faucet = useFaucet();
  const dispatch = useDispatch();

  // const toggleBidModal = useBidModalToggle()
  // const toggleAssetModal = useAssetModalToggle()
  const [fetching, setFetching] = useState(false);
  const [allowance, setAllowance] = useState(false);
  const [disable, setDisable] = useState(false);
  const [disableApprove, setDisableApprove] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  // const [balance, setBalance] = useState(0)
  const [keepApprove, setKeepApprove] = useState(true);

  const { tokenTypes } = useTokenTypes();

  const { modalProps, open: openModal } = useModal({
    background: "black",
  });
  const router = useRouter();

  const onClickTokenType = (name: string) => {
    router.push(`${router.pathname}?name=${name}`, undefined, {
      shallow: true,
    });
  };
  const buyZoo = useBuyZoo();
  const zooToken = useZooToken();
  const zooKeeper = useZooKeeper();

  const approve = async () => {
    try {
      if (!account) {
        console.log("Account not connected yet");
        return;
      }

      setDisableApprove(true);
      // console.log("Processing approval...");
      // console.log("zooToken", zooToken);
      // console.log("zooKeeper", zooKeeper);

      // Increase allowance
      const supply = await zooToken.totalSupply();
      // console.log("library", library);
      // const allowance = useAllowance(zooKeeper.options.address)
      const tx = zooToken
        .approve(zooKeeper.options.address)
        .send({ from: account });

      if (tx) {
        setAllowance(true);
        setDisableApprove(false);
        setKeepApprove(false);
        // console.log("Approval success!");
        // console.log("approved", tx);
      }
    } catch (error) {
      console.error("APPROVE ERROR", error);
      setDisableApprove(false);
      // console.log("Failed to approve account");
    }
  };

  const toggleBuyEggModal = useBuyEggModalToggle();
  const toggleBuyZooModal = useBuyZooModalToggle();

  const walletRef = React.useRef();

  useEffect(() => {
    fadeInOnScroll(walletRef.current);
  }, []);
  // const buyEggs = () => {
  //   router.push(`${router.pathname}?tokenId=egg`, undefined, { shallow: true });
  // };

  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];

  return (
    <div ref={walletRef}>
      <p className="mb-2 text-xl font-bold ">Wallet Balance</p>
      <div className="flex items-center">
        <p className="text-xl font-bold ">
          {numberWithCommas(zooBalance.toFixed(2))} ZOO
        </p>
        <div className="relative inline-flex ml-4 rounded-md shadow-sm">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleFunds(chainId, buyZoo)}
          >
            <span
              className={`flex items-center justify-center ml-2 py-2 text-base text-center text-secondary hover:text-high-emphesis font-bold  rounded-xl text-high-emphesis bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary w-[120px] min-h-[36px] mb-[-2px] ${
                zooBalance === 0 && "gradient-border"
              }`}
              style={{
                // background: "linear-gradient(180deg, #DF3EBB 0%, #199BC3 100%)",
                background: "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)",
              }}
            >
              Get ZOO
            </span>
          </div>
          {zooBalance === 0 && (
            <span className="absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1">
              <span className="absolute inline-flex w-full h-full bg-purple-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-3 h-3 bg-white rounded-full"></span>
            </span>
          )}
          <div className={`flex flex-wrap justify-center`}>
            {/* {keepApprove || !allowance ? (
              <div className={"ml-2"}>
                <button
                  disabled={disableApprove || allowance}
                  style={{
                    width: "120px",
                    minHeight: "36px",
                    marginBottom: "-2px",
                  }}
                  className={`border rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primary border-gray-800 hover:bg-opacity-100  disabled:bg-opacity-80 px-0 py-2 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full  bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary ${
                    zooBalance !== 0 && "gradient-border"
                  }`}
                  onClick={approve}
                >
                  {allowance
                    ? "Approved"
                    : disableApprove
                    ? "Processing"
                    : "Approve"}
                  {zooBalance !== 0 && (
                    <span className="absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1">
                      <span className="absolute inline-flex w-full h-full bg-purple-400 rounded-full opacity-75 animate-ping"></span>
                      <span className="relative inline-flex w-3 h-3 bg-white rounded-full"></span>
                    </span>
                  )}
                </button>
              </div>
            ) : ( */}
            <div className={"ml-2"}>
              <button
                // disabled={disable || !allowance}
                className={`shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primaryhover:bg-opacity-100 focus:ring-offset-dark-700 disabled:bg-opacity-80 px-0 py-2 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary ${
                  zooBalance !== 0 && "gradient-border"
                }`}
                style={{
                  width: "120px",
                  minHeight: "36px",
                  marginBottom: "-2px",
                  background:
                    "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)",
                }}
                onClick={() => toggleBuyEggModal()}
              >
                Buy Eggs
              </button>
            </div>
          </div>
        </div>
      </div>
      <BuyEggModal />
      <BuyZooModal />
      <ToastContainer />
    </div>
  );
};
export default Wallet;

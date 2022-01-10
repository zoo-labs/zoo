import React, {useState} from "react";
import Image from "next/image";

import EndangeredSpecies from "components/EndangeredSpecies";

import { useDispatch } from "react-redux";
import { useBuyZoo } from "state/zoo/hooks";
import { useWeb3React } from "@web3-react/core";
import { useFaucet } from "hooks";
import { getZooBalance } from "state/zoo/actions";
import Notification from "../../modals/NotificationModal";

const OpportunitySection = () => {
  const { account, library, chainId } = useWeb3React();
  const buyZoo = useBuyZoo();
  const [fetching, setFetching] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [rejection, setRejection] = useState(false);
  const faucet = useFaucet();
  const dispatch = useDispatch();

  const handleFunds = () => {
    // if (userEthBalance?.toFixed(3) == 0)
    //   return console.log(`You do not have sufficient ${NETWORK_LABEL[chainId]} to get Zoo`);
    setFetching(true);
    faucet
      .fund(account)
      .send({ from: account })
      .then(async () => {
        setFetching(false);
        dispatch(getZooBalance());
        setConfirmation(true);
      })
      .catch((e) => {
        console.error("ISSUE USING FAUCET \n", e);
        setFetching(false);
        setRejection(true);
      });

    setFetching(false);
    
    switch (chainId) {
      case 1338:
        buyZoo();
        break;
      case 1337:
        buyZoo();
        break;
      case 97:
        buyZoo();
        break;
      case 4:
        buyZoo();
        break;
      default:
        window.open(
          "https://pancakeswap.info/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13",
          "_blank"
        );
    }
  };

  return (
    <section className="relative">
      {fetching && <Notification title="Processing" hideOpenButton={true} />}
      {confirmation && (
        <Notification title="Payment Confirmed" hideOpenButton={true} />
      )}
      {rejection && (
        <Notification
          title="Payment Cancelled Successfully"
          hideOpenButton={true}
        />
      )}
      <div className="px-6 py-16 lg:py-28">
        <h2 className="text-2xl md:text-2xl  lg:text-4xl text-center mb-16 font-semibold">
          Endless Yield Opportunity
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-center max-w-7xl px-6 mx-auto">
          <EndangeredSpecies />
          <div>
            <Image src="/img/life-cycle.png" width={824} height={805} alt="" />
          </div>
        </div>

        <div className="flex flex-col items-center max-w-7xl px-6 mx-auto py-20 lg:mt-20">
          <h2 className="text-2xl md:text-2xl lg:text-5xl text-center mb-6 md:mb-4 font-semibold">
            Fully Transparent Ecosystem
          </h2>
          <p className="max-w-3xl mx-auto text-center mb-6 md:mb-8 lg:text-xl">
            Each animal NFT uses blockchain technology to establish a verified
            and public proof of ownership. This establishes credibility for each
            NFT and its unchangeable nature.
          </p>
          <div
            onClick={() => handleFunds()}
            className="border border-green text-green text-sm md:text-base font-bold px-8 py-3 md:px-6 lg:px-16 rounded-full hover:cursor-pointer"
          >
            Buy $ZOO
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpportunitySection;

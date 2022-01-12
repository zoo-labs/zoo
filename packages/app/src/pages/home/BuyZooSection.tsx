import React from "react";
import { handleFunds } from "utils/handleFunds";
import { useWeb3React } from "@web3-react/core";
import { useBuyZoo } from "state/zoo/hooks";

const BuyZooSection = () => {
  const {chainId} = useWeb3React();
  const buyZoo = useBuyZoo();

  return (
    <section className="BuyZoo">
      <div className="BuyZoo__inner">
        <h2>Fully Transparent Ecosystem</h2>
        <p>
          Each animal NFT uses blockchain technology to establish a verified and
          public proof of ownership. This establishes credibility for each NFT
          and its unchangeable nature.
        </p>
        <button className="Button Button__outline Button--default" onClick={() => handleFunds(chainId, buyZoo)}>
          Buy $Zoo
        </button>
      </div>
    </section>
  );
};

export default BuyZooSection;

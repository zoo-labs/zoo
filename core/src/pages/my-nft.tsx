import React from "react";
import Image from "next/image";
import ZooItem from "components/ZooItem";
import AllMyNfts from "../sections/my-nft/AllMyNfts";
import TradingHistory from "../sections/my-nft/TradingHistory";

const Seemynft = () => {
  return (
    <div className="">
      <div className="grid place-content-center mt-40" >
        <ZooItem
          src="/img/egg2.png"
          infoTitle="Egg #4"
          infoDesc="Contains 1 of 16 Generation one Base Animals. To hatch or to hold…"
          authenticityPrice="300,000 $ZOO"
        />
        <TradingHistory />
        <AllMyNfts />
      </div>
    </div>
  );
};

export default Seemynft;

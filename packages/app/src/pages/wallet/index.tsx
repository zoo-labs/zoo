import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "state";
import { fadeInOnScroll } from "animation";
import {
  useBuyZoo,
  useFetchMyNFTs,
  useGetAllAuctions,
  useGetNftTransfers,
} from "state/zoo/hooks";
import { numberWithCommas } from "functions";

import MyWalletSection from "./MyWalletSection";
import MyBidsSection from "./MyBidsSection";
import MyAuctionSection from "./MyAuctionsSections";
import EmptyAuctionSection from "./EmptyAuctionSection";
import { handleFunds } from "utils/handleFunds";
import { useActiveWeb3React } from "hooks";
import { useMoralis } from "react-moralis";
import { Auction } from "types";

export default function Wallet({ children }) {
  const [category, setCategory] = useState(0);
  const { Moralis, initialize } = useMoralis();

  const { account, library, chainId } = useActiveWeb3React();
  const buyZoo = useBuyZoo();
  const getAllAuctions = useGetAllAuctions();
  const zooBalance = useSelector<AppState, AppState["zoo"]["zooBalance"]>(
    (state) => state.zoo.zooBalance
  );
  const fetchNFTs = useFetchMyNFTs();
  const getNftTransfers = useGetNftTransfers();
  const { myNfts, nftTransfers, allAuctions, myEggsCount, myAnimalsCount } =
    useSelector((state: any) => state.zoo);
  const comingSoonRef = React.useRef();

  useEffect(() => {
    getAllAuctions();
  }, [getAllAuctions]);
  useEffect(() => {
    fadeInOnScroll(comingSoonRef.current);
  }, []);

  const initMoralis = useCallback(async () => {
    if (chainId) {
      try {
        // await Moralis.initPlugins();
        // await Moralis.enableWeb3();

        if (!Moralis.User.current()) await Moralis.authenticate();
        fetchNFTs();
        getNftTransfers();
      } catch (error) {
        console.log("error in init", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis, chainId, fetchNFTs, getNftTransfers, account]);

  useEffect(() => {
    console.log("initializingMoralis", { chainId, account });
    initMoralis().then((res) => {
      console.log("initializedMoralis");
    });
  }, [chainId, account, initMoralis]);
  console.log("myNfts__", myNfts);
  return (
    <section className="Hero">
      <div className="px-6 pb-16 mt- Hero__inner md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
        <div className="flex flex-col items-center justify-between px-2 md:px-6 pt-12 lg:flex-row lg:max-w-7xl lg:mx-auto">
          <div className="p-px bg-green rounded-full">
            <div className=" bg-black rounded-full">
              <div className="flex w-max bg-green items-center rounded-full">
                {["My Wallet", "My Bids", "My Auctions"].map((value, index) => {
                  const active = category === index;
                  return (
                    <a
                      onClick={() => {
                        setCategory(index);
                      }}
                      className={`${
                        active ? "bg-green text-black" : "bg-black"
                      } ${index === 0 && "rounded-l-full"} ${
                        index === 2 && "rounded-r-full"
                      }
                    ${index !== 2 && "mr-px"}
                    text-base font-semibold py-4 px-3 cursor-pointer inline-block `}
                      key={index}
                    >
                      {value}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:items-center justify-between px-2 md:px-6 pt-4 lg:flex-row lg:max-w-7xl lg:mx-auto">
          <div className="">
            <p className="text-lg font-bold md:text-xl">Wallet Balance </p>
            <div className="flex items-center mb-7">
              <p className="text-base font-bold text-white md:text-2xl">
                {numberWithCommas(zooBalance.toFixed(2))} $ZOO
              </p>
              <button
                onClick={() => handleFunds(chainId, buyZoo)}
                className="px-5 py-3 ml-4 text-sm font-semibold text-black rounded-full bg-green md:text-base md:px-6 md:py-3 lg:px-6"
              >
                Buy $ZOO
              </button>
            </div>
            {account && category === 0 && (
              <p className="font-semibold">
                {myEggsCount} Eggs - {myAnimalsCount} Animals
              </p>
            )}
          </div>
        </div>
        {category === 0 ? (
          <MyWalletSection
            myNfts={myNfts}
            nftTransfers={nftTransfers}
            fetchNfts={() => fetchNFTs()}
          />
        ) : category === 1 ? (
          <MyBidsSection />
        ) : allAuctions.filter(
            (auction: Auction) => auction.tokenOwner === account
          )?.length > 0 ? (
          allAuctions
            .filter((auction: Auction) => auction.tokenOwner === account) // filter auctions that are mine
            .map((auction: Auction, index: number) => (
              <MyAuctionSection key={index} auction={auction} />
            ))
        ) : (
          <EmptyAuctionSection />
        )}
      </div>
    </section>
  );
}

{
  /* from-purple to-blue bg-gradient-to-b */
}

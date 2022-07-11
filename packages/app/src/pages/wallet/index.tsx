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
  const { myNfts, nftTransfers, allAuctions } = useSelector(
    (state: any) => state.zoo
  );
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
  }, [Moralis, chainId, fetchNFTs, getNftTransfers]);

  useEffect(() => {
    console.log("initializingMoralis", { chainId, account });
    initMoralis().then((res) => {
      console.log("initializedMoralis");
    });
  }, [chainId, account, initMoralis]);
  console.log("myNfts__", myNfts);
  return (
    <section className="Hero">
      <div className="px-6 pb-16 mt-16 Hero__inner md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
        {/* <div className="inline-block w-auto p-px mt-20 ml-16 overflow-hidden rounded bg-leader-board mb-28">
          <div className="w-auto bg-black rounded" style={{ top: 10 }}>
            {['My Wallet', 'My Bids', 'My Auctions'].map((value, index) => {
              const active = category === index;
              return (
                <a
                  onClick={() => {
                    setCategory(index);
                  }}
                  className={`${
                    active ? 'bg-leader-board text-white' : 'text-gray-600'
                  } text-sm font-bold py-2 px-4 cursor-pointer inline-block`}
                  key={index}
                >
                  {value}
                </a>
              );
            })}
          </div>
        </div> */}
        <div className="flex flex-col items-center justify-between px-6 pt-16 lg:flex-row lg:max-w-7xl lg:mx-auto">
          <p className="text-xl font-bold md:text-4xl">
            Wallet Balance{" "}
            <span className="text-base font-bold text-green md:text-4xl">
              {" "}
              {numberWithCommas(zooBalance.toFixed(2))} $ZOO
            </span>
          </p>
          <button
            onClick={() => handleFunds(chainId, buyZoo)}
            className="px-5 py-3 my-6 text-sm font-semibold text-black rounded-full bg-green md:text-base md:px-6 md:py-4 lg:px-10"
          >
            Buy $ZOO
          </button>
          <div className="flex justify-center">
            <div
              className="flex w-auto overflow-hidden border rounded-full lg:grid lg:grid-cols-3 border-green "
              style={{ top: 10 }}
            >
              {["My Wallet", "My Bids", "My Auctions"].map((value, index) => {
                const active = category === index;
                return (
                  <a
                    onClick={() => {
                      setCategory(index);
                    }}
                    className={`${
                      active ? "bg-green text-black" : "text-gray-400"
                    } text-sm font-bold py-4 px-6 cursor-pointer inline-block  text-center`}
                    key={index}
                  >
                    {value}
                  </a>
                );
              })}
            </div>
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

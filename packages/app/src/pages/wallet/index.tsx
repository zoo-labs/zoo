import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { Moralis, enableWeb3, isAuthenticated, authenticate } = useMoralis();

  const { account, library, chainId } = useActiveWeb3React();
  const buyZoo = useBuyZoo();
  const getAllAuctions = useGetAllAuctions();
  const zooBalance = useSelector<AppState, AppState["zoo"]["zooBalance"]>(
    (state) => state.zoo.zooBalance
  );
  const dispatch = useDispatch();
  const fetchNFTs = useFetchMyNFTs();
  const getNftTransfers = useGetNftTransfers();
  const { myNfts, nftTransfers, allAuctions, myEggsCount, myAnimalsCount } =
    useSelector((state: any) => state.zoo);
  const comingSoonRef = React.useRef();

  useEffect(() => {
    getAllAuctions();
  }, []);
  // useEffect(() => {
  //   fadeInOnScroll(comingSoonRef.current);
  // }, []);

  useEffect(() => {
    initMoralis();
  }, [chainId]);

  const initMoralis = async () => {
    if (chainId) {
      console.log("isAuthenticated", isAuthenticated, Moralis);

      try {
        await enableWeb3();
        await fetchNFTs();
        await getNftTransfers();
        if (!isAuthenticated) {
          console.log("hitting here to authenticate user");
          authenticate();
        }
      } catch (error) {
        console.log("error in inist", error);
      }
    }
  };
  console.log("allAuctions", allAuctions);
  return (
    <section className="Hero">
      <div className="px-6 pb-16 mt- Hero__inner md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
        <div className="flex flex-col items-center justify-between px-2 pt-12 md:px-6 lg:flex-row lg:max-w-7xl lg:mx-auto">
          <div className="p-px rounded-full bg-blue">
            <div className="bg-black rounded-full ">
              <div className="flex items-center rounded-full w-max bg-blue">
                {["My Wallet", "My Bids", "My Auctions"].map((value, index) => {
                  const active = category === index;
                  return (
                    <a
                      onClick={() => {
                        setCategory(index);
                      }}
                      className={`${active ? "bg-bid-gradient" : "bg-black"} ${
                        index === 0 && "rounded-l-full"
                      } ${index === 2 && "rounded-r-full"}
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
        <div className="flex flex-col justify-between px-2 pt-4 md:items-center md:px-6 lg:flex-row lg:max-w-7xl lg:mx-auto">
          <div className="">
            <p className="text-lg font-bold md:text-xl">Wallet Balance </p>
            <div className="flex items-center mb-7">
              <p className="text-base font-bold text-white md:text-2xl">
                {numberWithCommas(zooBalance.toFixed(2))} $ZOO
              </p>
              <button
                onClick={() => handleFunds(chainId, buyZoo)}
                className="px-5 py-3 ml-4 text-sm font-semibold text-white rounded-full bg-blue md:text-base md:px-6 md:py-3 lg:px-6"
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
          allAuctions
            .filter((auction: Auction) =>
              auction.auctionHistory.some((history) => {
                console.log("historyyyy", history);
                return history.from_address === account;
              })
            ) // filter auctions that are mine
            .map((auction: Auction, index: number) => (
              <MyBidsSection key={index} auction={auction} />
            ))
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

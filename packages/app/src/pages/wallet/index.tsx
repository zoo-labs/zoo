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
import EmptyBidSection from "./EmptyBidSection";
import CustomLoader from "components/CustomLoader";
import Image from "next/image";

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

  const [auctionFilter, setAuctionFilter] = useState([]);
  const [isLoadingAuction, setIsLoadingAuction] = useState(true);

  useEffect(() => {
    getAllAuctions(setIsLoadingAuction);
  }, []);
  // useEffect(() => {
  //   fadeInOnScroll(comingSoonRef.current);
  // }, []);

  useEffect(() => {
    setAuctionFilter(allAuctions);
  }, [allAuctions]);

  useEffect(() => {
    initMoralis();
  }, [chainId]);

  const initMoralis = async () => {
    if (chainId) {
      try {
        await enableWeb3();
        await fetchNFTs();
        await getNftTransfers();
        if (!isAuthenticated) {
          authenticate();
        }
      } catch (error) {
        console.log("error in inist", error);
      }
    }
  };
  return (
    <section className="Hero">
      <div className="px-6 pb-16 mt- Hero__inner md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
        <div className="flex flex-col items-center justify-between px-2 pt-12 md:px-6 lg:flex-row lg:max-w-7xl lg:mx-auto">
          <div className="p-0.5 rounded-full bg-black">
            <div className="">
              <div className="flex items-center  w-max">
                {["My Wallet", "My Bids", "My Auctions"].map((value, index) => {
                  const active = category === index;
                  return (
                    <a
                      onClick={() => {
                        setCategory(index);
                      }}
                      className={` ${index === 0 && ""} ${
                        index === 2 && ""
                      }
                    ${index !== 2 && "mr-px"}
                    text-base font-semibold py-4 px-3 cursor-pointer inline-block text-white ${
                      active ? " border-b-2 border-[#2517FF]" : ""
                    }`}
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
            <p className="text-[32px] font-[400] md:text-xl mt-4">Wallet Value</p>
            <div className="flex items-center mb-10 mt-6">
              <p className="text-base font-bold text-white md:text-[56px] ">
                {numberWithCommas(zooBalance.toFixed(2))} $ZOO
              </p>
              {/* <button
                onClick={() => handleFunds(chainId, buyZoo)}
                className="px-5 py-3 ml-4 text-sm font-semibold text-white rounded-full bg-blue md:text-base md:px-6 md:py-3 lg:px-6"
              >
                Buy $ZOO
              </button> */}
            </div>
            <div className="flex">
              {/* for v2 */}
              {/* <div className="bg-[#333333] w-56 h-16 rounded-[5px] px-4 flex items-center justify-between">
                <div>
                  <p className="text-[14px]">Collateral Staked</p>
                  <p className="font-[500] text-[20px]">$15,600.42</p>
                </div>
                <button className="flex items-center">
                  <Image
                    src="/icons/add-circle.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </button>
              </div>
              <div className="bg-blue w-56 h-16 rounded-[5px] px-4 text-center flex items-center justify-center ml-4 cursor-pointer">
                <p className="text-[14px] text-center">Start a Pool</p>
              </div> */}
              <div
                onClick={() => handleFunds(chainId, buyZoo)}
                className="bg-blue w-56 h-16 rounded-[5px] px-4 text-center flex items-center justify-center cursor-pointer"
              >
                <p className="text-[14px] text-center">Buy $ZOO</p>
              </div>
            </div>
            {account && category === 0 && (
              <p className="font-semibold mt-8">
                {myEggsCount} Egg{myEggsCount !== 1 ? "s" : ""} -{" "}
                {myAnimalsCount} Animal{myAnimalsCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
        <>
          {isLoadingAuction ? (
            <CustomLoader />
          ) : (
            <>
              {category === 0 ? (
                <MyWalletSection
                  myNfts={myNfts}
                  nftTransfers={nftTransfers}
                  fetchNfts={() => fetchNFTs()}
                />
              ) : category === 1 ? (
                auctionFilter.filter((auction: Auction) =>
                  auction.auctionHistory.some((history) => {
                    return history.from_address === account;
                  })
                )?.length > 0 ? (
                  auctionFilter
                    .filter((auction: Auction) =>
                      auction.auctionHistory.some((history) => {
                        return history.from_address === account;
                      })
                    ) // filter bids that are mine
                    .map((auction: Auction, index: number) => (
                      <MyBidsSection key={index} auction={auction} />
                    ))
                ) : (
                  <EmptyBidSection />
                )
              ) : auctionFilter.filter(
                  (auction: Auction) => auction.tokenOwner === account
                )?.length > 0 ? (
                auctionFilter
                  .filter((auction: Auction) => auction.tokenOwner === account) // filter auctions that are mine
                  .map((auction: Auction, index: number) => (
                    <MyAuctionSection key={index} auction={auction} />
                  ))
              ) : (
                <EmptyAuctionSection />
              )}
            </>
          )}
        </>
      </div>
    </section>
  );
}

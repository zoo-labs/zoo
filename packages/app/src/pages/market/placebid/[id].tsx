import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Head from "next/head";
import { useZoobalance, useRemoveAuction, useCreateBid } from "state/zoo/hooks";
import TwoColumComp from "marketplace/Grid/TwoColumComp";
import CardNft from "marketplace/Cards/CardNft";
import Image from "next/image";

import Trading from "marketplace/TradingHistory/Trading";
import TableRow from "marketplace/TradingHistory/TableRow";

import { useRouter } from "next/router";
import { useActiveWeb3React } from "hooks";
import { useAuctionModal } from "state/application/hooks";
import AuctionModal from "modals/Auction";

const PlaceBid = () => {
  const { account } = useActiveWeb3React();
  const getZooBalance = useZoobalance();
  const removeAuction = useRemoveAuction();
  const placeBid = useCreateBid();
  const toggleAuctionModal = useAuctionModal();
  const [bidPrice, setBidPrice] = useState<number | any>(1);
  const [nft, setNft] = useState<any>({});
  const router = useRouter();
  const minBidFunc = useCallback(() => {
    const curatorFeePercentage = nft?.curatorFeePercentage / 100;
    if (nft?.amount > 0) {
      return nft?.amount + nft?.amount * curatorFeePercentage;
    } else return nft?.reservePrice;
  }, [nft]);

  const [minBid, setMinBid] = useState<number | any>(minBidFunc());

  useEffect(() => {
    setMinBid(minBidFunc());
  }, [minBidFunc]);

  const { loading, zooBalance, allAuctions } = useSelector(
    (state: any) => state.zoo
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bid placed!");
  };

  // console.log('zooBalance', zooBalance)
  useEffect(() => {
    getZooBalance();
  }, [getZooBalance]);
  useEffect(() => {
    const NFT = allAuctions.filter((obj) => {
      return String(obj.tokenID) === String(router.query.id);
    });
    setNft(NFT[0]);
    setBidPrice(minBid);
    console.log("NFTTTT_ANDAUCTION_", NFT[0]?.tokenOwner === account);
  }, [account, allAuctions, minBid, router.query.id]);

  console.log("NFTTTT_ANDAUCTION", nft, allAuctions, minBid);
  const handleClick = () => {
    if (nft?.tokenOwner === account) {
      console.log("You own this token and placed this auction");
      toggleAuctionModal();
    } else {
      placeBid(Number(nft?.auctionId), Number(bidPrice), () => {
        router.push("/market");
      });
    }
  };

  const handleRemoveAuction = () => {
    console.log("Remove auction");
    removeAuction(nft.auctionId, () => router.push("/market"));
  };
  return (
    <div className="w-full">
      <Head>
        <title>ZOO Marketplace</title>
        <meta name="description" content="ZOO Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TwoColumComp
        LeftCol={
          <div className="w-full bg-green-g h-full flex justify-center items-center px">
            <CardNft
              nft={nft}
              className="lg:w-full h-full"
              showDetails={false}
              onNFTClick={() => {}}
            />
          </div>
        }
        RightCol={
          <div className="w-full bg-[#000] h-full flex flex-col justify-center items-center text-white py-6 px-8 lg:px-24">
            <div className="flex items-center justify-between w-full mb-5 text-base font-medium">
              <p className="text-base font-semibold">
                {nft?.tokenOwner === account ? "Your Auction" : "Place a Bid"}
              </p>
              <div className="flex items-center font-medium">
                <p className="text-a1">
                  Your Balance:{" "}
                  <span className="text-white">
                    {" "}
                    {zooBalance?.toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}{" "}
                    ZOO
                  </span>
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full relative">
                <input
                  type="number"
                  className="rounded-xl pl-4 pr-14 py-5 bg-cut-grey w-full placeholder:text-[#878787] placeholder:text-lg"
                  value={nft?.tokenOwner === account ? nft?.amount : bidPrice}
                  onChange={(e) => setBidPrice(e.target.value)}
                  disabled={nft?.tokenOwner === account}
                />
                <span className="text-base font-semibold text-white absolute inset-y-5 right-0 mr-4 mb-4">
                  ZOO
                </span>
              </div>
              {bidPrice < minBid && (
                <p className="mt-2 text-red">
                  The minimum bid for this auction is {minBid} ZOO
                </p>
              )}
              <p className="mt-4 mb-1.5 text-base font-normal">
                {nft?.tokenOwner === account
                  ? "You must be paid at least"
                  : "You must pay at least"}{" "}
                {minBid?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                ZOO
              </p>
              <p className="text-base font-normal mb-11">
                The next bid must be {nft?.curatorFeePercentage}% more than the
                current bid
              </p>
              {nft?.tokenOwner === account ? (
                nft?.amount <= 0 ? (
                  <>
                    <button
                      className="py-[12px] w-full rounded-[4px] bg-leader-board mb-4 disabled:cursor-not-allowed"
                      onClick={handleClick}
                      disabled={loading}
                    >
                      Edit Auction
                    </button>
                    <button
                      className="py-[12px] w-full rounded-[4px] border border-leader-board bg-[#2A2C41] mb-4"
                      onClick={handleRemoveAuction}
                      disabled={loading}
                    >
                      Remove Auction
                    </button>
                  </>
                ) : (
                  <button
                    className="py-[12px] w-full rounded-[4px] border border-leader-board bg-[#2A2C41] mb-4"
                    // onClick={handleRemoveAuction}
                    disabled={true}
                  >
                    You can not edit this auction
                  </button>
                )
              ) : (
                <button
                  className="py-[12px] w-full rounded-[4px] bg-leader-board mb-4 disabled:cursor-not-allowed"
                  onClick={handleClick}
                  disabled={bidPrice < minBid || loading}
                >
                  Place Bid
                </button>
              )}
            </form>
            <p className="text-base font-normal mb-4 text-left w-full">
              You cannot withdraw a bid once submitted
            </p>
            <a className="text-lg font-bold text-zoo-green flex items-end">
              How do auctions work?
            </a>
          </div>
        }
      />

      <AuctionModal nft={nft} edit={true} />
    </div>
  );
};

export default PlaceBid;

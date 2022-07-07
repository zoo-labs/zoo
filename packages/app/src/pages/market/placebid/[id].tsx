import React, { useState } from "react";
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
    setBidPrice(NFT[0]?.reservePrice);
    console.log("NFTTTT_ANDAUCTION_", NFT[0]?.tokenOwner === account);
  }, [account, allAuctions, router.query.id]);

  console.log("NFTTTT_ANDAUCTION", nft, allAuctions);
  const handleClick = () => {
    if (nft?.tokenOwner === account) {
      console.log("You own this token and placed this auction");
      toggleAuctionModal();
    } else {
      placeBid(Number(nft?.auctionId), Number(bidPrice));
    }
  };

  const handleRemoveAuction = () => {
    console.log("Remove auction");
    removeAuction(nft.auctionId, () => router.push("/market"));
  };
  return (
    <div className="w-full lg:px-12 ">
      <Head>
        <title>ZOO Marketplace</title>
        <meta name="description" content="ZOO Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TwoColumComp
        LeftCol={
          <div className="w-full bg-[#0D0C16] h-full flex justify-center items-center lg:rounded-l-xl px-24">
            <CardNft nft={nft} className="lg:w-full" />
          </div>
        }
        RightCol={
          <div className="w-full bg-[#1F2030] h-full flex flex-col justify-center items-center lg:rounded-r-xl text-white py-6 px-8 lg:px-24">
            <p className="text-2xl font-medium mb-7">
              {nft?.tokenOwner === account ? "Your Auction" : "Your Bid"}
            </p>
            <div className="flex items-center justify-between w-full mb-12 text-xl font-medium">
              <p>Your Balance:</p>
              <p>
                {zooBalance?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                className="rounded-xl border-[1.5px] border-white px-4 py-5 bg-[#2A2C41] w-full placeholder:text-[#878787] placeholder:text-lg"
                value={nft?.tokenOwner === account ? nft?.amount : bidPrice}
                onChange={(e) => setBidPrice(e.target.value)}
                disabled={nft?.tokenOwner === account}
              />
              {bidPrice < nft?.reservePrice && (
                <p className="mt-2 text-red">Bid too low</p>
              )}
              <p className="mt-11 mb-3 text-xl font-medium text-center">
                You must be paid at least{" "}
                {nft?.reservePrice?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                ZOO
              </p>
              <p className="text-xl font-medium text-center mb-11">
                The next bid must be {nft?.curatorFeePercentage}% more than the
                current bid
              </p>
              <button
                className="py-[12px] w-full rounded-2xl bg-[#2703F8] mb-11 disabled:cursor-not-allowed"
                onClick={handleClick}
                disabled={bidPrice < nft?.reservePrice || loading}
              >
                {nft?.tokenOwner === account ? "Edit Auction" : "Place Bid"}
              </button>
              {nft?.tokenOwner === account && (
                <button
                  className="py-[12px] w-full rounded-2xl border border-[#2703F8] bg-[#2A2C41] mb-11"
                  onClick={handleRemoveAuction}
                  disabled={loading}
                >
                  Remove Auction
                </button>
              )}
            </form>
            <p className="text-xl font-medium text-center mb-11">
              You cannot withdraw a bid once submitted
            </p>
            <a className="text-xl font-medium underline text-primary-green">
              How do auctions work?
            </a>
          </div>
        }
      />

      <div className="flex justify-center w-full ">
        <div className="overflow-auto md:w-3/4 whitespace-nowrap">
          <Trading
            TitleMain="Transaction History"
            TitleA="ACTION"
            TitleB="BLOCK"
            TitleC="TOKEN ID"
            TitleD="HASH"
          >
            <TableRow
              ColA="BOUGHT EGG"
              ColB="12054184"
              ColC="6"
              ColD="0xd8e1c294da833a8db"
            ></TableRow>
            <TableRow
              ColA="SOLD EGG"
              ColB="12054184"
              ColC="5"
              ColD="0xd8e1c294da833a4xb"
            ></TableRow>
            <TableRow
              ColA="BOUGHT EGG"
              ColB="12054184"
              ColC="2"
              ColD="0xd8e1c294da833a4sb"
            ></TableRow>
          </Trading>
        </div>
      </div>
      <AuctionModal nft={nft} edit={true} />
    </div>
  );
};

export default PlaceBid;

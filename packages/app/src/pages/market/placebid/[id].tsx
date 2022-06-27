import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Head from "next/head";
import { useZoobalance } from "state/zoo/hooks";
import TwoColumComp from "marketplace/Grid/TwoColumComp";
import CardNft from "marketplace/Cards/CardNft";
import Image from "next/image";
import markets from "components/market/marketitem.json";

import Trading from "marketplace/TradingHistory/Trading";
import TableRow from "marketplace/TradingHistory/TableRow";

import { useRouter } from "next/router";

const PlaceBid = () => {
  const { zooBalance } = useSelector((state: any) => state.zoo);
  const getZooBalance = useZoobalance();
  const [bidPrice, setBidPrice] = useState<number | any>(1);
  const [nft, setNft] = useState<any>({});
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bid placed!");
  };

  // console.log('zooBalance', zooBalance)
  useEffect(() => {
    getZooBalance();
  }, [getZooBalance]);

  useEffect(() => {
    const NFT = markets.filter((obj) => {
      return obj.id === router.query.id
    })
    setNft(NFT[0])
  })

  console.log('MY NFTTTT', nft);

  return (
    <div className="w-full lg:px-12 py-32 ">
      <Head>
        <title>ZOO Marketplace</title>
        <meta name="description" content="ZOO Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TwoColumComp
        LeftCol={
          <div className="w-full bg-[#0D0C16] h-full flex justify-center items-center lg:rounded-l-xl px-24">
            <CardNft
              TokenId={nft?.id}
              animalName={nft?.name}
              glb={nft?.glb}
              className="lg:w-full"
            />
          </div>
        }
        RightCol={
          <div className="w-full bg-[#1F2030] h-full flex flex-col justify-center items-center lg:rounded-r-xl text-white py-6 px-8 lg:px-24">
            <p className="text-2xl font-medium mb-7">Your Bid</p>
            <div className="flex w-full items-center justify-between font-medium text-xl mb-12">
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
                className="rounded-xl border-[1.5px] border-white px-4 py-5 bg-[#2A2C41] w-full placeholder:text-[#878787] placeholder:text-lg mb-11"
                value={bidPrice}
                onChange={(e) => setBidPrice(e.target.value)}
              />
              <p className="font-medium text-xl mb-3 text-center">
                You must be paid at least 300,00 ZOO
              </p>
              <p className="font-medium text-xl mb-11 text-center">
                The next bid must be 5% more than the current bid
              </p>
              <button className="py-[18px] w-full rounded-2xl bg-bid-gradient mb-11">
                Place Bid
              </button>
            </form>
            <p className="font-medium text-xl mb-11 text-center">
              You cannot withdraw a bid once submitted
            </p>
            <a className="font-medium text-xl underline text-primary-green">
              How do auctions work?
            </a>
          </div>
        }
      />

      <div className="w-full flex justify-center ">
        <div className="md:w-3/4 overflow-auto whitespace-nowrap">
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
    </div>
  );
};

export default PlaceBid;

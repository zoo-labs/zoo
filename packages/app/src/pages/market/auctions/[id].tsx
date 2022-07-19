/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { abbreviateNumber } from "functions/abbreviateNumbers";
import { useCallback } from "react";
import { useGetAllAuctions, useZoobalance } from "state/zoo/hooks";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useETHBalances } from "state/wallet/hooks";
import { useZooKeeper } from "hooks";
import Web3 from "web3";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const Item = () => {
  const router = useRouter();
  const { id } = router.query;
  const { account } = useActiveWeb3React();
  const [auction, setAuction] = useState<any>(null);
  const [withZoo, setWithZoo] = useState(true);
  const { zooBalance, allAuctions } = useSelector((state: any) => state.zoo);
  const zooKeeper = useZooKeeper();
  const getZooBalance = useZoobalance();
  const getAllAuctions = useGetAllAuctions();
  const [zooBnbPrice, setZooBnbPrice] = useState(0);

  const getZooBnbPrice = useCallback(async () => {
    const price = await zooKeeper.BNBPrice();
    const value = Web3.utils.fromWei(price.toString(), "ether");
    setZooBnbPrice(parseFloat(value));
  }, [zooKeeper]);

  useEffect(() => {
    getAllAuctions();
    getZooBalance();
    getZooBnbPrice();
  }, [getAllAuctions, getZooBalance, getZooBnbPrice]);

  useEffect(() => {
    const _auction = allAuctions.find(
      (e: any) => e?.auctionId?.toString() === id?.toString()
    );
    setAuction(_auction);
    console.log("AUCTION_AUXTIO", _auction);
  }, [allAuctions, id]);

  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];
  const auctionPriceBNB = zooBnbPrice * Number(auction?.amount);

  console.log("the_chosen_auction__", auction);
  return (
    <>
      <div className="flex flex-col px-5 mx-auto mt-20 lg:flex-row gap-11 lg:items-center lg:px-10 max-w-7xl">
        <div className="rounded-xl p-px h-full bg-view-gradient w-full lg:w-[40%]">
          <div className="bg-black rounded-xl min-h-[466px] h-full w-full px-12 py-12 flex flex-col justify-center items-center">
            {/* <ModelViewer></ModelViewer> */}
            {/* <video
              autoPlay
              loop
              src={auction?.animation_url}
              width={350}
              height={300}
            /> */}
            {auction?.kind === 0 ? (
              <video
                autoPlay
                loop
                src={auction.animation_url}
                width={300}
                height={350}
              />
            ) : (
              <div className="h-[450px] w-[300px]">
                <ModelViewer
                  glb={auction?.glb_animation_url}
                  usdz={auction?.usdz_animation_url}
                ></ModelViewer>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-xl p-px h-full bg-transparent px-5 py-3 w-full lg:w-[60%]">
          <div className="flex flex-col items-start text-white gap-9 mb-7">
            <div className="flex flex-wrap items-center w-full space-y-3 gap-x-4">
              <div className="w-full">
                <p className="font-semibold text-[52px]">{auction?.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/status.svg" alt="" height={26} width={20} />
                <div>
                  <p className="text-sm font-medium">
                    {auction?.attributes[0]?.trait_type}
                  </p>
                  <p className="font-medium text-[10px]">
                    {auction?.attributes[0]?.value}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/population.svg"
                  alt=""
                  height={26}
                  width={20}
                />
                <div>
                  <p className="text-sm font-medium">
                    {auction?.attributes[1]?.trait_type}
                  </p>
                  <p className="font-medium text-[10px]">
                    {auction?.attributes[1]?.value}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/react.svg" alt="" height={26} width={20} />
                <div>
                  <p className="text-sm font-medium">
                    {auction?.attributes[2]?.trait_type}
                  </p>
                  <p className="font-medium text-[10px]">
                    {auction?.attributes[2]?.value}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center gap-3 mb-2.5">
              <div className="w-full lg:w-3/4">
                <div className="flex flex-col w-full px-6 py-2 rounded-lg 5 md:flex-row md:items-center md:justify-between bg-dark-400 ">
                  <div>
                    <p className="text-xs font-normal">Current bid</p>
                    <p className="text-xl font-medium">
                      {withZoo
                        ? `${abbreviateNumber(auction?.amount)} ZOO`
                        : `${auctionPriceBNB} BNB`}
                    </p>
                  </div>
                  <button
                    className="rounded-full bg-c-grey-200 inline-flex items-center justify-between w-[85px] p-1 pr-2 cursor-pointer"
                    onClick={() => setWithZoo(!withZoo)}
                  >
                    <div className="inline-flex items-center">
                      {withZoo ? (
                        <>
                          <Image
                            src="/logo.png"
                            alt=""
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                          <p className="ml-1 text-xs font-semibold">ZOO</p>
                        </>
                      ) : (
                        <>
                          <Image
                            src="/images/wallets/bsc.jpg"
                            alt=""
                            width={20}
                            height={20}
                            className=""
                          />
                          <p className="ml-1 text-xs font-semibold">BNB</p>
                        </>
                      )}
                    </div>
                    <img
                      src="/icons/caret-right.png"
                      alt=""
                      className="rounded-full"
                    />
                  </button>
                </div>
                <p className="hidden text-xs text-right text-c-grey-100">
                  Your Wallet Balance:{" "}
                  {withZoo
                    ? `${zooBalance} ZOO`
                    : `${userEthBalance?.toFixed(3)} BNB`}
                  {/* <div
                    onClick={() => {
                      console.log("getting xoo balance");
                      getZooBalance();
                    }}
                  >
                    <Replay />
                  </div> */}
                </p>
              </div>
            </div>
            <div className="w-full text-sm">
              <p className="w-full border-b border-[#605E5E] pb-2 mb-5">
                Description
              </p>
              {auction?.description ? (
                <p>{auction?.description}</p>
              ) : (
                <>
                  <p className="mb-7">
                    Introducing Only1 Genesis NFTs and Creator Staking Pool -
                    where Defi meets social in only1. Each creator passed KYC
                    will be minted a Genesis-NFT, which they can associate with
                    perks and rewards and trade it in the marketplace. Users on
                    the platform can stake $LIKE tokens on individual creators
                    and earn based on the pool’s APY, which adjusts according to
                    the creator’s engagement.
                  </p>
                  <p>
                    Only1 believes that the future of NFTs will serve a key
                    function within the tech world and that utility NFTs will
                    inevitably spill into other verticals outside gaming. They
                    also think art and collectible NFTs will slowly be replaced
                    by utility NFTs, and hence have made them an integral part
                    of their concept and earning mechanisms. There are two main
                    methods that Only1 uses to prioritize social engagement
                    between fans and influencers. ‍
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;

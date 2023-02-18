import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { Auction } from "types";
import { shortenAddress } from "functions";
import MarketItem from "../../../components/market/marketItem";
import { abbreviateNumber } from "functions/abbreviateNumbers";
import {
  useGetAllAuctions,
  useGetTokenOwner,
  useRefreshMetadata,
} from "state/zoo/hooks";
import { useZooKeeper, useMedia } from "hooks";
import Web3 from "web3";
import { useMoralisWeb3Api } from "react-moralis";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { SUPPORTED_NETWORKS } from "config/networks";
import moment from "moment";
import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useExpandNFTModal, useShareModal } from "state/application/hooks";
import NFTExpandedModal from "modals/ExpandNftModal";
import ShareNFTModal from "modals/ShareNFTModal";
import { Table } from "components/Table/styles";
import TransactionRow from "components/Table/TransactionRow";
import FragmentLayout from "layouts/Fragment";
import Layout from "layouts/Default";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});
const InfoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { chainId, account, library } = useActiveWeb3React();
  const { allAuctions } = useSelector((state: any) => state.zoo);
  const [nft, setNft] = useState<Auction>();
  const [creator, setCreator] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(true);
  const getAllAuctions = useGetAllAuctions();
  const zooKeeper = useZooKeeper();
  const media = useMedia();
  const [zooBnbPrice, setZooBnbPrice] = useState(0);
  const Web3Api = useMoralisWeb3Api();
  const getCreator = useGetTokenOwner();
  const toggleExpand = useExpandNFTModal();
  const toggleShare = useShareModal();
  const refetchStuff = useRefreshMetadata();
  const [activeItem, setActiveItem] = useState({});
  const minBidFunc = useCallback(() => {
    const curatorFeePercentage = 5 / 100;
    if (nft?.amount > 0) {
      return nft?.amount + nft?.amount * curatorFeePercentage;
    } else return nft?.reservePrice;
  }, [nft]);

  const [minBid, setMinBid] = useState<number | any>(minBidFunc());

  useEffect(() => {
    setMinBid(minBidFunc());
  }, [minBidFunc]);
  const fetchContractNFTTransfers = useCallback(async () => {
    const options: { chain?: any; address: string } = {
      address: media?.address,
      chain: SUPPORTED_NETWORKS[chainId]?.chainId,
    };

    const nftTransfers = await (
      await Web3Api.token.getContractNFTTransfers(options)
    ).result;

    const _ = nftTransfers.filter((n) => n.token_id === String(id));
    setTransactions(
      _.map((tx) => {
        return {
          ...tx,
          block_timestamp: new Date(tx.block_timestamp),
        };
      })
    );
  }, [Web3Api.token, chainId, id, media?.address]);

  const calculateTimeLeft = useCallback(() => {
    const endDate = new Date(nft?.firstBidTime * 1000 + nft?.duration * 1000);
    const difference = +new Date(endDate) - +new Date();

    let timeLeft: any = {};

    if (difference >= 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [nft?.duration, nft?.firstBidTime]);

  const [ttimeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    let interval;
    if (ttimeLeft.d === 0 && ttimeLeft.h === 0 && ttimeLeft.m === 0) {
      clearInterval(interval);
    }
    if (ttimeLeft.d === 0 && ttimeLeft.h !== 0) {
      interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000 * 60 * 60);
    } else if (ttimeLeft.d === 0 && ttimeLeft.h === 0 && ttimeLeft.m !== 0) {
      interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000 * 60);
    } else {
      setTimeLeft(calculateTimeLeft());
    }
    return () => clearTimeout(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculateTimeLeft]);

  const getZooBnbPrice = useCallback(async () => {
    const price = await zooKeeper?.BNBPrice();
    const value = Web3.utils.fromWei(price?.toString(), "ether");
    setZooBnbPrice(parseFloat(value));
  }, [zooKeeper]);

  const refresh = useCallback(async () => {
    refetchStuff(nft.tokenID, nft.tokenUri, nft.animation_url);
  }, [refetchStuff, nft]);

  useEffect(() => {
    getZooBnbPrice();
    getAllAuctions();
    fetchContractNFTTransfers();
    getCreator(nft?.tokenID).then((res) => setCreator(res));
  }, [library]);

  const amountPriceBNB = zooBnbPrice * Number(nft?.amount);
  const reservePriceBNB = zooBnbPrice * Number(nft?.reservePrice);

  const renderTimeLeft = useMemo(() => {
    return nft?.firstBidTime
      ? Object.keys(ttimeLeft).length > 0
        ? `${ttimeLeft.d}d : ${ttimeLeft.h}h : ${ttimeLeft.m}m`
        : "Auction has ended"
      : "Auction has not started yet";
  }, [nft?.firstBidTime, ttimeLeft]);

  useEffect(() => {
    const _nft = allAuctions?.find(
      (obj) => String(obj?.tokenID) === String(id)
    );
    setNft(_nft);
  }, [allAuctions, id]);

  return (
    <div className="pb-16 md:flex-col md:items-center lg:flex-row ">
      <div className="flex flex-col md:flex-row md:items-center gap-24 mb-[91px] -mt-20 py-20 lg:px-28 px-8 bg-product-view lg:max-w-7xl lg:mx-auto">
        <div className="bg-black border border-33 rounded-[14px] py-5 ">
          <div className="px-10">
            <div className="showcase h-[351px] md:h-[450px] flex items-center justify-center relative">
              {nft?.kind === 0 || nft?.kind === 2 ? (
                <video
                  autoPlay
                  loop
                  src={nft.animation_url}
                  width={300}
                  height={350}
                  className="max-h-[350px] md:max-h-[450px]"
                />
              ) : (
                <div className="h-[350px] w-full">
                  <ModelViewer
                    // zoom="35deg"
                    glb={nft?.glb_animation_url}
                    usdz={nft?.usdz_animation_url}
                  ></ModelViewer>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 mt-2 mx-4 lg:mx-10">
            {/* <div>
              <p className="mb-0.5 text-xs font-semibold">Mints Left?</p>
              <p className="text-[#979797] font-light text-xs">1 Mint</p>
            </div> */}
            <div>
              <p className="mb-0.5 text-xs font-semibold">Time Left:</p>
              <p className="text-[#979797] font-light text-xs">
                {renderTimeLeft}
              </p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-semibold">Reserve Price:</p>
              <p className="text-[#979797] font-light text-xs">
                {abbreviateNumber(nft?.reservePrice)} ZOO
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-3 font-light">
            {[0, 1].includes(nft?.kind) ? "Genesis" : "Hybrid"} #{nft?.tokenID}
          </p>
          <h1 className="font-semibold text-[44px] leading-[3rem] lg:leading-[3rem] lg:leading-4 mb-[26px]">
            {nft?.name}
          </h1>

          <p className="mb-0.5 text-sm font-medium">DESCRIPTIONS</p>
          <div className="w-full h-px mb-2 bg-white" />
          <p className="mb-8 text-sm">{nft?.description}</p>
          <div className="flex flex-row items-center mb-[22px] w-full lg:w-11/12 ">
            <div className="mb-1 mr-4">
              <div className="flex items-center">
                <p className="mr-2 text-sm text-white">Current Bid: </p>
                <span className="text-[10px] text-muted-50">[16 Bids]</span>
              </div>
              <p className="text-2xl font-semibold">
                {abbreviateNumber(nft?.amount)} ZOO
              </p>
            </div>
            <div className="px-8 py-2 text-center text-black bg-white rounded-md ">
              <p className="text-sm">Bid Amount</p>
              <p className="text-[8px] font-[400]">{minBid} ZOO or more</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 md:flex-row">
            {nft?.firstBidTime && Object.keys(ttimeLeft).length === 0 ? (
              ""
            ) : (
              <Link href={`/market/placebid/${id}`} passHref>
                <button className="bg-blue rounded-md py-3.5 w-full">
                  {nft?.tokenOwner === account
                    ? "Edit Your Auction"
                    : "Place Bid"}
                </button>
              </Link>
            )}
            <button className="border border-33 rounded-md py-3.5 w-full flex items-center justify-center">
              <Image
                src="/icons/heart.svg"
                alt=""
                width={26}
                height={26}
                className="mr-2.5"
              />

              <p>Add to Watchlist</p>
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 lg:max-w-7xl lg:mx-auto">
        <div className="flex items-center justify-center gap-12 mb-12">
          <p className="px-3 pb-3 text-lg font-black border-b border-white cursor-pointer">
            Properties
          </p>
          <a
            href={nft?.tokenUri}
            target="_blank"
            rel="noreferrer"
            className="flex items-center px-3 pb-3 text-lg cursor-pointer font-base"
          >
            <p className="mr-1">Metadata</p>
            <Image src="/icons/link-white.svg" alt="" width={11} height={11} />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 mb-2.5 md:mb-4">
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">Generations</p>
            <p className="text-lg font-bold text-white">
              {[0, 1].includes(nft?.kind) ? "Genesis" : "Hybrid"}
            </p>
          </div>
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">
              Breeding Allowed
            </p>
            <p className="text-lg font-bold text-white">7 X</p>
          </div>
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">Value</p>
            <p className="text-lg font-bold text-white">{nft?.reservePrice}</p>
          </div>
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">Multiplier APY</p>
            <p className="text-lg font-bold text-white">22%</p>
          </div>
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">Mint Possible</p>
            <p className="text-lg font-bold text-white">
              {nft?.kind === 0 ? "YES" : "NO"}
            </p>
          </div>
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">NFT</p>
            <p className="text-lg font-bold text-white">
              {[0, 2].includes(nft?.kind) ? "MP4" : "3D, USDZ, GLB"}
            </p>
          </div>
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">Maturity</p>
            <p className="text-lg font-bold text-white">
              {[0, 2].includes(nft?.kind)
                ? "Baby"
                : nft?.attributes && nft?.attributes[1]?.value}
            </p>
          </div>
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">
              {nft?.attributes && nft?.attributes[0]?.trait_type}
            </p>
            <p className="text-lg font-bold text-white">
              {nft?.attributes && nft?.attributes[0]?.value}
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-2.5 md:gap-4">
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">Habitat</p>
            <p className="text-lg font-bold text-white">
              Forest, wetlands & bushlands
            </p>
          </div>
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">Scientific Name</p>
            <p className="text-lg font-bold text-white">Canis Rufus</p>
          </div>
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">Distribution</p>
            <p className="text-lg font-bold text-white">North America</p>
          </div>
          <div className="bg-33 p-3.5 rounded">
            <p className="text-2xl font-bold text-[#7D7D7D]">
              Emotionally Intelligent ?
            </p>
            <p className="text-lg font-bold text-white">Coming Soon</p>
          </div>
        </div>

        <div>
          <div className="hidden border-b border-[#fff] lg:block pt-8 pb-4 w-1/3 mb-4">
            <p className="mt-8 text-2xl font-semibold uppercase">Browse</p>
          </div>
          <div className="flex flex-wrap justify-center mt-8 -mx-4">
            {allAuctions.length > 0 ? (
              allAuctions
                .filter((auction) => auction.kind === 0)
                .map((datum, index) => {
                  return (
                    <div key={index} className="w-full p-2 md:w-1/2 xl:w-1/4">
                      <MarketItem
                        datum={datum}
                        applyMaxWidth={false}
                        placeBid={() => (setActiveItem(datum), console.log(""))}
                      />
                    </div>
                  );
                })
            ) : (
              <div className="w-full py-16 text-center">No auctions</div>
            )}
          </div>
          {/* <div className="grid gap-4 mt-8 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((data, index) => {
              return (
                <div key={index}>
                  <div className="border border-t border-[#333333] rounded-xl p-4">
                    <div className="flex items-center w-12 h-12 intials-backdrop z-30 sticky bg-[#FF592C] rounded-full uppercase justify-center">
                      <p className="text-3xl font-bold">R</p>
                    </div>
                    <div className="showcase h-[200px] flex items-center justify-center relative -mt-8">
                      {nft?.kind === 0 || nft?.kind === 2 ? (
                        <video
                          autoPlay
                          loop
                          src={nft.animation_url}
                          width={300}
                          height={200}
                          className="max-h-[200px]"
                        />
                      ) : (
                        <div className="h-[200px] w-full">
                          <ModelViewer
                            // zoom="35deg"
                            glb={nft?.glb_animation_url}
                            usdz={nft?.usdz_animation_url}
                          ></ModelViewer>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-center">
                      #1234{" "}
                      <span className="font-bold text-[#333333]">20/13</span>
                    </p>
                    <p className="mt-1 font-bold text-center">
                      Baby Amur Leopard
                    </p>
                    <div className="flex justify-center items-center bg-[#333333] py-2 rounded-lg mt-4">
                      <p className="w-6 h-6 bg-white rounded-full text-[#333333] text-[10px] font-semibold flex items-center justify-center">
                        ZOO
                      </p>
                      <p className="ml-2 text-sm font-bold">220.4M</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <span className="mr-2 text-lg">View Item</span>
                    <Image
                      src="/icons/link-white.svg"
                      alt=""
                      width={15}
                      height={15}
                    />
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
        <ShareNFTModal nft={nft} />
        <NFTExpandedModal nft={nft} />
      </div>
    </div>
  );
};

export default InfoPage;

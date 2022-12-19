import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { Auction } from "types";
import { shortenAddress } from "functions";
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

  console.log("ddnsahjdbhjshdjhdshgajdcahjcvd", nft);

  return (
    <div className="pb-16 md:flex-col md:items-center lg:flex-row ">
      <div className="flex flex-col md:flex-row md:items-center gap-24 mb-[91px] -mt-20 py-20 px-28 bg-product-view lg:max-w-7xl lg:mx-auto">
        <div className="bg-black border border-33 rounded-[14px] py-5 px-10">
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
          <div className="flex items-center justify-between gap-6 mt-2">
            <div>
              <p className="mb-0.5 text-xs font-semibold">Mints Left?</p>
              <p className="text-[#979797] font-light text-xs">1 Mint</p>
            </div>
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
          <p className="font-light mb-3">
            {[0, 1].includes(nft?.kind) ? "Genesis" : "Hybrid"} #{nft?.tokenID}
          </p>
          <p className="font-semibold text-5xl mb-[26px]">{nft?.name}</p>

          <p className="mb-0.5 text-sm font-medium">DESCRIPTIONS</p>
          <div className="h-px bg-white w-full mb-2" />
          <p className="text-sm mb-8">{nft?.description}</p>
          <div className="flex flex-row items-center mb-[22px] w-full lg:w-11/12 ">
            <div className="mb-1 mr-4">
              <div className="flex items-center">
                <p className="text-white mr-2 text-sm">Current Bid: </p>
                <span className="text-[10px] text-muted-50">[16 Bids]</span>
              </div>
              <p className="text-2xl font-semibold">
               {abbreviateNumber(nft?.amount)} ZOO
              </p>
            </div>
            <div className=" rounded-md py-2 text-black bg-white text-center px-8">
              <p className="text-sm">Bid Amount</p>
              <p className="text-[8px] font-[400]">{minBid} ZOO or more</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
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
          <p className="px-3 font-black text-lg pb-3 border-b border-white cursor-pointer">
            Properties
          </p>
          <a
            href={nft?.tokenUri}
            target="_blank"
            rel="noreferrer"
            className="px-3 font-base text-lg pb-3 flex items-center cursor-pointer"
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
            <p className="text-2xl font-bold text-[#7D7D7D]">
              Scientific Name
            </p>
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
        <ShareNFTModal nft={nft} />
        <NFTExpandedModal nft={nft} />
      </div>
    </div>
  );
};

export default InfoPage;

import React, { useEffect, useState, useCallback } from "react";
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

  useEffect(() => {
    const _nft = allAuctions?.find(
      (obj) => String(obj?.tokenID) === String(id)
    );
    setNft(_nft);
  }, [allAuctions, id]);

  console.log("NFTTTT_ANDAUCTION", nft);
  return (
    <Layout bg="bg-black">
      <div className="px-6 pb-16 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
        <div className="showcase min-h-[564px] flex items-center justify-center relative">
          {nft?.kind === 0 || nft?.kind === 2 ? (
            <video
              autoPlay
              loop
              src={nft.animation_url}
              width={300}
              height={350}
            />
          ) : (
            <div className="h-[564px] w-full">
              <ModelViewer
                // zoom="35deg"
                glb={nft?.glb_animation_url}
                usdz={nft?.usdz_animation_url}
              ></ModelViewer>
            </div>
          )}
          <div className="absolute bottom-0 flex items-center justify-end w-full gap-3 right">
            <button
              onClick={toggleShare}
              className="flex items-center justify-center gap-3 px-5 py-3 bg-gray-100 rounded-full"
            >
              <Image src="/icons/upload.svg" alt="" width={18} height={18} />
              <span className="font-medium">Share</span>
            </button>
            <button
              className="flex items-center justify-center gap-3 py-3.5 px-3.5 bg-gray-100 rounded-full"
              onClick={toggleExpand}
            >
              <CropFreeRoundedIcon width={18} height={18} />
            </button>
            <button
              className="flex items-center justify-center gap-3 py-3.5 px-3.5 bg-gray-100 rounded-full"
              onClick={refresh}
            >
              <RefreshIcon width={18} height={18} />
            </button>
          </div>
        </div>
        <div className="flex flex-col mb-5 space-x-12 space-y-12 lg:flex-row lg:items-start py-9 ">
          <div className="w-full lg:w-3/5">
            <p className="font-semibold text-[56px] mb-2">{nft?.name}</p>
            <div className="flex gap-x-4">
              <div className="flex items-center gap-2">
                <Image src="/icons/status.svg" alt="" height={26} width={20} />
                <div>
                  <p className="text-sm font-medium">
                    {nft?.attributes && nft?.attributes[0]?.trait_type}
                  </p>
                  <p className="font-medium text-[10px]">
                    {nft?.attributes && nft?.attributes[0]?.value}
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
                    {nft?.attributes && nft?.attributes[1]?.trait_type}
                  </p>
                  <p className="font-medium text-[10px]">
                    {nft?.attributes && nft?.attributes[1]?.value}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/react.svg" alt="" height={26} width={20} />
                <div>
                  <p className="text-sm font-medium">
                    {nft?.attributes && nft?.attributes[2]?.trait_type}
                  </p>
                  <p className="font-medium text-[10px]">
                    {nft?.attributes && nft?.attributes[2]?.value}
                  </p>
                </div>
              </div>
            </div>

            <div className="my-5">
              <p className="mb-3 text-xl font-semibold">Description</p>
              <hr className="w-full h-px mb-10 opacity-40" />
              {nft?.description ? (
                <p className="text-justify">{nft?.description}</p>
              ) : (
                <>
                  <p className="mb-7">
                    Introducing Only1 Origin NFTs and Creator Staking Pool -
                    where Defi meets social in only1. Each creator passed KYC
                    will be minted a Origin-NFT, which they can associate with
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
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 border border-gray-500 rounded-full" />
              <p className="ml-2 text-xl font-bold">Creator: </p>
              <a
                href={`https://testnet.bscscan.com/address/${creator}`}
                target="_blank"
                rel={"noreferrer noopener"}
                className="ml-4 text-xl font-bold text-steel"
              >
                {creator ? shortenAddress(creator) : ""}
              </a>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 border border-gray-500 rounded-full" />
              <p className="ml-2 text-xl font-bold">Current owner: </p>
              <a
                href={`https://testnet.bscscan.com/address/${nft?.tokenOwner}`}
                target="_blank"
                rel={"noreferrer noopener"}
                className="ml-4 text-xl font-bold text-steel"
              >
                {nft?.tokenOwner ? shortenAddress(nft?.tokenOwner) : ""}
              </a>
            </div>
          </div>
          <div className="w-full lg:w-2/5 border border-white-30 rounded-lg h-auto max-h-fit py-[22px] px-[26px]">
            <div className="flex items-center justify-end">
              {nft?.firstBidTime ? (
                Object.keys(ttimeLeft).length > 0 ? (
                  <div className="py-2 text-xs font-medium rounded-full bg-zoo-green px-7">
                    Active
                  </div>
                ) : (
                  <div className="py-2 text-xs font-medium rounded-full bg-red px-7">
                    Ended
                  </div>
                )
              ) : (
                <div className="py-2 text-xs font-medium rounded-full bg-yellow px-7">
                  No Bid
                </div>
              )}
            </div>
            <div>
              <div className="flex  space-x-3.5 mb-2 flex-col">
                <p className="text-sm font-normal text-white opacity-60">
                  Reserve Price
                </p>

                <div className="flex items-center space-x-3.5">
                  <p className="text-2xl font-semibold">
                    {abbreviateNumber(nft?.reservePrice)} ZOO
                  </p>
                  <p className="font-medium text-base text-[#909090]">
                    ({abbreviateNumber(reservePriceBNB)} BNB)
                  </p>
                </div>
              </div>
              <div className="flex space-x-3.5 mb-2 flex-col">
                <p className="text-sm font-normal text-white opacity-60">
                  Last Bid Price
                </p>
                <div className="flex items-center space-x-3.5">
                  <p className="text-2xl font-semibold">
                    {abbreviateNumber(nft?.amount)} ZOO
                  </p>
                </div>
              </div>
              <div>
                <p className="text-white opacity-60 text-sm font-normal mb-2.5">
                  Auction Duration
                </p>
                <p className="font-semibold text-[40px] mb-[41px]">
                  {nft?.firstBidTime
                    ? Object.keys(ttimeLeft).length > 0
                      ? ttimeLeft.d
                        ? `${ttimeLeft.d} Day${
                            ttimeLeft.d > 1 ? "s" : ""
                          }  Left`
                        : ttimeLeft.h
                        ? `${ttimeLeft.h} Hr${ttimeLeft.h > 1 ? "s" : ""} : ${
                            ttimeLeft.m
                          } Min${ttimeLeft.m > 1 ? "s" : ""}`
                        : `${ttimeLeft.m} Minutes Left`
                      : "Auction has ended"
                    : "Auction has not started yet"}
                </p>
              </div>
            </div>
            {nft?.firstBidTime && Object.keys(ttimeLeft).length === 0 ? (
              ""
            ) : (
              <Link href={`/market/placebid/${id}`} passHref>
                <button className="py-[18px] w-full bg-leader-board rounded-[4px]">
                  {nft?.tokenOwner === account
                    ? "Edit Your Auction"
                    : "Place Bid"}
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="w-full mb-10">
          <div className="w-full border rounded-lg border-white-30 ">
            <div className="flex items-center justify-between px-12 py-4">
              <p>Current Bids</p>
              <Image
                src="/icons/caaret-down.svg"
                alt=""
                width={15}
                height={8}
                onClick={() => setShowTable(!showTable)}
                className="cursor-pointer"
              />
            </div>
            <Table className={`w-full rounded-b-lg ${!showTable && "hidden"}`}>
              <tr className="">
                <th>From</th>
                <th>To</th>
                <th>Price</th>
                <th>Offer Time</th>
                <th>Hash</th>
              </tr>
              {[...transactions, ...(nft?.auctionHistory ?? [])]
                .sort((a, b) => b.block_timestamp - a.block_timestamp)
                .map((transaction, index) => {
                  console.log("transaction", transaction);
                  return (
                    <TransactionRow
                      key={index}
                      from_address={transaction.from_address}
                      to_address={transaction.to_address}
                      value={transaction.value}
                      block_timestamp={transaction.block_timestamp}
                      transaction_hash={transaction.transaction_hash}
                    />
                  );
                })}
            </Table>
          </div>
        </div>
        <ShareNFTModal nft={nft} />
        <NFTExpandedModal nft={nft} />
      </div>
    </Layout>
  );
};

export default InfoPage;
InfoPage.Layout = FragmentLayout;

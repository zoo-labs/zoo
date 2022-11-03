import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  useFeed,
  useFeedCount,
  useFetchMyNFTs,
  useGetTokenOwner,
  useRefreshMetadata,
} from "state/zoo/hooks";
import {
  useHatchEggModal,
  useAuctionModal,
  useFreeNftModal,
  useHatchEggAnimationModal,
  useAddPopup,
  useShareModal,
  useExpandNFTModal,
} from "state/application/hooks";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShareIcon from "@mui/icons-material/Share";
import Image from "next/image";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import { MyNFT } from "state/zoo/types";
import moment from "moment";
import Link from "next/link";
import dynamic from "next/dynamic";
import AuctionModal from "modals/Auction";
import FreeNFTModal from "modals/FreeNFTModal";
import HatchEggModal from "modals/HatchEggModal";
import HatchEggAnimationModal from "modals/HatchEggModal/Animation";
import ModalLayout from "layouts/Modal";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import ShareNFTModal from "modals/ShareNFTModal";
import NFTExpandedModal from "modals/ExpandNftModal";
import { abbreviateNumber } from "functions/abbreviateNumbers";
import { shortenAddress } from "functions";
import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import FragmentLayout from "layouts/Fragment";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const NftModal = ({}: AppProps & {
  Component: NextComponentType<NextPageContext> & {
    Layout: (title: string) => void;
  };
}) => {
  const { account } = useActiveWeb3React();
  const { myNfts, loading } = useSelector((state: any) => state.zoo);
  const toggleAnimationModal = useHatchEggAnimationModal();
  const toggleHatchEggModal = useHatchEggModal();
  const toggleAucionModal = useAuctionModal();
  const [nftItem, setNftItem] = useState<MyNFT | any>({});
  const [nftAnimate, setNftAnimate] = useState<MyNFT | any>({});
  const [feeding, setFeeding] = useState(false);
  const [creator, setCreator] = useState("");
  const toggleFreeNFTModal = useFreeNftModal();
  const toggleExpand = useExpandNFTModal();
  const router = useRouter();
  const fetchNFTs = useFetchMyNFTs();
  const feedAnimal = useFeed();
  const feedCount = useFeedCount();
  const getCreator = useGetTokenOwner();
  const refetch = useRefreshMetadata();
  const addPopup = useAddPopup();
  const refetchStuff = useRefreshMetadata();
  const toggleShare = useShareModal();
  const { id } = router.query;

  const feed = async () => {
    setFeeding(true);
    const { count, lastTimeFed } = await feedCount(+String(id));
    const lastFed = new Date(lastTimeFed * 1000);
    const newFeedMin = lastFed.setHours(lastFed.getHours() + count * 24);
    const canFeed = +new Date() > +new Date(newFeedMin);
    console.log("_lasttime_fed", { count, lastTimeFed, canFeed });
    if (canFeed) {
      setFeeding(false);
      feedAnimal(+String(id));
    } else {
      setFeeding(false);
      addPopup({
        txn: {
          hash: null,
          summary: `You can feed your animal again at ${moment(
            newFeedMin
          ).format("MMM Do YYYY, h:mm a")}`,
          success: false,
        },
      });
      //  toggleFeeTimerModal(amount of times I fed * 24)
    }
  };

  const refetchMetadata = () => {
    refetch(nftItem.id, nftItem.token_uri, nftItem.meta?.metaUri);
  };

  const hatchEgg = () => {
    toggleHatchEggModal();
  };

  const freeNft = () => {
    toggleFreeNFTModal();
  };

  const refresh = useCallback(async () => {
    refetchStuff(nftItem.tokenID, nftItem.tokenUri, nftItem.animation_url);
  }, [refetchStuff, nftItem]);

  // useEffect(() => {
  //   fetchNFTs();
  //   getCreator(nftItem?.id).then((res) => setCreator(res));
  // }, [fetchNFTs, getCreator, nftItem?.id]);

  const auction = () => toggleAucionModal();

  useEffect(() => {
    if (id) {
      const nft = myNfts.find((nft: MyNFT) => String(nft?.id) === String(id));
      if (nft) {
        setNftItem(nft);
      }
    }
  }, [id, myNfts]);

  console.log("the_chosen_nftItem", nftItem);

  return (
    <ModalLayout bg="bg-black" arrowBg="bg-dark-900">
      <div className="px-6 pb-16 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
        <div className="showcase min-h-[564px] flex items-center justify-center relative">
          {nftItem?.kind === 0 || nftItem?.kind === 2 ? (
            <video
              autoPlay
              loop
              src={nftItem.token_uri}
              width={300}
              height={350}
            />
          ) : (
            <div className="h-[564px] w-full">
              <ModelViewer
                // zoom="35deg"
                glb={nftItem?.glb_animation_url}
                usdz={nftItem?.usdz_animation_url}
              ></ModelViewer>
            </div>
          )}
          <div className="absolute bottom-0 flex items-center justify-end w-full gap-3 right">
            {/* <button
            onClick={toggleShare}
            className="flex items-center justify-center gap-3 px-5 py-3 bg-gray-100 rounded-full"
          >
            <Image src="/icons/upload.svg" alt="" width={18} height={18} />
            <span className="font-medium">Share</span>
          </button> */}
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
            <p className="font-semibold text-[56px] mb-2">{nftItem?.name}</p>
            <div className="flex gap-x-4">
              <div className="flex items-center gap-2">
                <Image src="/icons/status.svg" alt="" height={26} width={20} />
                <div>
                  <p className="text-sm font-medium">
                    {nftItem?.attributes && nftItem?.attributes[0]?.trait_type}
                  </p>
                  <p className="font-medium text-[10px]">
                    {nftItem?.attributes && nftItem?.attributes[0]?.value}
                  </p>
                </div>
              </div>
              {/* <div className="flex items-center gap-2">
                <Image
                  src="/icons/population.svg"
                  alt=""
                  height={26}
                  width={20}
                />
                <div>
                  <p className="text-sm font-medium">
                    {nftItem?.attributes && nftItem?.attributes[1]?.trait_type}
                  </p>
                  <p className="font-medium text-[10px]">
                    {nftItem?.attributes && nftItem?.attributes[1]?.value}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/react.svg" alt="" height={26} width={20} />
                <div>
                  <p className="text-sm font-medium">
                    {nftItem?.attributes && nftItem?.attributes[2]?.trait_type}
                  </p>
                  <p className="font-medium text-[10px]">
                    {nftItem?.attributes && nftItem?.attributes[2]?.value}
                  </p>
                </div>
              </div> */}
            </div>

            <div className="my-5">
              <p className="mb-3 text-xl font-semibold">Description</p>
              <hr className="w-full h-px mb-10 opacity-40" />
              {nftItem?.description ? (
                <p className="text-justify">{nftItem?.description}</p>
              ) : (
                "- "
                // <>
                //   <p className="mb-7">
                //     Introducing Only1 Origin NFTs and Creator Staking Pool -
                //     where Defi meets social in only1. Each creator passed KYC
                //     will be minted a Origin-NFT, which they can associate with
                //     perks and rewards and trade it in the marketplace. Users on
                //     the platform can stake $LIKE tokens on individual creators
                //     and earn based on the pool’s APY, which adjusts according to
                //     the creator’s engagement.
                //   </p>
                //   <p>
                //     Only1 believes that the future of NFTs will serve a key
                //     function within the tech world and that utility NFTs will
                //     inevitably spill into other verticals outside gaming. They
                //     also think art and collectible NFTs will slowly be replaced
                //     by utility NFTs, and hence have made them an integral part
                //     of their concept and earning mechanisms. There are two main
                //     methods that Only1 uses to prioritize social engagement
                //     between fans and influencers. ‍
                //   </p>
                // </>
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
                href={`https://testnet.bscscan.com/address/${account}`}
                target="_blank"
                rel={"noreferrer noopener"}
                className="ml-4 text-xl font-bold text-steel"
              >
                {account ? shortenAddress(account) : ""}
              </a>
            </div>
          </div>
          <div className="w-full lg:w-2/5 border border-white-30 rounded-lg h-auto max-h-fit py-[22px] px-[26px]">
            {nftItem?.kind === 0 || nftItem?.kind === 2 ? (
              <button
                className="w-full p-4 mb-4 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-blue disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => hatchEgg()}
                disabled={loading || feeding}
              >
                HATCH
              </button>
            ) : (
              <>
                <button
                  className="w-full p-4 mb-4 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-blue disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => feed()}
                  disabled={loading || feeding}
                >
                  FEED
                </button>
                {nftItem?.stage === 2 && (
                  <Link href={`/wallet/${nftItem?.id}/breed`} passHref>
                    <button
                      className="w-full p-4 mb-4 mr-2 text-sm font-bold text-center text-white border border-gray-500 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={loading || feeding}
                    >
                      BREED
                    </button>
                  </Link>
                )}
              </>
            )}

            <button
              className="w-full p-4 mb-4 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-blue disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => auction()}
              disabled={loading || feeding}
            >
              AUCTION
            </button>
            {nftItem && (nftItem.kind === 1 || nftItem.kind === 3) && (
              <button
                className="w-full p-4 mb-4 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-blue disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => freeNft()}
                disabled={loading || feeding}
              >
                FREE
              </button>
            )}
          </div>
        </div>

        <ShareNFTModal nft={nftItem} />
        <NFTExpandedModal isAuction={false} nft={nftItem} />
        <HatchEggModal
          nftItem={nftItem}
          success={() => {
            fetchNFTs().then((res) => {
              setNftAnimate(myNfts[0]);
              toggleAnimationModal();
              // const nft__ = myNfts.find((n) => n.eggId === nftItem.id);
              // setNftItem(nft__);
            });
          }}
        />
        <FreeNFTModal nft={nftItem} />
        <AuctionModal nft={nftItem} />
        <ShareNFTModal nft={nftItem} />
        {Object.keys(nftAnimate).length > 0 && (
          <HatchEggAnimationModal nft={nftAnimate} />
        )}
      </div>
    </ModalLayout>
  );

  // return (
  //   <>
  //     <div className="flex flex-col px-5 mx-auto mt-40 lg:flex-row gap-11 lg:items-center lg:px-10 max-w-7xl">
  //       <div className="rounded-xl p-px h-full bg-view-gradient w-full lg:w-[40%]">
  //         <div className="bg-black rounded-xl h-[466px] w-full flex flex-col justify-center items-center">
  //           {nftItem?.kind === 0 || nftItem?.kind === 2 ? (
  //             <video
  //               autoPlay
  //               loop
  //               src={nftItem?.token_uri}
  //               width={300}
  //               height={350}
  //             />
  //           ) : (
  //             <div className="w-full h-full">
  //               <ModelViewer
  //                 glb={nftItem?.glb_animation_url}
  //                 usdz={nftItem?.usdz_animation_url}
  //               ></ModelViewer>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //       <div className="rounded-xl p-px h-full bg-transparent px-5 py-3 w-full lg:w-[60%]">
  //         <div className="flex flex-col items-start text-white gap-9 mb-7">
  //           <div className="flex flex-wrap items-center w-full space-y-3 gap-x-4">
  //             <div className="flex items-center justify-between w-full">
  //               <p className="font-semibold text-[52px]">{nftItem?.name}</p>
  //               <div className=" flex items-center rounded-xl border-2 border-[#323341]">
  //                 <button
  //                   className="px-4 py-2 cursor-pointer border-r border-[#323341] outline-none focus:outline-none disabled:cursor-not-allowed"
  //                   disabled={loading || feeding}
  //                   onClick={refetchMetadata}
  //                 >
  //                   <RefreshIcon />
  //                 </button>
  //                 <button
  //                   disabled={loading || feeding}
  //                   className="px-4 py-2 cursor-pointer border-l border-[#323341] outline-none focus:outline-none disabled:cursor-not-allowed"
  //                   onClick={toggleShare}
  //                 >
  //                   <ShareIcon />
  //                 </button>
  //               </div>
  //             </div>
  //             {nftItem.kind !== 0 && nftItem.kind !== 2 ? (
  //               <div className="flex items-center gap-2">
  //                 <Image
  //                   src="/icons/status.svg"
  //                   alt=""
  //                   height={26}
  //                   width={20}
  //                 />
  //                 <div>
  //                   <p className="text-sm font-medium">
  //                     {nftItem?.attributes &&
  //                       nftItem?.attributes[0]?.trait_type}
  //                   </p>
  //                   <p className="font-medium text-[10px]">
  //                     {nftItem?.attributes && nftItem?.attributes[0]?.value}
  //                   </p>
  //                 </div>
  //               </div>
  //             ) : null}
  //             <div className="flex items-center gap-2">
  //               <Image
  //                 src="/icons/population.svg"
  //                 alt=""
  //                 height={26}
  //                 width={20}
  //               />
  //               <div>
  //                 <p className="text-sm font-medium">
  //                   {nftItem?.attributes && nftItem?.attributes[1]?.trait_type}
  //                 </p>
  //                 <p className="font-medium text-[10px]">
  //                   {nftItem?.attributes && nftItem?.attributes[1]?.value}
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="flex items-center gap-2">
  //               <Image src="/icons/react.svg" alt="" height={26} width={20} />
  //               <div>
  //                 <p className="text-sm font-medium">
  //                   {nftItem?.attributes && nftItem?.attributes[2]?.trait_type}
  //                 </p>
  //                 <p className="font-medium text-[10px]">
  //                   {nftItem?.attributes && nftItem?.attributes[2]?.value}
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="flex items-center gap-2">
  //               <AccessAlarmRoundedIcon />
  //               <div>
  //                 <p className="text-sm font-medium">Birthday</p>
  //                 <p className="font-medium text-[10px]">
  //                   {moment(
  //                     new Date(nftItem?.timestamp * 1000),
  //                     "YYYYMMDD"
  //                   ).fromNow()}
  //                 </p>
  //               </div>
  //             </div>

  //             {(nftItem?.kind === 1 || nftItem?.kind === 3) && (
  //               <div className="flex items-center gap-2">
  //                 <Image
  //                   src="/icons/growing-up.png"
  //                   alt=""
  //                   height={26}
  //                   width={20}
  //                 />
  //                 <div>
  //                   <p className="text-sm font-medium">Age</p>
  //                   <p className="font-medium text-[10px]">
  //                     {nftItem?.stage === 0
  //                       ? "BABY"
  //                       : nftItem?.stage === 1
  //                       ? "TEENAGE"
  //                       : "ADULT"}
  //                   </p>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //           <div className="flex w-full flex-col items-center gap-3 mb-2.5">
  //             <div className="w-full">
  //               <div className="flex flex-col flex-wrap w-full py-2 rounded-lg 5 md:flex-row md:items-center">
  //                 {nftItem?.kind === 0 || nftItem?.kind === 2 ? (
  //                   // <button
  //                   //   className="w-[23%] p-2 mb-1 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-leader-board disabled:cursor-not-allowed disabled:opacity-60"
  //                   //   onClick={() => hatchEgg()}
  //                   //   disabled={loading || feeding}
  //                   // >
  //                   //   HATCH
  //                   // </button>
  //                   <></>
  //                 ) : (
  //                   <>
  //                     <button
  //                       className="w-[23%] p-2 mb-1 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-leader-board disabled:cursor-not-allowed disabled:opacity-60"
  //                       onClick={() => feed()}
  //                       disabled={loading || feeding}
  //                     >
  //                       FEED
  //                     </button>
  //                     {nftItem?.stage === 2 && (
  //                       <Link href={`/wallet/${nftItem?.id}/breed`} passHref>
  //                         <button
  //                           className="w-[23%] p-2 mb-1 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer border border-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
  //                           disabled={loading || feeding}
  //                         >
  //                           BREED
  //                         </button>
  //                       </Link>
  //                     )}
  //                   </>
  //                 )}

  //                 <button
  //                   className="w-[23%] p-2 mb-1 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-auction-gradient disabled:cursor-not-allowed disabled:opacity-60"
  //                   onClick={() => auction()}
  //                   disabled={loading || feeding}
  //                 >
  //                   AUCTION
  //                 </button>
  //                 {nftItem && (nftItem.kind === 1 || nftItem.kind === 3) && (
  //                   <button
  //                     className="w-[23%] p-2 mb-1 mr-2 text-sm font-bold text-center text-white border rounded-lg cursor-pointer border-white-30 bg-white-10 disabled:cursor-not-allowed disabled:opacity-60"
  //                     onClick={() => freeNft()}
  //                     disabled={loading || feeding}
  //                   >
  //                     FREE
  //                   </button>
  //                 )}
  //               </div>
  //             </div>
  //             <div className="w-full text-sm">
  //               <p className="w-full border-b border-[#605E5E] pb-2 mb-5">
  //                 Description
  //               </p>
  //               {nftItem?.description ? (
  //                 <p className="text-justify">{nftItem?.description}</p>
  //               ) : (
  //                 <>
  //                   <p className="mb-7">
  //                     Introducing Only1 Genesis NFTs and Creator Staking Pool -
  //                     where Defi meets social in only1. Each creator passed KYC
  //                     will be minted a Genesis-NFT, which they can associate
  //                     with perks and rewards and trade it in the marketplace.
  //                     Users on the platform can stake $LIKE tokens on individual
  //                     creators and earn based on the pool’s APY, which adjusts
  //                     according to the creator’s engagement.
  //                   </p>
  //                   <p>
  //                     Only1 believes that the future of NFTs will serve a key
  //                     function within the tech world and that utility NFTs will
  //                     inevitably spill into other verticals outside gaming. They
  //                     also think art and collectible NFTs will slowly be
  //                     replaced by utility NFTs, and hence have made them an
  //                     integral part of their concept and earning mechanisms.
  //                     There are two main methods that Only1 uses to prioritize
  //                     social engagement between fans and influencers. ‍
  //                   </p>
  //                 </>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <HatchEggModal
  //       nftItem={nftItem}
  //       success={() => {
  //         fetchNFTs().then((res) => {
  //           console.log(
  //             "SGDBDVCHFCBDFC CBF HEF EFD",
  //             res?.length,
  //             myNfts.length
  //           );
  //           setNftAnimate(myNfts[0]);
  //           toggleAnimationModal();
  //           // const nft__ = myNfts.find((n) => n.eggId === nftItem.id);
  //           // setNftItem(nft__);
  //         });
  //       }}
  //     />
  //     <FreeNFTModal nft={nftItem} />
  //     <AuctionModal nft={nftItem} />
  //     <ShareNFTModal nft={nftItem} />
  //     {Object.keys(nftAnimate).length > 0 && (
  //       <HatchEggAnimationModal nft={nftAnimate} />
  //     )}
  //   </>
  // );
};

NftModal.Layout = FragmentLayout;
export default NftModal;

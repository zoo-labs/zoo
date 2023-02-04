import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  useFeed,
  useFeedCount,
  useFetchMyNFTs,
  useGetAllAuctions,
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
import MarketItem from "../../../components/market/marketItem";
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
import { convertIpfsUrl } from "../../../entities/index";
import NewNFTCard from "components/NewNFTCard";

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const NftModal = ({}: AppProps & {
  Component: NextComponentType<NextPageContext> & {
    Layout: (title: string) => void;
  };
}) => {
  const { account, library } = useActiveWeb3React();
  const { myNfts, loading } = useSelector((state: any) => state.zoo);
  const toggleAnimationModal = useHatchEggAnimationModal();
  const toggleHatchEggModal = useHatchEggModal();
  const toggleAucionModal = useAuctionModal();
  const [nftItem, setNftItem] = useState<MyNFT | any>({});
  const [nftAnimate, setNftAnimate] = useState<MyNFT | any>({});
  const [feeding, setFeeding] = useState(false);
  const [creator, setCreator] = useState("");
  const toggleFreeNFTModal = useFreeNftModal();
  const { allAuctions } = useSelector((state: any) => state.zoo);
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

  const getAllAuctions = useGetAllAuctions();

  const [activeItem, setActiveItem] = useState({});


  useEffect(() => {
    getAllAuctions();
  }, [library]);

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

  const auction = () => toggleAucionModal();

  useEffect(() => {
    if (id) {
      const nft = myNfts.find((nft: MyNFT) => String(nft?.id) === String(id));
      if (nft) {
        setNftItem(nft);
      }
    }
  }, [id, myNfts]);

  console.log("the_chosen_nftIte", nftItem);

  return (
    <ModalLayout bg="bg-black" arrowBg="bg-dark-900">
      <div className="px-6 pb-16 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto">
        {/* <div className="flex w-full mb-20">
          <div className="w-1/2 p-20 mt-20">
            <div className=" bg-black border border-33 rounded-[14px] py-5 px-10">
              <div className=" showcase min-h-[564px] flex items-center justify-center relative">
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
                      glb={nftItem?.glb_animation_url}
                      usdz={nftItem?.usdz_animation_url}
                    ></ModelViewer>
                  </div>
                )}
                <div className="absolute bottom-0 z-20 flex items-center justify-center w-full gap-3 right">
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
            </div>
          </div>
          <div className="flex flex-col w-1/2 mb-5 space-x-12 space-y-12 lg:flex-row lg:items-start py-9 ">
            
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row md:items-center gap-24 mb-[91px] mt-20 py-20 px-28 bg-product-view lg:max-w-7xl lg:mx-auto">
          <div className="bg-black border border-33 rounded-[14px] py-5 px-10">
            <div className="showcase h-[351px] md:h-[450px] flex items-center justify-center relative">
              {nftItem?.kind === 0 || nftItem?.kind === 2 ? (
                <video
                  autoPlay
                  loop
                  src={convertIpfsUrl(nftItem?.animation_url)}
                  width={300}
                  height={350}
                  className="max-h-[350px] md:max-h-[450px]"
                />
              ) : (
                <div className="h-[350px] w-full">
                  <ModelViewer
                    // zoom="35deg"
                    glb={nftItem?.glb_animation_url}
                    usdz={nftItem?.usdz_animation_url}
                  ></ModelViewer>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-6 mt-2 w-80">
              {/* <p>Allow Offers</p> */}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-semibold text-[44px] leading-[3rem] lg:leading-4 mb-[26px]">
              {nftItem?.name || "--"}
            </h1>

            {/* <div className="flex mt-4 mb-8">
              <div className="py-2 px-3 text-sm bg-[#333333] font-bold rounded-lg mr-4 w-44 flex items-center justify-between">
                <div>
                  <p className="text-[#7D7D7D] text-sm ">Collateral Value</p>
                  <p className="text-lg text-white">$8,200</p>
                </div>
                <Image
                  src="/icons/rounded-add.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="py-2 px-3 text-sm bg-[#333333] font-bold rounded-lg mr-4 w-44 flex items-center justify-between">
                <div>
                  <p className="text-[#7D7D7D] text-sm ">Total Value</p>
                  <p className="text-lg text-white">$11,200</p>
                </div>
                <Image
                  src="/icons/rounded-add.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div> */}

            <p className="mb-0.5 text-sm font-medium">DESCRIPTIONS</p>
            <div className="w-full h-px mb-2 bg-white" />
            <p className="mb-8 text-sm">{nftItem?.description || "--"}</p>
            <div className=" mb-[22px] w-full">
              <div className="grid w-full h-auto grid-cols-2 gap-4 rounded-lg lg:w-full max-h-fit ">
                {nftItem?.kind === 0 || nftItem?.kind === 2 ? (
                  <button
                    className="w-full p-4 mb-4 mr-2 text-sm font-normal text-center text-white rounded-lg cursor-pointer bg-blue disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => hatchEgg()}
                    disabled={loading || feeding}
                  >
                    Hatch
                  </button>
                ) : (
                  <>
                    <button
                      className="w-full p-4 mb-4 mr-2 text-sm font-normal text-center text-white rounded-lg cursor-pointer bg-blue disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => feed()}
                      disabled={loading || feeding}
                    >
                      Feed
                    </button>
                    {nftItem?.stage === 2 && (
                      <Link href={`/wallet/${nftItem?.id}/breed`} passHref>
                        <button
                          className="w-full p-4 mb-4 mr-2 text-sm font-normal text-center text-white border border-gray-500 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={loading || feeding}
                        >
                          Breed
                        </button>
                      </Link>
                    )}
                  </>
                )}

                <button
                  className="w-full p-4 mb-4 mr-2 text-sm font-normal text-center text-white rounded-lg cursor-pointer bg-blue disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => auction()}
                  disabled={loading || feeding}
                >
                  Auction
                </button>
                {nftItem && (nftItem.kind === 1 || nftItem.kind === 3) && (
                  <button
                    className="w-full p-4 mb-4 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-blue disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => freeNft()}
                    disabled={loading || feeding}
                  >
                    Free
                  </button>
                )}
              </div>
              <button className="w-full p-4 border border-gray-500 rounded-lg ">
                Sell
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
              href={nftItem?.tokenUri}
              target="_blank"
              rel="noreferrer"
              className="flex items-center px-3 pb-3 text-lg cursor-pointer font-base"
            >
              <p className="mr-1">Metadata</p>
              <Image
                src="/icons/link-white.svg"
                alt=""
                width={11}
                height={11}
              />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 mb-2.5 md:mb-4">
            <div className="bg-33 p-3.5 rounded">
              <p className="text-2xl font-bold text-[#7D7D7D]">Generations</p>
              <p className="text-lg font-bold text-white">
                {[0, 1].includes(nftItem?.kind) ? "Genesis" : "Hybrid"}
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
              <p className="text-lg font-bold text-white">
                {nftItem?.reservePrice}
              </p>
            </div>
            <div className="bg-33 p-3.5 rounded">
              <p className="text-2xl font-bold text-[#7D7D7D]">
                Multiplier APY
              </p>
              <p className="text-lg font-bold text-white">22%</p>
            </div>
            <div className="bg-33 p-3.5 rounded">
              <p className="text-2xl font-bold text-[#7D7D7D]">Mint Possible</p>
              <p className="text-lg font-bold text-white">
                {nftItem?.kind === 0 ? "YES" : "NO"}
              </p>
            </div>
            <div className="bg-33 p-3.5 rounded">
              <p className="text-2xl font-bold text-[#7D7D7D]">nftItem</p>
              <p className="text-lg font-bold text-white">
                {[0, 2].includes(nftItem?.kind) ? "MP4" : "3D, USDZ, GLB"}
              </p>
            </div>
            <div className="bg-33 p-3.5 rounded">
              <p className="text-2xl font-bold text-[#7D7D7D]">Maturity</p>
              <p className="text-lg font-bold text-white">
                {[0, 2].includes(nftItem?.kind)
                  ? "Baby"
                  : nftItem?.attributes && nftItem?.attributes[1]?.value}
              </p>
            </div>
            <div className="bg-33 p-3.5 rounded">
              <p className="text-2xl font-bold text-[#7D7D7D]">
                {nftItem?.attributes && nftItem?.attributes[0]?.trait_type}
              </p>
              <p className="text-lg font-bold text-white">
                {nftItem?.attributes && nftItem?.attributes[0]?.value}
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
                          placeBid={() => (
                            setActiveItem(datum), console.log("")
                          )}
                        />
                      </div>
                    );
                  })
              ) : (
                <div className="w-full py-16 text-center">No auctions</div>
              )}
            </div>
          </div>
          {/* <ShareNFTModal nft={nftItem} />
          <NFTExpandedModal nft={nftItem} /> */}
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
          });
        }}
      />
      <FreeNFTModal nft={nftItem} />
      <AuctionModal nft={nftItem} />
      <ShareNFTModal nft={nftItem} />
      {Object.keys(nftAnimate).length > 0 && (
        <HatchEggAnimationModal nft={nftAnimate} />
      )}
    </ModalLayout>
  );
};

NftModal.Layout = FragmentLayout;
export default NftModal;

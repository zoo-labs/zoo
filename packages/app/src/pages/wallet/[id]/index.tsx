import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useFeed, useFeedCount, useFetchMyNFTs } from "state/zoo/hooks";
import {
  useHatchEggModal,
  useAuctionModal,
  useFreeNftModal,
  useHatchEggAnimationModal,
} from "state/application/hooks";
import BidModalHeader from "components/ModalHeader/BidModalHeader";
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

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const NftModal = ({}: AppProps & {
  Component: NextComponentType<NextPageContext> & {
    Layout: (title: string) => void;
  };
}) => {
  const { myNfts, loading } = useSelector((state: any) => state.zoo);
  const toggleAnimationModal = useHatchEggAnimationModal();
  const toggleHatchEggModal = useHatchEggModal();
  const toggleAucionModal = useAuctionModal();
  const [nftItem, setNftItem] = useState<MyNFT | any>({});
  const [nftAnimate, setNftAnimate] = useState<MyNFT | any>({});
  const toggleFreeNFTModal = useFreeNftModal();
  const router = useRouter();
  const fetchNFTs = useFetchMyNFTs();
  const feedAnimal = useFeed();
  const feedCount = useFeedCount();
  const { id } = router.query;

  const feed = () => {
    const count = feedCount(+String(id));
    // if (lasttime i fed < Date.now()) {
    //    toggleFeeTimerModal(amount of times I fed * 24)
    // }
    feedAnimal(+String(id));
  };
  const hatchEgg = () => {
    toggleHatchEggModal();
  };

  const freeNft = () => {
    toggleFreeNFTModal();
  };

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

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
  const t = new Date(nftItem?.breed?.timestamp * 1000);
  const nt = t.setHours(t.getHours() + 24);
  const now = new Date();
  const breedCooldown = +nt - +now;
  console.log("BREED DIFFERENCE", breedCooldown, nftItem?.breed?.timestamp);

  return (
    <>
      <div className="flex flex-col px-5 mx-auto mt-40 lg:flex-row gap-11 lg:items-center lg:px-10 max-w-7xl">
        <div className="rounded-xl p-px h-full bg-view-gradient w-full lg:w-[40%]">
          <div className="bg-black rounded-xl h-[466px] w-full flex flex-col justify-center items-center">
            {nftItem?.kind === 0 || nftItem?.kind === 2 ? (
              <video
                autoPlay
                loop
                src={nftItem?.token_uri}
                width={300}
                height={350}
              />
            ) : (
              <div className="w-full h-full">
                <ModelViewer
                  glb={nftItem?.glb_animation_url}
                  usdz={nftItem?.usdz_animation_url}
                ></ModelViewer>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-xl p-px h-full bg-transparent px-5 py-3 w-full lg:w-[60%]">
          <div className="flex flex-col items-start text-white gap-9 mb-7">
            <div className="flex flex-wrap items-center w-full space-y-3 gap-x-4">
              <div className="w-full">
                <p className="font-semibold text-[52px]">{nftItem?.name}</p>
              </div>
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
              <div className="flex items-center gap-2">
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
              </div>
              <div className="flex items-center gap-2">
                <AccessAlarmRoundedIcon />
                <div>
                  <p className="text-sm font-medium">Birthday</p>
                  <p className="font-medium text-[10px]">
                    {moment(
                      new Date(nftItem?.timestamp * 1000),
                      "YYYYMMDD"
                    ).fromNow()}
                  </p>
                </div>
              </div>

              {(nftItem?.kind === 1 || nftItem?.kind === 3) && (
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/growing-up.png"
                    alt=""
                    height={26}
                    width={20}
                  />
                  <div>
                    <p className="text-sm font-medium">Age</p>
                    <p className="font-medium text-[10px]">
                      {nftItem?.stage === 0
                        ? "BABY"
                        : nftItem?.stage === 1
                        ? "TEENAGE"
                        : "ADULT"}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-full flex-col items-center gap-3 mb-2.5">
              <div className="w-full">
                <div className="flex flex-col w-full py-2 rounded-lg 5 md:flex-row md:items-center bg-dark-400 ">
                  {nftItem?.kind === 0 || nftItem?.kind === 2 ? (
                    <button
                      className="w-1/4 p-2 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-leader-board disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => hatchEgg()}
                      disabled={loading}
                    >
                      HATCH
                    </button>
                  ) : (
                    <>
                      <button
                        className="w-1/4 p-2 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-leader-board disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={() => feed()}
                        disabled={loading}
                      >
                        FEED
                      </button>
                      {nftItem?.stage === 2 && (
                        <Link href={`/wallet/${nftItem?.id}/breed`} passHref>
                          <button
                            className="w-1/4 p-2 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-nft-gradient disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={loading}
                          >
                            BREED
                          </button>
                        </Link>
                      )}
                    </>
                  )}

                  <button
                    className="w-1/4 p-2 mr-2 text-sm font-bold text-center text-white rounded-lg cursor-pointer bg-auction-gradient disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => auction()}
                    disabled={loading}
                  >
                    AUCTION
                  </button>
                  {nftItem && (nftItem.kind === 1 || nftItem.kind === 3) && (
                    <button
                      className="w-1/4 p-2 mr-2 text-sm font-bold text-center text-white border rounded-lg cursor-pointer border-white-30 bg-white-10 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => freeNft()}
                      disabled={loading}
                    >
                      FREE
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full text-sm">
                <p className="w-full border-b border-[#605E5E] pb-2 mb-5">
                  Description
                </p>
                {nftItem?.description ? (
                  <p className="text-justify">{nftItem?.description}</p>
                ) : (
                  <>
                    <p className="mb-7">
                      Introducing Only1 Genesis NFTs and Creator Staking Pool -
                      where Defi meets social in only1. Each creator passed KYC
                      will be minted a Genesis-NFT, which they can associate
                      with perks and rewards and trade it in the marketplace.
                      Users on the platform can stake $LIKE tokens on individual
                      creators and earn based on the pool’s APY, which adjusts
                      according to the creator’s engagement.
                    </p>
                    <p>
                      Only1 believes that the future of NFTs will serve a key
                      function within the tech world and that utility NFTs will
                      inevitably spill into other verticals outside gaming. They
                      also think art and collectible NFTs will slowly be
                      replaced by utility NFTs, and hence have made them an
                      integral part of their concept and earning mechanisms.
                      There are two main methods that Only1 uses to prioritize
                      social engagement between fans and influencers. ‍
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HatchEggModal
        nftItem={nftItem}
        success={() => {
          fetchNFTs().then((res) => {
            console.log(
              "SGDBDVCHFCBDFC CBF HEF EFD",
              res?.length,
              myNfts.length
            );
            setNftAnimate(myNfts[0]);
            toggleAnimationModal();
            // const nft__ = myNfts.find((n) => n.eggId === nftItem.id);
            // setNftItem(nft__);
          });
        }}
      />
      <FreeNFTModal nft={nftItem} />
      <AuctionModal nft={nftItem} />
      {Object.keys(nftAnimate).length > 0 && (
        <HatchEggAnimationModal nft={nftAnimate} />
      )}
    </>
  );
};

NftModal.Layout = ModalLayout;
export default NftModal;

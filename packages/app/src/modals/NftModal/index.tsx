import React, { useEffect, useState } from "react";
import { ApplicationModal } from "state/application/actions";
import { useMyNftModalToggle, useModalOpen } from "state/application/hooks";
import Modal from "components/Modal";
import BidModalHeader from "components/ModalHeader/BidModalHeader";
import Image from "next/image";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import dynamic from "next/dynamic";
import { MyNFT } from "state/zoo/types";
import moment from "moment";
import { AvailableEgg } from "types";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

interface NftModalProps {
  nftItem: MyNFT;
  hatchEgg: () => void;
  feed: (id: number) => void;
  breed: () => void;
  auction: () => void;
}

const NftModal: React.FC<NftModalProps> = ({
  nftItem,
  hatchEgg,
  feed,
  breed,
  auction,
}) => {
  const myNftModal = useModalOpen(ApplicationModal.MY_NFT);
  const toggleNftModal = useMyNftModalToggle();
  const mount = async () => {};

  console.log("the_chosen_nftItem", nftItem);
  return (
    <>
      <Modal
        isOpen={myNftModal}
        onDismiss={() => null}
        maxWidth={1240}
        minHeight={70}
        scrollable
      >
        <BidModalHeader
          onBack={() => toggleNftModal()}
          className="absolute w-full p-6 "
        />
        <div className="flex flex-col px-5 mx-auto mt-20 lg:flex-row gap-11 lg:items-center lg:px-10 max-w-7xl">
          <div className="rounded-xl p-px h-full bg-view-gradient w-full lg:w-[40%]">
            <div className="bg-black rounded-xl min-h-[466px] h-full w-full px-12 py-12 flex flex-col justify-center items-center">
              {nftItem.kind === 0 ? (
                <video
                  autoPlay
                  loop
                  src={nftItem.token_uri}
                  width={300}
                  height={350}
                />
              ) : (
                <div className="h-[350px] w-[300px]">
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
                  <Image
                    src="/icons/status.svg"
                    alt=""
                    height={26}
                    width={20}
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {nftItem?.attributes[0]?.trait_type}
                    </p>
                    <p className="font-medium text-[10px]">
                      {nftItem?.attributes[0]?.value}
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
                      {nftItem?.attributes[1]?.trait_type}
                    </p>
                    <p className="font-medium text-[10px]">
                      {nftItem?.attributes[1]?.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/react.svg" alt="" height={26} width={20} />
                  <div>
                    <p className="text-sm font-medium">
                      {nftItem?.attributes[2]?.trait_type}
                    </p>
                    <p className="font-medium text-[10px]">
                      {nftItem?.attributes[2]?.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Image src="/icons/react.svg" alt="" height={26} width={20} /> */}
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
                {/* <div className="flex items-center gap-2">
                  <Image src="/icons/shape.svg" alt="" height={26} width={20} />
                  <div>
                    <p className="text-sm font-medium">Size</p>
                    <p className="font-medium text-[10px]">6.6 - 10.5 Feet</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/habitat.svg"
                    alt=""
                    height={26}
                    width={20}
                  />
                  <div>
                    <p className="text-sm font-medium">Habitats</p>
                    <p className="font-medium text-[10px]">Tropical Forests</p>
                  </div>
                </div> */}
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
              </div>
              <div className="flex w-full flex-col items-center gap-3 mb-2.5">
                <div className="w-full">
                  <div className="flex flex-col w-full py-2 rounded-lg 5 md:flex-row md:items-center bg-dark-400 ">
                    {nftItem?.kind === 0 ? (
                      <button
                        className="w-1/4 p-2 mr-2 text-sm font-bold text-center text-black bg-white rounded-full cursor-pointer opacity-30 bg-c-grey-200"
                        onClick={() => hatchEgg()}
                      >
                        HATCH
                      </button>
                    ) : (
                      <>
                        <button
                          className="w-1/4 p-2 mr-2 text-sm font-bold text-center text-black bg-white rounded-full cursor-pointer opacity-30 bg-c-grey-200"
                          onClick={() => feed(nftItem?.id)}
                        >
                          FEED
                        </button>
                        {nftItem.stage === 2 && (
                          <button
                            className="w-1/4 p-2 mr-2 text-sm font-bold text-center text-black bg-white rounded-full cursor-pointer opacity-30 bg-c-grey-200"
                            onClick={() => breed()}
                          >
                            BREED
                          </button>
                        )}
                      </>
                    )}

                    <button
                      className="w-1/4 p-2 mr-2 text-sm font-bold text-center text-black bg-white rounded-full cursor-pointer opacity-30 bg-c-grey-200"
                      onClick={() => auction()}
                    >
                      AUCTION
                    </button>
                  </div>
                </div>
                <div className="w-full text-sm">
                  <p className="w-full border-b border-[#605E5E] pb-2 mb-5">
                    Description
                  </p>
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
                </div>
                {/* <button
          className={`py-3.5 w-full bg-[#2703F8] rounded-lg disabled:cursor-not-allowed ${
            loading && "opacity-30"
          }`}
          disabled={loading || balanceCheck()}
          onClick={() => handleBuyEgg(id, 1)}
        >
          {loading
            ? "Loading..."
            : balanceCheck()
            ? "Insuficient balance"
            : "Buy Now"}
        </button> */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NftModal;

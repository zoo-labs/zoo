import React, { useRef, useEffect, useState } from "react";
import { ChainId, Currency, NATIVE, SUSHI_ADDRESS } from "@zoolabs/sdk";
import { numberWithCommas } from "functions";
import Image from "next/image";
import Link from "next/link";
import ComingSoon from "components/ComingSoon";
import { useSelector } from "react-redux";
import { AppState } from "state";

import TransactionHistory from "./TransactionHistorySection";
import { handleFunds } from "utils/handleFunds";
import { useBuyZoo, useFeed } from "state/zoo/hooks";

import { useLingui } from "@lingui/react";
import Web3Status from "../../components/Web3Status";
import { useETHBalances } from "../../state/wallet/hooks";

import { fadeInOnScroll } from "animation";
import { useActiveWeb3React } from "hooks";
import TransactionHistorySection from "./TransactionHistorySection";
import dynamic from "next/dynamic";
import {
  useAuctionModal,
  useHatchEggModal,
  useMyNftModalToggle,
  useHatchEggAnimationModal,
} from "state/application/hooks";
import HatchEggModal from "modals/HatchEggModal";
import NftModal from "modals/NftModal";
import { MyNFT } from "state/zoo/types";
import AssetModal from "marketplace/AssetModal";
import AuctionModal from "modals/Auction";
import HatchEggAnimationModal from "modals/HatchEggModal/Animation";
import { AvailableEgg } from "types";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});
const MyWalletSection = ({ myNfts, nftTransfers, fetchNfts }) => {
  const toggleHatchEggModal = useHatchEggModal();
  const toggleAnimationModal = useHatchEggAnimationModal();
  const toggleAucionModal = useAuctionModal();

  const [nftItem, setNftItem] = useState<MyNFT>();
  const toggleNftModal = useMyNftModalToggle();
  const feedAnimal = useFeed();

  console.log("SOME_KINDOF_ITEM", nftItem);

  return (
    <div>
      <div className="py-12">
        <h1 className="text-3xl text-center lg:text-5xl ">My Nfts</h1>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          <div className="flex items-center justify-center">
            {myNfts.map((nft: MyNFT, index) => {
              const { kind, name, id, dropId, stage, token_uri } = nft;
              console.log("nftttt", nft);
              return (
                <div
                  key={index}
                  onClick={() => {
                    setNftItem(nft);
                    toggleNftModal();
                  }}
                  className="h-[450px] flex flex-col items-center"
                >
                  {kind === 0 ? (
                    <>
                      <video
                        autoPlay
                        loop
                        src={token_uri}
                        width={300}
                        height={350}
                      />
                    </>
                  ) : (
                    <div className="h-[450px] w-[300px]">
                      <ModelViewer
                        glb={nft?.glb_animation_url}
                        usdz={nft?.usdz_animation_url}
                      ></ModelViewer>
                    </div>
                  )}
                  <p className="font-semibold">{name?.toUpperCase()}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="py-12">
        <TransactionHistorySection nftTransfers={nftTransfers} />
      </div>
      <HatchEggAnimationModal />
      {nftItem && (
        <>
          <HatchEggModal
            nftItem={nftItem}
            success={() => {
              fetchNfts().then((res) => {
                toggleAnimationModal();
                const nft__ = myNfts.find((n) => n.eggId === nftItem.id);
                setNftItem(nft__);
              });
            }}
          />
          <NftModal
            nftItem={nftItem}
            hatchEgg={() => {
              toggleHatchEggModal();
            }}
            feed={(id) => feedAnimal(id)}
            breed={() => console.log("breeding")}
            auction={() => toggleAucionModal()}
          />
          <AuctionModal nft={nftItem} />
        </>
      )}
    </div>
  );
};

export default MyWalletSection;

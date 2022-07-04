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
} from "state/application/hooks";
import HatchEggModal from "modals/HatchEggModal";
import NftModal from "modals/NftModal";
import { MyNFT } from "state/zoo/types";
import AssetModal from "marketplace/AssetModal";
import AuctionModal from "modals/Auction";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});
const MyWalletSection = ({ myNfts, nftTransfers, fetchNfts }) => {
  const toggleHatchEggModal = useHatchEggModal();
  const toggleAucionModal = useAuctionModal();

  const [nftItem, setNftItem] = useState<MyNFT>();
  const toggleNftModal = useMyNftModalToggle();
  const feedAnimal = useFeed();

  return (
    <div>
      <div className="py-12">
        <h1 className="text-3xl text-center lg:text-5xl ">My Nfts</h1>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          <div className="flex items-center justify-center">
            {myNfts.map((nft: MyNFT, index) => {
              const { kind, name, id, dropId, stage } = nft;
              console.log("nftttt", nft);
              return (
                <div
                  key={index}
                  onClick={() => {
                    setNftItem(nft);
                    toggleNftModal();
                  }}
                  className="flex flex-col items-center"
                >
                  {kind === 0 ? (
                    <Image
                      src="/img/egg.png"
                      width={200}
                      height={200}
                      objectFit="contain"
                      alt=""
                    />
                  ) : (
                    <div className="h-[350px] w-[300px]">
                      <ModelViewer
                        glb={`/models/Elephant/${
                          stage === 0
                            ? "ELEPHANT_BABY"
                            : stage === 1
                            ? "ELEPHANT_TEEN"
                            : "ELEPHANT_ADULT"
                        }.glb`}
                        usdz={`/models/Elephant/${
                          stage === 0
                            ? "ELEPHANT_BABY"
                            : stage === 1
                            ? "ELEPHANT_TEEN"
                            : "ELEPHANT_ADULT"
                        }.usdz`}
                      ></ModelViewer>
                    </div>
                  )}
                  <p>{name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="py-12">
        <TransactionHistorySection nftTransfers={nftTransfers} />
      </div>
      {nftItem && (
        <>
          <HatchEggModal nftItem={nftItem} success={() => fetchNfts()} />
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

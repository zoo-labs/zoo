import React, { useRef, useEffect, useState, useCallback } from "react";
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
import { useRouter } from "next/router";
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
import WalletItem from "components/wallet/WalletItem";

const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});
const MyWalletSection = ({ myNfts, nftTransfers, fetchNfts }) => {
  const toggleHatchEggModal = useHatchEggModal();
  const toggleAnimationModal = useHatchEggAnimationModal();
  const toggleAucionModal = useAuctionModal();

  const [nftItem, setNftItem] = useState<MyNFT>();
  const [category, setCategory] = useState<number>(0);
  const [filteredNfts, setFilteredNFTs] = useState<MyNFT[]>([]);
  const toggleNftModal = useMyNftModalToggle();
  const feedAnimal = useFeed();
  const route = useRouter();
  console.log("SOME_KINDOF_ITEM", nftItem);

  const filterData = useCallback(
    (index) => {
      setCategory(index);
      switch (index) {
        case 0:
          setFilteredNFTs(myNfts);
          break;
        case 1:
          setFilteredNFTs(
            myNfts.filter((nft) => nft?.kind === 0 || nft?.kind === 2)
          );
          break;
        case 2:
          setFilteredNFTs(myNfts.filter((nft) => nft?.kind === 1));
          break;
        case 3:
          setFilteredNFTs(myNfts.filter((nft) => nft?.kind === 2));
          break;
        default:
          setFilteredNFTs(myNfts);
          break;
      }
    },
    [myNfts]
  );

  useEffect(() => {
    filterData(0);
  }, [filterData, myNfts]);
  // console.log("SOME_KINDOF_ITEM_TOO", myNfts);

  return (
    <div>
      <div className="py-12">
        <h1 className="mb-8 text-3xl text-center lg:text-5xl">My Nfts</h1>

        {/* Tab Navbar */}
        <div className="relative flex justify-center mb-8">
          <div
            className="rounded-xl"
            style={{
              background: "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)",
              padding: 2,
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-black rounded-xl">
              {["All Items", "Eggs", "Animals"].map((value, index) => {
                const active = category === index;
                return (
                  <a
                    onClick={() => {
                      filterData(index);
                    }}
                    className={`text-white text-sm font-bold py-1 px-4 cursor-pointer w-full h-full flex items-center justify-center ${
                      index !== 2 && "border-r border-blue whitespace-nowrap"
                    } ${
                      index === 0
                        ? "rounded-l-xl"
                        : index === 2 && "rounded-r-xl"
                    }`}
                    style={{
                      background: active
                        ? "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)"
                        : "transparent",
                    }}
                    key={index}
                  >
                    {value}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center w-full gap-4 mb-4">
          <div className="flex flex-col md:flex-row items-start justify-center w-full gap-x-2.5 gap-y-8 flex-wrap">
            {filteredNfts.map((nft: MyNFT, index) => {
              const { kind, name, id, dropId, stage, token_uri } = nft;
              console.log("nftttt", nft);
              return (
                <WalletItem
                  key={id}
                  datum={nft}
                  onClick={() => route.push(`/wallet/${id}`)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="py-12">
        <TransactionHistorySection nftTransfers={nftTransfers} />
      </div>
      {/* <HatchEggAnimationModal /> */}
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
            breed={() => route.push(`/wallet/${nftItem.id}/breed`)}
            auction={() => toggleAucionModal()}
          />
        </>
      )}
    </div>
  );
};

export default MyWalletSection;

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
import { useBuyZoo } from "state/zoo/hooks";

import { useLingui } from "@lingui/react";
import Web3Status from "../../components/Web3Status";
import { useETHBalances } from "../../state/wallet/hooks";

import { fadeInOnScroll } from "animation";
import { useActiveWeb3React } from "hooks";
import TransactionHistorySection from "./TransactionHistorySection";
import dynamic from "next/dynamic";
import { useHatchEggModal } from "state/application/hooks";
import HatchEggModal from "modals/HatchEggModal";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});
const MyWalletSection = ({ myNfts, nftTransfers }) => {
  const toggleModal = useHatchEggModal();
  const [nftItem, setNftItem] = useState({ eggId: 1, dropId: 1, name: "" });
  return (
    <div>
      <div className="py-12">
        <h1 className="text-3xl text-center lg:text-5xl ">My Nfts </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          <div>
            {myNfts.map((nft) => {
              const { kind, name, eggId, id, dropId } = nft;
              console.log("nftttt", nft);
              return (
                <div
                  onClick={() => {
                    setNftItem({ dropId, eggId: id, name });
                    toggleModal();
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
                        glb={"/models/Elephant/ELEPHANT_ADULT.glb"}
                        usdz={"/models/Elephant/ELEPHANT_ADULT.usdz"}
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
      <HatchEggModal nftItem={nftItem} success={() => console.log("okay")} />
    </div>
  );
};

export default MyWalletSection;

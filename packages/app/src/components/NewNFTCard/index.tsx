import dynamic from "next/dynamic";
import { getAge } from "functions";
import Image from "next/image";
import React, { FC } from "react";
import moment from "moment";
import { MyNFT } from "state/zoo/types";

const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

interface IndexProps {
  nftItem: MyNFT;
  onClick: () => void;
}


const NewNFTCard: FC<IndexProps> = ({ nftItem, onClick}) => {
  console.log(nftItem, "rerere");
  return (
    <div>
      <div className="border border-t border-[#333333] rounded-xl p-4">
        <div
          className={`flex items-center w-12 h-12 z-30 sticky ${
            nftItem?.attributes[0]?.value[0] == "E"
              ? "bg-[#333333] intials-backdrop-e"
              : "bg-[#FF592C] intials-backdrop "
          } rounded-full uppercase justify-center`}
        >
          <p className="text-3xl font-bold">
            {nftItem.attributes[0]?.value[0]}
          </p>
        </div>
        <div className="h-[250px] w-[250px]">
          {nftItem?.kind === 0 || nftItem?.kind === 2 ? (
            <video
              autoPlay
              loop
              src={nftItem?.token_uri}
              width={"100%"}
              height={350}
              className="rounded overflow-hidden max-h-[250px] object-cover"
            />
          ) : (
            <div className="h-[250px] w-[250px] bg-black">
              <ModelViewer
                glb={nftItem?.glb_animation_url}
                usdz={nftItem?.usdz_animation_url}
              ></ModelViewer>
            </div>
          )}
        </div>
        <p className="text-sm text-center">
          {moment(new Date(nftItem.timestamp * 1000), "YYYYMMDD").fromNow()}{" "}
          <span className="font-bold text-[#333333]">
            {getAge(nftItem.stage)}
          </span>
        </p>
        <p className="mt-1 font-bold text-center">
          {nftItem.name || "Egg"} {nftItem.kind === 0 ? "(Origin)" : ""}{" "}
          <span className="text-xs text-gray-500">({nftItem.id})</span>
        </p>
        <div className="flex justify-center items-center bg-[#333333] py-2 rounded-lg mt-4">
          <p className="w-6 h-6 bg-white rounded-full text-[#333333] text-[10px] font-semibold flex items-center justify-center">
            ZOO
          </p>
          <p className="ml-2 text-sm font-bold"></p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 cursor-pointer" onClick={onClick}>
        <span className="mr-2 text-lg">View Item</span>
        <Image src="/icons/link-white.svg" alt="" width={15} height={15} />
      </div>
    </div>
  );
};

export default NewNFTCard;

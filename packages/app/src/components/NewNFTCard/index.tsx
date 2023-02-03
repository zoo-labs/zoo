import ModelViewer from "components/ModelViewer";
import Image from "next/image";
import React from "react";

const NewNFTCard = ({ nftItem }) => {
  return (
    <div>
      <div className="border border-t border-[#333333] rounded-xl p-4">
        <div className="flex items-center w-12 h-12 intials-backdrop z-30 sticky bg-[#FF592C] rounded-full uppercase justify-center">
          <p className="text-3xl font-bold">R</p>
        </div>
        <div className="showcase h-[200px] flex items-center justify-center relative -mt-8">
          {nftItem?.kind === 0 || nftItem?.kind === 2 ? (
            <video
              autoPlay
              loop
              src={nftItem.animation_url}
              width={300}
              height={200}
              className="max-h-[200px]"
            />
          ) : (
            <div className="h-[200px] w-full">
              <ModelViewer
                glb={nftItem?.glb_animation_url}
                usdz={nftItem?.usdz_animation_url}
              ></ModelViewer>
            </div>
          )}
        </div>
        <p className="text-sm text-center">
          #1234 <span className="font-bold text-[#333333]">20/13</span>
        </p>
        <p className="mt-1 font-bold text-center">Baby Amur Leopard</p>
        <div className="flex justify-center items-center bg-[#333333] py-2 rounded-lg mt-4">
          <p className="w-6 h-6 bg-white rounded-full text-[#333333] text-[10px] font-semibold flex items-center justify-center">
            ZOO
          </p>
          <p className="ml-2 text-sm font-bold">220.4M</p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <span className="mr-2 text-lg">View Item</span>
        <Image src="/icons/link-white.svg" alt="" width={15} height={15} />
      </div>
    </div>
  );
};

export default NewNFTCard;

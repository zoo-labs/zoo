import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MyNFT } from "state/zoo/types";
import { Auction } from "types";
import moment from "moment";
import { abbreviateNumber } from "functions/abbreviateNumbers";
import { shortenAddress } from "functions";

const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

const CardNft = ({
  nft,
  showDetails = true,
  className,
  onNFTClick,
}: {
  nft: Auction;
  className: string;
  showDetails?: boolean;
  onNFTClick?: () => void;
}) => {
  return (
    <div
      className={`flex flex-col min-w-[300px] lg:min-w-[400px] min-h-[600px] justify-center items-center  ${className}`}
    >
      <div className="w-full h-full">
        <div className="min-h-[350px] h-full w-full borderGrad p-2">
          <div className="w-full h-full rounded-[0.225rem] flex flex-col justify-center items-center">
            {nft?.kind === 0 || nft?.kind === 2 ? (
              <video
                autoPlay
                loop
                src={nft.animation_url}
                width={300}
                height={350}
                onClick={onNFTClick}
              />
            ) : (
              <div className="h-full w-full">
                <ModelViewer
                  glb={nft?.glb_animation_url}
                  usdz={nft?.usdz_animation_url}
                  onClick={onNFTClick}
                ></ModelViewer>
              </div>
            )}
          </div>
        </div>
        {showDetails && (
          <>
            <div className="flex items-center justify-between w-full py-2 pr-2 mt-2">
              <div className="text-left">
                <h1 className="p-2 text-sm font-semibold text-white">
                  {nft?.name}
                </h1>
              </div>

              <div className="text-center ">
                <Link
                  href={{
                    pathname: "/marketplace/[animalNFT]",
                  }}
                  passHref
                >
                  <button className="text-xs  bg-transparent w-full border-solid border-[#06047a] hover:bg-[#06047a] transition ease-in-out border-2 p-2 hover:bg-gradient-to-r from-gray-700 via-gray-900 to-black">
                    {abbreviateNumber(nft?.reservePrice)} ZOO
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between h-[50px] py-2 px-2 w-full">
              <div className="flex text-center ">
                <span
                  className="dot p-2 mt-[10px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, #2517FF -61.88%, #15F195 131.19%)",
                  }}
                ></span>
                <h1 className="p-2 text-sm text-gray-600">
                  {nft?.tokenOwner ? shortenAddress(nft?.tokenOwner) : "-"}
                </h1>
              </div>

              <div className="text-center">
                <h1 className="text-sm font-black text-gray-300 uppercase">
                  {" "}
                  {moment(
                    new Date(new Date().getTime() + nft.duration * 1000),
                    "YYYYMMDD"
                  ).fromNow()}{" "}
                  {/* days Left */}
                </h1>
              </div>
            </div>

            <div className="h-[5spx] min-w-[250px] w-full p-2">
              <hr className="w-full" />
            </div>

            <div className="flex items-center justify-between  h-[50px] w-full">
              <div className="flex-1 text-left">
                <h1 className="p-2 text-xs text-gray-600 ">Highest Bid</h1>
              </div>

              <div className="text-center">
                <h1 className="p-2 text-sm font-semibold text-white">
                  {nft?.amount}M Zoo
                </h1>
              </div>

              <div className="flex-1 text-right">
                <h1 className="p-2 text-xs text-gray-600 ">
                  {nft?.attributes &&
                    nft?.attributes.filter(
                      (attr) => attr.trait_type === "Yields"
                    )[0].value}{" "}
                  Yields/Day
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardNft;

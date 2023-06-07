import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomLoader from "../CustomLoader";
import { useGetAvailableEggs } from "../../state/zoo/hooks";
import { useGif } from "../../context/GifContext";
import { useZooKeeper } from "../../hooks";

interface BuyEggSectionProps {}

const BuyEggSection: FC<BuyEggSectionProps> = ({}) => {
  const { state } = useGif();
  const { gifMode } = state;
  const { availableEggs } = useSelector((state: any) => state.zoo);
  const getAvailableEggs = useGetAvailableEggs();
  const zookeeper = useZooKeeper();

  const [isLoadingEggs, setIsLoadingEggs] = useState(false);

  useEffect(() => {
    if (zookeeper) {
      getAvailableEggs(setIsLoadingEggs);
    }
  }, [getAvailableEggs, zookeeper]);
  return (
    <div>
      <div className="px-6 py-10 md:py-20 mx-auto max-w-5xl 2xl:max-w-6xl">
        <h1 className="font-bold text-3xl md:text-[44px] leading-[3rem] lg:leading-4 text-center ">

        <Link href="/drop">
       Buy Gen 0 NFTs.
       </Link>

        </h1>
        <p className="text-sm sm:text-base mt-4 mb-8 sm:mt-12 sm:mb-16 text-center">
          <Link href="/drop">
            Each Egg from the Gen 0 drop could mint 1,500+ NFT Animals.
          </Link>
        </p>

        {isLoadingEggs ? (
          <CustomLoader />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableEggs.map((data: any) => {
              return (
                <div
                  className="w-full flex flex-col items-center mb-4 AnimalFamily__nfts bg-black rounded-md pb-4"
                  key={data.id}
                >
                  <div className="flex flex-col items-center w-full h-[300px] AnimalFamily__image">
                    <div className="p-px mb-2.5 overflow-hidden h-full w-full">
                      <div className="overflow-hidden bg-black rounded-md h-full w-full">
                        <video
                          autoPlay
                          loop={true}
                          playsInline={true}
                          muted
                          className="overflow-hidden rounded object-cover object-center max-h-full w-full"
                        >
                          <source src={data.animation_url}></source>
                        </video>
                      </div>
                    </div>
                  </div>
                  <div className="pr-4 w-full text-center flex justify-end">
                    <Link href={`/market/egg/${data.id}`} passHref legacyBehavior>
                      <button className="outline-none rounded-full bg-33 w-12 h-12 flex items-center justify-center ">
                          <Image
                            src="/icons/forward-arrow.svg"
                            width={24}
                            height={24}
                            alt=""
                          />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyEggSection;

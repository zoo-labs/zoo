import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomLoader from "../CustomLoader";
import { useGetAvailableEggs } from "../../state/zoo/hooks";
import { useGif } from "../../context/GifContext";
import { useZooKeeper } from "../../hooks";
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});
interface BuyEggSectionProps {}

const BuyEggSection: FC<BuyEggSectionProps> = ({}) => {
  const { state } = useGif();
  const { gifMode } = state;
  const { availableEggs } = useSelector((state: any) => state.zoo);
  const getAvailableEggs = useGetAvailableEggs();
  const zookeeper = useZooKeeper();

  const [isLoadingEggs, setIsLoadingEggs] = useState(false);
  const eggs = [
    {
      title: "Endangerd Egg",
      href: "/",
      usdz: "/models/Eggs/origin_endangered_egg_2.usdz",
      glb: "/models/Eggs/origin_endangered_egg_2.glb",
    },
    
    {
      title: "Sublime Egg",
      href: "/",
      usdz: "/models/Eggs/origin_sublime_egg.usdz",
      glb: "/models/Eggs/origin_sublime_egg.glb",
    },
    {
      title: "Rare Egg",
      href: "/",
      usdz: "/models/Eggs/origin_rare_egg.usdz",
      glb: "/models/Eggs/origin_rare_egg.glb",
    },
  ]
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
       {"Buy Origin Egg NFTs."}
       </Link>

        </h1>
        <p className="text-sm sm:text-base mt-4 mb-8 sm:mt-12 sm:mb-16 text-center">
          <Link href="/drop">
            {"Each Origin Egg can mint 1,500+ NFTs."}
          </Link>
        </p>

        <div className="flex max-md:flex-col items-center justify-center gap-8">
        {eggs.map((data, index) => (
          <div className="bg-black w-[220px] h-[288px] p-2 relative">
          <ModelViewer className='aspect-square'
          usdz={data.usdz}
          glb={data.glb}
        ></ModelViewer>
          <Link href={data.href} className="bg-[#333] rounded-full absolute bottom-2 right-2 p-[6px] w-[39px] h-[39px] text-center">
          <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8708 6.52246L22.5469 13.1985L15.8708 19.8746" stroke="white" stroke-width="1.31982" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.84943 13.1982H22.3599" stroke="white" stroke-width="1.31982" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </Link>
        </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default BuyEggSection;

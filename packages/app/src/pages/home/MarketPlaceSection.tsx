import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useActiveWeb3React } from "hooks";
import Web3Status from "../../components/Web3Status";

// animation
import { fadeInOnScroll } from "animation";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

const MarketPlaceSection = () => {
  const { account, chainId, library } = useActiveWeb3React();

  // const marketRef = useRef();

  // useEffect(() => {
  //   fadeInOnScroll(marketRef.current);
  // }, []);

  return (
    <section className="w-full mt-28">
      <div className="px-6 mx-auto pb-16 lg:pb-28 lg:pt-14 max-w-7xl text-center flex flex-col items-center">
        <p className="font-semibold text-6xl text-white mb-1">
          Join the ZOO family!
        </p>
        <p className="text-2xl text-butter-white mb-6 font-normal">
          Follow our social media
        </p>
        <div className="flex items-center gap-10">
          <Image src="/icons/twitter.svg" alt="" width={41} height={41} />
          <Image src="/icons/telegram.svg" alt="" width={41} height={41} />
          <Image src="/icons/instagram.svg" alt="" width={41} height={41} />
        </div>
      </div>
      <div className="w-full bg-[#0D0822]">
        <div className="flex flex-col items-start px-6 mx-auto pb-16 lg:py-8 lg:h-[438px] overflow-y-hidden lg:flex-row-reverse max-w-7xl">
          <div className="relative z-30 flex mb-8 basis-1/2">
            <video autoPlay loop={true} playsInline={true} muted>
              <source src="https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/phones_nhqvji.mov"></source>
            </video>
          </div>
          <div className="flex flex-col items-center lg:items-start lg:justify-center basis-1/2 lg:max-w-lg lg:mx-auto h-full">
            <h2 className="mb-8 text-3xl font-light text-center lg:text-4xl lg:text-left text-33">
              <span className="font-bold text-white">Download ZOO app</span> to
              track your NFT portfolio, APY, offers, and discover new drops.
            </h2>
            <div className="flex items-center gap-3 lg:items-start">
              <Link href="/coming-soon" passHref>
                <Image
                  src="/img/app-store.png"
                  alt=""
                  width={146}
                  height={47}
                />
              </Link>
              <Link href="/coming-soon" passHref>
                <Image
                  src="/img/google-play.png"
                  alt=""
                  width={146}
                  height={47}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPlaceSection;

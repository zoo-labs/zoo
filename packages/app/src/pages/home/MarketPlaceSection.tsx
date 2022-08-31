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
    <section className="MarketPlace bg-[#0D0822] mt-28">
      <div className="flex flex-col items-start px-6 mx-auto pb-16 lg:py-8 lg:h-[438px] overflow-y-hidden lg:flex-row-reverse max-w-7xl">
        <div className="relative z-30 flex mb-8 basis-1/2">
          <video autoPlay loop={true} playsInline={true} muted>
            <source src="https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/phones_nhqvji.mov"></source>
          </video>
        </div>
        <div className="flex flex-col items-center lg:items-start lg:justify-center basis-1/2 lg:max-w-lg lg:mx-auto h-full">
          <h2 className="mb-8 text-3xl font-light text-center lg:text-4xl lg:text-left">
            <span className="font-bold">Download ZOO app</span> to track your
            NFT portfolio, APY, offers, and discover new drops.
          </h2>
          <div className="flex items-center gap-3 lg:items-start">
            <Link href="/coming-soon" passHref>
              <Image src="/img/app-store.png" alt="" width={146} height={47} />
            </Link>
            <Link href="/coming-soon" passHref>
              <Image
                src="/img/google-play.png"
                alt=""
                width={146}
                height={47}
              />
            </Link>
            {/* {!account ? (
              <a>
                <Web3Status
                  title={i18n._(t`Connect Wallet`)}
                  className="px-5 py-3 text-sm font-bold text-white rounded-full bg-gradient-to-b from-purple to-blue bg-gradient-tr-purple-blue md:text-base md:px-6 md:py-4 lg:px-10"
                />
              </a>
            ) : (
              <a
                href="/market"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 text-sm font-bold text-black bg-white border border-gray-100 rounded-full md:text-base md:px-6 md:py-4 lg:px-10"
              >
                Marketplace
              </a>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPlaceSection;

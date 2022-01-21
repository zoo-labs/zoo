import React, {useRef, useEffect} from "react";
import Image from "next/image";
import { useActiveWeb3React } from "hooks";
import Web3Status from "../../components/Web3Status";

// animation
import { fadeInOnScroll } from "animation";

const MarketPlaceSection = () => {
  const { account, chainId, library } = useActiveWeb3React();

  const marketRef = useRef();

  useEffect(() => {
    fadeInOnScroll(marketRef.current);
  }, []);


  return (
    <section className="MarketPlace" ref={marketRef}>
      <div className="flex flex-col items-center px-6 py-28 mx-auto lg:flex-row max-w-7xl">
        <div className="flex mb-8 basis-1/2 relative z-30">
          <div>
            <Image src="/img/iphone-1.png" width={363} height={675} alt="" />
          </div>
          <div>
            <Image src="/img/iphone-2.png" width={363} height={675} alt="" />
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start basis-1/2 lg:max-w-lg lg:mx-auto">
          <h2 className="mb-8 text-3xl lg:text-5xl font-bold text-center lg:text-left">
            Buy, list and bid on our NFT marketplace.
          </h2>
          <div className="flex items-center lg:items-start gap-3">
            {!account ? (
              <a>
                <Web3Status
                  title="Connect Wallet"
                  className="px-5 py-3 text-sm text-white bg-gradient-to-b from-purple to-blue rounded-full font-bold bg-gradient-tr-purple-blue md:text-base md:px-6 md:py-4 lg:px-10"
                />
              </a>
            ) : (
              <a
                href="/market"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 text-sm text-black bg-white border font-bold border-gray-100 rounded-full md:text-base md:px-6 md:py-4 lg:px-10"
              >
                Marketplace
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPlaceSection;

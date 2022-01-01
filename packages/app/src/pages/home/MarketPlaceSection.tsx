import React from "react";
import Image from "next/image";
import { useActiveWeb3React } from "hooks";

const MarketPlaceSection = () => {
  const { account, chainId, library } = useActiveWeb3React();

  return (
    <section className="MarketPlace">
      <div className="flex flex-col items-center px-6 py-20 mx-auto lg:flex-row max-w-7xl">
        <div className="flex mb-8 basis-1/2">
          <div>
            <Image src="/img/iphone-1.png" width={363} height={675} alt="" />
          </div>
          <div>
            <Image src="/img/iphone-2.png" width={363} height={675} alt="" />
          </div>
        </div>
        <div className="flex flex-col items-center basis-1/2">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Buy, list and bid on our NFT marketplace.
          </h2>
          <div className="flex items-center gap-3">
            {!account ? (
              <a
                href="#"
                className="px-5 py-3 text-sm text-white rounded-full bg-blue md:text-base md:px-6 md:py-4 lg:px-10"
              >
                Connect Wallet
              </a>
            ) : (
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 text-sm text-white border border-gray-100 rounded-full md:text-base md:px-6 md:py-4 lg:px-10"
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

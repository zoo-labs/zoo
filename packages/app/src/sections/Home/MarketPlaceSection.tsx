import React from "react";
import Image from "next/image";

const MarketPlaceSection = () => {
  return (
    <section className="MarketPlace">
      <div className="flex flex-col lg:flex-row px-6 py-20 items-center max-w-7xl mx-auto">
        <div className="flex basis-1/2 mb-8">
          <div>
            <Image src="/img/iphone-1.png" width={363} height={675} alt="" />
          </div>
          <div>
            <Image src="/img/iphone-2.png" width={363} height={675} alt="" />
          </div>
        </div>
        <div className="flex flex-col items-center basis-1/2">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Buy, list and bid on our NFT marketplace.
          </h2>
          <div className="flex gap-3 items-center">
            <a
              href="#"
              className="bg-blue text-white text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full"
            >
              Connect Wallet
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="border border-gray-100 text-sm md:text-base text-white px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full"
            >
              Marketplace
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPlaceSection;

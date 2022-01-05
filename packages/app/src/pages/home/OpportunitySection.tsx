import React from "react";
import Image from "next/image";

import EndangeredSpecies from "components/EndangeredSpecies";

const OpportunitySection = () => {
  return (
    <section className="relative">
      <div className="px-6 py-16 lg:py-28">
        <h2 className="text-2xl md:text-2xl  lg:text-4xl text-center mb-16 font-semibold">
          Endless Yield Opportunity
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-center max-w-7xl px-6 mx-auto">
          <EndangeredSpecies />
          <div>
            <Image src="/img/life-cycle.png" width={824} height={805} alt="" />
          </div>
        </div>

        <div className="flex flex-col items-center max-w-7xl px-6 mx-auto py-20 lg:mt-20">
          <h2 className="text-2xl md:text-2xl lg:text-5xl text-center mb-6 md:mb-4 font-semibold">
            Fully Transparent Ecosystem
          </h2>
          <p className="max-w-3xl mx-auto text-center mb-6 md:mb-8 lg:text-xl">
            Each animal NFT uses blockchain technology to establish a verified
            and public proof of ownership. This establishes credibility for each
            NFT and its unchangeable nature.
          </p>
          <a
            href="https://dex.guru/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13-bsc"
            target="_blank"
            rel="noreferrer"
            className="border border-green text-green text-sm md:text-base font-bold px-8 py-3 md:px-6 lg:px-16 rounded-full"
          >
            Buy $ZOO
          </a>
        </div>
      </div>
    </section>
  );
};

export default OpportunitySection;

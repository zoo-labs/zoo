import React from "react";
import Image from "next/image";

const OpportunitySection = () => {
  return (
    <section className="relative">
      <div className="px-6 py-16 lg:py-28">
        <h2 className="text-2xl md:text-2xl  lg:text-4xl text-center mb-8 font-semibold">
          Endless Yield Opportunity
        </h2>
        {/* <div className="object-cover transform scale-150 absolute">
          <Image src="/img/word-animation.svg" width={1200} height={700} alt="" />
        </div> */}
        <div className="flex flex-col lg:flex-row justify-between items-center max-w-7xl px-6 mx-auto">
          <div>
            <Image
              src="/img/save-species.png"
              width={497}
              height={737}
              alt=""
            />
          </div>
          <div>
            <Image src="/img/life-cycle.png" width={824} height={805} alt="" />
          </div>
        </div>

        <div className="flex flex-col items-center max-w-7xl px-6 mx-auto py-20">
          <h2 className="text-2xl md:text-2xl lg:text-4xl text-center mb-6 md:mb-8 font-semibold">
            Fully Transparent Ecosystem
          </h2>
          <p className="max-w-3xl mx-auto text-center mb-6 md:mb-8 lg:text-xl">
            Each animal NFT uses blockchain technology to establish a verified
            and public proof of ownership. This establishes credibility for each
            NFT and its unchangeable nature.
          </p>
          <a
            href=""
            className="border border-blue text-sm md:text-base text-blue px-8 py-3 md:px-6 lg:px-16 rounded-full"
          >
            Buy $Zoo
          </a>
        </div>
      </div>
    </section>
  );
};

export default OpportunitySection;

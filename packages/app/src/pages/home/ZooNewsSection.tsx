import React from "react";
import Image from "next/image";
import { useActiveWeb3React } from "hooks";

const ZooNewsSection = () => {
  const { account, chainId, library } = useActiveWeb3React();

  return (
    <section className="ZooNews">
      <div className="flex flex-col items-center px-6 pb-20 mx-auto max-w-7xl">
        <div className="mb-6 text-center lg:mb-8">
          <h2 className="mb-6 text-3xl font-bold text-center lg:text-5xl">
            ZOO News
          </h2>
          <p className="max-w-2xl text-white text-opacity-70">
            Track your workouts, get better results, and be the best version of
            you. Less thinking, more lifting.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xl mx-auto lg:flex-row lg:items-stretch lg:max-w-5xl">
          <div className="overflow-hidden rounded-2xl lg:basis-1/2">
            <Image src="/img/story-image.png" width={565} height={516} alt="" />
          </div>
          <div className="flex flex-col justify-center px-4 py-8 -mt-4 lg:py-0 bg-blue rounded-b-2xl lg:rounded-2xl lg:-ml-1 lg:basis-1/2">
            <h2 className="mb-3 text-3xl font-bold">
              Stories From Our Community: Kohaku &amp; Moyo Shiro
            </h2>
            <p className="mb-4">
              How the ZOO foundation helped save over 100,000 acres of elephant
              habitat to date.{" "}
            </p>
            {!account && (
              <button className="w-1/2 px-5 py-3 text-sm text-white rounded-full ZooNews__btn md:text-base md:px-6 md:py-4 lg:px-10">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZooNewsSection;

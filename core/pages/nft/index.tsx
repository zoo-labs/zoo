import React, { useEffect } from "react";
import Image from "next/image";

import PopularNftsSection from "../../components/home/PopularNftsSection";

// animation
import { fadeInFromLeft, fadeInFromRight } from "animation";

const Nft = () => {
  const nftImageRef = React.useRef();
  const nftContentRef = React.useRef();

  useEffect(() => {
    fadeInFromLeft(nftImageRef.current);
    fadeInFromRight(nftContentRef.current);
  }, []);

  return (
    <div className="pt-16 pb-16 px-6 md:flex md:flex-col lg:max-w-7xl lg:mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div
          className="flex flex-col border border-blue px-4 py-6 rounded mb-4 lg:mb-0 lg:px-8"
          ref={nftImageRef}
        >
          <div style={{ minHeight: "299px" }}>
            <Image src="/img/egg.gif" width={300} height={300} alt="" />
          </div>
          <button className="bg-gradient-to-b from-purple to-blue text-white font-semibold text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full">
            Place bid
          </button>
        </div>
        <div ref={nftContentRef}>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Egg #4</h3>
            <p>
              Contains <span className="font-bold">1 of 16</span> Generation one
              Base Animals. To hatch or to hold…
            </p>
          </div>
          <div className="mb-8 border border-blue px-4 py-6 rounded">
            <p className="font-bold mb-2">Details</p>
            <div className="flex justify-between mb-2">
              <p>Transaction</p>
              <p className="text-purple">0x00000000…000000</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Token Id</p>
              <p>234345</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Hash</p>
              <p>4</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Token Standard</p>
              <p>ERC-721</p>
            </div>
          </div>

          <div className="details border border-blue rounded">
            <div className="px-4 pt-6 pb-2 ">
              <p className="font-bold mb-2">Proof of Authenticity</p>
              <div className="mb-2">
                <p className="text-lg font-bold">300,000 $ZOO</p>
              </div>

              <div className="flex justify-between mb-2">
                <p className="text-purple100">Token Standard</p>
                <Image
                  src="/img/link-arrow-right.svg"
                  width={16}
                  height={16}
                  alt=""
                />
              </div>
            </div>
            <div className="flex justify-between px-4 py-2 border-t border-blue">
              <p className="text-purple100">View on IPS</p>
              <Image
                src="/img/link-arrow-right.svg"
                width={16}
                height={16}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-20">
        <PopularNftsSection />
        <div className="text-center mt-12 text-xl">
          <a href="/animal-list" className="underline text-green ">
            View All
          </a>
        </div>
      </div>
    </div>
  );
};

export default Nft;

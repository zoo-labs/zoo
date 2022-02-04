import React, { useEffect } from "react";
import Image from "next/image";

// animation
import { fadeInOnScroll } from "../../animation";

const ZooNewsSection = () => {
  const zooRef = React.useRef();
  useEffect(() => {
    fadeInOnScroll(zooRef.current);
  }, []);
  return (
    <section className="ZooNews" ref={zooRef}>
      <div className="pt-16 pb-16 px-6 lg:max-w-7xl lg:mx-auto">
        <div
          className="flex items-center text-center flex-col"
          ref={zooRef}
        >
          <h1 className="text-4xl lg:text-5xl text-white font-bold mb-6 mt-20 lg:mt-12">
            ZOO News
          </h1>
          <p className="w-96 mb-20">
            Learn all about Zoo, our Nfts, and browse through our helpful
            guides.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xl lg:max-h-[494px] mx-auto lg:flex-row lg:items-stretch lg:max-w-5xl">
          <div className="overflow-hidden rounded-l-2xl lg:basis-1/2">
            <Image
              src="/img/blog-post-1.png"
              width={565}
              height={600}
              alt=""
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col justify-center w-full lg:basis-1/2 bg-deep-gray rounded-r-2xl lg:-ml-2 -mt-3 lg:-mt-0">
            <div className="max-w-sm mx-auto py-8 lg:py-0 px-4 lg:px-0">
              <p className="bg-blue text-white px-2 py-1 mb-6 inline-block text-xs font-bold uppercase rounded-sm">
                New
              </p>
              <h2 className="mb-3 text-2xl lg:text-3xl font-bold">
                Introducing - Zoo Labs: Wildlife Conservation Powered by DeFi
              </h2>
              <p className="mb-12">
                Zoo Labs, a new NFT-based P2E (Play-to-Earn) game that utilizes
                the $ZOO token in its ecosystem, is launching in Q1 of 2022 with
                the mission to aid...
              </p>
              <a
                className="bg-gradient-to-b from-purple to-blue text-white  text-sm md:text-base font-semibold px-8 py-3 md:px-6 lg:px-16 rounded-full"
                href="https://zoolabsofficial.medium.com/introducing-zoo-labs-wildlife-conservation-powered-by-defi-67eacef5a07"
                target="_blank"
                rel="noreferrer"
              >
                Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// px-4 py-4 -mt-4 lg:py-0 bg-black100 rounded-b-2xl lg:rounded-2xl lg:-ml-1

export default ZooNewsSection;

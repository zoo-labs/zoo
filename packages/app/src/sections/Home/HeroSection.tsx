import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="Hero">
      <div className="Hero__inner pt-32 pb-16 px-6 md:flex md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto lg:justify-between">
        <div className="Hero__content mb-6 md:mb-12 md:flex md:flex-col md:items-center md:text-center md:max-w-7xl lg:items-start lg:text-left lg:basis-1/2">
          <p className="uppercase text-green mb-2">Nfts made Fun.</p>
          <h1 className="font-bold text-4xl mb-3 lg:text-7xl lg:mb-6">
            Exotic animals for everyone.
          </h1>
          <p className="text-base lg:text-lg mb-6 text-white text-opacity-70 md:max-w-xl lg:text-left">
            Pet, play, feed, grow, and breed your very own animal NFT’s in our
            Sims-like metaverse to increase their value and earn greater
            rewards, all while contibuting to saving endangered animals. Your
            virtual ZOO does not imprison endangered animals, instead it
            supports real world organizations.
          </p>
          <div className="flex gap-3 items-center">
            <a
              href="#"
              className="bg-blue text-white text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full"
            >
              Download App
            </a>
            <a
              href="https://dex.guru/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13-bsc"
              target="_blank"
              rel="noreferrer"
              className="border border-gray-100 text-sm md:text-base text-white px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full"
            >
              Buy $ZOO
            </a>
          </div>
        </div>
        <div className="Hero__image max-w-md lg:max-w-lg lg:basis-1/2">
          <Image
            src="/img/amur-leopard.png"
            width={700}
            height={612}
            alt="leopard"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

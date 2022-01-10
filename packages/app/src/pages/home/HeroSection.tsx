import React from "react";
import Image from "next/image";

import { useBuyZoo } from "state/zoo/hooks";
import { useWeb3React } from "@web3-react/core";

const HeroSection = () => {
  const { account, library, chainId } = useWeb3React();
  const buyZoo = useBuyZoo();

  const handleFunds = () => {
    // if (userEthBalance?.toFixed(3) == 0)
    //   return console.log(`You do not have sufficient ${NETWORK_LABEL[chainId]} to get Zoo`);

    switch (chainId) {
      case 1338:
        buyZoo();
        break;
      case 1337:
        buyZoo();
        break;
      case 97:
        buyZoo();
        break;
      case 4:
        buyZoo();
        break;
      default:
        window.open(
          "https://pancakeswap.info/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13",
          "_blank"
        );
    }
  };
  return (
    <section className="Hero">
      <div className="Hero__inner pt-16 pb-16 px-6 md:flex md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto lg:justify-between">
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
              href="https://metamask.io/"
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-b from-purple to-blue text-white font-semibold text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full"
            >
              Download App
            </a>
            <div
              className="border border-gray-100 text-sm md:text-base font-semibold text-white px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full hover:cursor-pointer"
              onClick={() => handleFunds()}
            >
              Buy $ZOO
            </div>
          </div>
        </div>
        <div className="Hero__image max-w-md lg:max-w-xl lg:basis-1/2">
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

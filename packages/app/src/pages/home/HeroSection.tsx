import React, { useState } from "react";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { useBuyZoo } from "state/zoo/hooks";
import { useWeb3React } from "@web3-react/core";
import { useFaucet } from "hooks";
import { getZooBalance } from "state/zoo/actions";
import {handleFunds} from 'utils/handleFunds';


const HeroSection = () => {
  const { account, library, chainId } = useWeb3React();
  const buyZoo = useBuyZoo();
  const faucet = useFaucet();
  const dispatch = useDispatch();

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
              onClick={() => handleFunds(chainId, buyZoo)}
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

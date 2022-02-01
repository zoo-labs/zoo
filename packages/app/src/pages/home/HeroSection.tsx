import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// animation
import { fadeInFromLeft, fadeInOnScroll } from "animation";

import { useDispatch, useSelector } from "react-redux";
import { useBuyZoo } from "state/zoo/hooks";
import { useWeb3React } from "@web3-react/core";
import { useFaucet } from "hooks";
import { getZooBalance } from "state/zoo/actions";
import { handleFunds } from "utils/handleFunds";
import { useGif } from "context/GifContext";

const HeroSection = () => {
  const { account, library, chainId } = useWeb3React();
  const buyZoo = useBuyZoo();
  const faucet = useFaucet();

  const heroContent = useRef();
  const heroImage = useRef();

  const { state } = useGif();
  const { gifMode } = state;

  useEffect(() => {
    fadeInFromLeft(heroContent.current);
    fadeInOnScroll(heroImage.current);
  }, []);

  return (
    <section className="mt-24 Hero">
      <div
        className="px-6 pt-16 pb-16 Hero__inner md:flex md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto lg:justify-between"
        ref={heroContent}
      >
        <div className="mb-6 Hero__content md:mb-12 md:flex md:flex-col md:items-center md:text-center md:max-w-7xl lg:items-start lg:text-left lg:basis-1/2">
          <p className="mb-2 uppercase text-green">Nfts made Fun.</p>
          <h1 className="mb-3 text-4xl font-bold lg:text-7xl lg:mb-6">
            Exotic animals for everyone.
          </h1>
          <p className="mb-6 text-base text-white lg:text-lg text-opacity-70 md:max-w-xl lg:text-left">
            Pet, play, feed, grow, and breed your very own animal NFT’s in our
            Sims-like metaverse to increase their value and earn greater
            rewards, all while contibuting to saving endangered animals. Your
            virtual ZOO does not imprison endangered animals, instead it
            supports real world organizations.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="/#endless-opportunity"
              className="px-5 py-3 text-sm font-semibold text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 md:py-4 lg:px-10"
            >
              Learn More
            </a>
            <div
              className="px-5 py-3 text-sm font-semibold text-white border border-gray-100 rounded-full md:text-base md:px-6 md:py-4 lg:px-10 hover:cursor-pointer"
              onClick={() => handleFunds(chainId, buyZoo)}
            >
              Buy $ZOO
            </div>
          </div>
        </div>
        <div
          className="max-w-md Hero__image lg:max-w-xl lg:basis-1/2"
          ref={heroImage}
        >
          {gifMode === "gif" ? (
            <Image
              src="/gifs/zoo-tiger-gif.gif"
              width={700}
              height={612}
              alt="leopard"
            />
          ) : (
            <Image
              src="/img/amur-leopard.png"
              width={700}
              height={612}
              alt="leopard"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

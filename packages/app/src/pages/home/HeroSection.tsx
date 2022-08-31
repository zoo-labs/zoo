import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// animation
import { fadeInFromLeft, fadeInOnScroll } from "animation";
import Tiger from "../../../public/gifs/siberian-tiger.gif";

import { useDispatch, useSelector } from "react-redux";
import { useBuyZoo } from "state/zoo/hooks";
import { useActiveWeb3React, useFaucet } from "hooks";
import { getZooBalance } from "state/zoo/actions";
import { handleFunds } from "utils/handleFunds";
import { useGif } from "context/GifContext";
import { createRequire } from "module";

const HeroSection = () => {
  const { account, library, chainId } = useActiveWeb3React();
  const buyZoo = useBuyZoo();
  const faucet = useFaucet();

  // const heroContent = useRef();
  // const heroImage = useRef();

  const { state } = useGif();
  const { gifMode } = state;

  // useEffect(() => {
  //   fadeInFromLeft(heroContent.current);
  //   fadeInOnScroll(heroImage.current);
  // }, []);

  return (
    <div className=" Hero bg-zoo">
      <div className="min-h-[800px] px-6 pt-16 pb-16 Hero__inner flex items-center lg:max-w-7xl lg:mx-auto">
        <div className="mb-6 Hero__content md:mb-12 md:flex md:flex-col md:items-center md:text-center md:max-w-7xl lg:items-start lg:text-left lg:basis-1/2">
          <h1 className="mb-3 text-4xl font-bold lg:text-9xl lg:mb-6">
            Exotic Animals
          </h1>

          <div
            // onClick={() => handleFunds(chainId, buyZoo)}
            className="px-5 py-3 text-sm md:text-lg font-semibold text-white rounded-full bg-transparent border-2 border-white md:px-6 md:py-4 lg:px-10 hover:cursor-pointer"
          >
            Explore the Zoo
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

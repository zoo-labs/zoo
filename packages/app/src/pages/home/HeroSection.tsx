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
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const slides = [
    { title: " Exotic Animals", video: "/videoes/videoplayback.mp4" },
    { title: "Siberian Tiger", video: "/videoes/videoplayback.mp4" },
    { title: "Elephant", video: "/videoes/videoplayback.mp4" },
  ];

  return (
    <div className="flex items-center justify-center h-screen Hero bg-zoo">
      <div className="w-full m-0 overflow-hidden">
        <div
          className={`transition duration-1000 ease-in whitespace-nowrap -translate-x-[${
            activeSlideIndex * 100
          }%]`}
        >
          {slides.map((slide, index) => (
            <div
              className="inline-block w-full "
              key={index}
              style={{ backgroundColor: slide.title }}
            >
              <div className="relative flex items-center justify-center w-full h-full mx-auto">
                <div className="absolute z-50 w-full px-4 py-4 mx-auto max-w-7xl">
                  <div className="px-4 py-4 mx-auto mb-6 max-w-1/3 md:mb-12 md:flex md:flex-col md:items-center md:text-center lg:items-start lg:text-left lg:basis-1/2">
                    <h1 className="mb-3 text-4xl font-bold break-all lg:text-9xl lg:mb-6 ">
                      {slide.title}
                    </h1>

                    <div className="px-5 py-3 text-sm font-semibold text-white bg-transparent border-2 border-white rounded-full w-max md:text-lg md:px-6 md:py-4 lg:px-10 hover:cursor-pointer">
                      Explore the Zoo
                    </div>
                  </div>
                </div>
                <video
                  autoPlay={index === activeSlideIndex}
                  muted
                  onEnded={() =>
                    setActiveSlideIndex(() =>
                      index === slides.length - 1 ? 0 : index + 1
                    )
                  }
                  id="bgVideo"
                  // className="invisible md:visible"
                  style={{
                    height: "100vh",
                    minHeight: "100vh",
                    width: "100vw",
                    backgroundColor: "white",
                    visibility:
                      index === activeSlideIndex ? "visible" : "hidden",
                  }}
                >
                  <source src={slide.video} type="video/mp4"></source>
                </video>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

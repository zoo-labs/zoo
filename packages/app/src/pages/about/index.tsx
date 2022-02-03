import React, { useEffect } from "react";
import Image from "next/image";

import { fadeInFromLeft, fadeInFromRight } from "../../animation";

const About = () => {
  const getStartedContentRef = React.useRef();
  const getStartedImageRef = React.useRef();

  useEffect(() => {
    fadeInFromLeft(getStartedContentRef.current);
    fadeInFromRight(getStartedImageRef.current);
  }, []);

  return (
    <section className="GetStarted py-24" id="about">
      <div className="px-6 pb-20 mx-auto max-w-7xl lg:flex lg:items-center lg:justify-between">
        <div
          className="mb-6 text-center lg:text-left"
          ref={getStartedContentRef}
        >
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl mt-20 lg:mt-16">
            Make yield and do good.
          </h2>
          <p className="mb-6 text-base text-white lg:text-lg lg:mb-8 text-opacity-70 md:max-w-2xl">
            ZOO is a DeFi game that allows players to collect NFT animals
            representative of endangered species in the real world. Based on
            your game interactions users make more or less $ZOO.
          </p>

          <a
            href="/blog"
            className="px-5 py-3 text-sm text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 md:py-4 lg:px-10"
          >
            Get Started
          </a>
        </div>
        <div className="flex flex-col items-center" ref={getStartedImageRef}>
          <Image src="/img/zoo-hippo.png" width={603} height={450} alt="" />
        </div>
      </div>
    </section>
  );
};

export default About;

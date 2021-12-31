import React from "react";
import Image from "next/image";

const GetStartedSection = () => {
  return (
    <section className="GetStarted">
      <div className="max-w-7xl mx-auto px-6 pb-20 lg:flex lg:items-center lg:justify-between">
        <div className="mb-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-bold">
            Make yield and do good.
          </h2>
          <p className="text-base lg:text-lg mb-6 lg:mb-8 text-white text-opacity-70 md:max-w-2xl">
            ZOO is a DeFi game that allows players to collect NFT animals
            representative of endangered species in the real world. Based on
            your game interactions users make more or less $ZOO.
          </p>
          <button className="bg-blue text-white text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full">
            Connect Wallet
          </button>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/img/zoo-hippo.png" width={603} height={450} alt="" />
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;

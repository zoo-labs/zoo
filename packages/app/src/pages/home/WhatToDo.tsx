import Image from "next/image";
import Link from "next/link";
import React from "react";

const utilities = [
  {
    title: "Play 👩‍💻🕹️",
    link: "",
  },
  {
    title: "Hatch 🐣",
    link: "",
  },
  {
    title: "Pools 🐋",
    link: "",
  },
  {
    title: "Feed 🍼 💳",
    link: "",
  },
  {
    title: "Burning 🔥",
    link: "",
  },
  {
    title: "Buy / Sell 🛍️",
    link: "",
  },
  {
    title: "Grow 💗 🐥",
    link: "",
  },
  {
    title: "Boosts 💲↗️",
    link: "",
  },
  {
    title: "Make Offers 🕊️",
    link: "",
  },
  {
    title: "Breed 🥚",
    link: "",
  },
  {
    title: "Earns 🎁️ 🤑",
    link: "",
  },
  {
    title: "Metaverse 👽",
    link: "",
  },
];

const WhatToDo = () => {
  return (
    <div className="px-6 pt-24 mx-auto max-w-7xl">
      <h1 className="text-3xl md:text-[44px] leading-[3rem] lg:leading-4 font-bold text-center">
        What can you do with your NFT?
      </h1>
      <p className="text-sm sm:text-base mt-4 mb-24 sm:mt-12 sm:mb-16 text-center">
        The Zoo NFTs have value and unique{" "}
        <a className="italic underline">utility!</a>
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {utilities.map((data, index) => (
          <div
            className="border bg-black p-2 rounded font-[600] text-[36px] flex items-center justify-between"
            key={index}
          >
            <p>{data?.title}</p>
            <Link href={data?.link} passHref={true}>
              <Image
                src="/icons/forward-arrow.svg"
                width={32}
                height={32}
                alt=""
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="lg:w-3/4 mx-auto mt-24">
        <div
          className={`w-full flex flex-col-reverse lg:flex-row items-center md:justify-between mb-11`}
        >
          <div className="md:w-1/2 mt-8 lg:mt-0">
            <p className="font-bold  text-3xl md:text-[44px] text-center w-full lg:w-[70%] md:leading-[64px] mb-3 md:mb-[18px] mx-auto">
              It all starts with 1 egg.
            </p>

            <Link href="/coming-soon" passHref>
              <div className="px-5 py-3 text-[16px] font-semibold bg-black text-white flex items-center rounded-full w-max md:text-lg md:px-6 md:py-4 lg:px-10 hover:cursor-pointer mx-auto">
                <span className="mr-2">Start Collecting</span>
              </div>
            </Link>
          </div>
          <div className="flex-1 w-full md:w-1/2">
            <div className="w-full mx-auto bg-black  rounded-xl h-[540px] flex items-center justify-center mt-24">
              <img src={"/images/egg.png"} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatToDo;

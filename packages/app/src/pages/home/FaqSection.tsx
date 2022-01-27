import React, { useEffect } from "react";
import Link from "next/link";
// animation
import { fadeInOnScroll } from "animation";

const FaqSection = () => {
  const faqsRef = React.useRef();

  useEffect(() => {
    fadeInOnScroll(faqsRef.current);
  }, []);

  return (
    <section id="faqs" ref={faqsRef}>
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <h2 className="mb-10 text-3xl font-bold text-center lg:text-4xl lg:mb-20">
          Game FAQ
        </h2>
        <div className="flex flex-col items-center lg:flex-row lg:flex-wrap lg:items-start lg:justify-between">
          <div className="flex flex-col mb-8 lg:basis-1/2 lg:max-w-sm">
            <h3 className="mb-4 text-xl font-bold text-green lg:text-2xl">
              What is ZOO?
            </h3>
            <p className="leading-6 text-white lg:max-w-xl">
              ZOO is a Liquidity Protocol that exists to bridge tokens and NFTs
              at the intersection of Defi and gaming. Each of our NFTs (animal
              or egg) yield our native currency, $ZOO. Each Nft is
              collateralized by $ZOO, which appreciates over time based on
              rarity, age and by playing our game.{" "}
            </p>
          </div>

          <div className="flex flex-col mb-12 lg:basis-1/2 ">
            <h3 className="mb-4 text-xl font-bold text-green lg:text-2xl">
              What are the Key features in ZOO?
            </h3>
            <p className="text-white lg:max-w-sm ">
              Our key features include: growing, breeding, youth elixir (back in
              time), age freezing. In the near future we will also launch an app
              with our ZOO augmented reality game. This apple will load the NFTs
              in your wallet. With the app you will be able to see your NFT in
              real time with much more animal engagement including: petting,
              make the animal roll over, shake animals paw, give animal kiss,
              receive kiss, feed your animal, and walking with your animal.
            </p>
          </div>

          <div className="flex flex-col mb-12 lg:basis-1/2">
            <h3 className="mb-4 text-xl font-bold text-green lg:text-2xl">
              What is the $ZOO token?
            </h3>
            <p className="text-white lg:max-w-sm">
              The $ZOO token is the native currency in the game. It allows token
              holders to play, invest, use our NFT marketplace and be part of
              the game.
            </p>
          </div>

          <div className="flex flex-col mb-12 lg:basis-1/2">
            <h3 className="mb-4 text-xl font-bold text-green lg:text-2xl">
              How do i get Onboarded?
            </h3>
            <p className="text-white lg:max-w-sm">
              Players will be able to get access to the game through our
              Metamask App as well as ZOO Labs official website.
            </p>
          </div>

          <div className="flex flex-col mb-12 text-left lg:basis-1/2">
            <h3 className="pl-4 mb-4 text-xl font-bold text-left text-green lg:text-2xl lg:pl-0">
              How do i buy $ZOO?
            </h3>
            <ul className="max-w-sm px-4 pl-8 mx-auto text-white list-disc lg:mx-0">
              <li>Buy BNB</li>
              <li>Get a Binance coin wallet(Ledger, Coinomi).</li>
              <li>Locate your BNB address.</li>
              <li>Sign up to Binance</li>
              <li>Buy BNB with another crypto or a credit card.</li>
              <li>Go to Pancake swap or another trusted exchange.</li>
              <li>
                Swap BNB for $ZOO use this token address as their are many
                scammers
              </li>
              <li>0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13</li>
            </ul>
          </div>

          <div className="flex flex-col mb-12 lg:basis-1/2">
            <h3 className="mb-4 text-xl font-bold text-green lg:text-2xl">
              You need help?
            </h3>
            <p className="mb-4 text-white lg:max-w-sm">
              If you are having difficulty, please join our Discord server and
              post in the #new-player-help channel and our community will be
              happy to help!
            </p>
            <p className="text-white lg:max-w-sm">
              In addition, a complete list of guides can be found{" "}
              <a href="/blog" className="underline text-green">
                here
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/faqs">
            <a className="px-5 py-3 text-sm border rounded-full font-bold border-green md:text-base text-green md:px-6 md:py-4 lg:px-20">
              See more
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

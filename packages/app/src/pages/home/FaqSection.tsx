import React, { useEffect } from "react";
import Link from "next/link";
// animation
import { fadeInOnScroll } from "animation";

const FaqSection = () => {
  // const faqsRef = React.useRef();

  // useEffect(() => {
  //   fadeInOnScroll(faqsRef.current);
  // }, []);

  return (
    <section id="faqs">
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <h2 className="mb-10 text-3xl font-bold text-center lg:text-4xl lg:mb-20">
          Game FAQ
        </h2>
        <div className="flex flex-col  lg:flex-row lg:flex-wrap lg:items-start lg:justify-between">
          <div className="flex flex-col mb-8 lg:basis-1/2 w-full lg:max-w-sm">
            <h3 className="mb-4 text-xl font-bold text-white lg:text-2xl">
              What is ZOO?
            </h3>
            <p className="leading-6 text-muted-40 lg:max-w-xl">
              ZOO is a Liquidity Protocol that exists to bridge tokens and NFTs
              at the intersection of Defi and gaming. Each of our NFTs (animal
              or egg) yield our native currency, $ZOO. Each NFT is
              collateralized by $ZOO, which appreciates over time based on
              rarity, age and by playing our game.{" "}
            </p>
          </div>

          <div className="flex flex-col mb-12 lg:basis-1/2 w-full ">
            <h3 className="mb-4 text-xl font-bold text-white lg:text-2xl">
              What are the Key Features in ZOO?
            </h3>
            <p className="text-muted-40 lg:max-w-sm ">
              {`Our key features include: growing,
              breeding. In the near future we will
              also launch the ZOO AR App which will enable you to
              play with your animals in AR. With the app you will be able
              to see your NFT and pet, play, shake hands and more.`}
            </p>
          </div>

          <div className="flex flex-col mb-12 lg:basis-1/2 w-full">
            <h3 className="mb-4 text-xl font-bold text-white lg:text-2xl">
              What is the $ZOO token?
            </h3>
            <p className="text-muted-40 lg:max-w-sm">
              The $ZOO token is the native currency in the game. It allows token
              holders to play, invest, use our NFT marketplace and be part of
              the game.
            </p>
          </div>

          <div className="flex flex-col mb-12 lg:basis-1/2 w-full">
            <h3 className="mb-4 text-xl font-bold text-white lg:text-2xl">
              How Do I Get Started?
            </h3>
            <p className="text-muted-40 lg:max-w-sm">
              Players will be able to get access to the game through our DApp as
              well as ZOO {`Labs'`} official website.
            </p>
          </div>
          {/* flex flex-col mb-12 text-left lg:basis-1/2 w-full,  pl-4 mb-4 text-xl font-bold text-left text-white lg:text-2xl lg:pl-0, max-w-sm px-4 mx-auto text-white list-disc lg:mx-0*/}
          <div className="flex flex-col mb-12 lg:basis-1/2 w-full">
            <h3 className="mb-4 text-xl font-bold text-white lg:text-2xl">
              How do I buy $ZOO?
            </h3>
            <li>
              <a
                className="text-green underline"
                href="https://prezi.com/i/view/fWOPqU2eZzcqYyVzb5pz"
                target="_blank"
                rel="noreferrer"
              >
                Click here
              </a>
            </li>
          </div>

          <div className="flex flex-col mb-12 lg:basis-1/2 w-full">
            <h3 className="mb-4 text-xl font-bold text-white lg:text-2xl">
              Still have questions?
            </h3>
            <p className="mb-4 text-muted-40 lg:max-w-sm">
              If you are having difficulty, please{" "}
              <a
                href="https://discord.gg/wW6Wth6r"
                className="text-green underline"
              >
                join our Discord server
              </a>{" "}
              and post in the #new-player-help channel and our community will be
              happy to help!
            </p>
            <p className="text-muted-40 lg:max-w-sm">
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
            <a className="px-5 py-3 text-sm border rounded-full font-semibold border-green md:text-base text-green md:px-6 md:py-4 lg:px-20">
              See more
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

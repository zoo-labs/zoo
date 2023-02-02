import React, { useEffect } from "react";
import Link from "next/link";
// animation
import { fadeInOnScroll } from "animation";
import Image from "next/image";

const FaqSection = () => {
  // const faqsRef = React.useRef();

  // useEffect(() => {
  //   fadeInOnScroll(faqsRef.current);
  // }, []);

  return (
    <section id="faqs" className="">
      {/* <div className="px-6 py-20 mx-auto max-w-7xl">
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
          <div className="flex flex-col mb-12 lg:basis-1/2 w-full">
            <h3 className="mb-4 text-xl font-bold text-white lg:text-2xl">
              How do I buy $ZOO?
            </h3>
            <li>
              <a
                className=" underline"
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
              <a href="https://discord.gg/KsXtbu5g" className="underline">
                join our Discord server
              </a>{" "}
              and post in the #new-player-help channel and our community will be
              happy to help!
            </p>
            <p className="text-muted-40 lg:max-w-sm">
              In addition, a complete list of guides can be found{" "}
              <a href="/blog" className="underline text-blue">
                here.
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/faqs">
            <a className="px-5 py-3 text-sm border-2 rounded-full font-semibold md:text-base text-white md:px-6 md:py-4 lg:px-20">
              See more
            </a>
          </Link>
        </div>
      </div> */}
      <div className=" border-[#353945] border-t-[1px] border-b-[1px]  mb-8 px-8 grid lg:grid-cols-3">
        <div className="flex justify-between py-16  border-[#353945] border-r-[1px] ">
          <p className="text-3xl font-bold lg:text-[48px] leading-[72px] ml-20">
            ZOO
          </p>
          <div className="grid w-2/4 mt-8 gap-4 font-[500] ">
            <CustomLink title="Marketplace" link={"/"} />
            <CustomLink title="Chart" link={"/"} />
            <CustomLink title="Community" link={"/"} />
            <CustomLink title="Press" link={"/"} />
            <CustomLink title="Learn" link={"/"} />
            <CustomLink title="Marketplace" link={"/"} />
          </div>
        </div>
        <div className="flex  my-auto  border-[#353945] border-r-[1px] ">
          <div className="grid gap-4 mx-auto text-left font-[500]">
            <CustomLink title="My Profile" link={"/"} />
            <CustomLink title="Connect Wallet" link={"/"} />
            <CustomLink title="Whitepaper" link={"/"} />
            <CustomLink title="FAQ" link={"/"} />
            <CustomLink title="Contact Us" link={"/"} />
          </div>
        </div>
        <div className="my-auto">
          <div className="w-2/3 mx-auto font-[500]">
            <p className="uppercase">Newsletter</p>
            <p className="my-8 text-[14px] w-2/3 font-[400]">
              Subscribe to our newsletter to get the first notice on upgrades,
              new features and events!
            </p>
            <div
              className={`border-[2px] border-[#353945] rounded-[90px] w-2/3 flex items-center`}
            >
              <input
                className="h-full py-3 w-full rounded-[90px] bg-transparent px-2 placeholder:text-[#777E91] placeholder:text-[14px] placeholder:font-[400]"
                placeholder="Enter your email"
              />
              <button className="mr-2 flex items-center">
                <Image
                  src="/icons/small-circle.svg"
                  width={40}
                  height={40}
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

const CustomLink = ({ link, title }) => {
  return (
    <Link href={link}>
      <a>{title}</a>
    </Link>
  );
};

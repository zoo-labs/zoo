/* eslint-disable @next/next/no-img-element */
import _ from "lodash";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

const HeroSection = dynamic(() => import("./HeroSection"));
const OpportunitySection = dynamic(() => import("./OpportunitySection"));
const MarketPlaceSection = dynamic(() => import("./MarketPlaceSection"));
const AnimalFamilySection = dynamic(() => import("./AnimalFamilySection"));
const JoinZooSection = dynamic(() => import("./JoinZooSection"));
const FaqSection = dynamic(() => import("./FaqSection"));
import { useTokenTypes } from "zoo/state";
import CardsSection from "./Cards";
import GrabAnimal from "./GrabAnimal";
import InfoSection from "./InfoSection";
import StartCollecting from "./StartCollecting";
import UnimagineableExperience from "./UnimagineableExperience";
import BuyEggSection from "components/BuyEggSection";
import ReliableGovernance from "./ReliableGovernance";
import WhatToDo from "./WhatToDo";

const BASE_NFT_URL = "https://db.zoolabs.io";

const getTypeURIs = (type: string) => {
  return {
    contentURI: BASE_NFT_URL + `/${type}.jpg`,
    metadataURI: BASE_NFT_URL + `/${type}.json`,
  };
};

const grabAnimal = [
  {
    title: "Sumatran Elephant",
    icon: "/images/elephant.png",
    description: (
      <>
        Set up your wallet with <a className="underline">Metamask</a> and login{" "}
        <a className="underline">here</a> to view the Zoo Marketplace. Learn
        about which wallets are supported <a className="underline">here.</a>
      </>
    ),
  },
  {
    title: "Siberian Tiger",
    icon: "/images/tiger.png",
    description: (
      <>
        After you have successfully logged in with your wallet you will be able
        to purchase your very first Zoo Eggs or NFTs and begin feeding your
        animal currency!
      </>
    ),
  },
];

const grabAnimal2 = [
  {
    title: "Breed up to 7X",
    icon: "/images/circle-tiger.png",
    description: (
      <>
        First generation can breed up to 7x, while every latter generation will
        be able to breed 1 less time.
      </>
    ),
  },
  {
    title: "Virtual Piggy Bank",
    icon: "/images/hippo.png",
    description: (
      <>
        Start earning rewards as you lock liquidity into your NFT… like a
        virtual piggy bank.
      </>
    ),
  },
];

const experiences = [
  {
    title: "Virtual Piggy Bank",
    description:
      "Start earning APY as you lock liquidity into your NFT… like a virtual piggy bank.",
    img: "/img/desktop.svg",
  },
  {
    title: "Tomagotchi-Esque",
    description:
      "Start earning APY as you lock liquidity into your NFT… like a virtual piggy bank.",
    img: "/img/animals.svg",
  },
  {
    title: "Sustainable Governance",
    description:
      "Start earning APY as you lock liquidity into your NFT… like a virtual piggy bank.",
    img: "/img/partnership.svg",
  },
  {
    title: "Actually Saving Animals",
    description:
      "Start earning APY as you lock liquidity into your NFT… like a virtual piggy bank.",
    img: "/img/heart.svg",
  },
  {
    title: "Emotionally Intelligent",
    description:
      "Start earning APY as you lock liquidity into your NFT… like a virtual piggy bank.",
    img: "/img/brain.svg",
  },
];

export default function Home() {
  const typeUri = getTypeURIs("turtleblob");
  console.log("getTypeURIs", typeUri);
  const { tokenTypes } = useTokenTypes();
  console.log("tokenTypes", tokenTypes);
  const [hideLeft, setHideLeft] = useState(true);
  const [hideRight, setHideRight] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const handleMoveRight = () => {
    if (document.getElementById("carousel").scrollLeft >= window.screen.width) {
      document.getElementById("carousel").scrollLeft = 0;
    } else {
      document.getElementById("carousel").scrollLeft += 800;
    }
  };
  const handleMoveLeft = () => {
    document.getElementById("carousel").scrollLeft -= 800;
  };

  const handleScroll = () => {
    console.log(
      "the_rhrhjr_ddbj",
      document.getElementById("carousel").scrollLeft,
      document.getElementById("carousel").getBoundingClientRect().width
    );
    if (document.getElementById("carousel").scrollLeft === 0) {
      setHideLeft(true);
    } else {
      setHideLeft(false);
    }

    if (document.getElementById("carousel").scrollLeft === 608) {
      setHideRight(true);
    } else {
      setHideRight(false);
    }
  };

  useEffect(() => {
    document
      .getElementById("carousel")
      .addEventListener("scroll", (e) => handleScroll());
  }, [document.getElementById("carousel")?.scrollLeft]);

  const fetchBlog = useCallback(async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const rss_url = `https://medium.com/@zoolabsofficial/latest?format=json`;
    const blog_url = `https://api.rss2json.com/v1/api.json?rss_url=${rss_url}`;
    const url =
      "https://v1.nocodeapi.com/thenameisgifted/medium/OWqgfVFTUgEiWXEe";
    try {
      const res = await axios.get(url, {
        headers,
      });
      const data = await res.data;

      setBlogs(data);
      console.log("snjkadhjdbdhjbd_data", data);
    } catch (error) {
      console.log("snjkadhjdbdhjbd_error", error);
    }
  }, []);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return (
    <div className="relative">
      <HeroSection />
      <BuyEggSection />
      <UnimagineableExperience />
      <ReliableGovernance />
      <WhatToDo />
      <GrabAnimal grabAnimal={grabAnimal} grabAnimal2={grabAnimal2} />

      <div className="px-6 pt-24 mx-auto max-w-7xl">
        {experiences.map((experience, i) => (
          <div
            key={i}
            className={`w-full flex flex-col ${
              i % 2 === 1 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center md:justify-between mb-11`}
          >
            <div className="flex-1 w-full md:w-auto">
              <div className="w-full bg-16 border border-silverish rounded-xl h-[364px] flex items-center justify-center">
                <img src={experience.img} alt="" />
              </div>
            </div>
            <div
              className={`flex-1 mt-5 md:mt-0 ${
                i % 2 === 1 ? "md:pl-24" : "md:pr-24"
              } `}
            >
              <p className="font-bold text-2xl md:text-[42px] md:leading-none mb-3 md:mb-[18px]">
                {experience.title}
              </p>
              <p className="mb-5 md:mb-8 font-medium text-sm md:text-[22px] leading-7 text-muted-40">
                {experience.description}
              </p>
              <Link href="/coming-soon" passHref>
                <div className="px-5 py-3 text-sm font-semibold text-white bg-transparent border-2 border-white rounded-full w-max md:text-lg md:px-6 md:py-4 lg:px-10 hover:cursor-pointer">
                  Learn More
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 pt-24 mx-auto max-w-7xl">
        <h1 className="mb-24 text-[44px] leading-[3rem] lg:leading-4 font-bold md:text-center">
          Resources for Getting Started
        </h1>
        <div className="relative w-full">
          <div
            onScroll={handleScroll}
            id="carousel"
            className="overflow-x-auto whitespace-nowrap"
          >
            <div className="flex flex-col md:flex-row md:max-h-[290px]">
              {blogs?.length > 0
                ? blogs.map((_, i) => (
                    <Link
                      key={i}
                      href={_.link}
                      target="_black"
                      rel="noopener noreferrer"
                      passHref
                    >
                      <a
                        target={"_blank"}
                        className="rounded-[18px] w-full md:min-w-[436px] mr-8 border-2 relative mb-6 md:mb-0 cursor-pointer"
                      >
                        <Image
                          src="/img/tree.png"
                          alt=""
                          width={436}
                          height={282}
                          className="rounded-[18px]"
                        />
                        <div className="absolute whitespace-normal w-full bg-16 rounded-b-[18px] bottom-0 py-5 px-5 text-center font-medium">
                          {/* How to Add $ZOO Token to Your Wallet */}
                          {_.title}
                        </div>
                      </a>
                    </Link>
                  ))
                : "No post available"}
            </div>
          </div>
          {!hideRight && (
            <button
              onClick={handleMoveRight}
              className="hidden md:block absolute -right-8 cursor-pointer inset-y-[42%]"
            >
              <Image
                src="/icons/arrow-right-circle.svg"
                alt=""
                width={43}
                height={43}
              />
            </button>
          )}
          {!hideLeft && (
            <button
              onClick={handleMoveLeft}
              className="hidden md:block absolute left-0 cursor-pointer inset-y-[42%]"
            >
              <Image
                src="/icons/arrow-right-circle.svg"
                alt=""
                width={43}
                height={43}
                className="rotate-180"
              />
            </button>
          )}
        </div>
      </div>
      <MarketPlaceSection />
      <FaqSection />
    </div>
  );
}

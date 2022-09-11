/* eslint-disable @next/next/no-img-element */
import _ from "lodash";
//import ZooBabyAnim from "../../components/Babylon";
import dynamic from "next/dynamic";
import Image from "next/image";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

//import MyModel from "../../components/ModelViewer/index";
// sections
const HeroSection = dynamic(() => import("./HeroSection"));
// const PartnersSection = dynamic(() => import("./PartnersSection"));
const OpportunitySection = dynamic(() => import("./OpportunitySection"));
// import PopularNftsSection from './PopularNftsSection';
const MarketPlaceSection = dynamic(() => import("./MarketPlaceSection"));
const GetStartedSection = dynamic(() => import("./GetStartedSection"));
const ZooNewsSection = dynamic(() => import("pages/home/ZooNewsSection"));
const AnimalFamilySection = dynamic(() => import("./AnimalFamilySection"));
const JoinZooSection = dynamic(() => import("./JoinZooSection"));
const FaqSection = dynamic(() => import("./FaqSection"));
import { useTokenTypes } from "zoo/state";
import CardsSection from "./Cards";
import GameFi from "./GameFi";

const BASE_NFT_URL = "https://db.zoolabs.io";

const getTypeURIs = (type: string) => {
  return {
    contentURI: BASE_NFT_URL + `/${type}.jpg`,
    metadataURI: BASE_NFT_URL + `/${type}.json`,
  };
};

const gameFi = [
  {
    title: "Set Up Wallet",
    icon: "/icons/empty-wallet.svg",
    description: (
      <>
        Set up your wallet with{" "}
        <a className="underline text-activeGreen">Metamask</a> and login{" "}
        <a className="underline text-activeGreen">here</a> to view the Zoo
        Marketplace. Learn about which wallets are supported{" "}
        <a className="underline text-activeGreen">here.</a>
      </>
    ),
  },
  {
    title: "Create Your Collection",
    icon: "/icons/music-playlist.svg",
    description: (
      <>
        After you have successfully logged in with your wallet you will be able
        to purchase your very first Zoo Eggs or NFTs and begin feeding your
        animal currency!
      </>
    ),
  },
  {
    title: "Mint and Breed",
    icon: "/icons/breed.svg",
    description: (
      <>
        As you feed your animal just enough $ it will actually mint an older
        version of itself. Collect the egg, baby, teen and adult version. AND
        with two adults you can breed another!
      </>
    ),
  },
  {
    title: "Marketplace",
    icon: "/icons/shop.svg",
    description: (
      <>
        The Zoo <a className="underline text-activeGreen">Marketplace</a> not
        only benefits members through its fees but also allows you to buy, sell,
        make offers and trade for additional benefits $$.
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

  return (
    <div>
      <HeroSection />
      <CardsSection />
      {/* <PartnersSection /> */}
      <OpportunitySection />
      <div className="flex flex-col px-4 mx-auto mb-32 max-w-7xl gap-36 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <p className="text-6xl font-bold mb-9">It all starts with one egg.</p>
          <p className="mb-10 text-xl text-muted-40">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget sit
            amet, tortor non. Lacus, elementum gravida ut diam. Sit viverra quam
            tristique ipsum mattis aenean elementum.
          </p>
          <div
            // onClick={() => handleFunds(chainId, buyZoo)}
            className="px-5 py-3 text-sm font-semibold text-white bg-transparent border-2 border-white rounded-full md:text-lg md:px-6 md:py-4 lg:px-10 hover:cursor-pointer w-max"
          >
            Start Collecting
          </div>
        </div>
        <div className="flex items-center justify-center flex-1 h-full py-16 border border-white rounded-2xl px-7 max-w-max">
          <Image src="/images/egg.svg" alt="" width={467} height={442} />
        </div>
      </div>
      {/* <PopularNftsSection /> */}

      {/* <GetStartedSection /> */}
      {/* <ZooNewsSection /> */}
      <AnimalFamilySection />
      <GameFi gameFi={gameFi} />
      <div className="relative">
        <div className="absolute flex items-center justify-center w-full bg-giraffess min-h-[100vh]">
          <div className="relative flex items-center justify-center w-full">
            <p className="absolute z-50 max-w-4xl text-5xl font-bold text-center md:text-8xl">
              Unimaginable Experiences
            </p>
          </div>
        </div>
        <video
          autoPlay
          muted
          loop
          id="bgVideo"
          style={{
            height: "100vh",
            minHeight: "100vh",
            maxHeight: "100vh",
            width: "100vw",
            minWidth: "100vw",
          }}
        >
          <source
            src={"/videoes/trippy_animals_short.mov"}
            type="video/mp4"
          ></source>
        </video>
      </div>
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
              <p className="font-bold text-[42px] leading-none mb-[18px]">
                {experience.title}
              </p>
              <p className="mb-8 font-medium text-[22px] leading-7 text-muted-40">
                {experience.description}
              </p>
              <div className="px-5 py-3 text-sm font-semibold text-white bg-transparent border-2 border-white rounded-full w-max md:text-lg md:px-6 md:py-4 lg:px-10 hover:cursor-pointer">
                Learn More
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 pt-24 mx-auto max-w-7xl">
        <p className="mb-24 text-5xl font-bold md:text-center">
          Resources for Getting Started
        </p>
        <div className="relative w-full">
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="flex flex-col md:flex-row md:max-h-[290px]">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="rounded-[18px] w-full md:min-w-[436px] mr-8 border-2 relative mb-6 md:mb-0"
                  >
                    <Image
                      src="/img/tree.png"
                      alt=""
                      width={436}
                      height={282}
                      className="rounded-[18px]"
                    />
                    <div className="absolute w-full bg-16 rounded-b-[18px] bottom-0 py-5 px-5 text-center font-medium">
                      How to Add $ZOO Token to Your Wallet
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="hidden md:block absolute -right-8 cursor-pointer inset-y-[42%]">
            <Image
              src="/icons/arrow-right-circle.svg"
              alt=""
              width={43}
              height={43}
            />
          </div>
        </div>
      </div>
      <MarketPlaceSection />
      <FaqSection />
      <JoinZooSection />
    </div>
  );
}

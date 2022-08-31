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
  },
  {
    title: "Create Your Collection",
    icon: "/icons/music-playlist.svg",
  },
  {
    title: "Mint and Breed",
    icon: "/icons/breed.svg",
  },
  {
    title: "Marketplace",
    icon: "/icons/shop.svg",
  },
];

const animals = [
  "Amur Leopard",
  "Siberian Tiger",
  "Javan Rhino",
  "Sumatran Elephant",
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
      <div className="mb-32 px-4 max-w-7xl mx-auto flex flex-col gap-36 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <p className="font-bold text-6xl mb-9">It all starts with one egg.</p>
          <p className="text-muted-40 text-xl mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget sit
            amet, tortor non. Lacus, elementum gravida ut diam. Sit viverra quam
            tristique ipsum mattis aenean elementum.
          </p>
          <div
            // onClick={() => handleFunds(chainId, buyZoo)}
            className="px-5 py-3 text-sm md:text-lg font-semibold text-white rounded-full bg-transparent border-2 border-white md:px-6 md:py-4 lg:px-10 hover:cursor-pointer w-max"
          >
            Start Collecting
          </div>
        </div>
        <div className="flex-1 border border-white rounded-2xl h-full px-7 py-16 flex items-center justify-center max-w-max">
          <Image src="/images/egg.svg" alt="" width={467} height={442} />
        </div>
      </div>
      {/* <PopularNftsSection /> */}

      {/* <GetStartedSection /> */}
      {/* <ZooNewsSection /> */}
      <AnimalFamilySection />
      <section className="AnimalFamily">
        <div className="px-6 py-20 mx-auto max-w-7xl">
          <p className="font-bold text-5xl text-center mb-16">
            GAME-FI For All
          </p>
          <div className="grid lg:grid-cols-2 gap-x-60 gap-y-24">
            {gameFi.map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center pb-14 border-b-2 border-white"
              >
                <Image src={_.icon} alt="" width={80} height={80} />
                <p className="my-3 text-4xl font-semibold">{_.title}</p>
                <p className="text-lg text-center">
                  Set up your wallet with Metamask and login here to view the
                  Zoo Marketplace. Learn about which wallets are supported here.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full bg-giraffes min-h-[600px] flex items-center justify-center">
        <p className="text-center max-w-4xl mx-auto font-bold text-8xl">
          Unimaginable Experiences
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-24">
        {animals.map((_, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center mb-11`}
          >
            <div className="flex-1">
              <img src="/images/animal.png" alt="" />
            </div>
            <div
              className={`flex-1 mt-5 md:mt-auto ${
                i % 2 === 0 ? "md:pl-14" : "md:pr-14"
              } `}
            >
              <p className="font-medium text-[32px] leading-8 mb-[18px]">{_}</p>
              <p className="mb-8 text-sm leading-7 text-muted-40">
                Start earning APY as you lock liquidity into your NFT… like a
                virtual piggy bank.
              </p>
              <div className="w-max px-5 py-3 text-sm md:text-lg font-semibold text-white rounded-full bg-transparent border-2 border-white md:px-6 md:py-4 lg:px-10 hover:cursor-pointer">
                Learn More
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <p className="font-bold text-5xl mb-24 text-center">
          Resources for Getting Started
        </p>
        <div className="w-full relative">
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="flex flex-col md:flex-row max-h-[290px]">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="rounded-[18px] min-w-[436px] mr-8 border-2 relative"
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

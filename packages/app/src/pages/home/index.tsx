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
    description: (
      <>
        Set up your wallet with{" "}
        <a className="text-activeGreen underline">Metamask</a> and login{" "}
        <a className="text-activeGreen underline">here</a> to view the Zoo
        Marketplace. Learn about which wallets are supported{" "}
        <a className="text-activeGreen underline">here.</a>
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
        The Zoo <a className="text-activeGreen underline">Marketplace</a> not
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
          <p className="font-bold text-5xl md:text-center mb-16">
            GAME-FI For All
          </p>
          <div className="grid lg:grid-cols-2 gap-x-60 gap-y-24">
            {gameFi.map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center pb-14 border-b-2 border-white"
              >
                <Image src={_.icon} alt="" width={80} height={80} />
                <p className="my-3 text-4xl text-center font-semibold">
                  {_.title}
                </p>
                <p className="text-lg text-center">{_.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full bg-giraffes min-h-[600px] flex items-center justify-center">
        <p className="text-center max-w-4xl mx-auto font-bold text-5xl md:text-8xl">
          Unimaginable Experiences
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-24">
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
              <div className="w-max px-5 py-3 text-sm md:text-lg font-semibold text-white rounded-full bg-transparent border-2 border-white md:px-6 md:py-4 lg:px-10 hover:cursor-pointer">
                Learn More
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <p className="font-bold text-5xl mb-24 md:text-center">
          Resources for Getting Started
        </p>
        <div className="w-full relative">
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

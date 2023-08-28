/* eslint-disable @next/next/no-img-element */
import _ from "lodash";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});

const HeroSection = dynamic(() => import("./HeroSection"));
const OpportunitySection = dynamic(() => import("./OpportunitySection"));
const MarketPlaceSection = dynamic(() => import("./MarketPlaceSection"));
const AnimalFamilySection = dynamic(() => import("./AnimalFamilySection"));
const JoinZooSection = dynamic(() => import("./JoinZooSection"));
const FaqSection = dynamic(() => import("components/Footer"));
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
    icon: "/images/circle_tiger.png",
    description: (
      <>
        First generation can breed up to 7x, while every latter generation will be able to breed 1 less time.
      </>
    ),
  },
  {
    title: "Virtual Piggy Bank",
    icon: "/images/hippo.png",
    description: (
      <>
        Start earning rewards as you lock liquidity into your NFT… like a virtual piggy bank.
      </>
    ),
  },
];

const slideData = [
  {
    title: "How to set up a metamask wallet",
    icon: "/images/tree.png",
  },
  {
    title: "How to set up a metamask wallet",
    icon: "/images/tree.png",
  },
  {
    title: "How to set up a metamask wallet",
    icon: "/images/tree.png",
  },
  {
    title: "How to set up a metamask wallet",
    icon: "/images/tree.png",
  },
  {
    title: "How to set up a metamask wallet",
    icon: "/images/tree.png",
  },
  {
    title: "How to set up a metamask wallet",
    icon: "/images/tree.png",
  },
  {
    title: "How to set up a metamask wallet",
    icon: "/images/tree.png",
  },
  {
    title: "How to set up a metamask wallet",
    icon: "/images/tree.png",
  },
  {
    title: "How to set up a metamask wallet",
    icon: "/images/tree.png",
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

  // const handleMoveRight = () => {
  //   if (document.getElementById("carousel").scrollLeft >= window.screen.width) {
  //     document.getElementById("carousel").scrollLeft = 0;
  //   } else {
  //     document.getElementById("carousel").scrollLeft += 800;
  //   }
  // };
  // const handleMoveLeft = () => {
  //   document.getElementById("carousel").scrollLeft -= 800;
  // };

  // const handleScroll = () => {
  //   console.log(
  //     "the_rhrhjr_ddbj",
  //     document.getElementById("carousel").scrollLeft,
  //     document.getElementById("carousel").getBoundingClientRect().width
  //   );
  //   if (document.getElementById("carousel").scrollLeft === 0) {
  //     setHideLeft(true);
  //   } else {
  //     setHideLeft(false);
  //   }

  //   if (document.getElementById("carousel").scrollLeft === 608) {
  //     setHideRight(true);
  //   } else {
  //     setHideRight(false);
  //   }
  // };

  // useEffect(() => {
  //   document
  //     .getElementById("carousel")
  //     .addEventListener("scroll", (e) => handleScroll());
  // }, [document.getElementById("carousel")?.scrollLeft]);

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
      <MarketPlaceSection slideData={slideData} />
      <FaqSection />
    </div>
  );
}

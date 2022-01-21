import _ from "lodash";
// sections
import HeroSection from "./HeroSection";
import PartnersSection from "./PartnersSection";
import OpportunitySection from "./OpportunitySection";
import PopularNftsSection from "./PopularNftsSection";
import MarketPlaceSection from "./MarketPlaceSection";
import GetStartedSection from "./GetStartedSection";
import ZooNewsSection from "pages/home/ZooNewsSection";
import AnimalFamilySection from "./AnimalFamilySection";
import JoinZooSection from "./JoinZooSection";
import FaqSection from "./FaqSection";
import { useTokenTypes } from "zoo/state";

const BASE_NFT_URL = "https://db.zoolabs.io";

const getTypeURIs = (type: string) => {
  return {
    contentURI: BASE_NFT_URL + `/${type}.jpg`,
    metadataURI: BASE_NFT_URL + `/${type}.json`,
  };
};

export default function Home() {
  const typeUri = getTypeURIs("turtleblob");
  console.log("getTypeURIs", typeUri);
  const { tokenTypes } = useTokenTypes();
  console.log("tokenTypes", tokenTypes);

  return (
    <div>
      <HeroSection />
      <PartnersSection />
      <OpportunitySection />
      <PopularNftsSection />
      <MarketPlaceSection />
      <GetStartedSection />
      <ZooNewsSection />
      <AnimalFamilySection />
      <JoinZooSection />
      <FaqSection />
    </div>
  );
}

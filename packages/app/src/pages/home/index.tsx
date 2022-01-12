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
export default function Home() {
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

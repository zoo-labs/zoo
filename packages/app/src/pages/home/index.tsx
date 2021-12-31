import _ from "lodash";
import Head from "next/head";
import { useModal } from "react-morphing-modal";
import Container from "../../components/Container";
import AssetSaleModal from "../../lux/AssetSaleModal";
import AssetList from "../../lux/AssetList";
import { useTokenTypes } from "../../lux/state";
import AssetSale from "../../lux/AssetSale";
import { useRouter } from "next/router";
// sections
import HeroSection from "sections/Home/HeroSection";
import PartnersSection from "sections/Home/PartnersSection";
import OpportunitySection from "sections/Home/OpportunitySection";
import PopularNftsSection from "sections/Home/PopularNftsSection";
import MarketPlaceSection from "sections/Home/MarketPlaceSection";
import GetStartedSection from "sections/Home/GetStartedSection";
import ZooNewsSection from "sections/Home/ZooNewsSection";
import AnimalFamilySection from "sections/Home/AnimalFamilySection";
import JoinZooSection from "sections/Home/JoinZooSection";
import FaqSection from "sections/Home/FaqSection";
export default function Mint() {
  const router = useRouter();
  return (
    <Container
      id="dashboard-page"
      className="py-4 md:py-8 lg:py-12 "
      maxWidth="6xl"
    >
      <Head>
        <title>Home | ZOO</title>
        <meta name="description" content="ZOO" />
      </Head>

      <div className={`grid grid-cols-1 gap-5 md:grid-cols-4`}>
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
    </Container>
  );
}

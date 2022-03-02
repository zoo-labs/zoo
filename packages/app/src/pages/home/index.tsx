import _ from "lodash";
import ZooBabyAnim from "../../components/Babylon";
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

//import MyModel from "../../components/ModelViewer/index";
// sections
const HeroSection = dynamic(() => import("./HeroSection"));
const PartnersSection = dynamic(() => import("./PartnersSection"));
const OpportunitySection = dynamic(() => import("./OpportunitySection"));
// import PopularNftsSection from './PopularNftsSection';
const MarketPlaceSection = dynamic(() => import("./MarketPlaceSection"));
const GetStartedSection = dynamic(() => import("./GetStartedSection"));
const ZooNewsSection = dynamic(() => import("pages/home/ZooNewsSection"));
const AnimalFamilySection = dynamic(() => import("./AnimalFamilySection"));
const JoinZooSection = dynamic(() => import("./JoinZooSection"));
const FaqSection = dynamic(() => import("./FaqSection"));
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
      <HeroSection animal3d={<ModelViewer zoom="30deg"></ModelViewer>} />

      <PartnersSection />
      <OpportunitySection />
      {/* <PopularNftsSection /> */}
      <MarketPlaceSection />
      <GetStartedSection />
      <ZooNewsSection />
      <AnimalFamilySection />
      <FaqSection />
      <JoinZooSection />
    </div>
  );
}

import React from "react";
import styled from "styled-components";
import { Text } from "components";
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouteMatch, Link, matchPath, useLocation } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import "swiper/swiper.min.css";
import { useSelector } from "react-redux";
import { useMatchBreakpoints } from "hooks";
import Moralis from "moralis";
import { AppState } from "state/index";
import { useHistory } from "react-router-dom";
import { useModal } from "components/Modal";
import BidModal from "components/MarketModals/BidModal";
import { useMoralisSubscription } from "react-moralis";
import { Animal } from "entities/zooentities";
import MarketplaceCard from "./MarketCard";

const Container = styled.div<{ isMobile?: boolean }>`
  height: ${({ isMobile }) => (isMobile ? `100vh` : null)};
  display: ${({ isMobile }) => (isMobile ? null : "flex")};
  flex-direcetion: ${({ isMobile }) => (isMobile ? `column` : "row")};
  flex-wrap: wrap;
`;
const Card = styled.div<{ url?: string }>`
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url(${({ url }) => `${url}`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 100vh;
  max-height: 773px;
  max-width: 425px;
  ${({ theme }) => theme.mediaQueries.sm} {
  }
`;
const FirstThird = styled.div`
  height: 33vh;
  width: 100%;
  max-height: 256px;
`;
const SecondThird = styled.div`
  height: 33vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-height: 256px;
`;
const FinalThird = styled.div`
  height: 33vh;
  width: 100%;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 256px;
`;
const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 9999999;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  width: 80px;
  & span {
    text-align: center;
    font-weight: bold;
    width: 100%;
    color: black;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
  }
  & svg {
    height: 24px;
    width: 24px;
    fill: white;
    stroke: black;
    stroke-width: 15px;
  }
`;
const MainHeading = styled(Text)`
  font-size: 20px;
  width: 100%;
  color: black;
  font-weight: 900;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
`;
const Subheading = styled(Text)`
  width: 100%;
  color: black;
  font-weight: 800;
  font-size: 18px;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  :nth-child(3) {
    font-size: 16px;
    font-weight: 600;
  }
`;
const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`;

Moralis.initialize("16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy");

Moralis.serverURL = "https://dblpeaqbqk32.usemoralis.com:2053/server";

export default function Marketplace() {
  const animalsState = useSelector<AppState, AppState["zoo"]["animals"]>(
    (state) => state.zoo.animals
  );
  const { isXl, isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = !isXl;
  const queryObject = Moralis.Object.extend("Animals");
  const [animals, setAnimals] = React.useState([]);
  const [subUrl, setSubUrl] = React.useState("");
  let filter = "";

  const history = useHistory();
  const { account } = useWeb3React();
  const { url, isExact } = useRouteMatch();
  const { pathname } = useLocation();

  // const [onBid] = useModal(
  //     <BidModal
  //         item = {temp}
  //         onDismiss={()=>null}
  //     />
  // )

  // const onBidInfo = (item) => {
  //     console.log(item)
  //     temp = {...item}
  //     onBid()
  // }

  const handleOnSwipe = () => {};

  React.useEffect(() => {
    // console.log("animals", animalsState)
    getAnimals();
  }, [animalsState]);
  React.useEffect(() => {
    return history.listen((location) => {
      setSubUrl(location.pathname);
    });
  }, [history]);

  const HomeClick = () => {
    history.push("/account");
  };

  const getAnimals = async () => {
    // const query = new Moralis.Query(queryObject)
    // query.limit(1000)
    // query.equalTo("Listed", true)
    // const results = await query.find()
    setAnimals(Object.values(animalsState));
    // console.log(animals)
  };

  let activeIndex = 0;
  switch (true) {
    case pathname.includes("myZoo"):
      activeIndex = 0;
      break;
    case pathname.includes("marketplace"):
      activeIndex = 1;
      break;
    default:
      activeIndex = 1;
      break;
  }
  switch (true) {
    case subUrl.includes("myZoo"):
      filter = "myZoo";
      break;
    case subUrl.includes("marketplace"):
      filter = "marketplace";
      break;
    default:
      filter = "";
      break;
  }
  let animalsFiltered = [];
  if (filter === "myZoo") {
    animalsFiltered = animals.filter((animal) => {
      return animal.owner
        ? animal.owner.toLowerCase() === account.toLowerCase()
        : false;
    });
  } else {
    animalsFiltered = animals.filter((animal) => {
      return animal.owner
        ? animal.owner.toLowerCase() !== account.toLowerCase()
        : true;
    });
  }

  // useMoralisSubscription("Animals", q => q, [], {
  //     onUpdate: data => getAnimals(),
  //   });

  return (
    <Container isMobile={isMobile}>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem
          as={Link}
          to={`${url}/myZoo`}
          onClick={() => getAnimals()}
        >
          'MyZoo'
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}`} onClick={() => getAnimals()}>
          'Marketplace'
        </ButtonMenuItem>
      </ButtonMenu>
      <Swiper
        spaceBetween={30}
        slidesPerView={isMobile ? 1 : 3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        direction={isMobile ? "vertical" : "horizontal"}
      >
        {animalsFiltered.map((data) => {
          return data.listed ? (
            <SwiperSlide key={data.tokenId}>
              <MarketplaceCard item={data} />
            </SwiperSlide>
          ) : (
            <></>
          );
        })}
      </Swiper>
    </Container>
  );
}

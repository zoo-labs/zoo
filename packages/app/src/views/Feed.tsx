import React from "react";
import styled from "styled-components";
import { Text } from "components";
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouteMatch, Link, useLocation, useHistory } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import "swiper/swiper.min.css";
import { useSelector } from "react-redux";
import { useMatchBreakpoints } from "hooks";
import Moralis from "moralis";
import { AppState } from "state/index";
import FeedCard from "./FeedCard";
import BorderButton from "components/Button/BorderButton";
import { FaHome } from "react-icons/fa";

const Container = styled.div<{ isMobile?: boolean }>`
  height: ${({ isMobile }) => (isMobile ? `100vh` : null)};
  display: ${({ isMobile }) => (isMobile ? null : "flex")};
  flex-direction: ${({ isMobile }) => (isMobile ? `column` : "row")};
  flex-wrap: wrap;
  & .swiper-container {
    height: 100vh;
  }
`;

const StickyBottomMenuWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  box-shadow: 0px 5px 10px #040404ba;
  background: ${({ theme }) => theme.colors.primaryPop};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 100;

  svg {
    width: 25px;
    height: 25px;
    color: #FFFFFF;
  }
`

const ToggleContainer = styled.div`
  div {
    width: 100%;
    border-radius: 0;
    justify-content: center;
    z-index: 1000;
    position: absolute;
    padding-top: 15px;
    background: linear-gradient(#3d3d3d, transparent);
  }
  a {
    border: none;
    
    font-size: 20px;
    box-shadow: none;
    cursor: pointer;
  }
`;

const EmptyZoo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 80px 0;
  width: 100%;
  height: 100%;

  button {
    margin-top: 24px;
  }
`;

Moralis.initialize("16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy");

Moralis.serverURL = "https://dblpeaqbqk32.usemoralis.com:2053/server";

export default function Feed() {
  const animalsState = useSelector<AppState, AppState["zoo"]["animals"]>(
    (state) => state.zoo.animals
  );
  const { isXl } = useMatchBreakpoints();
  const isMobile = !isXl;
  const [animals, setAnimals] = React.useState([]);
  const [subUrl, setSubUrl] = React.useState("");
  let filter = "";

  const history = useHistory();
  const { account } = useWeb3React();
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  React.useEffect(() => {
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

  const getAnimals = () => {
    setAnimals(Object.values(animalsState));
  };

  let activeIndex = 0;
  switch (true) {
    case pathname.includes("myzoo"):
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
    case subUrl.includes("myzoo"):
      filter = "myZoo";
      break;
    case subUrl.includes("marketplace"):
      filter = "marketplace";
      break;
    default:
      filter = "";
      break;
  }
  const isZoo = filter === "myZoo";
  const animalsFiltered = animals.filter((animal) => {
    return animal.owner
      ? isZoo
        ? animal.owner.toLowerCase() === account.toLowerCase()
        : animal.owner.toLowerCase() !== account.toLowerCase()
      : !isZoo;
  });

  return (
    <Container isMobile={isMobile}>
      <StickyBottomMenuWrapper onClick={HomeClick}>
        <FaHome />
      </StickyBottomMenuWrapper>
      <ToggleContainer>
        <ButtonMenu activeIndex={activeIndex} scale="sm">
          <ButtonMenuItem
            as={Link}
            to={`${url}/myzoo`}
            onClick={() => getAnimals()}
          >
           My Zoo
          </ButtonMenuItem>
          <ButtonMenuItem
            as={Link}
            to={`${url}/marketplace`}
            onClick={() => getAnimals()}
          >
            Marketplace
          </ButtonMenuItem>
        </ButtonMenu>
      </ToggleContainer>
      {!isZoo || animalsFiltered.length ? (
        <Swiper
          spaceBetween={30}
          slidesPerView={isMobile ? 1 : 3}
          direction={isMobile ? "vertical" : "horizontal"}
        >
          {animalsFiltered.map((data) => {
            return data.listed ? (
              <SwiperSlide key={data.tokenId}>
                <FeedCard item={data} />
              </SwiperSlide>
            ) : (
              <></>
            );
          })}
        </Swiper>
      ) : (
        <EmptyZoo>
          <Text textAlign="center">You do not currently own any animals</Text>
          <BorderButton scale="md" onClick={HomeClick}>
            Home
          </BorderButton>
        </EmptyZoo>
      )}
    </Container>
  );
}

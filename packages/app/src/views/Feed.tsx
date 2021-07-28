import React, { useEffect } from "react";
import styled from "styled-components";
import { Flex, Text } from "components";
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import {
   useRouteMatch,
   Link,
   useLocation,
   useHistory,
   RouteComponentProps,
   withRouter,
} from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import "swiper/swiper.min.css";
import { useSelector } from "react-redux";
import { useMatchBreakpoints } from "hooks";
import Moralis from "moralis";
import { AppState } from "state/index";
import FeedCard from "./FeedCard";
import BorderButton from "components/Button/BorderButton";
import { ChevronLeftIcon } from "components/Svg";
import logo from "media/ZooLogoWhite.png";

const Container = styled.div<{ isMobile?: boolean }>`
   height: ${({ isMobile }) => (isMobile ? `100vh` : null)};
   display: ${({ isMobile }) => (isMobile ? null : "flex")};
   flex-direction: ${({ isMobile }) => (isMobile ? `column` : "row")};
   flex-wrap: wrap;
   & .swiper-container {
      height: 100vh;
   }
`;

const StyledChevron = styled(ChevronLeftIcon)`
   height: 40px;
   width: 40px;
   z-index: 101;
`;

const StyledMenuButton = styled.button`
   position: relative;
   top: -8px;
   left: -12px;
   border: none;
   background: transparent;
   box-shadow: none;
   color: transparant;
`;

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

const MaxHeightLogo = styled.img`
  height: ${32 / 1.6}px;
  position: absolute;
  bottom: 20px;
  right: 10px;
  z-index: 100;
`;

const LogoContainer = styled.div`
  height: 100%;
  ${({ theme }) =>
    theme.mediaQueries.md || theme.mediaQueries.lg || theme.mediaQueries.xl} {
    left: 50%;
  }
`;

Moralis.initialize("16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy");

Moralis.serverURL = "https://dblpeaqbqk32.usemoralis.com:2053/server";

export interface FeedPagePops extends RouteComponentProps<{ key?: string }> {}

function Feed<FeedPagePops>({ match }) {
   const animalsState = useSelector<AppState, AppState["zoo"]["animals"]>(
      (state) => state.zoo.animals
   );
   const { isXl } = useMatchBreakpoints();
   const isMobile = !isXl;
   const history = useHistory();
   const { account } = useWeb3React();
   let animals = Object.values(animalsState);
   const { pathname } = useLocation();

   // Get URL param
   let toFind = match.params.key;
   const inMyZoo = useRouteMatch("/feed/myzoo/:key");
   if (!toFind && inMyZoo && inMyZoo.params) {
      const param = Object.values(inMyZoo.params);
      toFind = param[0];
   }

   //  Rerout to home
   const HomeClick = () => {
      history.push("/account");
   };

   //  Settings for Zoo vs Market
   let activeIndex = 0;
   let filter = "";
   switch (true) {
      case pathname.includes("myzoo"):
         activeIndex = 0;
         filter = "myZoo";
         break;
      case pathname.includes("marketplace"):
         filter = "marketplace";
         activeIndex = 1;
         break;
      default:
         filter = "";
         activeIndex = 1;
         break;
   }

   //  Filter if in the Zoo or Market
   const isZoo = filter === "myZoo";
   let animalsFiltered = animals.filter((animal) => {
      return animal.owner
         ? isZoo
            ? animal.owner.toLowerCase() === account.toLowerCase()
            : animal.owner.toLowerCase() !== account.toLowerCase()
         : !isZoo;
   });

   if (toFind && isZoo) {
      const ogIndex = animalsFiltered.findIndex((a) => a.tokenId === toFind);
      const toMove = animalsFiltered[0];
      animalsFiltered[0] = animalsFiltered[ogIndex];
      animalsFiltered[ogIndex] = toMove;
   }

   console.log(toFind, animalsFiltered);

   return (
      <Container isMobile={isMobile}>
         <ToggleContainer>
         <ButtonMenu activeIndex={activeIndex + 1} scale="sm">
            <StyledMenuButton onClick={() => console.log("asda")}>
               <StyledChevron onClick={HomeClick} />
            </StyledMenuButton>
            <ButtonMenuItem as={Link} to={`/feed/myzoo`}>
               My Zoo
            </ButtonMenuItem>
            <ButtonMenuItem as={Link} to={`/feed/marketplace`}>
               Marketplace
            </ButtonMenuItem>
         </ButtonMenu>
      </ToggleContainer>
         
         {!isZoo || animalsFiltered.length ? (
            <Swiper
               spaceBetween={30}
               slidesPerView={1}
               direction={isMobile ? "vertical" : "horizontal"}>
               {animalsFiltered.map((data) => {
                  return data.listed ? (
                     <SwiperSlide key={data.tokenId + "slide"}>
                        <FeedCard item={data} key={data.tokenId + "card"} />
                     </SwiperSlide>
                  ) : (
                     <></>
                  );
               })}
            </Swiper>
         ) : (
            <EmptyZoo>
               <Text textAlign="center">
                  You do not currently own any animals
               </Text>
               <BorderButton scale="md" onClick={() => HomeClick}>
                  Home
               </BorderButton>
            </EmptyZoo>
         )}
      </Container>
   );
}

export default withRouter(Feed);

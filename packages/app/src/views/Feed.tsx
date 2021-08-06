import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Text } from "components";
import {
   ButtonMenu,
   ButtonMenuItem,
   ButtonMenuItemProps,
} from "components/ButtonMenu";
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
import "./styles.css";
interface ButtonProp extends ButtonMenuItemProps {
   activeIndex: number;
}

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
   fill: white;
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
      // background: linear-gradient(#3d3d3d, transparent);
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
   background: ${({ theme }) => theme.colors.background};

   button {
      margin-top: 24px;
   }
   * {
      color: ${({ theme }) => theme.colors.text};
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

export interface FeedPagePops extends RouteComponentProps<{ key?: string }> {}

function Feed<FeedPagePops>({ match }) {
   const animalsState = useSelector<AppState, AppState["zoo"]["animals"]>(
      (state) => state.zoo.animals
   );
   const { isXl } = useMatchBreakpoints();
   const isMobile = !isXl;
   const history = useHistory();
   const { account, chainId } = useWeb3React();
   const [swiperRef, setSwiperRef] = useState(null);
   const [activeIndex, setActiveIndex] = useState(1);

   Moralis.initialize(
      chainId === 97
         ? "16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy"
         : "cIGUkzL7pyhM8aC8gIcDiH46QGpsEutO5SAQzTgy"
   );
   Moralis.serverURL =
      chainId === 97
         ? "https://dblpeaqbqk32.usemoralis.com:2053/server"
         : "https://j0ixlvmwc1kz.usemoralis.com:2053/server";

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

   const handleClick = (newIndex) => {
      setActiveIndex(newIndex);
      swiperRef.slideTo(newIndex - 1, 200);
   };

   const handleIndexChange = (obj) => {
      setActiveIndex(obj.activeIndex + 1);
   };

   //  Settings for Zoo vs Market
   let filter = "";
   switch (true) {
      case pathname.includes("myzoo"):
         filter = "myZoo";
         break;
      case pathname.includes("marketplace"):
         filter = "marketplace";
         break;
      default:
         filter = "";
         break;
   }

   //  Filter if in the Zoo or Market
   const isMyZoo = filter === "myZoo";
   let totalAnimalsFiltered = animals.filter((animal) => {
      return (
         animal.owner && animal.owner.toLowerCase() !== account.toLowerCase()
      );
   });
   let myZooAnimalsFiltered = animals.filter((animal) => {
      return (
         animal.owner && animal.owner.toLowerCase() === account.toLowerCase()
      );
   });

   if (toFind && isMyZoo) {
      const ogIndex = myZooAnimalsFiltered.findIndex(
         (a) => a.tokenID === toFind
      );
      const toMove = myZooAnimalsFiltered[0];
      myZooAnimalsFiltered[0] = myZooAnimalsFiltered[ogIndex];
      myZooAnimalsFiltered[ogIndex] = toMove;
   }

   const animalGroup = {};
   let myZooAnimalData = [];
   let totalAnimalData = [];
   // if (isMyZoo) {
   myZooAnimalsFiltered.forEach((animal) => {
      // AF[1,2,3,2,1] //AD[1,2,3]
      if (myZooAnimalData.find((a) => a.name === animal.name)) {
         animalGroup[animal.name] = animalGroup[animal.name] + 1 || 2;
      } else {
         myZooAnimalData.push(animal);
      }
      // return animalGroup[animal.kind] === 1 ? true : false
   });
   // } else {
   totalAnimalData = totalAnimalsFiltered;
   // }

   return (
      <Container isMobile={isMobile}>
         <ToggleContainer>
            <ButtonMenu
               activeIndex={activeIndex}
               onItemClick={handleClick}
               scale="sm">
               <StyledMenuButton>
                  <StyledChevron onClick={HomeClick} />
               </StyledMenuButton>
               <ButtonMenuItem as="a">My Zoo</ButtonMenuItem>
               <ButtonMenuItem as="a">Marketplace</ButtonMenuItem>
            </ButtonMenu>
         </ToggleContainer>
         <Swiper
            onSwiper={setSwiperRef}
            onActiveIndexChange={handleIndexChange}
            centeredSlides={isMobile ? true : false}
            spaceBetween={30}
            slidesPerView={1}
            direction="horizontal">
            <SwiperSlide key={1}>
               {myZooAnimalData.length ? (
                  <Swiper
                     spaceBetween={30}
                     slidesPerView={1}
                     direction="vertical">
                     {myZooAnimalData.map((data) => {
                        return (
                           <SwiperSlide key={data.tokenID + "slide"}>
                              <FeedCard
                                 item={data}
                                 key={data.tokenID + "card"}
                                 animalGroup={animalGroup}
                                 hideBid={activeIndex===1}
                              />
                           </SwiperSlide>
                        );
                     })}
                  </Swiper>
               ) : (
                  <EmptyZoo>
                     <Text textAlign="center">
                        There are currently no animals up for auction
                     </Text>
                     <BorderButton scale="md" onClick={HomeClick}>
                        Home
                     </BorderButton>
                  </EmptyZoo>
               )}
            </SwiperSlide>
            <SwiperSlide key={2}>
               <Swiper spaceBetween={30} slidesPerView={1} direction="vertical">
                  {totalAnimalData.map((data, index) => {
                     return data.listed ? (
                        <SwiperSlide key={data.tokenID + "slide"}>
                           <FeedCard
                              item={data}
                              key={data.tokenID + "card"}
                              animalGroup={{}}
                           />
                        </SwiperSlide>
                     ) : (
                        <div key={index}></div>
                     );
                  })}
               </Swiper>
            </SwiperSlide>
         </Swiper>
      </Container>
   );
}

export default withRouter(Feed);

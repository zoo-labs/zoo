import React, { useState, useRef, useEffect } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { AppState } from "state"
import { useSelector } from "react-redux"
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import FlexLayout from "components/layout/Flex";
import Page from "components/layout/Page";
import { orderBy, parseInt } from "lodash";
import {
  Flex,
  Text,
  useMatchBreakpoints,
  Heading,
  Card,
  CardBody,
  EggCard
} from "components";
// import HatchDialog from "components/HatchDialog"
import { VscLoading } from "react-icons/vsc";
// import { ViewMode } from "./components/types"
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "./styles.css";
// import SwiperCore, {
//   Pagination
// } from 'swiper/core';
import MyMP16OSFFont from '../fonts/MP16OSF.ttf'

// install Swiper modules
// SwiperCore.use([Pagination]);

const IconCont = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  & svg {
    color: ${({ theme }) => theme.colors.primary};
    animation: spin 2s ease infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    minHeight: 300px;
    overflow: hidden;
  }
`

const InfoBlock = styled.div`
  padding: 10px;
  text-align: center; 
  position: relative;
  bottom: 0; 
  width: 100%;
  background-color: #ffffff6b;
  z-index: 999999;
`;

const TextWrapper = styled.div`
  text-shadow: 0px 2px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #ffffff;
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 3px;
  text-transform: uppercase;
`

const BreedWrapper = styled.div<{cols?: number}>`
  text-shadow: 0px 2px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  color: #ffffff;
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 3px;
  text-transform: uppercase;
` 

const RowTitle = styled.div`
  @font-face{
    font-family:'MyMP16OSFFont';
    src:url('${MyMP16OSFFont}') format('TrueType');   
  }
  color: white;
  font-family: 'MyMP16OSFFont'; 
  font-size: 20px;
  margin-t: 15px;
  margin-bottom: 15px;
`

const RowLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: calc(100vw - 20px);
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`

const _loadCount = 9;

const EggMarketplace: React.FC = () => {
  let empty;
  const {account} = useWeb3React()
  const { path } = useRouteMatch();
  const { chainId } = useWeb3React();
  const [numVisData, setNumVisData] = useState(_loadCount);
  const [observerIsSet, setObserverIsSet] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isXl, isXs } = useMatchBreakpoints();
  const chainIdSet = chainId === undefined ? "1" : String(chainId);

  const allAnimals = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)
  const allEggs = useSelector<AppState, AppState['zoo']['eggs']>((state) => state.zoo.eggs)

  // useEffect(() => {
  //   const showMoreData = (entries) => {
  //     const [entry] = entries;
  //     if (entry.isIntersecting) {
  //       setNumVisData((dataCurrent) => dataCurrent + _loadCount);
  //     }
  //   };

  //   if (!observerIsSet) {
  //     const loadMoreObserver = new IntersectionObserver(showMoreData, {
  //       rootMargin: "0px",
  //       threshold: 1,
  //     });
  //     loadMoreObserver.observe(bottomRef.current);
  //     setObserverIsSet(true);
  //   }
  // }, [observerIsSet]);
  // const shownData = (data) => {
  //   return data.slice(0, numVisData);
  // };


  const renderAnimals = (hybrid): JSX.Element => {
    const animalData = [];
    // const updatedData = []
    Object.values(allAnimals).forEach((animal, index) => {
      animalData.push({
        id: index,
        ...animal,
        name: animal.name.replace(/\u0000/g, ""),
      });
    });
    console.log(animalData)
    empty = animalData.length === 0 && Object.keys(allAnimals).length !== 0;
    // Object.values(updatedTokens)
    //   .filter((tkn) => tkn.isToken)
    //   .forEach((token, ind) => {
    //     if (token.curve === undefined) {
    //       return
    //     }
    //     updatedData.push({ id: ind, ...token })
    //   })

    return (
      <RowLayout>
        <Route exact path={`${path}`}>
          <Swiper slidesPerView={2.2} spaceBetween={10} className="mySwiper">
          {(animalData).filter((item)=>item.bloodline === hybrid).filter((item)=>item.owner === account).map((animal) => (
            <SwiperSlide>
              <Card key={animal.id}>
                <CardBody style={{backgroundImage: `url("${animal.imageUrl}")`, backgroundSize: 'cover', backgroundPosition: 'center', height: 250, width: 'calc(100vw/2.2 - 13px)', padding: 20}}>
                  <Heading mb="8px" style={{textShadow: '0px 2px rgba(0, 0, 0, 0.2)'}}>{animal.name}</Heading>
                </CardBody>
                  <InfoBlock>
                    <BreedWrapper>{hybrid === "pure" ? `BREED` : `SELL`}</BreedWrapper>
                  </InfoBlock>
              </Card>
            </SwiperSlide>
              // <SwiperSlide>Slide 1</SwiperSlide>
          ))}
          </Swiper>
        </Route>
        <Route exact path={`${path}/history`}>
          {/* {shownData(animalData).map((animal) => ( */}
          {(animalData).map((animal) => (
            <Card
            // key={JSON.stringify(token)}
            />
          ))}
        </Route>
      </RowLayout>
    );
  };

  const renderEggs = (): JSX.Element => {
    const eggData = [];
    // const updatedData = []
    Object.values(allEggs).forEach((egg, index) => {
      eggData.push({
        id: index,
        ...egg,
        name: egg.basic ? "BASIC" : "HYBRID"
      });
    });
    empty = eggData.length === 0 && Object.keys(allEggs).length !== 0;
    const basicEggURL = window.location.origin + '/static/images/basic.png'
    const hybridEggURL = window.location.origin + '/static/images/hybrid.jpeg'

    return (
      <RowLayout>
        <Route exact path={`${path}`}>
          <Swiper slidesPerView={3} spaceBetween={10} pagination={{"clickable": true}} className="mySwiper">
          {(eggData).map((egg) => (
            <SwiperSlide key={egg.id}>
              {/* <Card style={{backgroundColor: '#000000'}}>
                <CardBody style={{backgroundImage: `url("${egg.basic ? basicEggURL : hybridEggURL}")`, backgroundSize: 'cover', backgroundPosition: 'center', height: 150, padding: 10}}>
                  <TextWrapper>{egg.name}</TextWrapper>
                </CardBody>
                <InfoBlock style={{textAlign: 'center', backgroundColor: '#ffffff38', padding: 10}} onClick={() => {onHatch()}}>
                  <TextWrapper >{`HATCH`}</TextWrapper>
                </InfoBlock>  
              </Card> */}
              <EggCard egg={egg} />
            </SwiperSlide>
          ))}
          </Swiper>
        </Route>
        <Route exact path={`${path}/history`}>
          {(eggData).map((egg) => (
            <Card
            // key={JSON.stringify(token)}
            />
          ))}
        </Route>
      </RowLayout>
    );
  };


  return (
    <div>
      <Page>
        <RowTitle>My Eggs</RowTitle>
        {renderEggs()}
        <RowTitle>Breedable Animals</RowTitle>
        {renderAnimals("pure")}
        <RowTitle>Hybrid Animals</RowTitle>
        {renderAnimals("hybrid")}
        {/* <IconCont ref={bottomRef}>
          {" "}
          {numVisData < Object.keys(allEggs).length ? (
            <VscLoading size={36} />
          ) : null}{" "}
        </IconCont> */}
      </Page>
    </div>
  )
};

export default EggMarketplace;

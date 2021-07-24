import React, { useState, useRef, useEffect, cloneElement } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { AppState } from "state"
import { useDispatch, useSelector } from "react-redux"
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Modal, useModal } from "components/Modal";
import FlexLayout from "components/layout/Flex";
import Page from "components/layout/Page";
import { orderBy, parseInt } from "lodash";
import {
  Flex,
  Text,
  useMatchBreakpoints,
  Heading,
  Card as Existing,
  CardBody,
  EggCard
} from "components";
// import HatchDialog from "components/HatchDialog"
import { VscLoading } from "react-icons/vsc";
// import { ViewMode } from "./components/types"
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
// import "./styles.css";
// import SwiperCore, {
//   Pagination
// } from 'swiper/core';
import MyMP16OSFFont from '../fonts/MP16OSF.ttf'
import { Animal, Egg } from "entities/zooentities";
import { addAnimal, addEgg } from "state/actions";
import { ImInsertTemplate } from "react-icons/im";
import BorderButton from "components/Button/BorderButton";
import { FaLessThanEqual } from "react-icons/fa";

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
  padding: 5px;
  text-align: center; 
  position: absolute;
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
  color: white;
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

const Card = styled(Existing)<{selected?: boolean}>`
  border: ${({ selected }) => selected? '2px solid white' : null}
`

const _loadCount = 9;

const EggMarketplace: React.FC = () => {
  let empty;
  const {account} = useWeb3React()
  const { path } = useRouteMatch();
  const { chainId } = useWeb3React();
  const dispatch = useDispatch()
  const [numVisData, setNumVisData] = useState(_loadCount);
  const [observerIsSet, setObserverIsSet] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isXl, isXs } = useMatchBreakpoints();
  const chainIdSet = chainId === undefined ? "1" : String(chainId);

  const allAnimals = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)
  const allEggs = useSelector<AppState, AppState['zoo']['eggs']>((state) => state.zoo.eggs)

  interface Props {
    onDismiss?: () => void
    breed: any
}

  let array = []
  let sellAnimal: Animal = {
    tokenId: "",
    name: "",
    description: "",
    boost: "",
    yield: "",
    rarity: "",
    imageUrl: "",
    dob: "",
    listed: false
  }

  const breed = (onDismiss) => {
    const animal1: Animal = array[0]
    const animal2: Animal = array[1]
    const ID = Object.keys(allAnimals).length
    animal1.bred = true
    animal2.bred = true
    animal1.selected = false
    animal2.selected = false
    

    // const newAnimal: Animal = {
    //     tokenId: (ID + 1).toString(),
    //     name: "Puggerpillar",
    //     imageUrl: "https://i.redd.it/6tt43ut2af331.jpg",
    //     owner: account,
    //     bloodline: "hybrid",
    //     listed: false,
    //     rarity: "Legendary",
    //     yield: "2342",
    //     description: "This little guy",
    //     dob: Date.now().toString(),
    //     boost: "2432",
    //     bred: false
    // }

    const emptyEgg:Egg =
    {
      owner: account,
      tokenId: String(Math.floor(Math.random()*100000000)+1),
      animalId: "3123",
      parent1: "123",
      parent2: "1231",
      basic: false
    }

    array = []
    dispatch(addAnimal(animal1))
    dispatch(addAnimal(animal2))
    // dispatch(addAnimal(newAnimal))
    dispatch(addEgg(emptyEgg))
    onDismiss()
    
  }

  const breedClick = (animal) => {
      const selected = Object.values(allAnimals).filter((item) => item.selected) 
      const toSet:Animal = {...animal}
      toSet.selected = animal.selected ? false : true 

      if(!animal.selected && selected.length === 1){ 
          const temp = [{...selected[0]}, {...animal}] 
          array = temp 
          onConfirm() 
      }
      dispatch(addAnimal(toSet)) 
  }

  const Confirmation: React.FC<Props> = ({onDismiss = () => null, breed}) => {
      const animal1 = array[0]
      const animal2 = array[1]
    return (
        <Modal title="Are you Sure?" onDismiss={onDismiss}>
            <Text>{`You want to breed this ${animal1.name} with this ${animal2.name}?`}</Text>
            <BorderButton onClick={()=>onDismiss()}>Cancel</BorderButton>
            <BorderButton onClick={()=>breed(onDismiss)}>Confirm</BorderButton>
        </Modal>
    )
}

const [onConfirm] = useModal(
  <Confirmation 
    onDismiss={()=>null}
    breed={breed}
  />
)

const list = (animal) => {
  const temp: Animal = {...animal}
  sellAnimal = temp
  onSell()
}

const sell = (onDismiss) => {
  const animal: Animal = sellAnimal
  animal.listed = true
  dispatch(addAnimal(animal))
  onDismiss()
}

const SellConfirm: React.FC<Props> = ({onDismiss = () => null, breed}) => {

  return (
      <Modal title="Are you Sure?" onDismiss={onDismiss}>
          <Text>{`You want to list this ${sellAnimal.name}?`}</Text>
          <BorderButton onClick={()=>onDismiss()}>Cancel</BorderButton>
          <BorderButton onClick={()=>breed(onDismiss)}>Confirm</BorderButton>
      </Modal>
  )
}

const [onSell] = useModal(
  <SellConfirm 
    onDismiss={()=>null}
    breed={sell}
  />
)



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
          <Swiper slidesPerView={2.2} spaceBetween={10}>
          {(animalData).filter((item)=>item.bloodline === hybrid).filter((item)=>item.owner === account).filter((item)=>!item.bred).map((animal) => (
            <SwiperSlide>
              <Card key={animal.id} selected={animal.selected? true : false}>
                <CardBody style={{backgroundImage: `url("${animal.imageUrl}")`, backgroundSize: 'cover', backgroundPosition: 'center', height: 250, width: 'calc(100vw/2.2 - 13px)', padding: 10}}>
                  <TextWrapper style={{textShadow: '0px 2px 6px rgb(0, 0, 0)', textAlign: 'center', fontSize: 16, letterSpacing: 0}}>{animal.name}</TextWrapper>
                </CardBody>
                  <InfoBlock onClick={()=>hybrid === "pure" ? breedClick(animal) : list(animal)}>
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
    // const updatedData = [])
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
          <Swiper slidesPerView={2.2} spaceBetween={10} pagination={{"clickable": true}}>
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

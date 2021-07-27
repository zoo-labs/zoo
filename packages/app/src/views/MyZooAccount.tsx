import React, { useState, useRef, useEffect, cloneElement } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { AppState } from "state";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal, useModal } from "components/Modal";
import Page from "components/layout/Page";
import {
  Flex,
  Text,
  useMatchBreakpoints,
  Heading,
  Card as Existing,
  CardBody,
  EggCard,
  VideoPlayer
} from "components";
// import HatchDialog from "components/HatchDialog"
import { VscLoading } from "react-icons/vsc";
// import { ViewMode } from "./components/types"
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { getMilliseconds, getDaysHours } from "util/timeHelpers";
import { rarityTable, breedTimeouts, eggTimeout } from "constants/constants";
import MyMP16OSFFont from "../fonts/MP16OSF.ttf";
import { Animal, Egg } from "entities/zooentities";
import { addAnimal, addEgg, burnEgg } from "state/actions";
import { ImInsertTemplate } from "react-icons/im";
import BorderButton from "components/Button/BorderButton";
import { FaLessThanEqual } from "react-icons/fa";
import { animalMapping } from 'util/animalMapping'
import NewAnimalCard from 'components/NewAnimal/NewAnimalCard';

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
`;
const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    minheight: 300px;
    overflow: hidden;
  }
`;

const InfoBlock = styled.div`
  padding: 4px;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999999;
  // border-radius: 0px 0px 8px 8px;
`;

const TextWrapper = styled.div`
  text-shadow: 0px 2px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #ffffff;
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const BreedWrapper = styled.div<{ cols?: number }>`
  text-shadow: 0px 2px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  color: #ffffff;
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const RowTitle = styled.div`
  color: white;
  font-size: 20px;
  margin-t: 15px;
  margin-bottom: 15px;
`;

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
`;

const Card = styled(Existing)<{ selected?: boolean; timedOut?: boolean }>`
  border: ${({ selected }) => (selected ? "2px solid white" : null)};
  opacity: ${({ timedOut }) => (timedOut ? "0.6" : null)};
`;

const CardWrapper = styled.div`
  ${Card} {
    border-radius: 8px;
  }
`;
const TimeoutWrapper = styled.div<{ barwidth?: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 1.8;
  // background: white;
  text-align: center;
  color: white;
  padding: 4px;
  text-align: center;
  width: 100%;
  background-color: #a7565e;
  z-index: 999999;
  ::before {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ barwidth }) => barwidth};
    background: grey;
  }
`;
const TimeoutDisplay = styled.span`
  position: relative;
  z-index: 2;
`;

const _loadCount = 9;

const MyZooAccount: React.FC = () => {
  let empty;
  const { account } = useWeb3React();
  const { path } = useRouteMatch();
  const { chainId } = useWeb3React();
  const dispatch = useDispatch();
  const { isXl, isXs } = useMatchBreakpoints();
  const chainIdSet = chainId === undefined ? "1" : String(chainId);
  const [ eggType, setEggType ] = useState('')
  const [ isOpen, setOpen ] = useState(false)
  const [ hatched, setHatched ] = useState(
    {
      tokenId: "",
      name: "",
      description: "",
      yield: "",
      boost: "",
      rarity: "",
      dob: "",
      imageUrl: "",
      listed: false,
  } 
  )

  const allAnimals = useSelector<AppState, AppState["zoo"]["animals"]>(
    (state) => state.zoo.animals
  );
  const allEggs = useSelector<AppState, AppState["zoo"]["eggs"]>(
    (state) => state.zoo.eggs
  );

  interface Props {
    onDismiss?: () => void;
    breed: any;
  }

  let array = [];
  let sellAnimal: Animal = {
    tokenId: "",
    name: "",
    description: "",
    boost: "",
    yield: "",
    rarity: "",
    imageUrl: "",
    dob: "",
    listed: false,
  };


  const hatchEgg = (egg) => {
    setEggType(egg.basic? "basic" : "hybrid")
    const eggStruct = {
        owner: egg.owner
    }
    // console.log("BURNING")
    let randIdx;

    // REPLACE WITH HATCH FUNCTION FROM CONTRACT
    if(egg.basic){
        randIdx = Math.floor(Math.random() * (5 - 1) + 1);
    }
    else {
        randIdx = Math.floor(Math.random() * (13 - 10) + 10);
    }
    // console.log(randIdx)
    const aFromMap = animalMapping[randIdx]
    // console.log(aFromMap, randIdx)
    const newAnimal: Animal = {
        tokenId: Math.floor(Math.random() * (999999 - 0) + 0).toString(),
        animalId: aFromMap.animalId,
        name: aFromMap.name,
        description: aFromMap.description,
        yield: aFromMap.yield,
        boost: aFromMap.boost,
        rarity: aFromMap.rarity,
        dob: aFromMap.dob,
        imageUrl: aFromMap.imageUrl,
        startBid: aFromMap.startBid,
        currentBid: aFromMap.currentBid,
        buyNow: aFromMap.buyNow,
        listed: aFromMap.listed,
        bloodline: aFromMap.bloodline,
        owner: account,
        CTAOverride: { barwidth: null, timeRemainingDaysHours: null },
        timeRemaining: 0,
        breedCount: 0,
        lastBred: ""
    }
    setHatched(newAnimal)
    setOpen(true)
    dispatch(burnEgg(egg))
    dispatch(addAnimal(newAnimal))
    // ---------------------------------------------
  }

  const breed = (onDismiss) => {
    const animal1: Animal = array[0];
    const animal2: Animal = array[1];
    const ID = Object.keys(allAnimals).length;
    array.forEach((animal) => {
      animal.bred = true;
      animal.breedCount = animal.breedCount + 1 || 1;
      const now = new Date().getTime();
      animal.lastBred = new Date().getTime();
      const breedTimeoutKey = animal.breedCount > 5 ? 5 : animal.breedCount;
      const breedTimeout = getMilliseconds(breedTimeouts[breedTimeoutKey]);
      const elapsedTime = now - animal.lastBred

      if (elapsedTime < breedTimeout) {
        const timeRemaining = breedTimeout - elapsedTime;
        const timeRemainingDaysHours = getDaysHours(timeRemaining);
        const barwidth = [100 * (elapsedTime / breedTimeout), "%"].join("");

        animal.timeRemaining = timeRemaining;
        // animal.actionStringOverride = 'data-disabled'
        animal.CTAOverride = { barwidth, timeRemainingDaysHours };

      } else {
        animal.timeRemaining = 0;
        animal.CTAOverride = {
          barwidth: null,
          timeRemainingDaysHours: null,
        };
      }
      animal.selected = false;
    });

    array = [];
    dispatch(addAnimal(animal1));
    dispatch(addAnimal(animal2));

    const egg: Egg = {
      owner: account,
      tokenId: String(Math.floor(Math.random() * 100000000) + 1),
      animalId: "3123",
      parent1: "123",
      parent2: "1231",
      basic: false,
      created: String(new Date().getTime()),
      timeRemaining: 0,
      CTAOverride: null,
    };
    if (!egg.basic) {
      const now = new Date().getTime();
      const createdDate = egg.created
        ? new Date(Number(egg.created)).getTime()
        : new Date().getTime();
      const hatchTimeout = getMilliseconds(eggTimeout);
      const elapsedTime = now - createdDate;

      if (elapsedTime < hatchTimeout) {
        const timeRemaining = hatchTimeout - elapsedTime;
        const timeRemainingDaysHours = getDaysHours(timeRemaining);
        const barwidth = [100 * (elapsedTime / hatchTimeout), "%"].join("");

        egg.timeRemaining = timeRemaining;
        egg.CTAOverride = { barwidth, timeRemainingDaysHours };
      } else {
        egg.timeRemaining = 0;
      }
    } else {
      egg.timeRemaining = 0;
    }
    dispatch(addEgg(egg));
    onDismiss();
  };

  const breedClick = (animal) => {
    const selected = Object.values(allAnimals).filter((item) => item.selected);
    const toSet: Animal = { ...animal };
    toSet.selected = animal.selected ? false : true;

    if (!animal.selected && selected.length === 1) {
      const temp = [{ ...selected[0] }, { ...animal }];
      array = temp;
      onConfirm();
    }
    dispatch(addAnimal(toSet));
  };

  const Confirmation: React.FC<Props> = ({ onDismiss = () => null, breed }) => {
    const animal1 = array[0];
    const animal2 = array[1];
    return (
      <Modal title="Are you Sure?" onDismiss={onDismiss}>
        <Text>{`You want to breed this ${animal1.name} with this ${animal2.name}?`}</Text>
        <BorderButton scale="md" onClick={() => onDismiss()}>
          Cancel
        </BorderButton>
        <BorderButton scale="md" onClick={() => breed(onDismiss)}>
          Confirm
        </BorderButton>
      </Modal>
    );
  };

  const [onConfirm] = useModal(
    <Confirmation onDismiss={() => null} breed={breed} />
  );

  const list = (animal) => {
    const temp: Animal = { ...animal };
    sellAnimal = temp;
    onSell();
  };

  const sell = (onDismiss) => {
    const animal: Animal = sellAnimal;
    animal.listed = true;
    dispatch(addAnimal(animal));
    onDismiss();
  };

  const SellConfirm: React.FC<Props> = ({ onDismiss = () => null, breed }) => {
    return (
      <Modal title="Are you Sure?" onDismiss={onDismiss}>
        <Text>{`You want to list this ${sellAnimal.name}?`}</Text>
        <BorderButton scale="md" onClick={() => onDismiss()}>
          Cancel
        </BorderButton>
        <BorderButton scale="md" onClick={() => breed(onDismiss)}>
          Confirm
        </BorderButton>
      </Modal>
    );
  };

  const [onSell] = useModal(
    <SellConfirm onDismiss={() => null} breed={sell} />
  );

  const onVideoEnd = () => {
    setEggType('')
    setTimeout(()=>{setOpen(false)}, 5000)
  }

  const [timeStartOnPage, setTimeStartOnPage] = useState(new Date().getTime())
  const [elapsedTimeOnPage, setElapsedTimeOnPage] = useState(new Date().getTime() - timeStartOnPage)
  
  useEffect(() => {
    setTimeout(function () {
      setElapsedTimeOnPage(elapsedTimeOnPage + 5000);
    }, 5000);
  },[elapsedTimeOnPage])

  const renderAnimals = (hybrid): JSX.Element => {
    const animalData = [];
    
    Object.values(allAnimalsSorted).forEach((animal, index) => {
      const lastBred = animal.lastBred
      ? new Date(Number(animal.lastBred)).getTime()
      : new Date().getTime();
      const now = new Date().getTime();
      const breedTimeoutKey = animal.breedCount > 5 ? 5 : animal.breedCount || 1;
      const breedTimeout = getMilliseconds(breedTimeouts[breedTimeoutKey]);
      const elapsedTime = now - lastBred;
      const timeRemaining = breedTimeout - elapsedTime;
      const timeRemainingDaysHours = getDaysHours(timeRemaining);
      const barwidth = [100 * (elapsedTime / breedTimeout), "%"].join("");

      animalData.push({
        id: index,
        ...animal,
        name: animal.name.replace(/\u0000/g, ""),
        timeRemaining:
          animal.bloodline === "pure"
            ? animal.breedCount > 0
              ? timeRemaining
              : 0
            : 0,
        CTAOverride:
          animal.bloodline === "pure"
            ? animal.breedCount > 0
              ? { barwidth, timeRemainingDaysHours }
              : null
            : null,
      });
    });
    empty =
      animalData.length === 0 && Object.keys(allAnimalsSorted).length !== 0;

    // Object.values(updatedTokens)
    //   .filter((tkn) => tkn.isToken)
    //   .forEach((token, ind) => {
    //     if (token.curve === undefined) {
    //       return
    //     }
    //     updatedData.push({ id: ind, ...token })
    //   })
    // console.log(animalData)
    

    return (
      <RowLayout>
        <Route exact path={`${path}`}>
          <Swiper slidesPerView={2.2} spaceBetween={10}>
            {animalData
              .filter((item) => item.bloodline === hybrid)
              .filter((item) => item.owner === account)
              .map((animal) => (
                <SwiperSlide>
                  <CardWrapper>
                    <Card
                      key={animal.id}
                      selected={animal.selected ? true : false}
                      timedOut={animal.timeRemaining > 0 ? true : false}
                    >
                      <CardBody
                        style={{
                          backgroundImage: `url("${animal.imageUrl}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          height: 250,
                          width: "calc(100vw/2.2 - 13px)",
                          padding: 10,
                        }}
                      >
                        <TextWrapper
                          style={{
                            textShadow: "0px 2px 6px rgb(0, 0, 0)",
                            textAlign: "center",
                            fontSize: 20,
                            letterSpacing: 0,
                          }}
                        >
                          {animal.name}
                        </TextWrapper>
                        {animal.timeRemaining > 0 ? (
                          <TimeoutWrapper
                            barwidth={
                              animal.CTAOverride
                                ? animal.CTAOverride.barwidth
                                : 0
                            }
                          >
                            <TimeoutDisplay>
                              {`${animal.CTAOverride.timeRemainingDaysHours.days}D ${animal.CTAOverride.timeRemainingDaysHours.hours}H`}
                            </TimeoutDisplay>
                          </TimeoutWrapper>
                        ) : (
                          <InfoBlock
                            onClick={() =>
                              hybrid === "pure"
                                ? breedClick(animal)
                                : list(animal)
                            }
                          >
                            <BreedWrapper>
                              {hybrid === "pure" ? `BREED` : `SELL`}
                            </BreedWrapper>
                          </InfoBlock>
                        )}
                      </CardBody>
                    </Card>
                  </CardWrapper>
                </SwiperSlide>
                // <SwiperSlide>Slide 1</SwiperSlide>
              ))}
          </Swiper>
        </Route>
        <Route exact path={`${path}/history`}>
          {/* {shownData(animalData).map((animal) => ( */}
          {animalData.map((animal) => (
            <Card
              key={animal.id}
              // key={JSON.stringify(token)}
            />
          ))}
        </Route>
      </RowLayout>
    );
  };

  const renderEggs = (): JSX.Element => {
    const eggData = [];
    Object.values(allEggsSorted).forEach((egg, index) => {
      const createdDate = egg.created
      ? new Date(Number(egg.created)).getTime()
      : new Date().getTime();
      const now = new Date().getTime();
      const hatchTimeout = getMilliseconds(eggTimeout);
      const elapsedTime = now - createdDate;
      const timeRemaining = hatchTimeout - elapsedTime;
      const timeRemainingDaysHours = getDaysHours(timeRemaining);
      const barwidth = [100 * (elapsedTime / hatchTimeout), "%"].join("");
      // const barwidth = [50, '%'].join('')

      eggData.push({
        id: index,
        ...egg,
        name: egg.basic ? "BASIC" : "HYBRID",
        timeRemaining: !egg.basic
          ? elapsedTime < hatchTimeout
            ? timeRemaining
            : 0
          : 0,
        CTAOverride: !egg.basic
          ? elapsedTime < hatchTimeout
            ? { barwidth, timeRemainingDaysHours }
            : null
          : null,
      });
    });
    // console.log(eggData);
    empty = eggData.length === 0 && Object.keys(allEggsSorted).length !== 0;
    const basicEggURL = window.location.origin + "/static/images/basic.png";
    const hybridEggURL = window.location.origin + "/static/images/hybrid.jpeg";

    return (
      <RowLayout>
        <Route exact path={`${path}`}>
          <Swiper
            slidesPerView={3.5}
            spaceBetween={10}
            pagination={{ clickable: true }}
          >
            {eggData.map((egg) => (
              <SwiperSlide key={egg.id}>
                <EggCard egg={egg} hatchEgg={hatchEgg}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </Route>
        <Route exact path={`${path}/history`}>
          {eggData.map((egg) => (
            <Card
              key={egg.id}
              // key={JSON.stringify(token)}
            />
          ))}
        </Route>
      </RowLayout>
    );
  };
  const allAnimalsSorted = Object.values(allAnimals).sort((a, b) => {
    if (a.timeRemaining === b.timeRemaining) {
      if (a.bloodline) {
        if (b.bloodline) return 0;
        return -1;
      }
      if (b.bloodline) return 1;
      return 0;
    }
    return a.timeRemaining - b.timeRemaining;
  });
  const allEggsSorted = Object.values(allEggs).sort((a, b) => {
    if (a.timeRemaining === b.timeRemaining) {
      if (a.basic) {
        if (b.basic) return 0;
        return -1;
      }
      if (b.basic) return 1;
      return 0;
    }
    return a.timeRemaining - b.timeRemaining;
  });

  return (  
  <div>
    {eggType !== '' ? 
      <VideoPlayer videoPath={eggType === 'basic' ? "hatch_mobile_basic.mp4": "hatch_mobile_hybrid.mp4"} onDone={() => onVideoEnd()}/> : 
      isOpen ? <NewAnimalCard animal={hatched} isOpen={setOpen}/> :
    <Page>
      {/* <RowTitle>My Eggs</RowTitle> */}
      {renderEggs()}
      <RowTitle>Breedable Animals</RowTitle>
      {renderAnimals("pure")}
      <RowTitle>Hybrid Animals</RowTitle>
      {renderAnimals("hybrid")}
    </Page>
  }
  </div>
  )
};

export default MyZooAccount;

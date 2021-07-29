import React, { useState, useEffect } from "react";
import { Route, useRouteMatch, Link } from "react-router-dom";
import { AppState } from "state";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal, useModal } from "components/Modal";
import Page from "components/layout/Page";
import {
  Text,
  useMatchBreakpoints,
  Card as Existing,
  CardBody,
  EggCard,
  VideoPlayer,
  Flex,
} from "components";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { getMilliseconds, getDaysHours } from "util/timeHelpers";
import { breedTimeouts, eggTimeout } from "constants/constants";
import { Animal, Egg } from "entities/zooentities";
import { addAnimal, addEgg, burnEgg } from "state/actions";
import BorderButton from "components/Button/BorderButton";
import { animalMapping } from "util/animalMapping";
import NewAnimalCard from "components/NewAnimal/NewAnimalCard";
import { FaShoppingCart } from "react-icons/fa";
import StickyBottomMenu from "components/Button/StickyBottomMenu";
import { useHistory } from "react-router-dom";
import { RarityColor } from "enums/rarity-color";
import SwiperCard from "components/Card/SwipeCard";

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
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 999999;
  // border-radius: 0px 0px 8px 8px;
`;

const TextWrapper = styled.div`
  text-shadow: 0px 2px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const BreedWrapper = styled.div<{ cols?: number }>`
  text-shadow: 0px 2px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const RowTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  margin-t: 15px;
  margin-bottom: 15px;
  margin-left: 10px;
  font-weight: 600;
`;

const RowLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & > * {
    // min-width: calc(100vw - 20px);
    // max-width: 31.5%;
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
//  #a7565e;
const TimeoutWrapper = styled.div<{ barwidth?: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 1.8;
  // background: white;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
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

const BidPriceInput = styled.input.attrs({
   type: 'number',
   min: 1
})`
   width: 100%;
   line-height: 1.5rem;
   margin-left: 15px;
`;

const TimeoutDisplay = styled.span`
  position: relative;
  z-index: 2;
  display: flex;
`;

const MyZooAccount: React.FC = () => {
  let empty;
  const { account } = useWeb3React();
  const { path } = useRouteMatch();
  const { chainId } = useWeb3React();
  const dispatch = useDispatch();
  const { isXl, isXs } = useMatchBreakpoints();
  const chainIdSet = chainId === undefined ? "1" : String(chainId);
  const [eggType, setEggType] = useState("");
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();
  const [showBoth, setShowBoth] = useState(false);
  const [hatched, setHatched] = useState({
    tokenId: "",
    name: "",
    description: "",
    yield: "",
    boost: "",
    rarity: "",
    dob: "",
    imageUrl: "",
    listed: false,
  });
  const handleRedirect = () => {
    history.push("/feed");
  };

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
    setShowBoth(true);
    setEggType(egg.basic ? "basic" : "hybrid");

    let randIdx: number;

    // REPLACE WITH HATCH FUNCTION FROM CONTRACT
    if (egg.basic) {
      randIdx = Math.floor(Math.random() * (5 - 1) + 1);
    } else {
      randIdx = Math.floor(Math.random() * (13 - 10) + 10);
    }
    // console.log(randIdx);
    const aFromMap = animalMapping[randIdx];
    // console.log(aFromMap, randIdx);
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
      lastBred: "",
    };
    setHatched(newAnimal);

    dispatch(burnEgg(egg));
    dispatch(addAnimal(newAnimal));
    // ---------------------------------------------
    setTimeout(() => setOpen(true), 5450);
    setTimeout(() => setEggType(""), 7000);
  };

  const breed = (onDismiss) => {
    const animal1: Animal = array[0];
    const animal2: Animal = array[1];
    array.forEach((animal) => {
      animal.bred = true;
      animal.breedCount = animal.breedCount + 1 || 1;
      const now = new Date().getTime();
      animal.lastBred = new Date().getTime();
      const breedTimeoutKey = animal.breedCount > 5 ? 5 : animal.breedCount;
      const breedTimeout = getMilliseconds(breedTimeouts[breedTimeoutKey]);
      const elapsedTime = now - animal.lastBred;

      if (elapsedTime < breedTimeout) {
        const timeRemaining = breedTimeout - elapsedTime;
        const timeRemainingDaysHours = getDaysHours(timeRemaining);
        const barwidth = [100 * (elapsedTime / breedTimeout), "%"].join("");

        animal.timeRemaining = timeRemaining;
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
    onEggCreated();
    // onDismiss();
  };

  const Confirmation: React.FC<Props> = ({ onDismiss = () => null, breed }) => {
    const animal1 = array[0];
    const animal2 = array[1];
    const cancel = () => {
      animal1.selected = false;
      animal2.selected = false;
      dispatch(addAnimal(animal1));
      dispatch(addAnimal(animal2));
      onDismiss();
    };
    return (
      <Modal title="Confirm Breed" onDismiss={onDismiss}>
        <Text color="text">
          {`Do you want to breed ${animal1.name} with ${animal2.name}?`}
        </Text>
        <Flex
          style={{ marginTop: 15 }}
          width="100%"
          alignItems="center"
          justifyContent="space-around"
        >
          <BorderButton scale="sm" onClick={() => breed(onDismiss)}>
            YES
          </BorderButton>
          <BorderButton scale="sm" onClick={() => onDismiss()}>
            NO
          </BorderButton>
        </Flex>
      </Modal>
    );
  };

  const EggCreatedNotify: React.FC<any> = ({ onDismiss = () => null }) => {
    return (
      <Modal title="Success" style={{ width: "230px" }} onDismiss={onDismiss}>
        <Text color="text">Hybrid egg created successfully</Text>
        <Flex style={{ marginTop: 15 }}>
          <BorderButton scale="sm" onClick={() => onDismiss()}>
            OK
          </BorderButton>
        </Flex>
      </Modal>
    );
  };

  const [onConfirm] = useModal(
    <Confirmation onDismiss={() => null} breed={breed} />
  );

  const [onEggCreated] = useModal(<EggCreatedNotify onDismiss={() => null} />);

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
      <Modal title="Confirm Listing" onDismiss={onDismiss}>
        <Text style={{textAlign: "center"}}>{`Do you want to list ${sellAnimal.name}?`}</Text>
        <Flex 
         width="100%"
          alignItems="center"
          justifyContent="space-evenly"
          flexDirection="row"
          mt="16px">
            <Text
               fontSize="20px"
               style={{ whiteSpace: 'nowrap', marginTop: '5px'}}
               >
               BID PRICE
            </Text>
            <BidPriceInput type="number" />
        </Flex>
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="space-evenly"
          flexDirection="row"
          mt="16px"
        >
          <BorderButton scale="md" onClick={() => breed(onDismiss)}>
            Confirm
          </BorderButton>
          <BorderButton scale="md" onClick={() => onDismiss()}>
            Cancel
          </BorderButton>
        </Flex>
      </Modal>
    );
  };

  const [onSell] = useModal(
    <SellConfirm onDismiss={() => null} breed={sell} />
  );

  const [timeStartOnPage, setTimeStartOnPage] = useState(new Date().getTime());
  const [elapsedTimeOnPage, setElapsedTimeOnPage] = useState(
    new Date().getTime() - timeStartOnPage
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(function () {
        setElapsedTimeOnPage(elapsedTimeOnPage + 5000);
      }, 5000);
    }
    return () => {
      mounted = false;
    };
  }, [elapsedTimeOnPage]);
   

  const renderAnimals = (hybrid): JSX.Element => {
    let animalGroup = {};
    const animalData = [];
    const now = new Date().getTime();

    const breedClick = (animal) => {
      const selected = Object.values(allAnimals).filter(
        (item) => item.selected
      );
      const toSet: Animal = { ...animal };
      if (
        animal.selected &&
        selected.length === 1 &&
        animalGroup[animal.animalId] > 1
      ) {
        const multipleAvailable = Object.values(allAnimals).filter(
          (item) =>
            item.animalId === animal.animalId && item.timeRemaining === 0
        );
        const temp = [{ ...multipleAvailable[0] }, { ...multipleAvailable[1] }];
        array = temp;
        onConfirm();
      }
      toSet.selected = animal.selected ? false : true;
      if (!animal.selected && selected.length === 1) {
        const temp = [{ ...selected[0] }, { ...animal }];
        array = temp;
        onConfirm();
      }
      dispatch(addAnimal(toSet));
    };

    Object.values(allAnimals).forEach((animal, index) => {
      if (animal.owner !== account) {
        return;
      }
      const lastBred = animal.lastBred
        ? new Date(Number(animal.lastBred)).getTime()
        : new Date().getTime();
      const now = new Date().getTime();
      const breedTimeoutKey =
        animal.breedCount > 5 ? 5 : animal.breedCount || 0;
      const breedTimeout = getMilliseconds(breedTimeouts[breedTimeoutKey]);
      const elapsedTime = now - lastBred;
      const timeRemaining = breedTimeout - elapsedTime;
      const timeRemainingDaysHours = getDaysHours(timeRemaining);
      const barwidth = [100 * (elapsedTime / breedTimeout), "%"].join("");

      if (
        timeRemaining <= 0 &&
        animalData.find(
          (a) => a.animalId === animal.animalId && a.timeRemaining <= 0
        )
      ) {
        animalGroup[animal.animalId] = animalGroup[animal.animalId] + 1 || 2;
      } else {
        animalData.push({
          id: index,
          ...animal,
          name: animal.name.replace(/\u0000/g, ""),
          timeRemaining:
            animal.bloodline === "pure"
              ? elapsedTime < breedTimeout
                ? timeRemaining
                : 0
              : 0,
          CTAOverride:
            animal.bloodline === "pure"
              ? elapsedTime < breedTimeout
                ? { barwidth, timeRemainingDaysHours }
                : null
              : null,
          rarityColor: RarityColor[animal.rarity.toLowerCase()] || "white",
        });
      }
    });

    empty = animalData.length === 0 && Object.keys(animalData).length !== 0;

    let animals = animalData.filter((item) => item.bloodline === hybrid);
    animals = sortData(animals, "bloodline");

    return (
      <>
        {hybrid === "pure" ? (
          <RowTitle>
            {animals.length}{" "}
            {animals.length != 1 ? "Breedable Animals" : "Breedable Animal"}
          </RowTitle>
        ) : (
          <RowTitle>
            {animals.length}{" "}
            {animals.length != 1 ? "Hybrid Animals" : "Hybrid Animal"}
          </RowTitle>
        )}
        <RowLayout>
          <Route exact path={`${path}`}>
            {animals.length === 0 ? (
              <Text textAlign="center" fontSize="16px">
                No {hybrid === "pure" ? `breedable` : `hybrid`} animals
              </Text>
            ) : (
              <Swiper slidesPerView={2.2} spaceBetween={10}>
                {animals.map((animal) => (
                  <SwiperSlide style={{ padding: "3px",  width:"auto", display:"flex"}} key={animal.tokenId}>
                      {/* <CardWrapper> */}
                         <SwiperCard animal={animal}
                            group={animalGroup}
                            imageURL={`url("${animal.imageUrl}")`}
                            onInfoClick={() =>
                                hybrid === "pure"
                                  ? breedClick(animal)
                                  : list(animal)}
                         />
                      {/* <Card
                        style={{
                          boxShadow: `0px 0px 13px -2px ${animal.rarityColor}`,
                        }}
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
                          <Link
                            to={`/feed/myzoo/${animal.tokenId}`}>
                            <TextWrapper
                                style={{
                                  textShadow:
                                      "0px 2px 6px rgb(0, 0, 0)",
                                  fontSize: 18,
                                  letterSpacing: 0,
                                  position: "absolute",
                                  textTransform: "lowercase",
                                  right: 11,
                                  top: 9,
                                }}>
                                {animal.timeRemaining === 0
                                  ? animalGroup[animal.animalId]
                                      ? `x${
                                          animalGroup[animal.animalId]
                                        }`
                                      : ""
                                  : ""}
                            </TextWrapper>
                            <TextWrapper
                                style={{
                                  textShadow:
                                      "0px 2px 6px rgb(0, 0, 0)",
                                  textAlign: "center",
                                  fontSize: 16,
                                  letterSpacing: 0,
                                height: "100%",
                                  paddingRight: animalGroup[animal.animalId] ? '26px' : null
                                }} >
                                {animal.name}
                            </TextWrapper>
                          </Link>
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
                      </Card> */}
                    {/* </CardWrapper> */}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Route>
          <Route exact path={`${path}/history`}>
            {animalData.map((animal) => (
              <Card key={animal.id} />
            ))}
          </Route>
        </RowLayout>
      </>
    );
  };

  const renderEggs = (): JSX.Element => {
    let eggData = [];
    // let eggGroup = {
    //    BASIC: 1,
    //    HYBRID: 1
    // };

    Object.values(allEggs).forEach((egg, index) => {
      const eggType = egg.basic ? "BASIC" : "HYBRID";
      const createdDate = egg.created
        ? new Date(Number(egg.created)).getTime()
        : new Date().getTime();
      const now = new Date().getTime();
      const hatchTimeout = egg.basic ? 0 : getMilliseconds(eggTimeout);
      const elapsedTime = now - createdDate;
      const timeRemaining = hatchTimeout - elapsedTime;
      const timeRemainingDaysHours = getDaysHours(timeRemaining);
      const barwidth = [100 * (elapsedTime / hatchTimeout), "%"].join("");

      //  if (timeRemaining <= 0 && eggData.find(a => a.basic === egg.basic && a.timeRemaining <= 0)) {
      //     eggGroup[eggType] = eggGroup[eggType] + 1
      //  } else {
      eggData.push({
        id: index,
        ...egg,
        name: eggType,
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
      //  }
    });
    empty = eggData.length === 0 && Object.keys(eggData).length !== 0;
    eggData = sortData(eggData, "basic");

    return (
      <RowLayout>
        <Route exact path={`${path}`}>
          {eggData.length === 0 ? (
            <Text textAlign="center" fontSize="16px">
              No eggs
            </Text>
          ) : (
            <Swiper
              slidesPerView={document.body.getBoundingClientRect().width / 140}
              spaceBetween={0}
              pagination={{ clickable: true }}
            >
              {eggData.map((egg) => (
                <SwiperSlide key={egg.id}>
                  <EggCard egg={egg} hatchEgg={hatchEgg} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Route>
        <Route exact path={`${path}/history`}>
          {eggData.map((egg) => (
            <Card key={egg.id} />
          ))}
        </Route>
      </RowLayout>
    );
  };

  const sortData = (data: Array<any>, byType: string) => {
    return data.sort((a, b) => {
      if (a.timeRemaining === b.timeRemaining) {
        if (a[byType]) {
          if (b[byType]) return 0;
          return -1;
        }
        if (b[byType]) return 1;
        return 0;
      }
      return a.timeRemaining - b.timeRemaining;
    });
  };

  return (
    <div>
      {eggType !== "" && (
        <VideoPlayer
          videoPath={
            eggType === "basic"
              ? "hatch_mobile_basic.mp4"
              : "hatch_mobile_hybrid.mp4"
          }
        />
      )}
      {isOpen ? (
        <NewAnimalCard animal={hatched} isOpen={setOpen} />
      ) : (
        <>
          {eggType === "" && renderEggs()}
          {eggType === "" && renderAnimals("pure")}
          {eggType === "" && renderAnimals("hybrid")}
        </>
      )}
    </div>
  );
};

export default MyZooAccount;

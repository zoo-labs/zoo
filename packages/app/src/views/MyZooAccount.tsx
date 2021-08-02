import React, { useState, useEffect, useCallback } from "react";
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
import Moralis from "moralis";

// install Swiper modules
// SwiperCore.use([Pagination]);

const StyledText = styled(Text)`
   color: ${({ theme }) => theme.colors.text};
`

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
    min-height: 300px;
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
    margin: 8px;
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

const SwiperContainer = styled.div`
  * {
    background: ${({ theme }) => theme.colors.background}
  }
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
  const videoTimeout = [];
  const bid = React.useRef(100);
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


  const hatchEgg = async(egg) => {
    setShowBoth(true);
    setEggType(egg.basic ? "basic" : "hybrid");

    let randIdx: number;

    // REPLACE WITH HATCH FUNCTION FROM CONTRACT
    if (egg.basic) {
      randIdx = Math.floor(Math.random() * (5 - 1) + 1);
    } else {
      randIdx = Math.floor(Math.random() * (13 - 10) + 10);
    }
    const eggID = parseInt(egg.tokenId);
    const tokenID = Math.floor(Math.random() * (999999 - 0) + 0);

    const mObject = Moralis.Object.extend("FinalEggs");
    const query = new Moralis.Query(mObject);
    query.equalTo("EggID", eggID);
    const eggM = await query.find();
    const eggRes = eggM[0];


    
    setTimeout(() => setOpen(true), 3850);
    setTimeout(() => setEggType(""), 7000);
    console.log(eggRes)
    eggRes.set("Burned", true);
    eggRes.destroy();

    // console.log(randIdx);
    const aFromMap = animalMapping[randIdx];

    const mAnimal = Moralis.Object.extend("FinalAnimals");
      const newAnimalM = new mAnimal();
      // AnimalID Owner TokenURI MetaURI BlockNumber Rarirty Yield Boost AnimalTypeID Name
      newAnimalM.set("AnimalID", tokenID);
      newAnimalM.set("Owner", account);
      newAnimalM.set("TokenURI", aFromMap.imageUrl);
      newAnimalM.set("MetaURI", "META URI");
      newAnimalM.set(
         "BlockNumber",
         Math.floor(Math.random() * (999999 - 0) + 0)
      );
      newAnimalM.set("Rarity", aFromMap.rarity);
      newAnimalM.set("Yield", aFromMap.yield);
      newAnimalM.set("Boost", aFromMap.boost);
      newAnimalM.set("Name", aFromMap.name);
      newAnimalM.set("AnimalTypeID", aFromMap.animalId);
      newAnimalM.set("StartBid", aFromMap.startBid);
      newAnimalM.set("CurrentBid", aFromMap.currentBid);
      newAnimalM.set("Listed", false);
      newAnimalM.set("Bloodline", aFromMap.bloodline);
      newAnimalM.set("TimeRemaining", 0);
      newAnimalM.set("BreedCount", 0);
      newAnimalM.set("lastBred", "");
      await newAnimalM.save();
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

    const TransOb = Moralis.Object.extend("Transactions")
    const newTrans = new TransOb

    newTrans.set("From", account)
    newTrans.set("Action", "Hatched Egg")
    newTrans.set("TokenID", eggID)
    newTrans.set("AnimalName", aFromMap.name)
    newTrans.set("AnimalTokenID", tokenID)
    newTrans.save()

    dispatch(burnEgg(egg));
    dispatch(addAnimal(newAnimal));
    // ---------------------------------------------
    startAnimationTimer();
  };

  const startAnimationTimer = useCallback(() => {
    videoTimeout.push(setTimeout(() => setOpen(true), 5450));
    videoTimeout.push(setTimeout(() => setEggType(""), 7000));
  },[]);

  const closeAnimation = useCallback(async (e) => {
    setEggType("")
    videoTimeout.forEach((i)=>{
      clearTimeout(i)
    })
  },[]);

  useEffect(() => {
      document.addEventListener("keydown", closeAnimation , false)
      return () => {
        document.removeEventListener("keydown", closeAnimation, false);
      }
  },[]);

  const breed = async (onDismiss) => {

    const an1 = parseInt(array[0].tokenId);
      const an2 = parseInt(array[1].tokenId);
      const anOb = Moralis.Object.extend("FinalAnimals");
      const anQ1 = new Moralis.Query(anOb);
      const anQ2 = new Moralis.Query(anOb);
      anQ1.equalTo("AnimalID", an1);
      anQ2.equalTo("AnimalID", an2);
      const res1 = await anQ1.find();
      const res2 = await anQ2.find();
      const aniM1 = res1[0];
      const aniM2 = res2[0];
      const mArray = [aniM1, aniM2];

      // lastBred TimeRemaining BreedCount
    mArray.forEach((animal) => {
         const count = animal.get("BreedCount");
         animal.set("BreedCount", count + 1 || 1);
         animal.breedCount = animal.breedCount + 1 || 1;
         const now = new Date().getTime();
         const time = new Date().getTime();
         animal.set("lastBred", time.toString());
         const breedTimeoutKey = animal.breedCount > 5 ? 5 : animal.breedCount;
         const breedTimeout = getMilliseconds(breedTimeouts[breedTimeoutKey]);
         const elapsedTime = now - animal.lastBred;

         if (elapsedTime < breedTimeout) {
            const timeRemaining = breedTimeout - elapsedTime;
            const timeRemainingDaysHours = getDaysHours(timeRemaining);
            const barwidth = [100 * (elapsedTime / breedTimeout), "%"].join("");

            animal.set("TimeRemaining", timeRemaining);
            animal.set("CTAOverride", { barwidth, timeRemainingDaysHours });
         } else {
            animal.set("TimeRemaining", 0);
            animal.set("CTAOverride", {
               barwidth: null,
               timeRemainingDaysHours: null,
            });
         }
         animal.set("Selected", false);
         animal.save();
      });

      //@dev Redux Logic to be Removed
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
    // dispatch(addAnimal(animal1));
    // dispatch(addAnimal(animal2));

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

      const mObject = Moralis.Object.extend("FinalEggs");
      const mEgg = new mObject();
      mEgg.set("EggID", parseInt(egg.tokenId));
      mEgg.set("Parent1", parseInt(egg.parent1));
      mEgg.set("MetaURI", "META URI");
      mEgg.set("Parent2", parseInt(egg.parent2));
      mEgg.set("Burned", false);
      mEgg.set("AnimalTypeId", egg.animalId);
      mEgg.set("TokenURI");
      mEgg.set("Owner", account);
      mEgg.set("BlockNumber");
      mEgg.set("Type", "hybrid");
      await mEgg.save();
    
    // dispatch(addEgg(egg));
    onEggCreated();

    const TransOb = Moralis.Object.extend("Transactions")
    const newTrans = new TransOb

    newTrans.set("From", account)
    newTrans.set("Action", "Bred Animals")
    newTrans.set("TokenID", parseInt(egg.tokenId))
    newTrans.set("Parent1", aniM1.attributes.Name)
    newTrans.set("Parent2", aniM2.attributes.Name)
    newTrans.save()

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
        <StyledText color="text">
          {`Do you want to breed ${animal1.name} with ${animal2.name}?`}
        </StyledText>
        <Flex
          style={{ marginTop: 15 }}
          width="100%"
          alignItems="center"
          justifyContent="space-around"
        >
          <BorderButton scale="sm" onClick={() => breed(onDismiss)}>
            YES
          </BorderButton>
          <BorderButton scale="sm" onClick={cancel}>
            NO
          </BorderButton>
        </Flex>
      </Modal>
    );
  };

  const EggCreatedNotify: React.FC<any> = ({ onDismiss = () => null }) => {
    return (
      <Modal title="Success" style={{ width: "230px" }} onDismiss={onDismiss}>
        <StyledText color="text">Hybrid egg created successfully</StyledText>
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

  const sell = async (onDismiss) => {
    const animal: Animal = sellAnimal;
    const animalObject = Moralis.Object.extend("FinalAnimals");
    const query = new Moralis.Query(animalObject);
    query.equalTo("AnimalID", parseInt(animal.tokenId));
    const results = await query.find();
    const animalM = results[0];
    animalM.set("Listed", true);
    animalM.set("StartBid", String(bid.current));
    animalM.set("CurrentBid", String(bid.current - 1));
    animalM.set("BuyNow", String(bid.current + 100));
    await animalM.save();
    // animal.listed = true;
    // dispatch(addAnimal(animal));
    const TransOb = Moralis.Object.extend("Transactions")
       const newTrans = new TransOb

       newTrans.set("From", account)
       newTrans.set("Action", "Listed Animal")
       newTrans.set("TokenID", parseInt(animal.tokenId))
       newTrans.set("StartingBid", String(bid.current))
       newTrans.set("AnimalName", animalM.attributes.Name)
       newTrans.save()
    bid.current = 100;

    onDismiss();
  };

  const changed = () => (e) => {
    bid.current = e.target.value;
 };

  const SellConfirm: React.FC<Props> = ({ onDismiss = () => null, breed }) => {
    return (
      <Modal title="Confirm Listing" onDismiss={onDismiss}>
        <StyledText style={{textAlign: "center"}}>{`Do you want to list ${sellAnimal.name}?`}</StyledText>
        <Flex
         width="100%"
          alignItems="center"
          justifyContent="space-evenly"
          flexDirection="row"
          mt="16px">
            <StyledText
               fontSize="20px"
               style={{ whiteSpace: 'nowrap', marginTop: '5px'}}
               >
               BID PRICE
            </StyledText>
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
    const timeout = setTimeout(() => {
      setElapsedTimeOnPage(elapsedTimeOnPage + 5000);
    }, 5000);
    return () => {
        clearTimeout(timeout);
    }
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
        animalGroup[animal.animalId] = animalGroup[animal.animalId] + 1 || 1;
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
              <StyledText textAlign="center" fontSize="16px">
                No {hybrid === "pure" ? `breedable` : `hybrid`} animals
              </StyledText>
            ) : (
                      <Swiper
                         slidesPerView={document.body.getBoundingClientRect().width / 220}
                        spaceBetween={8}
                        pagination={{ clickable: true }}
                      >
                {animals.map((animal) => (
                  <SwiperSlide style={{width: "220px", display: "flex"}} key={animal.tokenId}>
                      {/* <CardWrapper> */}
                         <SwiperCard animal={animal}
                            eggType={animal.bloodline}
                            group={animalGroup}
                            onInfoClick={() =>
                                hybrid === "pure"
                                ? breedClick(animal)
                                : !animal.listed
                                ? list(animal)
                                : null}
                         />
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
      if (egg.owner !== account) {
         return;
       }
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
        if (egg.owner === account && !egg.burned) {
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
       }
      //  }
    });
    empty = eggData.length === 0 && Object.keys(eggData).length !== 0;
    eggData = sortData(eggData, "hybrid");

    return (
      <RowLayout>
        <Route exact path={`${path}`}>
          {eggData.length === 0 ? (
            <StyledText textAlign="center" fontSize="16px">
              No eggs
            </StyledText>
          ) : (
            <Swiper
              slidesPerView={document.body.getBoundingClientRect().width / 180}
              spaceBetween={8}
              pagination={{ clickable: true }}
                   >
                      {eggData.map((egg) => (
                             <SwiperSlide style={{ padding: "3px", width: "180", display: "flex"}} key={egg.tokenId}>
                      {/* <CardWrapper> */}
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

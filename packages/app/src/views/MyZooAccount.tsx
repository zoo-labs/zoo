import React, { useState, useEffect, useCallback } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { AppState } from "state";
import { useDispatch, useSelector } from "react-redux";
import Moralis from "moralis";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import { Text, Card as Existing, EggCard, VideoPlayer } from "components";
import { getMilliseconds, getDaysHours } from "util/timeHelpers";
import { breedTimeouts, eggTimeout } from "constants/constants";
// import { Animal } from "entities/zooentities";
import { addAnimal, addEgg, burnEgg } from "state/actions";
// import { animalMapping } from "util/animalMapping";
import NewAnimalCard from "components/NewAnimal/NewAnimalCard";
import { RarityColor } from "enums/rarity-color";
import { AnimalCard } from "components/AnimalCard";
import useWeb3 from "hooks/useWeb3";
import {
  getZooKeeper,
} from "util/contractHelpers";
import { Animal, Egg } from "entities/zooentities";


const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
`;

const RowTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  margin-top: 15px;
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

const MyZooAccount: React.FC = () => {
  const { account, chainId } = useWeb3React();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [eggType, setEggType] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [_, setShowBoth] = useState(false);
  const web3 = useWeb3();
  const zooKeeper = getZooKeeper(web3, chainId);
  const videoTimeout = [];
  const [newEgg, setNewEgg] = useState("")
  const [hatched, setHatched] = useState({
    tokenID: "",
    name: "",
    description: "",
    yield: "",
    boost: "",
    rarity: "",
    dob: "",
    imageUrl: "",
    listed: false,
  });

  const allAnimals = useSelector<AppState, AppState["zoo"]["animals"]>(
    (state) => state.zoo.animals
  );
  const allEggs = useSelector<AppState, AppState["zoo"]["eggs"]>(
    (state) => state.zoo.eggs
  );

  const hatchEggReady = async (egg) => {
    const eggNum = parseInt(egg.tokenID)
    const eggObject = Moralis.Object.extend("FinalEggs")
    const eggQuery = new Moralis.Query(eggObject)
    eggQuery.equalTo("EggID", eggNum)
    const eggResults = await eggQuery.find()
    const foundEgg = eggResults[0]

    foundEgg.set("Burn", true)
    foundEgg.save()

    setShowBoth(true);
    setEggType(egg.basic ? "basic" : "hybrid");

    const animalObject = Moralis.Object.extend("FinalAnimals")
    const animalQuery = new Moralis.Query(animalObject)
    animalQuery.equalTo("AnimalID", egg.animalID)
    const animalResults = await animalQuery.find()
    const foundAnimal = animalResults[0]

    let string = String(foundAnimal.get("createdAt"));
    const replacedString = string.replace("at ", "");
    const date = new Date(replacedString);

    const newAnimal: Animal = {
        owner: String(foundAnimal.get("Owner")),
        tokenID: String(foundAnimal.get("AnimalID")),
        name: foundAnimal.get("Name"),
        description: foundAnimal.get("NA"),
        yield: foundAnimal.get("Yield"),
        boost: foundAnimal.get("Boost"),
        rarity: foundAnimal.get("Rarity"),
        dob: String(date.getTime()),
        startBid: foundAnimal.get("StartBid"),
        currentBid: foundAnimal.get("CurrentBid"),
        imageUrl: foundAnimal.get("TokenURI"),
        listed: foundAnimal.get("Listed"),
        bloodline: foundAnimal.get("AnimalTypeID") === "1" ? "pure" : "hybrid",
        selected: false,
        bred: false,
        breedCount: foundAnimal.get("BreedCount"),
        kind: foundAnimal.get("AnimalTypeID"),
        timeRemaining: foundAnimal.get("TimeRemaining"),
        CTAOverride: foundAnimal.get("CTAOverride"),
        lastBred: foundAnimal.get("lastBred"),
        buyNow: foundAnimal.get("BuyNow"),
        revealed: foundAnimal.get("Revealed"),
        freed: foundAnimal.get("Freed")
      };
    setHatched(newAnimal);
    foundAnimal.set("Revealed", true)
    foundAnimal.save()
    startAnimationTimer();
  }

  const hatchEgg = async (egg) => {
      let tempEgg: Egg = {
        owner: egg.owner,
        tokenID: egg.tokenID,
        kind: egg.kind,
        parentA: egg.parentA,
        parentB: egg.parentB,
        basic: egg.basic,
        timeRemaining: egg.timeRemaining,
        CTAOverride: egg.CTAOverride,
        created: egg.created,
        burned: egg.burned,
        interactable: false,
        hatched: true,
        animalID: egg.animalID,
     };
      dispatch(addEgg(tempEgg));
      try {
        // const token = await zooKeeper.methods.tokens(parseInt(egg.tokenId)).call()
        // setNewEgg(egg.tokenId)
        const numEggID = parseInt(egg.tokenID)
        const gasPrice = await web3.eth.getGasPrice()
        const gasEstimate = await zooKeeper.methods
        .hatchEgg(1, numEggID)
            .estimateGas({ from: account })
        console.log(gasEstimate)
        const hatching = await zooKeeper.methods
        .hatchEgg(1, numEggID)
            .send({
              from: account,
              gasPrice: gasPrice,
              gas: gasEstimate + 10000000,
             })
        console.log(hatching)
      } catch (error) {
        let tempEgg1: Egg = {
          owner: egg.owner,
          tokenID: egg.tokenID,
          kind: egg.kind,
          parentA: egg.parentA,
          parentB: egg.parentB,
          basic: egg.basic,
          timeRemaining: egg.timeRemaining,
          CTAOverride: egg.CTAOverride,
          created: egg.created,
          burned: egg.burned,
          interactable: true,
          hatched: false,
          animalID: egg.animalID,
       };
        dispatch(addEgg(tempEgg1));
        console.log(error)
      }
  };

  const startAnimationTimer = useCallback(() => {
    videoTimeout.push(setTimeout(() => { setOpen(true); setNewEgg("")}, 5450));
    videoTimeout.push(setTimeout(() => setEggType(""), 7000));
  }, []);

  const closeAnimation = useCallback(async (e) => {
    setEggType("");
    videoTimeout.forEach((i) => {
      clearTimeout(i);
    });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", closeAnimation, false);
    return () => {
      document.removeEventListener("keydown", closeAnimation, false);
    };
  }, []);

  const [timeStartOnPage] = useState(new Date().getTime());
  const [elapsedTimeOnPage, setElapsedTimeOnPage] = useState(
    new Date().getTime() - timeStartOnPage
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setElapsedTimeOnPage(elapsedTimeOnPage + 5000);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [elapsedTimeOnPage]);

  const renderAnimals = (hybrid): JSX.Element => {
    const animalGroup = {};
    const animalData = [];

    Object.values(allAnimals).forEach((animal, index) => {
      if (animal.owner.toLowerCase() !== account.toLowerCase() || animal.freed || !animal.revealed) {
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
          (a) => a.name === animal.name && a.timeRemaining <= 0
        )
      ) {
        animalGroup[animal.name] = animalGroup[animal.name] + 1 || 2;
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

    const animals = sortData(
      animalData.filter((item) => item.bloodline === hybrid),
      "bloodline"
    );

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
                spaceBetween={4}
                pagination={{ clickable: true }}
              >
                {animals.map((animal) => (
                  <SwiperSlide
                    style={{ width: "220px", display: "flex" }}
                    key={animal.tokenID}
                  >
                    <AnimalCard
                      {...{ animal, account, animalGroup, hybrid, allAnimals }}
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
      if ((egg.owner).toLowerCase() !== (account).toLowerCase()) {
        //console.log(account, egg)
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
      if (egg.owner.toLowerCase() === account.toLowerCase() && !egg.burned) {
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
    /* if(newEgg !== ""){
      const createdDate = new Date().getTime();
      const now = new Date().getTime();
      const hatchTimeout = getMilliseconds(eggTimeout);
      const elapsedTime = now - createdDate;
      const timeRemaining = hatchTimeout - elapsedTime;
      const timeRemainingDaysHours = getDaysHours(timeRemaining);
      const barwidth = [100 * (elapsedTime / hatchTimeout), "%"].join("");
      eggData.push({
        id: eggData.length + 1,
        name: newEgg === "Base Egg" ? "BASIC" : "HYBRID",
        timeRemaining: timeRemaining,
        CTAOverride: { barwidth, timeRemainingDaysHours },
      });
    } */
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
              slidesPerView={document.body.getBoundingClientRect().width / 220}
              spaceBetween={8}
              pagination={{ clickable: true }}
            >
              {eggData.map((egg) => (

                <SwiperSlide
                  style={{ width: "220px", display: "flex" }}
                  key={egg.tokenID}
                >
                  {/* <CardWrapper> */}
                  <EggCard egg={egg} hatchEgg={hatchEgg} hatchEggReady={hatchEggReady}/>
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

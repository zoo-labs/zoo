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
import { Animal } from "entities/zooentities";
import { addAnimal, burnEgg } from "state/actions";
import { animalMapping } from "util/animalMapping";
import NewAnimalCard from "components/NewAnimal/NewAnimalCard";
import { RarityColor } from "enums/rarity-color";
import { AnimalCard } from "components/AnimalCard";

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
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

const MyZooAccount: React.FC = () => {
  const { account } = useWeb3React();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [eggType, setEggType] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [_, setShowBoth] = useState(false);
  const videoTimeout = [];
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

  const allAnimals = useSelector<AppState, AppState["zoo"]["animals"]>(
    (state) => state.zoo.animals
  );
  const allEggs = useSelector<AppState, AppState["zoo"]["eggs"]>(
    (state) => state.zoo.eggs
  );

  const hatchEgg = async (egg) => {
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
    console.log("egg result", eggRes);
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
    newAnimalM.set("BlockNumber", Math.floor(Math.random() * (999999 - 0) + 0));
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

    const TransOb = Moralis.Object.extend("Transactions");
    const newTrans = new TransOb();

    newTrans.set("From", account);
    newTrans.set("Action", "Hatched Egg");
    newTrans.set("TokenID", eggID);
    newTrans.set("AnimalName", aFromMap.name);
    newTrans.set("AnimalTokenID", tokenID);
    newTrans.save();

    dispatch(burnEgg(egg));
    dispatch(addAnimal(newAnimal));
    // ---------------------------------------------
    startAnimationTimer();
  };

  const startAnimationTimer = useCallback(() => {
    videoTimeout.push(setTimeout(() => setOpen(true), 5450));
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
                slidesPerView={
                  document.body.getBoundingClientRect().width / 220
                }
                spaceBetween={8}
                pagination={{ clickable: true }}
              >
                {animals.map((animal) => (
                  <SwiperSlide
                    style={{ width: "220px", display: "flex" }}
                    key={animal.tokenId}
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
                <SwiperSlide
                  style={{ padding: "3px", width: "180", display: "flex" }}
                  key={egg.tokenId}
                >
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

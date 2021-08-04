import { useEffect, useRef, useState } from "react";
import { cloneDeep } from "lodash";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Route, useRouteMatch } from "react-router-dom";
import Moralis from "moralis";
import { useWeb3React } from "@web3-react/core";

import useWeb3 from "hooks/useWeb3";
import { getZooKeeper } from "util/contractHelpers";
import { Flex } from "components/Box";
import BorderButton from "components/Button/BorderButton";
import { Modal, useModal } from "components/Modal";
import { Text, Card as Existing } from "components";
import { AnimalCard } from "components/AnimalCard";
import { breedTimeouts } from "constants/constants";
import { Animal } from "entities/zooentities";
import { RarityColor } from "enums/rarity-color";
import { getDaysHours, getMilliseconds } from "util/timeHelpers";
import { addAnimal } from "state/zoo";
import { SubAnimalCommonProps } from "components/AnimalCard/types";
import { EggCreatedNotify } from "components/AnimalCard/EggCreatedNotify";

interface Props {
  bloodline: "pure" | "hybrid";
  allAnimals: {
    [key: string]: Animal;
  };
  account: string;
}

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

const BidPriceInput = styled.input.attrs({
  type: "number",
  min: 1,
})`
  width: 100%;
  line-height: 1.5rem;
  margin-left: 15px;
`;

export const sortData = (data: Array<any>, byType: string) => {
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

export const AnimalList = ({ bloodline, allAnimals, account }: Props) => {
  const { path } = useRouteMatch();
  const animalGroup = {};
  const animalData = [];
  const web3 = useWeb3();
  const { chainId } = useWeb3React();
  const zooKeeper = getZooKeeper(web3, chainId);
  const bid = useRef(100);
  const [animals, setAnimals] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState([]);

  let actionAnimal: Animal;
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

  const [onEggCreated] = useModal(<EggCreatedNotify onDismiss={() => null} />);

  useEffect(() => {
    Object.values(allAnimals).forEach((animal, index) => {
      if (animal.owner.toLowerCase() !== account.toLowerCase()) {
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
        animalData.find((a) => a.name === animal.name && a.timeRemaining <= 0)
      ) {
        animalGroup[animal.name] = animalGroup[animal.name] + 1 || 1;
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

    setAnimals(
      sortData(
        animalData.filter((item) => item.bloodline === bloodline),
        "bloodline"
      )
    );
  }, [bloodline, allAnimals, account]);

  useEffect(() => {
    if (selectedAnimals.length < 2) {
      return;
    }
    onConfirm();
  }, [selectedAnimals]);

  const Confirmation: React.FC<SubAnimalCommonProps> = ({
    onDismiss = () => null,
    breed,
  }) => {
    const [animal1, animal2] = selectedAnimals;

    const cancel = () => {
      setSelectedAnimals([]);
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

  const breedClick = (animal: Animal) => {
    const index = selectedAnimals.findIndex(
      (an) => an.tokenId === animal.tokenId
    );
    const reselect = [...selectedAnimals];

    if (index > -1) {
      setSelectedAnimals(reselect.splice(index, 1));
    } else {
      reselect.push(animal);
      setSelectedAnimals(reselect);
    }

    // const selected = Object.values(allAnimals).filter((item) => item.selected);
    // const toSet: Animal = { ...animal };
    // if (
    //   animal.selected &&
    //   selected.length === 1 &&
    //   animalGroup[animal.animalId] > 1
    // ) {
    //   setArray(
    //     cloneDeep(
    //       Object.values(allAnimals)
    //         .filter(
    //           (item) =>
    //             item.animalId === animal.animalId && item.timeRemaining === 0
    //         )
    //         .slice(0, 2)
    //     )
    //   );
    // }
    // toSet.selected = !animal.selected;

    // if (!animal.selected && selected.length === 1) {
    //   setArray(cloneDeep([selected[0], animal]));
    // }
    // dispatch(addAnimal(toSet));
  };

  const breed = async (onDismiss) => {
    const an1 = parseInt(selectedAnimals[0].tokenId);
    const an2 = parseInt(selectedAnimals[1].tokenId);
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
    console.log("Breeding", mArray);
    try {
      // const token = await zooKeeper.methods.tokens(11).call();
      //   console.log('token', token);
      const hatching = await zooKeeper.methods
        .breedAnimals(1, an1, an2)
        .send({ from: account })
        .then((res) => {
          console.log(res);
          const TransOb = Moralis.Object.extend("Transactions");
          const newTrans = new TransOb();

          newTrans.set("From", account);
          newTrans.set("Action", "Bred Animals");
          // newTrans.set("TokenID", parseInt(egg.tokenId));
          newTrans.set("Parent1", aniM1.attributes.Name);
          newTrans.set("Parent2", aniM2.attributes.Name);
          newTrans.save();
          setSelectedAnimals([]);
          onDismiss();
        });
    } catch (error) {
      console.log(error);
    }

    // const animal1: Animal = array[0];
    // const animal2: Animal = array[1];
    // array.forEach((animal) => {
    //   animal.bred = true;
    //   animal.breedCount = animal.breedCount + 1 || 1;
    //   const now = new Date().getTime();
    //   animal.lastBred = new Date().getTime();
    //   const breedTimeoutKey = animal.breedCount > 5 ? 5 : animal.breedCount;
    //   const breedTimeout = getMilliseconds(breedTimeouts[breedTimeoutKey]);
    //   const elapsedTime = now - animal.lastBred;

    //   if (elapsedTime < breedTimeout) {
    //     const timeRemaining = breedTimeout - elapsedTime;
    //     const timeRemainingDaysHours = getDaysHours(timeRemaining);
    //     const barwidth = [100 * (elapsedTime / breedTimeout), "%"].join("");

    //     animal.timeRemaining = timeRemaining;
    //     animal.CTAOverride = { barwidth, timeRemainingDaysHours };
    //   } else {
    //     animal.timeRemaining = 0;
    //     animal.CTAOverride = {
    //       barwidth: null,
    //       timeRemainingDaysHours: null,
    //     };
    //   }
    //   animal.selected = false;
    // });

    // array = [];
    // // dispatch(addAnimal(animal1));
    // // dispatch(addAnimal(animal2));
    // lastBred TimeRemaining BreedCount
    // mArray.forEach((animal) => {
    //   const count = animal.get("BreedCount");
    //   animal.set("BreedCount", count + 1 || 1);
    //   animal.breedCount = animal.breedCount + 1 || 1;
    //   const now = new Date().getTime();
    //   const time = new Date().getTime();
    //   animal.set("lastBred", time.toString());
    //   const breedTimeoutKey = animal.breedCount > 5 ? 5 : animal.breedCount;
    //   const breedTimeout = getMilliseconds(breedTimeouts[breedTimeoutKey]);
    //   const elapsedTime = now - animal.lastBred;

    //   if (elapsedTime < breedTimeout) {
    //     const timeRemaining = breedTimeout - elapsedTime;
    //     const timeRemainingDaysHours = getDaysHours(timeRemaining);
    //     const barwidth = [100 * (elapsedTime / breedTimeout), "%"].join("");

    //     animal.set("TimeRemaining", timeRemaining);
    //     animal.set("CTAOverride", { barwidth, timeRemainingDaysHours });
    //   } else {
    //     animal.set("TimeRemaining", 0);
    //     animal.set("CTAOverride", {
    //       barwidth: null,
    //       timeRemainingDaysHours: null,
    //     });
    //   }
    //   animal.set("Selected", false);
    //   animal.save();
    // });

    //@dev Redux Logic to be Removed
    // const animal1: Animal = array[0];
    // const animal2: Animal = array[1];
    // array.forEach((animal) => {
    //   animal.bred = true;
    //   animal.breedCount = animal.breedCount + 1 || 1;
    //   const now = new Date().getTime();
    //   animal.lastBred = new Date().getTime();
    //   const breedTimeoutKey = animal.breedCount > 5 ? 5 : animal.breedCount;
    //   const breedTimeout = getMilliseconds(breedTimeouts[breedTimeoutKey]);
    //   const elapsedTime = now - animal.lastBred;

    //   if (elapsedTime < breedTimeout) {
    //     const timeRemaining = breedTimeout - elapsedTime;
    //     const timeRemainingDaysHours = getDaysHours(timeRemaining);
    //     const barwidth = [100 * (elapsedTime / breedTimeout), "%"].join("");

    //     animal.timeRemaining = timeRemaining;
    //     animal.CTAOverride = { barwidth, timeRemainingDaysHours };
    //   } else {
    //     animal.timeRemaining = 0;
    //     animal.CTAOverride = {
    //       barwidth: null,
    //       timeRemainingDaysHours: null,
    //     };
    //   }
    //   animal.selected = false;
    // });

    // array = [];
    // // dispatch(addAnimal(animal1));
    // // dispatch(addAnimal(animal2));

    // const egg: Egg = {
    //   owner: account,
    //   tokenId: String(Math.floor(Math.random() * 100000000) + 1),
    //   animalId: "3123",
    //   parent1: "123",
    //   parent2: "1231",
    //   basic: false,
    //   created: String(new Date().getTime()),
    //   timeRemaining: 0,
    //   CTAOverride: null,
    // };

    // const now = new Date().getTime();
    // const createdDate = egg.created
    //   ? new Date(Number(egg.created)).getTime()
    //   : new Date().getTime();
    // const hatchTimeout = getMilliseconds(eggTimeout);
    // const elapsedTime = now - createdDate;

    // if (elapsedTime < hatchTimeout) {
    //   const timeRemaining = hatchTimeout - elapsedTime;
    //   const timeRemainingDaysHours = getDaysHours(timeRemaining);
    //   const barwidth = [100 * (elapsedTime / hatchTimeout), "%"].join("");

    //   egg.timeRemaining = timeRemaining;
    //   egg.CTAOverride = { barwidth, timeRemainingDaysHours };
    // } else {
    //   egg.timeRemaining = 0;
    // }

    // const mObject = Moralis.Object.extend("FinalEggs");
    // const mEgg = new mObject();
    // mEgg.set("EggID", parseInt(egg.tokenId));
    // mEgg.set("Parent1", parseInt(egg.parent1));
    // mEgg.set("MetaURI", "META URI");
    // mEgg.set("Parent2", parseInt(egg.parent2));
    // mEgg.set("Burned", false);
    // mEgg.set("AnimalTypeId", egg.animalId);
    // mEgg.set("TokenURI");
    // mEgg.set("Owner", account);
    // mEgg.set("BlockNumber");
    // mEgg.set("Type", "hybrid");
    // await mEgg.save();

    // // dispatch(addEgg(egg));
    // onEggCreated();

    // const TransOb = Moralis.Object.extend("Transactions");
    // const newTrans = new TransOb();

    // newTrans.set("From", account);
    // newTrans.set("Action", "Bred Animals");
    // newTrans.set("TokenID", parseInt(egg.tokenId));
    // newTrans.set("Parent1", aniM1.attributes.Name);
    // newTrans.set("Parent2", aniM2.attributes.Name);
    // newTrans.save();
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

    const TransOb = Moralis.Object.extend("Transactions");
    const newTrans = new TransOb();

    newTrans.set("From", account);
    newTrans.set("Action", "Listed Animal");
    newTrans.set("TokenID", parseInt(animal.tokenId));
    newTrans.set("StartingBid", String(bid.current));
    newTrans.set("AnimalName", animalM.attributes.Name);
    newTrans.save();
    bid.current = 100;

    onDismiss();
  };

  const SellConfirm: React.FC<SubAnimalCommonProps> = ({
    onDismiss = () => null,
    breed,
  }) => {
    return (
      <Modal title="Confirm Listing" onDismiss={onDismiss}>
        <StyledText
          style={{ textAlign: "center" }}
        >{`Do you want to list ${sellAnimal.name}?`}</StyledText>
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="space-evenly"
          flexDirection="row"
          mt="16px"
        >
          <StyledText
            fontSize="20px"
            style={{ whiteSpace: "nowrap", marginTop: "5px" }}
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

  const list = (animal: Animal) => {
    sellAnimal = { ...animal };
    onSell();
  };

  const [onConfirm] = useModal(
    <Confirmation onDismiss={() => null} breed={breed} />
  );

  const ActionModal: React.FC<SubAnimalCommonProps> = ({
    onDismiss = () => null,
  }) => {
    return (
      <Modal title="Action" onDismiss={onDismiss}>
        <StyledText style={{ textAlign: "center" }}>
          Select an action
        </StyledText>
        <Flex width="100%" mt="16px" justifyContent="center">
          <BorderButton
            scale="md"
            onClick={() => {
              breedClick(actionAnimal);
              onDismiss();
            }}
          >
            Breed
          </BorderButton>
        </Flex>
        <Flex width="100%" justifyContent="center" mt="16px">
          <BorderButton scale="md" onClick={() => list(actionAnimal)}>
            Sell
          </BorderButton>
        </Flex>
      </Modal>
    );
  };

  const [onAction] = useModal(<ActionModal onDismiss={() => null} />);

  const performAction = (animal: Animal) => {
    actionAnimal = { ...animal };
    onAction();
  };

  return (
    <>
      {bloodline === "pure" ? (
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
              No {bloodline === "pure" ? `breedable` : `hybrid`} animals
            </StyledText>
          ) : (
            <Swiper
              slidesPerView={document.body.getBoundingClientRect().width / 220}
              spaceBetween={8}
              pagination={{ clickable: true }}
            >
              {animals.map((animal) => (
                <SwiperSlide
                  style={{ width: "220px", display: "flex" }}
                  key={animal.tokenId}
                >
                  <AnimalCard
                    animal={animal}
                    animalGroup={animalGroup}
                    onList={list}
                    onBreedClick={breedClick}
                    selectedAnimals={selectedAnimals}
                    onAction={() => performAction(animal)}
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

import { useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Moralis from "moralis";

import { Card as Existing, CardBody } from "components";
import { Animal, Egg } from "entities/zooentities";
import { addAnimal, addEgg } from "state/zoo";
import { Modal, useModal } from "components/Modal";
import { getDaysHours, getMilliseconds } from "util/timeHelpers";
import { breedTimeouts, eggTimeout } from "constants/constants";
import { Flex } from "components/Box";
import { Text } from "components/Text";
import BorderButton from "components/Button/BorderButton";
import { EggCreatedNotify } from "./EggCreatedNotify";
import { AnimalCardProps, SubAnimalCommonProps } from "./types";

const InfoBlock = styled.div`
  padding: 4px;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999999;
  background: ${({ theme }) => theme.colors.background};
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

const TimeoutWrapper = styled.div<{ barwidth?: string }>`
  position: relative;
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
    width: 100%;
    height: 100%;
    //   width: ${({ barwidth }) => barwidth};
    background: grey;
  }
`;
const TimeoutDisplay = styled.span`
  position: relative;
  z-index: 2;
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

const Card = styled(Existing)<{
  selected?: boolean;
  timedOut?: boolean;
  rarityColor: string;
}>`
  cursor: pointer;
  width: 100%;
  margin: 8px;
  box-shadow: ${(props) => `0px 0px 13px -2px ${props.rarityColor}`};
  backgroundcolor: "#000000";
  display: inline-block;
  border-radius: 8px;
  border: ${({ selected }) => (selected ? "2px solid white" : null)};
  opacity: ${({ timedOut }) => (timedOut ? "0.6" : null)};
`;

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
`;

const BidPriceInput = styled.input.attrs({
  type: "number",
  min: 1,
})`
  width: 100%;
  line-height: 1.5rem;
  margin-left: 15px;
`;

export const AnimalCard = ({
  animal,
  animalGroup,
  hybrid,
  allAnimals,
  account,
}: AnimalCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const bid = useRef(100);
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

  const Confirmation: React.FC<SubAnimalCommonProps> = ({
    onDismiss = () => null,
    breed,
  }) => {
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

  const [onEggCreated] = useModal(<EggCreatedNotify onDismiss={() => null} />);

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

    const TransOb = Moralis.Object.extend("Transactions");
    const newTrans = new TransOb();

    newTrans.set("From", account);
    newTrans.set("Action", "Bred Animals");
    newTrans.set("TokenID", parseInt(egg.tokenId));
    newTrans.set("Parent1", aniM1.attributes.Name);
    newTrans.set("Parent2", aniM2.attributes.Name);
    newTrans.save();
  };

  const breedClick = (animal) => {
    const selected = Object.values(allAnimals).filter((item) => item.selected);
    const toSet: Animal = { ...animal };
    if (
      animal.selected &&
      selected.length === 1 &&
      animalGroup[animal.animalId] > 1
    ) {
      const multipleAvailable = Object.values(allAnimals).filter(
        (item) => item.animalId === animal.animalId && item.timeRemaining === 0
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

  const list = (animal: Animal) => {
    sellAnimal = { ...animal };
    onSell();
  };

  const [onConfirm] = useModal(
    <Confirmation onDismiss={() => null} breed={breed} />
  );

  const onCardClick = () => {};

  return (
    <Card
      rarityColor={animal.rarityColor}
      onClick={onCardClick}
      key={animal.id}
      selected={animal.selected ? true : false}
      timedOut={animal.timeRemaining > 0 ? true : false}
    >
      <CardBody
        style={{
          backgroundImage: `url("${animal.imageUrl}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: 280,
          width: "100%",
        }}
      >
        <Link to={`/feed/myzoo/${animal.tokenId}`}>
          <TextWrapper
            style={{
              textShadow: "0px 2px 6px rgb(0, 0, 0)",
              fontSize: 18,
              letterSpacing: 0,
              position: "absolute",
              textTransform: "lowercase",
              right: 11,
              top: 9,
            }}
          >
            {animal.timeRemaining === 0
              ? animalGroup[animal.animalId]
                ? `x${animalGroup[animal.animalId]}`
                : ""
              : ""}
          </TextWrapper>
          <TextWrapper
            style={{
              textShadow: "0px 2px 6px rgb(0, 0, 0)",
              textAlign: "center",
              fontSize: 16,
              letterSpacing: 0,
              height: "100%",
            }}
          >
            {animal.name}
          </TextWrapper>
        </Link>
        {animal.timeRemaining > 0 ? (
          <TimeoutWrapper
            barwidth={animal.CTAOverride ? animal.CTAOverride.barwidth : 0}
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
                : !animal.listed
                ? list(animal)
                : null
            }
          >
            <BreedWrapper>
              {animal.bloodline === "pure"
                ? `BREED`
                : animal.listed
                ? "LISTED"
                : `SELL`}
            </BreedWrapper>
          </InfoBlock>
        )}
      </CardBody>
    </Card>
  );
};

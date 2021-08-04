import styled from "styled-components";
import { Link } from "react-router-dom";

import { Card as Existing, CardBody } from "components";
import { AnimalCardProps } from "./types";
import { useState } from "react";

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

export const AnimalCard = ({
  animal,
  animalGroup,
  selectedAnimals,
  onBreedClick,
  onList,
  onAction,
}: AnimalCardProps): JSX.Element => {
  const onCardClick = () => {};

  let action: string;

  if (animal.listed) {
    action = "listed";
  } else if (animal.bloodline === "pure") {
    action = selectedAnimals.length ? "breed" : "action";
  } else if (animal.bloodline === "hybrid") {
    action = "sell";
  }

  const doAction = () => {
    switch (action) {
      case "listed":
        return;
      case "breed":
        return onBreedClick(animal);
      case "action":
        return onAction();
      case "sell":
        return onList(animal);
      default:
        return;
    }
  };

  return (
    <Card
      rarityColor={animal.rarityColor}
      onClick={onCardClick}
      key={animal.id}
      selected={selectedAnimals.some((an) => an.tokenId === animal.tokenId)}
      timedOut={animal.timeRemaining > 0}
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
              ? animalGroup[animal.name]
                ? `x${animalGroup[animal.name]}`
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
          <InfoBlock onClick={() => doAction()}>
            <BreedWrapper>{action.toUpperCase()}</BreedWrapper>
          </InfoBlock>
        )}
      </CardBody>
    </Card>
  );
};

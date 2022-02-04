import React, { useState, useEffect } from "react";
import Image from "next/image";

// animation
import { fadeInOnScroll } from "animation";

import EndangeredSpecies from "components/EndangeredSpecies";

import { useDispatch } from "react-redux";
import { useBuyZoo } from "state/zoo/hooks";
import { useWeb3React } from "@web3-react/core";
import { useFaucet } from "hooks";
import { getZooBalance } from "state/zoo/actions";
import { handleFunds } from "utils/handleFunds";

const OpportunitySection = () => {
  const { account, library, chainId } = useWeb3React();
  const buyZoo = useBuyZoo();
  const [fetching, setFetching] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [rejection, setRejection] = useState(false);
  const faucet = useFaucet();
  const dispatch = useDispatch();
  const [stage, setStage] = useState("");
  const [hovered, setHovered] = useState(false);

  const sectionRef = React.useRef();

  useEffect(() => {
    fadeInOnScroll(sectionRef.current);
  }, []);

  const displayContent = (desc: string) => {
    setStage(desc);
    handleHover();
  };

  const handleHover = () => {
    setHovered(!hovered);
  };
  const style = {
    animationPlayState: "paused",
  };

  return (
    <section className="relative" ref={sectionRef} id="endless-opportunity">
      <div className="px-6 py-16 lg:mt-28">
        <h2 className="text-2xl md:text-2xl  lg:text-4xl text-center mb-16 font-semibold">
          Endless Yield Opportunity
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto">
          <EndangeredSpecies />
          <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-image">
            <div className="big-circle">
              <div className="animal-content mx-auto">{stage && <p>{stage}</p>}</div>
              <div
                className="animate-animal incubate"
                style={hovered ? style : undefined}
                onMouseEnter={() =>
                  displayContent(
                    "Your NFT Egg to reveal the animal within and learn about it"
                  )
                }
                onMouseOut={() => displayContent("")}
              >
                <Image
                  src="/img/incubate-cycle.png"
                  width={150}
                  height={170}
                  alt=""
                  objectFit="contain"
                />
              </div>
              <div
                className="animate-animal feed"
                onMouseEnter={() =>
                  displayContent(
                    "Your animal $ZOO to increase the value of your animal NFT."
                  )
                }
                onMouseOut={() => displayContent("")}
                style={hovered ? style : undefined}
              >
                <Image
                  src="/img/feed-cycle.png"
                  width={150}
                  height={170}
                  alt=""
                  objectFit="contain"
                />
              </div>
              <div
                className="animate-animal grow"
                onMouseEnter={() =>
                  displayContent(
                    "Your animal and watch it transition through its different stages of maturity."
                  )
                }
                onMouseOut={() => displayContent("")}
                style={hovered ? style : undefined}
              >
                <Image
                  src="/img/grow-cycle.png"
                  width={150}
                  height={170}
                  alt=""
                  objectFit="contain"
                />
              </div>
              <div
                className="animate-animal breed"
                onMouseEnter={() =>
                  displayContent(
                    "Your fully mature animal to mint new Egg NFT’s. Breed the animals up to 6x."
                  )
                }
                onMouseOut={() => displayContent("")}
                style={hovered ? style : undefined}
              >
                <Image
                  src="/img/breed-cycle.png"
                  width={150}
                  height={170}
                  alt=""
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center max-w-7xl px-6 mx-auto lg:mt-20">
          <h2 className="text-2xl md:text-2xl lg:text-5xl text-center mb-6 md:mb-4 font-semibold">
            Fully Transparent Ecosystem
          </h2>
          <p className="max-w-3xl mx-auto text-center mb-6 md:mb-8 lg:text-xl">
            Each animal NFT uses blockchain technology to establish a verified
            and public proof of ownership. This establishes credibility for each
            NFT and its unchangeable nature.
          </p>
          <div
            onClick={() => handleFunds(chainId, buyZoo)}
            className="border border-green text-green font-semibold text-sm md:text-base px-8 py-3 md:px-6 lg:px-16 rounded-full hover:cursor-pointer"
          >
            Buy $ZOO
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpportunitySection;

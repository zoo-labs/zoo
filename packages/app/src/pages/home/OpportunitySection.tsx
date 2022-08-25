import React, { useState, useEffect } from "react";
import Image from "next/image";

// animation
// import { fadeInOnScroll } from "animation";

import EndangeredSpecies from "components/EndangeredSpecies";

import { useDispatch } from "react-redux";
import { useBuyZoo } from "state/zoo/hooks";
import { useActiveWeb3React, useFaucet } from "hooks";
import { getZooBalance } from "state/zoo/actions";
import { handleFunds } from "utils/handleFunds";

const OpportunitySection = () => {
  const { account, library, chainId } = useActiveWeb3React();
  const buyZoo = useBuyZoo();
  const [fetching, setFetching] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [rejection, setRejection] = useState(false);
  const faucet = useFaucet();
  const dispatch = useDispatch();
  const [stage, setStage] = useState("");
  const [hovered, setHovered] = useState(false);

  // const sectionRef = React.useRef();

  // useEffect(() => {
  //   fadeInOnScroll(sectionRef.current);
  // }, []);

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
    <section className="relative" id="endless-opportunity">
      <div className="px-6 lg:mt-10">
        <div className="flex flex-col items-center justify-between mx-auto lg:flex-row max-w-7xl">
          <EndangeredSpecies />

          <div className="relative flex flex-col items-center justify-center w-screen h-screen ">
            <div className="big-circle">
              <div className="mx-auto animal-content">
                {stage && <p>{stage}</p>}
              </div>
              <div
                className="animate-animal incubate"
                // style={hovered ? style : undefined}
                onMouseEnter={() =>
                  displayContent(
                    "Your NFT Egg to reveal the animal within and learn about it"
                  )
                }
                onMouseOut={() => displayContent("")}
              >
                <Image
                  className="hover:scale-90"
                  src="/img/incubate-cycle.png"
                  width={150}
                  height={130}
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
                // style={hovered ? style : undefined}
              >
                <Image
                  className="hover:scale-90"
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
                    "Your fully mature animal to mint new Egg NFT’s. Breed the animals up to 6x."
                  )
                }
                onMouseOut={() => displayContent("")}
                // style={hovered ? style : undefined}
              >
                <Image
                  className="hover:scale-90"
                  src="/img/breed-cycle.png"
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
                    "Your animal and watch it transition through its different stages of maturity."
                  )
                }
                onMouseOut={() => displayContent("")}
                // style={hovered ? style : undefined}
              >
                <Image
                  className="hover:scale-90"
                  src="/img/grow-cycle.png"
                  width={150}
                  height={170}
                  alt=""
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-6 mx-auto max-w-7xl lg:mt-20">
          <h2 className="mb-6 text-2xl font-semibold text-center md:text-2xl lg:text-5xl md:mb-4">
            Fully Transparent Ecosystem
          </h2>
          <p className="max-w-3xl mx-auto mb-6 text-center md:mb-8 lg:text-xl">
            Each animal NFT uses blockchain technology to establish a verified
            and public proof of ownership. This establishes credibility for each
            NFT and its unchangeable nature.
          </p>
          <div
            onClick={() => handleFunds(chainId, buyZoo)}
            className="px-8 py-3 text-sm font-semibold border rounded-full border-green text-green md:text-base md:px-6 lg:px-16 hover:cursor-pointer"
          >
            Buy $ZOO
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpportunitySection;

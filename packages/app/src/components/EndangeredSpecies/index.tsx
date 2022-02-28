import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useBuyZoo } from "state/zoo/hooks";
import { useWeb3React } from "@web3-react/core";
import { useFaucet } from "hooks";
import { getZooBalance } from "state/zoo/actions";
import { handleFunds } from "utils/handleFunds";

const EndangeredSpecies = () => {
  const { account, library, chainId } = useWeb3React();
  const buyZoo = useBuyZoo();
  const [fetching, setFetching] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [rejection, setRejection] = useState(false);
  const faucet = useFaucet();
  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg py-12 px-4 bg-black100 max-w-lg flex flex-col items-center">
      <div className="mb-8">
        <h2 className="font-bold text-xl lg:text-3xl mb-4 text-center">
          Save Endangered Species
        </h2>

        <p className="text-grey text-base text-justify">
          10% of all gaming fees will be donated to non-profit organizations.
          Grow your animals, view yield earned per animal, and breed mature
          animals to mint more NFTs!
        </p>
      </div>
      <div className="mb-8">
        <div className="flex items-center">
          <div className="mr-4">
            <Image src="/img/hatch.png" width={32} height={32} alt="" />
          </div>
          <div className="lg:ml-4">
            <p className="text-white font-medium">Hatch</p>
            <p className="max-w-sm text-grey text-sm">
              Your NFT Egg to reveal the animal within and learn about it.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex items-start">
          <div className="mr-4">
            <Image src="/img/feed.png" width={32} height={32} alt="" />
          </div>
          <div className="lg:ml-4">
            <p className="text-white font-medium">Feed</p>
            <p className="max-w-sm text-grey text-sm">
              Your animal $ZOO to increase the value of your animal NFT.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex items-start">
          <div className="mr-4">
            <Image src="/img/grow.png" width={32} height={32} alt="" />
          </div>
          <div className="lg:ml-4">
            <p className="text-white font-medium">Grow</p>
            <p className="max-w-sm text-grey text-sm">
              Your animal and watch it transition through its different stages
              of maturity.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex items-start">
          <div className="mr-4">
            <Image src="/img/breed.png" width={32} height={32} alt="" />
          </div>
          <div className="lg:ml-4">
            <p className="text-white font-medium">Breed</p>
            <p className="max-w-sm text-grey text-sm">
              Your fully mature animal to mint new Egg NFT’s. Breed the animals
              up to 6x.
            </p>
          </div>
        </div>
      </div>
      <p className="text-center mb-4 text-sm text-grey">
        <span className="text-green">Earn more</span> when you feed your animals
        any crypto <span className="text-white">$ZOO</span> currency.
      </p>
      <div className="flex justify-center">
        <div
          onClick={() => handleFunds(chainId, buyZoo)}
          className="bg-gradient-to-b from-purple to-blue font-semibold text-white text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full flex items-center hover:cursor-pointer"
        >
          Buy $ZOO{" "}
          <span className="ml-2">
            <Image src="/img/star.svg" width={16} height={16} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EndangeredSpecies;

import Modal from "components/Modal";
import Image from "next/image";
import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
const segments = [
  {
    id: 1,
    title: "Play",
    description:
      "Our ZOO Animal Game-Fi NFTs are a truly fun and easy way to monetize and learn about crypto. If you already own real estate in the metaverse you can use the Zoo NFT animals to inhabit any of your virtual properties. Or use our VR technology with any kind of smartphone to bring your animal to share any real-world space with you. Our roadmap involves using Ai to make the animals emotionally intelligent. By utilizing future technology we will turn these NFTs into virtual pets.  A cute, interactive animal that could love you like a real pet! However unlike any real pet these NFTs are digital twins of actual endangered animals, and in turn ecosystem fees are captured to save and preserve these animals in the real world!",
  },
  {
    id: 2,
    title: "Feed",
    description:
      "Unlike traditional NFTs, the Zoo Animals can hold collateral value and earn staking rewards. To put it simply the animals are virtual piggy banks. Like a piggy bank one deposits currency while the piggy bank holds it trapped within. As you deposit more funds into the piggy its value increases, yet you are unable to use the funds unless you destroy it revealing all of the past deposits. Similarly, with the Zoo Animals you can “feed” the animal currency to increase the value of the NFT. In order to cash out the NFT rewards + your collateral earned you can burn the NFT or you can sell it on the marketplace for an even higher value especially if the NFT is scarce in the ecosystem.",
  },
  {
    id: 3,
    title: "Grow",
    description:
      "The first NFT is an Egg. An egg can then be hatched to reveal an Origin Baby Animal. Once again if you “feed” your Origin Baby it can mint a Teen version of itself, hence the “growing.” After one receives an Origin Teen it can furthermore collateralize it to get an Origin Adult Animal of the same species. You can collect them all or sell them on the marketplace along the way. If the Origin has already minted an older version you will not be able to repeat the growing process and the only way it can be minted is if an equal or higher value of the Egg Status purchase price.",
  },
  {
    id: 4,
    title: "Breed",
    description:
      "Some people refer to Zoo as an NFT Tamagotchi because of the growing and breeding mechanisms. Once you have collected two Origin Adult Animals of the same species you will be able to breed the animals up to 7x. Animals can be sold before the completion of the 7 breeds. Each breed results in the birth of a 2nd Gen Baby Animal in the same species. 2nd Gen Animals will be able to mint older versions of themselves but not breed at the adult stage. Collect them all or list them on the Zoo Marketplace.",
  },
];

const CardsSection = () => {
  const [active, setActive] = useState({ id: null });

  return (
    <div
      className={`${
        active.id === null
          ? "px-6 pt-32 pb-20"
          : "lg:px-6 lg:pt-32 lg:pb-20 overflow-hidden"
      } lg:mx-24`}
    >
      <div className="w-full overflow-x-auto overflow-y-hidden whitespace-nowrap">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row flex-wrap-">
          {segments.map((segment, i) => (
            <Card
              key={segment.id}
              id={i}
              segment={segment}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsSection;

const Card = ({ id, segment, active, setActive }) => {
  const handleOpen = () => setActive({ id });
  const handleClose = () => setActive({ id: null });
  const sm = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <div
        className={`  bg-16 w-full md:w-auto ${
          active.id === id ? "min-w-[600px]" : "min-w-[300px]"
        } transition-all duration-500 ease-in min-h-[280px] rounded-xl border border-muted-50 relative py-6 flex flex-col items-center justify-center `}
        style={{
          transform: active.id === id && "rotateY(180deg)",
          // zIndex: active.id === id && 1000000,
        }}
      >
        <p
          style={{ transform: active.id === id && "rotateY(180deg)" }}
          className="text-[42px] leading-[63px] font-semibold"
        >
          {segment.title}
        </p>
        {active.id !== id ? (
          <div
            className={`absolute right-8 bottom-6 rounded-full h-11 w-11 flex items-center justify-center border-2 bg-dark-white border-white-20 cursor-pointer`}
            onClick={handleOpen}
          >
            <Image src="/icons/add.svg" alt="" height={24} width={24} />
          </div>
        ) : (
          <div
            style={{ transform: active.id === id && "rotateY(180deg)" }}
            className={`absolute right-8 top-10 rounded-full flex items-center justify-center cursor-pointer`}
            onClick={handleClose}
          >
            <Image src="/icons/x-circle.svg" alt="" height={30} width={30} />
          </div>
        )}
        {active.id === id && (
          <div
            style={{ transform: active.id === id && "rotateY(180deg)" }}
            className={`${
              active.id === id ? "block" : "hidden"
            } text-center mt-11 text-sm md:text-xl font-normal whitespace-normal px-4 md:px-6`}
          >
            {segment.description}
          </div>
        )}
      </div>
      <Modal
        isMax
        scrollable
        isOpen={active.id === id && sm}
        onDismiss={handleClose}
        transitionProps={{
          enter: "transform transition duration-[400ms]",
          enterFrom: "opacity-0 rotate-[180deg]",
          enterTo: "opacity-100 rotate-0",
        }}
      >
        <div
          className={`bg-16 w-full md:w-auto min-w-[300px] transition-all duration-500 ease-in min-h-[280px] lg:rounded-xl lg:border lg:border-muted-50  h-screen lg:h-full z-90 fixed top-0 lg:relative flex flex-col items-center justify-center `}
          style={{
            // transform: active.id === id && "rotateY(180deg)",
            zIndex: 1000000,
          }}
        >
          <p
            // style={{ transform: active.id === id && "rotateY(180deg)" }}
            className="text-[42px] leading-[63px] font-semibold"
          >
            {segment.title}
          </p>
          {
            <div
              // style={{ transform: active.id === id && "rotateY(180deg)" }}
              className={`absolute right-8 top-10 rounded-full flex items-center justify-center cursor-pointer`}
              onClick={handleClose}
            >
              <Image src="/icons/x-circle.svg" alt="" height={30} width={30} />
            </div>
          }

          <div
            // style={{ transform: active.id === id && "rotateY(180deg)" }}
            className={`${
              active.id === id ? "block" : "hidden"
            } text-center mt-11 text-sm md:text-xl font-normal whitespace-normal px-4 md:px-6`}
          >
            {segment.description}
          </div>
        </div>
      </Modal>
    </>
  );
};

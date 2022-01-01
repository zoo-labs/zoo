import React from "react";

const FaqSection = () => {
  return (
    <section>
      <div className="max-w-7xl px-6 py-20 mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
          Game FAQ
        </h2>
        <div className="flex flex-col items-center lg:flex-row lg:flex-wrap lg:items-start lg:justify-between">
          <div className="flex flex-col mb-6 lg:basis-1/2">
            <h3 className="text-blue font-bold text-2xl lg:text-3xl mb-4">
              What is ZOO?
            </h3>
            <p className="text-white text-opacity-70 lg:max-w-xl">
              ZOO is a Liquidity Protocol that exists to bridge tokens and NFTs
              at the intersection of Defi and gaming. Each of our NFTs (animal
              or egg) yield our native currency, $ZOO. Each Nft is
              collateralized by $ZOO, which appreciates over time based on
              rarity, age and by playing our game.{" "}
            </p>
          </div>

          <div className="flex flex-col mb-6 lg:basis-1/2">
            <h3 className=" text-blue font-bold text-2xl lg:text-3xl mb-4">
              What are the Key features in ZOO?
            </h3>
            <p className="text-white text-opacity-70 lg:max-w-xl">
              Our key features include: growing, breeding, youth elixir (back in
              time), age freezing. In the near future we will also launch an app
              with our ZOO augmented reality game. This apple will load the NFTs
              in your wallet. With the app you will be able to see your NFT in
              real time with much more animal engagement including: petting,
              make the animal roll over, shake animals paw, give animal kiss,
              receive kiss, feed your animal, and walking with your animal.
            </p>
          </div>

          <div className="flex flex-col mb-6 lg:basis-1/2">
            <h3 className="text-blue font-bold text-2xl lg:text-3xl mb-4">
              What is the $ZOO token?
            </h3>
            <p className="text-white text-opacity-70 lg:max-w-xl">
              The $ZOO token is the native currency in the game. It allows token
              holders to play, invest, use our NFT marketplace and be part of
              the game.
            </p>
          </div>

          <div className="flex flex-col mb-6 lg:basis-1/2">
            <h3 className="text-blue font-bold text-2xl lg:text-3xl mb-4">
              How do i get Onboarded?
            </h3>
            <p className="text-white text-opacity-70 lg:max-w-xl">
              Players will be able to get access to the game through our
              Metamask App as well as ZOO Labs official website.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

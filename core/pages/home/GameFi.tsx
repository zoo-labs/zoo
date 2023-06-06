import Image from "next/image";
import React from "react";

const GameFi = ({ gameFi }) => {
  return (
    <section className="AnimalFamily">
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <h1 className="mb-16 text-[44px] leading-4 font-bold md:text-center">
          GAME-FI For All
        </h1>
        <div className="grid lg:grid-cols-2 gap-x-60 gap-y-24">
          {gameFi.map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center border-b-2 border-white pb-14"
            >
              <Image src={_.icon} alt="" width={80} height={80} />
              <h2 className="my-3 text-2xl md:text-4xl font-semibold text-center">
                {_.title}
              </h2>
              <p className="text-sm  md:text-lg text-center">{_.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameFi;

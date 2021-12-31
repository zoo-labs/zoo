import React from "react";
import Image from "next/image";

const ZooNewsSection = () => {
  return (
    <section className="ZooNews">
      <div className="max-w-7xl mx-auto px-6 pb-20 flex flex-col items-center">
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-3xl lg:text-5xl mb-6 font-bold text-center">
            ZOO News
          </h2>
          <p className="max-w-2xl text-white text-opacity-70">
            Track your workouts, get better results, and be the best version of
            you. Less thinking, more lifting.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch max-w-xl lg:max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden lg:basis-1/2">
            <Image src="/img/story-image.png" width={565} height={516} alt="" />
          </div>
          <div className="py-8 lg:py-0 px-4 bg-blue -mt-4 rounded-b-2xl lg:rounded-2xl lg:-ml-1 lg:basis-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-3">
              Stories From Our Community: Kohaku &amp; Moyo Shiro
            </h2>
            <p className="mb-4">
              How the ZOO foundation helped save over 100,000 acres of elephant
              habitat to date.{" "}
            </p>

            <button className="ZooNews__btn text-white text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full w-1/2">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZooNewsSection;

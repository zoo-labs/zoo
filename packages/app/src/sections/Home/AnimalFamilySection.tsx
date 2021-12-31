import React from "react";
import Image from "next/image";

const AnimalFamilySection = () => {
  return (
    <section className="AnimalFamily">
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold text-center lg:text-4xl">
          Our Animal Family
        </h2>
        <div className="flex flex-col items-center AnimalFamily__nfts">
          <div className="flex flex-col items-center justify-center AnimalFamily__nft lg:flex-row">
            <div className="flex flex-col items-center w-full h-auto mb-8 AnimalFamily__image lg:basis-1/3">
              <Image
                src="/img/sumatran-elephant.png"
                width={373}
                height={373}
                alt=""
              />
            </div>
            <div className="text-center AnimalFamily__name lg:basis-2/3">
              <h2 className="mb-4 text-3xl font-semibold">Sumatran Elephant</h2>
              <button className="px-5 py-3 text-sm text-white rounded-full AnimalFamily__buy-nft md:text-base md:px-6 md:py-4 lg:px-10">
                Buy NFT
              </button>
            </div>
            <div className="px-2 py-6 text-center lg:basis-1/3 lg:bg-black lg:rounded-3xl">
              <h3 className="mb-4 text-xl font-bold text-center">
                Elephas Maximus Sumatranus
              </h3>
              <p className="mb-3 text-white text-opacity-70">
                Sumatran elephants feed on a variety of plants and deposit seeds
                wherever they go, contributing to a healthy forest ecosystem.
                They also share their lush forest habitat with other endangered
                species.{" "}
              </p>
              <a href="" rel="noreferrer" className="text-orange-500 underline">
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="px-5 py-3 text-sm border rounded-full border-blue md:text-base text-blue md:px-6 md:py-4 lg:px-16">
            See All
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnimalFamilySection;

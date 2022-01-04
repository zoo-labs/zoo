import React from "react";
import Image from "next/image";

const AnimalFamilySection = () => {
  return (
    <section className="AnimalFamily">
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold text-center lg:text-4xl">
          Our Animal Family
        </h2>
        <div className="flex flex-col items-center AnimalFamily__nfts mb-4">
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
              <h2 className="mb-6 text-3xl font-bold lg:4xl">
                Sumatran Elephant
              </h2>
              <a
                href="/nft"
                className="bg-gradient-to-b from-purple to-blue text-white  text-sm md:text-base  font-bold px-8 py-3 md:px-6 lg:px-16 rounded-full"
              >
                Buy NFT
              </a>
            </div>
            <div className="px-2 py-6  lg:px-6 lg:basis-1/3 lg:bg-black100 lg:rounded-3xl">
              <h3 className="mb-4 text-xl font-bold ">
                Elephas Maximus Sumatranus
              </h3>
              <p className="mb-3 text-grey text-opacity-70">
                Sumatran elephants feed on a variety of plants and deposit seeds
                wherever they go, contributing to a healthy forest ecosystem.
                They also share their lush forest habitat with other endangered
                species.{" "}
              </p>
              <a
                href=""
                rel="noreferrer"
                className="text-green font-bold underline"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        {/* Another section */}
        <div className="flex flex-col items-center AnimalFamily__nfts mb-4">
          <div className="flex flex-col items-center justify-center AnimalFamily__nft lg:flex-row">
            <div className="flex flex-col items-center w-full h-auto mb-8 AnimalFamily__image lg:basis-1/3">
              <Image
                src="/img/javan-rhino.png"
                width={373}
                height={373}
                alt=""
              />
            </div>
            <div className="text-center AnimalFamily__name lg:basis-2/3">
              <h2 className="mb-6 text-3xl font-bold lg:4xl">Javan Rhino</h2>
              <a
                href="/nft"
                className="bg-gradient-to-b from-purple to-blue text-white  text-sm md:text-base  font-bold px-8 py-3 md:px-6 lg:px-16 rounded-full"
              >
                Buy NFT
              </a>
            </div>
            <div className="px-2 py-6  lg:px-6 lg:basis-1/3 lg:bg-black100 lg:rounded-3xl">
              <h3 className="mb-4 text-xl font-bold ">Rhinoceros Sondaicus</h3>
              <p className="mb-3 text-grey text-opacity-70">
                Once the most widespread of Asian rhinoceroses, the Javan
                rhinoceros ranged from the islands of Java and Sumatra,
                throughout Southeast Asia, and into India and China. The species
                is critically endangered, with only one known population in the
                wild, and no individuals in captivity. It is possibly the rarest
                large mammal on Earth.
              </p>
              <a
                href=""
                rel="noreferrer"
                className="text-green font-bold underline"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        {/* Another section */}
        <div className="flex flex-col items-center AnimalFamily__nfts ">
          <div className="flex flex-col items-center justify-center AnimalFamily__nft lg:flex-row">
            <div className="flex flex-col items-center w-full h-auto mb-8 AnimalFamily__image lg:basis-1/3">
              <Image
                src="/img/siberian-tiger.png"
                width={373}
                height={373}
                alt=""
              />
            </div>
            <div className="text-center AnimalFamily__name lg:basis-2/3">
              <h2 className="mb-6 text-3xl font-bold lg:4xl">Siberian Tiger</h2>
              <a
                href="/nft"
                className="bg-gradient-to-b from-purple to-blue text-white  text-sm md:text-base  font-bold px-8 py-3 md:px-6 lg:px-16 rounded-full"
              >
                Buy NFT
              </a>
            </div>
            <div className="px-2 py-6  lg:px-6 lg:basis-1/3 lg:bg-black100 lg:rounded-3xl">
              <h3 className="mb-4 text-xl font-bold ">Siberian Tiger</h3>
              <p className="mb-3 text-grey text-opacity-70">
                The Siberian tiger is a tiger from a specific population of the
                Panthera tigris tigris subspecies native to the Russian Far
                East, Northeast China. It once ranged throughout the Korean
                Peninsula, north China, and eastern Mongolia. The population
                currently inhabits mainly the Sikhote-Alin mountain region in
                southwest Primorye Province in East Russia.
              </p>
              <a
                href=""
                rel="noreferrer"
                className="text-green font-bold underline"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="/animal-list"
            className="px-5 py-3 text-sm border rounded-full font-bold border-green md:text-base text-green md:px-6 md:py-4 lg:px-16"
          >
            See All
          </a>
        </div>
      </div>
    </section>
  );
};

export default AnimalFamilySection;

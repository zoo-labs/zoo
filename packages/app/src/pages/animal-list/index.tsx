import React, { useEffect } from "react";
import AnimalFamilyInfo from "components/AnimalInfo";
import Image from "next/image";
import Link from "next/link";
import animals from "../../animals.json";
import { ANIMAL_TYPE } from "../../types";

import { useGif } from "context/GifContext";

const animalFamilyData =[
  {
    id: "1",
    image: "/img/sumatran-elephant.png",
    gif: "/gifs/sumatran-elephant.gif",
    name: "Sumatran Elephant",
    scientificName: " Elephas Maximus Sumatranus",
    description: `Sumatran elephants feed on a variety of plants and deposit seeds
    wherever they go, contributing to a healthy forest ecosystem.
    They also share their lush forest habitat with other endangered
    species.`,
    status: "Critically Endangered",
    population: "2,400 - 2,800",
    size: "6.6 - 10.5 Feet",
    habitat: "Forest",
    images: [
      "/img/sumatran-elephant.png",
      "/img/sumatran-elephant.png",
      "/img/sumatran-elephant.png",
      "/img/sumatran-elephant.png",
    ],
  },
  {
    id: "2",
    image: "/img/javan-rhino.png",
    gif: "/gifs/javan-rhino.gif",
    name: "Javan Rhino",
    scientificName: "Rhinoceros Sondaicus",
    description: `Once the most widespread of Asian rhinoceroses, the Javan
    rhinoceros ranged from the islands of Java and Sumatra,
    throughout Southeast Asia, and into India and China. The species
    is critically endangered, with only one known population in the
    wild, and no individuals in captivity. It is possibly the rarest
    large mammal on Earth.`,
    status: "Critically Endangered",
    population: "18",
    size: "6.6 - 10.5 Feet",
    habitat: "Forest",
    images: [
      "/img/javan-rhino.png",
      "/img/javan-rhino.png",
      "/img/javan-rhino.png",
      "/img/javan-rhino.png",
    ],
  },
  {
    id: "3",
    image: "/img/siberian-tiger.png",
    gif: "/gifs/siberian-tiger.gif",
    name: "Siberian Tiger",
    scientificName: "Siberian Tiger",
    description: `The Siberian tiger is a tiger from a specific population of the
    Panthera tigris tigris subspecies native to the Russian Far
    East, Northeast China. It once ranged throughout the Korean
    Peninsula, north China, and eastern Mongolia. The population
    currently inhabits mainly the Sikhote-Alin mountain region in
    southwest Primorye Province in East Russia.`,
    status: "endangered",
    population: "40",
    size: "6.6 - 10.5 Feet",
    habitat: "Tropical Forests",
    images: [
      "/img/siberian-tiger.png",
      "/img/siberian-tiger.png",
      "/img/siberian-tiger.png",
    ],
  },
  {
    id: "4",
    image: "/img/clouded-leopard.png",
    gif: "/gifs/clouded-leopard.gif",
    name: "Clouded Leopard",
    scientificName: "Neofelis Diardi",
    description: `The Siberian tiger is a tiger from a specific population of the
    Panthera tigris tigris subspecies native to the Russian Far
    East, Northeast China. It once ranged throughout the Korean
    Peninsula, north China, and eastern Mongolia. The population
    currently inhabits mainly the Sikhote-Alin mountain region in
    southwest Primorye Province in East Russia.`,
    status: "Vulnerable",
    population: "3750-5580",
    size: "6.6 - 10.5 Feet",
    habitat: "Forest",
    images: [
      "/gifs/clouded-leopard.gif",
      "/gifs/clouded-leopard.gif",
      "/gifs/clouded-leopard.gif",
    ],
  },
  {
    id: "5",
    image: "/img/ethiopian-wolf.png",
    gif: "/gifs/ethiopian-wolf.gif",
    name: "Ethiopian Wolf",
    scientificName: "Canis simensis",
    description: `The Siberian tiger is a tiger from a specific population of the
    Panthera tigris tigris subspecies native to the Russian Far
    East, Northeast China. It once ranged throughout the Korean
    Peninsula, north China, and eastern Mongolia. The population
    currently inhabits mainly the Sikhote-Alin mountain region in
    southwest Primorye Province in East Russia.`,
    status: "Endangered",
    population: "197",
    size: "6.6 - 10.5 Feet",
    habitat: "Shrubland, Grassland",
    images: [
      "/gifs/ethiopian-wolf.gif",
      "/gifs/ethiopian-wolf.gif",
      "/gifs/ethiopian-wolf.gif",
    ],
  },
];

// [
//   {
//     id: "1",
//     image: "/img/sumatran-elephant.png",
//     gif: "/gifs/sumatran-elephant.gif",
//     name: "Sumatran Elephant",
//     scientificName: " Elephas Maximus Sumatranus",
//     description: `Sumatran elephants feed on a variety of plants and deposit seeds
//     wherever they go, contributing to a healthy forest ecosystem.
//     They also share their lush forest habitat with other endangered
//     species.`,
//     status: "endangered",
//     population: "2,400 - 2,800",
//     size: "6.6 - 10.5 Feet",
//     habitat: "Tropical Forests",
//     images: [
//       "/img/sumatran-elephant.png",
//       "/img/sumatran-elephant.png",
//       "/img/sumatran-elephant.png",
//       "/img/sumatran-elephant.png",
//     ],
//   },
//   {
//     id: "2",
//     image: "/img/javan-rhino.png",
//     gif: "/gifs/javan-rhino.gif",
//     name: "Javan Rhino",
//     scientificName: "Rhinoceros Sondaicus",
//     description: `Once the most widespread of Asian rhinoceroses, the Javan
//     rhinoceros ranged from the islands of Java and Sumatra,
//     throughout Southeast Asia, and into India and China. The species
//     is critically endangered, with only one known population in the
//     wild, and no individuals in captivity. It is possibly the rarest
//     large mammal on Earth.`,
//     status: "endangered",
//     population: "2,400 - 2,800",
//     size: "6.6 - 10.5 Feet",
//     habitat: "Tropical Forests",
//     images: [
//       "/img/javan-rhino.png",
//       "/img/javan-rhino.png",
//       "/img/javan-rhino.png",
//       "/img/javan-rhino.png",
//     ],
//   },
//   {
//     id: "3",
//     image: "/img/siberian-tiger.png",
//     gif: "/gifs/siberian-tiger.gif",
//     name: "Siberian Tiger",
//     scientificName: "Siberian Tiger",
//     description: `The Siberian tiger is a tiger from a specific population of the
//     Panthera tigris tigris subspecies native to the Russian Far
//     East, Northeast China. It once ranged throughout the Korean
//     Peninsula, north China, and eastern Mongolia. The population
//     currently inhabits mainly the Sikhote-Alin mountain region in
//     southwest Primorye Province in East Russia.`,
//     status: "endangered",
//     population: "2,400 - 2,800",
//     size: "6.6 - 10.5 Feet",
//     habitat: "Tropical Forests",
//     images: [
//       "/img/siberian-tiger.png",
//       "/img/siberian-tiger.png",
//       "/img/siberian-tiger.png",
//     ],
//   },
// ];

const AnimalList = () => {
  const [animalFilter, setAnimalFilter] = React.useState<ANIMAL_TYPE[]>([]);
  const [animalsModified, setAnimalsModified] = React.useState<ANIMAL_TYPE[]>(
    []
  );

  const { state } = useGif();
  const { gifMode } = state;

  useEffect(() => {
    setAnimalsModified([...animals, animals[0]]);
  }, []);
  const handleActive = (e: ANIMAL_TYPE) => {
    const active = animalsModified.filter((animal) => animal.name === e.name);
    active.length = 1;
    setAnimalFilter(active);
  };
  return (
    <section>
      <div className="lg:max-w-7xl lg:mx-auto mb-8">
        <h1 className="pt-16 text-4xl lg:text-6xl font-bold text-center">
          Our Animal Family
        </h1>
      </div>
      <div className="px-4 py-16 lg:max-w-7xl lg:mx-auto flex flex-col items-center lg:flex-row flex-wrap lg:justify-between lg:gap-2">
        {animalFamilyData.map((animal) => (
          <div
            key={animal.id}
            className="p-px mb-8 cursor-pointer rounded bg-nft-gradient lg:max-w-md overflow-hidden"
          >
            {gifMode === "gif" ? (
              <div className="bg-black rounded overflow-hidden">
                <Link href={`nft-product/${animal.id}`}>
                  <a className="AnimalFamily__image w-full bg-[#000] border border-[#000] rounded-3xl	 h-auto flex flex-col items-center lg:basis-1/3">
                    <Image
                      src={`${animal.gif}`}
                      width={373}
                      height={373}
                      alt=""
                      className="rounded-3xl"
                    />
                  </a>
                </Link>
              </div>
            ) : (
              <Link href={`nft-product/${animal.id}`}>
                <a className="AnimalFamily__image w-full bg-[#000] border border-[#000] rounded-3xl	 h-auto flex flex-col items-center lg:basis-1/3">
                  <Image
                    src={`${animal.image}`}
                    width={373}
                    height={373}
                    alt=""
                    className="rounded-3xl"
                  />
                </a>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* {animalFilter.length > 0 && (
        <div className="bg-[#2517FF] py-10 mb-20">
          {animalFilter.map((animal) => (
            <div key={animal.name} className="flex flex-col">
              <AnimalFamilyInfo
                name={animal.name}
                image={animal.image}
                descriptionHead={animal.description.head}
                description={animal.description.desc}
              />
            </div>
          ))}
        </div>
      )} */}
    </section>
  );
};

export default AnimalList;

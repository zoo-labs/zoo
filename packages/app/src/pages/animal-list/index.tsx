import React, { useEffect } from "react";
import AnimalFamilyInfo from "components/AnimalInfo";
import Image from "next/image";
import Link from "next/link";
import animals from "../../animals.json";
import { ANIMAL_TYPE } from "../../types";

import { useGif } from "context/GifContext";

const animalFamilyData = [
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
    gif: "/img/javan-rhino.png",
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
    gif: "/img/siberian-tiger.png",
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
    gif: "/img/clouded-leopard.png",
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
    image: "/img/hippo.png",
    gif: "/img/hippo.png",
    name: "Pygmy Hippo",
    scientificName: "Cheropsis liberiensis",
    description: `<p class="mb-6">The Pygmy Hippopotamus looks like a miniature version of its larger relative, the Hippopotamus (also known as the river or common hippopotamus), but it differs greatly in both behavior and physical characteristics. The Pygmy Hippo has adaptations for spending time in the water but is far less aquatic than the hippo. Its nose and ears close underwater just like its larger cousin’s do, but its head is rounder and narrower, its neck is proportionally longer, and its eyes are not on the top of its head.</p>The Pygmy Hippopotamus is much more rare in the wild, too, found only in the interior forests in parts of West Africa, mainly confined to Liberia, with small numbers in the neighboring countries of Sierra Leone, Guinea, and the Ivory Coast.<p>

    </p>`,
    status: "Critically Endangered",
    population: "2,000 to 3,000",
    size: "1 meters (3 ft)",
    habitat: "Forests and Swamps",
    images: ["/img/hippo.png", "/img/hippo.png", "/img/hippo.png"],
  },
  {
    id: "6",
    image: "/img/giraffe.png",
    gif: "/img/giraffe.png",
    name: "Nubian Giraffe",
    scientificName: "Giraffa camelopardalis",
    description: `<p class="mb-6">The tallest of all giraffes is the Nubian species. This means they are considered to be the tallest land animal on the Earth, measuring up to a remarkable 6 meters, or 20 feet tall! They can also weigh approximately 2,800 pounds, with the males outweighing the females by several hundred pounds. The Nubian Giraffe is endangered with less than 2,645 individuals remaining, are now just one stage from becoming extinct in the wild.</p>
    <p>A distinguishing feature of the Nubian Giraffe is the number of horns on top of it’s head. Other Giraffe species typically have two horns, but the Nubian Giraffe can have up to five! They have two in the same place as other giraffes, one in the center, and two behind those.</p>`,
    status: "Critically Endangered",
    population: "2,645",
    size: "1.5 meters (9 ft)",
    habitat: "Savannahs and Woodlands",
    images: ["/img/giraffe.png", "/img/giraffe.png", "/img/giraffe.png"],
  },
  {
    id: "7",
    image: "/img/red-wolf.png",
    gif: "/img/red-wolf.png",
    name: "Red Wolf",
    scientificName: "Canis simensis",
    description: `<p class="mb-6">The Red Wolf is the world’s most endangered member of the Canine family.</p>
    <p class="mb-6">Native to the United States, Red Wolves (Canis rufus) have a tawny, reddish coat, and they are intermediate in size between grey wolves and coyotes. That makes sense, as these two species interbred in the past to produce the red wolves’ ancestors. Nevertheless, recent research shows that red wolves are a unique species.</p><p>The only place where red wolves remain in the wild is the Alligator River National Wildlife Refuge in eastern North Carolina, and surrounding counties. There are only an estimated 35 or fewer wild red wolves.
  </p>`,
    status: "Critically Endangered",
    population: "Less than 10",
    size: "1.2 meters (4 ft)",
    habitat: "Forest, wetlands & bushlands",
    images: ["/img/red-wolf.png", "/img/red-wolf.png", "/img/red-wolf.png"],
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
      <div className="lg:max-w-7xl lg:mx-auto mb-8 py-16">
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

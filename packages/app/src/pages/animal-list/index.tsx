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
    gif: "/videos/sumatran-elephant.mov",
    name: "Sumatran Elephant",
    slug: 'sumatran-elephant',
  },
  {
    id: "2",
    image: "/img/javan-rhino.png",
    gif: "/img/javan-rhino.png",
    name: "Javan Rhino",
    slug: 'javan-rhino',
    
  },
  {
    id: "3",
    image: "/img/siberian-tiger.png",
    gif: "/img/siberian-tiger.png",
    name: "Siberian Tiger",
    slug: 'siberian-tiger',
  },
  {
    id: "4",
    image: "/img/clouded-leopard.png",
    gif: "/img/clouded-leopard.png",
    name: "Clouded Leopard",
    slug: 'clouded-leopard',
  },
  {
    id: "5",
    image: "/img/hippo.png",
    gif: "/img/hippo.png",
    name: "Pygmy Hippo",
    slug: 'pygmy-hippo',
  },
  {
    id: "6",
    image: "/img/giraffe.png",
    gif: "/img/giraffe.png",
    name: "Nubian Giraffe",
    slug: 'nubian-giraffe',
  },
  {
    id: "7",
    image: "/img/red-wolf.png",
    gif: "/img/red-wolf.png",
    name: "Red Wolf",
    slug: 'red-wolf',
  },
];

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
                <Link href={`nft-product/${animal.slug}`}>
                  <a className="AnimalFamily__image w-full bg-[#000] border border-[#000] rounded-3xl	 h-auto flex flex-col items-center lg:basis-1/3">
                    {animal.id === "1" ? (
                      <video
                        autoPlay
                        loop={true}
                        playsInline={true}
                        muted
                        className="rounded overflow-hidden"
                      >
                        <source src={animal.gif}></source>
                      </video>
                    ) : (
                      <Image
                        src={`${animal.gif}`}
                        width={373}
                        height={373}
                        alt=""
                        className="rounded-3xl"
                      />
                    )}
                  </a>
                </Link>
              </div>
            ) : (
              <Link href={`nft-product/${animal.name?.toLowerCase()}`}>
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

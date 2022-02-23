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
    image: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332888/zoo/images/sumatran-elephant_s3nww5.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332888/zoo/images/sumatran-elephant_s3nww5.png",
    name: "Sumatran Elephant",
    slug: "sumatran-elephant",
  },
  {
    id: "2",
    image: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png",
    name: "Javan Rhino",
    slug: "javan-rhino",
  },
  {
    id: "3",
    image: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png",
    name: "Siberian Tiger",
    slug: "siberian-tiger",
  },
  {
    id: "4",
    image: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332847/zoo/images/clouded-leopard_piqix9.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332847/zoo/images/clouded-leopard_piqix9.png",
    name: "Clouded Leopard",
    slug: "clouded-leopard",
  },
  {
    id: "5",
    image: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332795/zoo/images/hippo_i4grms.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332795/zoo/images/hippo_i4grms.png",
    name: "Pygmy Hippo",
    slug: "pygmy-hippo",
  },
  {
    id: "6",
    image: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332705/zoo/images/giraffe_caohec.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332705/zoo/images/giraffe_caohec.png",
    name: "Nubian Giraffe",
    slug: "nubian-giraffe",
  },
  {
    id: "7",
    image: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332820/zoo/images/red-wolf_tjiwez.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332820/zoo/images/red-wolf_tjiwez.png",
    name: "Red Wolf",
    slug: "red-wolf",
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
      <div className="py-16 mb-8 lg:max-w-7xl lg:mx-auto">
        <h1 className="mt-20 text-4xl font-bold text-center lg:text-6xl">
          Our Animal Family
        </h1>
      </div>
      <div className="flex flex-col flex-wrap items-center px-4 pb-16 lg:max-w-7xl lg:mx-auto lg:flex-row lg:justify-between lg:gap-2">
        {animalFamilyData.map((animal) => (
          <div
            key={animal.id}
            className="p-px mb-8 overflow-hidden rounded cursor-pointer bg-nft-gradient lg:max-w-md"
          >
            {gifMode === "gif" ? (
              <div className="bg-black rounded overflow-hidden">
                <Link href={`nft-product/${animal.slug}`}>
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
              <Link href={`nft-product/${animal.slug}`}>
                <a className="AnimalFamily__image w-full bg-[#000] border border-[#000] rounded-xl	 h-auto flex flex-col items-center lg:basis-1/3">
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

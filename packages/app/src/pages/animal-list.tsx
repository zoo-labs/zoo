import React, { useEffect } from "react";
import AnimalFamilyInfo from "components/AnimalInfo";
import Image from "next/image";
import animals from "../animals.json";
import { ANIMAL_TYPE } from "../types";

const AnimalList = () => {
  const [animalFilter, setAnimalFilter] = React.useState<ANIMAL_TYPE[]>([]);
  const [animalsModified, setAnimalsModified] = React.useState<ANIMAL_TYPE[]>(
    []
  );

  useEffect(() => {
    setAnimalsModified([...animals, animals[0]]);
  }, []);
  const handleActive = (e: ANIMAL_TYPE) => {
    const active = animalsModified.filter((animal) => animal.name === e.name);
    active.length = 1;
    setAnimalFilter(active);
  };
  return (
    <>
      <div className="px-8 mt-28 lg:px-36">
        <div className="flex justify-center text-6xl text-center mb-28">
          <p className="w-full lg:w-1/2">Our Animal Family</p>
        </div>
        <div className="grid grid-cols-3 gap-10 mb-20">
          {animalsModified.map((animal) => (
            <div
              key={animal.name}
              onClick={() => handleActive(animal)}
              className="p-1 mb-8 bg-white cursor-pointer rounded-3xl"
              style={{
                background:
                  "linear-gradient(180deg, #73205D 0%, #3772FF 100%, #FFFFFF 100%)",
              }}
            >
              <div className="AnimalFamily__image w-full bg-[#000] border border-[#000] rounded-3xl	 h-auto flex flex-col items-center lg:basis-1/3">
                <Image
                  src={`/img/${animal.image}`}
                  width={373}
                  height={373}
                  alt=""
                  className="rounded-3xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {animalFilter.length > 0 && (
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
      )}
      <div className="px-8 lg:px-36">
        <div className="grid grid-cols-3 gap-10 mb-20">
          {animalsModified.map((animal) => (
            <div
              key={animal.name}
              onClick={() => handleActive(animal)}
              className="p-1 mb-8 bg-white cursor-pointer rounded-3xl"
              style={{
                background:
                  "linear-gradient(180deg, #73205D 0%, #3772FF 100%, #FFFFFF 100%)",
              }}
            >
              <div className="AnimalFamily__image w-full bg-[#000] border border-[#000] rounded-3xl	 h-auto flex flex-col items-center lg:basis-1/3">
                <Image
                  src={`/img/${animal.image}`}
                  width={373}
                  height={373}
                  alt=""
                  className="rounded-3xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimalList;

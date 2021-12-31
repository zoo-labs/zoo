import React from "react";
import AnimalFamilyInfo from "../components/AnimalInfo";
import animals from "../animals.json";

const AnimalInfo = () => {
  return (
    <>
      <div className="px-8 mt-28 lg:px-36">
        <div className="flex justify-center text-6xl text-center mb-28">
          <p className="w-full lg:w-1/2">Our Animal Family</p>
        </div>
        {animals.map((animal) => (
          <div key={animal.name} className="flex flex-col mb-28">
            <AnimalFamilyInfo
              name={animal.name}
              image={animal.image}
              descriptionHead={animal.description.head}
              description={animal.description.desc}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AnimalInfo;

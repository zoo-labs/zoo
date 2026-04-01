import React from "react";
import AnimalFamilyInfo from "../../components/AnimalInfo";
import animals from "../../animals.json";
import Image from "next/image";

const AnimalInfo = () => {
  return (
    <section className="AnimalFamily">
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold text-center lg:text-4xl">
          Our Animal Family
        </h2>
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
    </section>
  );
};

export default AnimalInfo;

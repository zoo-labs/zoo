import Image from "next/image";
import React from "react";

const segments = ["Play", "Feed", "Grow", "Breed"];

const CardsSection = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex gap-8 items-center justify-center flex-wrap">
      {segments.map((segment, i) => (
        <div
          key={segment}
          className="relative rounded-xl border border-muted-50 bg-16 w-full md:w-auto min-w-[300px] min-h-[280px] flex items-center justify-center"
        >
          <p className="text-[42px] leading-[63px] font-semibold">{segment}</p>
          <div className="absolute right-8 bottom-6 rounded-full h-11 w-11 flex items-center justify-center border-2 bg-dark-white border-dashed border-white-20 cursor-pointer">
            <Image src="/icons/add.svg" alt="" height={24} width={24} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsSection;

import Image from "next/image";
import React, { useState } from "react";

const segments = ["Play", "Feed", "Grow", "Breed"];

const CardsSection = () => {
  return (
    <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">
      <div className="w-full overflow-x-auto whitespace-nowrap">
        <div className=" flex gap-8 items-center jjustify-center flex-wrap-">
          {segments.map((segment, i) => (
            <Card key={segment} id={i} segment={segment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsSection;

const Card = ({ id, segment }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div
      className={`relative rounded-xl border border-muted-50 bg-16 w-full md:w-auto min-w-[300px] min-h-[280px] flex items-center justify-center`}
    >
      <p className="text-[42px] leading-[63px] font-semibold">{segment}</p>
      {!open && (
        <div
          className="absolute right-8 bottom-6 rounded-full h-11 w-11 flex items-center justify-center border-2 bg-dark-white border-dashed border-white-20 cursor-pointer"
          onClick={handleOpen}
        >
          <Image src="/icons/add.svg" alt="" height={24} width={24} />
        </div>
      )}
    </div>
  );
};

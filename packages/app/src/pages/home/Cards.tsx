import Image from "next/image";
import React, { useState } from "react";

const segments = ["Play", "Feed", "Grow", "Breed"];

const CardsSection = () => {
  const [active, setActive] = useState({ id: null });
  return (
    <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">
      <div className="w-full overflow-x-auto whitespace-nowrap">
        <div className=" flex gap-8 items-center jjustify-center flex-wrap-">
          {segments.map((segment, i) => (
            <Card
              key={segment}
              id={i}
              segment={segment}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsSection;

const Card = ({ id, segment, active, setActive }) => {
  const handleOpen = () => setActive({ id });
  const handleClose = () => setActive({ id: null });
  return (
    <div
      className={`relative rounded-xl border border-muted-50 bg-16 w-full md:w-auto min-w-[300px] transition-all duration-1000 ease-in ${
        active.id === id ? "min-h-[500px] min-w-[600px] py-6" : "min-h-[280px]"
      } flex flex-col items-center justify-center`}
    >
      <p className="text-[42px] leading-[63px] font-semibold">{segment}</p>
      {active.id !== id ? (
        <div
          className={`absolute right-8 bottom-6 rounded-full h-11 w-11 flex items-center justify-center border-2 bg-dark-white border-dashed border-white-20 cursor-pointer`}
          onClick={handleOpen}
        >
          <Image src="/icons/add.svg" alt="" height={24} width={24} />
        </div>
      ) : (
        <div
          className={`absolute right-8 top-10 rounded-full flex items-center justify-center cursor-pointer`}
          onClick={handleClose}
        >
          <Image src="/icons/x-circle.svg" alt="" height={30} width={30} />
        </div>
      )}
      {active.id === id && (
        <div
          className={`${
            active.id === id ? "block" : "hidden"
          } text-center mt-11 text-xl font-normal whitespace-normal px-6 transition-all duration-1000 delay-1000`}
        >
          <p className="mb-6">
            Go through entire Zoo Labs Gaming Structure + Zoo White Paper and
            write 3 paragraphs to summarize it
          </p>
          <p className="mb-6">
            {`Research 5 competing projects and list 2-3 competitive advantages
            from each project essentially; the coolest aspects, most innovative
            applications, include some screenshots if you thinks there’s some
            impactful design/ language/ content, etc)`}
          </p>
          <p className="mb-6">
            Previous Experience (optional): Sales Training, Ambassador
            Experience, Experience in Crypto Projects/ Trading Crypto,
            Influencer/ Content Creator Work
          </p>
          <p className="mb-6">Memorize Tokenomics Structure</p>
        </div>
      )}
    </div>
  );
};

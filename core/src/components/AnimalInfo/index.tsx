import React, { FC } from "react";
import Image from "next/image";

interface Props {
  name: string;
  image: string;
  descriptionHead: string;
  description: string;
}

const AnimalFamilyInfo: FC<Props> = ({
  name,
  image,
  descriptionHead,
  description,
}) => {
  return (
    <div className="flex flex-col items-center AnimalFamily__nfts mb-4">
      <div className="flex flex-col items-center justify-center AnimalFamily__nft lg:flex-row">
        <div
          className="p-1 mb-8 bg-white rounded-lg"
          style={{
            background:
              "linear-gradient(180deg, #73205D 0%, #3772FF 100%, #FFFFFF 100%)",
          }}
        >
          <div className="flex flex-col items-center w-full h-auto AnimalFamily__image lg:basis-1/3 bg-black">
            <Image
              src={`/img/${image}`}
              width={373}
              height={373}
              alt=""
              className="rounded-3xl"
            />
          </div>
        </div>
        <div className="text-center AnimalFamily__name lg:basis-1/3">
          <h2 className="mb-6 text-3xl font-bold lg:4xl">{name}</h2>
        </div>
        <div className="px-2 py-6  lg:px-6 lg:basis-1/3 lg:bg-black100 lg:rounded-3xl">
          <h3 className="mb-4 text-xl font-bold ">{descriptionHead}</h3>
          <p className="mb-3 text-grey text-opacity-70">{description} </p>
          <a
            href=""
            rel="noreferrer"
            className="text-green font-bold underline"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnimalFamilyInfo;

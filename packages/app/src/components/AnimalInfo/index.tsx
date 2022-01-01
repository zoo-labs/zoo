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
    <section className="AnimalFamily">
      <div className="px-6 mx-auto max-w-7xl ">
        <div className="flex flex-col items-center AnimalFamily__nfts">
          <div className="flex flex-col items-center justify-center AnimalFamily__nft lg:flex-row">
            <div
              className="p-1 mb-8 bg-white rounded-3xl"
              style={{
                background:
                  "linear-gradient(180deg, #73205D 0%, #3772FF 100%, #FFFFFF 100%)",
              }}
            >
              <div className="AnimalFamily__image w-full bg-[#000] border border-[#000] rounded-3xl	 h-auto flex flex-col items-center lg:basis-1/3">
                <Image
                  src={`/img/${image}`}
                  width={373}
                  height={373}
                  alt=""
                  className="rounded-3xl"
                />
              </div>
            </div>
            <div className="text-center AnimalFamily__name lg:basis-1/3 ">
              <h2 className="mb-4 text-3xl font-semibold">{name}</h2>
            </div>
            <div
              className="flex items-center justify-center px-5 py-6 lg:basis-1/3 lg:bg-black lg:rounded-3xl"
              style={{ width: 373, height: 373 }}
            >
              <div className="">
                <h3 className="text-xl font-[600] text-[16]  mb-4">
                  {descriptionHead}
                </h3>
                <p className="mb-3 text-sm text-white text-opacity-70">
                  {description}{" "}
                </p>
                <a
                  href=""
                  rel="noreferrer"
                  className="text-orange-500 underline"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimalFamilyInfo;

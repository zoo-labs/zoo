import React, { FC } from 'react';
import Image from 'next/image';

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
  description
}) => {
  return (
    <section className="AnimalFamily">
      <div className="max-w-7xl mx-auto px-6">
        <div className="AnimalFamily__nfts flex flex-col items-center">
          <div className="AnimalFamily__nft flex flex-col lg:flex-row justify-center items-center">
            <div
              className="p-1 bg-white rounded-3xl mb-8"
              style={{
                background:
                  'linear-gradient(180deg, #73205D 0%, #3772FF 100%, #FFFFFF 100%)'
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
            <div className="AnimalFamily__name text-center lg:basis-1/3 ">
              <h2 className="text-3xl font-semibold mb-4">{name}</h2>
            </div>
            <div
              className="py-6 px-2 lg:basis-1/3 lg:bg-black lg:rounded-3xl flex items-center justify-center px-5"
              style={{ width: 373, height: 373 }}
            >
              <div className="">
                <h3 className="text-xl font-[600] text-[16]  mb-4">
                  {descriptionHead}
                </h3>
                <p className="text-white text-opacity-70 text-sm mb-3">
                  {description}{' '}
                </p>
                <a
                  href=""
                  rel="noreferrer"
                  className="underline text-orange-500"
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

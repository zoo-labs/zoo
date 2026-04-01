import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const GlobalLeaderboard = () => {
  const [isActive, setIsActive] = React.useState('nft-value');
  const [category, setCategory] = useState(0);
  // const navigate =
  const route = useRouter();

  const dummyData = [
    {
      id: 1,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 2,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 3,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 4,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 5,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 6,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 7,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 8,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 9,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 10,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    }
  ];
  return (
    <section className="flex flex-col items-center ">
      <div className="px-4 py-16 lg:w-4/12 mx-auto">
        <h1 className="text-xl lg:text-2xl font-bold mb-4 p-3 text-center">
          ZOO NFT Leaderboard
        </h1>
        <div
          className="rounded-xl w-full mb-4 p-0.5"
          style={{
            background: 'linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)'
          }}
        >
          <div className="flex items-center justify-center bg-black rounded-xl w-full h-full">
            {['NFT Value', 'Top ZOO', 'Global Users'].map((value, index) => {
              const active = category === index;
              return (
                <a
                  onClick={() => {
                    setCategory(index);
                  }}
                  className={`text-white text-xs md:text-sm font-bold px-3 md:px-6 py-3.5 cursor-pointer w-full h-full flex items-center justify-center ${
                    index !== 2 && 'border-r border-blue'
                  } ${
                    index === 0 ? 'rounded-l-xl' : index === 2 && 'rounded-r-xl'
                  }`}
                  style={{
                    background: active
                      ? 'linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)'
                      : 'transparent'
                  }}
                  key={index}
                >
                  {value}
                </a>
              );
            })}
          </div>
        </div>
        <div className="">
          {dummyData.map(({ id, name, address }) => (
            <div
              key={id}
              className="mb-4 rounded-lg  p-px cursor-pointer"
              style={{
                background: 'linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)'
              }}
              onClick={() => route.push(`/global-leaderboard/${id}`)}
            >
              <div className="p-3 text-sm md:text-base font-semibold rounded-lg bg-black flex justify-between gap-4">
                <span>
                  <span className="mr-2">{id}.</span>
                  <span>{name}</span>
                </span>
                <span>{address}</span>
                <span>
                  <Image
                    src="/img/arrow-right.png"
                    width={16}
                    height={12}
                    alt=""
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalLeaderboard;

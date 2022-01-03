import React, { FC } from 'react';

interface Props {
  market: {
    name: string;
    image: string;
  };
}
const MarketItem: FC<Props> = ({ market }) => {
  return (
    <div className="">
      <div
        className=" p-px rounded-xl"
        style={{
          background: 'linear-gradient(180deg, #3772FF 0%, #9757D7 100%)'
        }}
      >
        <div className="bg-dark h-[420px] rounded-xl flex justify-center items-center">
          <img src={market.image} alt="An NFT" />
        </div>
      </div>
      <div className="flex justify-between mt-2.5 ">
        <p className="text-xl text-white">
          {market.name}
          <span className="text-sm text-dark-gray">(182)</span>
        </p>
        <p className="flex items-center px-1 bg-dark border-2 border-purple rounded text-purple font-bold text-sm">
          500K ZOO
        </p>
      </div>
      <div className="flex justify-between  items-center my-5">
        <div className="flex items-center gap-1 text-sm">
          <img src="/img/Oval.svg" alt="" width={20} height={20} />
          <p>0xd0ae…e3e0</p>
        </div>
        <p className="text-white text-base font-medium">3 DAYS LEFT</p>
      </div>
      <hr className="h-px border-gray-500 mb-2.5 " />
      <div className="flex justify-between items-center text-sm">
        <p>Highest bid</p>
        <p className="text-white font-bold">1M ZOO</p>
        <p>200 Yields/Day</p>
      </div>
    </div>
  );
};

export default MarketItem;

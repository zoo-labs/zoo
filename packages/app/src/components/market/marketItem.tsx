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
        className=" p-[1px] rounded-[12px]"
        style={{
          background: 'linear-gradient(180deg, #3772FF 0%, #9757D7 100%)'
        }}
      >
        <div className="bg-[#000] h-[420px] rounded-[12px] flex justify-center items-center">
          <img src={market.image} alt="An NFT" height={'100%'} />
        </div>
      </div>
      <div className="flex justify-between mt-[11px]">
        <p className="text-[21px] text-white">
          {market.name}
          <span className="text-[14px] text-[#6D7278]">(182)</span>
        </p>
        <p className="flex items-center px-1 bg-[#000] border-2 border-purple rounded text-purple font-bold text-sm">
          500K ZOO
        </p>
      </div>
      <div className="flex justify-between  items-center my-[18px]">
        <div className="flex items-center gap-1 text-sm">
          <img src="/img/Oval.svg" alt="" width={20} height={20} />
          <p>0xd0ae…e3e0</p>
        </div>
        <p className="text-white text-base font-medium">3 DAYS LEFT</p>
      </div>
      <hr className="h-[1px] border-[grey] mb-[11px]" />
      <div className="flex justify-between items-center text-sm">
        <p>Highets bid</p>
        <p className="text-white font-bold">1M ZOO</p>
        <p>200 Yields/Day</p>
      </div>
    </div>
  );
};

export default MarketItem;

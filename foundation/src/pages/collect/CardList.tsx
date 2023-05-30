import React, { useState } from 'react';
import Image from 'next/image';
function CardList() {
    const cardlist = [
        {
            img: "/images/trading_card2.png"
        },
        {
            img: "/images/trading_card3.png"
        },
        {
            img: "/images/trading_card4.png"
        },
        {
            img: "/images/trading_card5.png"
        },
        {
            img: "/images/trading_card5.png"
        },
        {
            img: "/images/trading_card5.png"
        },
      ];
  return (
    <div className="bg-black">
      <div className='grid grid-cols-3 gap-12 xl:px-40 lg:px-32 max-md:px-4'>
      {cardlist.map((data, index) => (
        <div className=' flex flex-col items-center justify-between'>
            <Image
                className='w-full'
                src={data.img}
                width='800'
                height='800'
                alt=''
            />
        </div>
      ))}
      </div>
    </div>
  );
}

export default CardList;

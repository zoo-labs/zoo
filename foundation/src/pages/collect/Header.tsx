import React, { useState } from 'react';
import Image from 'next/image';
function Header() {
  return (
    <div className="bg-black">
      <div className='flex items-center justify-between pt-20'>
        <div className='w-7/12 md:pl-52 pr-8 pb-32'>
            <h1 className='text-white md:text-7xl xl:text-8xl max-md:text-5xl max-md:my-5'>Animals we support.</h1>
        </div>
        <div className='md:w-5/12 md:pr-32 max-md:absolute max-md:w-4/5 max-md:right-0 max-md:z-0'>
            <Image
                className='intro-bg float-right'
                src='/images/collect-elephant.png'
                width='1000'
                height='1000'
                alt=''
            />
        </div>
      </div>
      <div className='flex items-center justify-center space-x-8 collect-link'>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Red Wolf</a>
        <a href="/" className="text-white px-3 py-2 active text-sm font-medium">Nubian Giraffe</a>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Amur Leopard</a>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Pygmy Hippo</a>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Siberian Tiger</a>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Sumatran Elephant</a>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Javan Rhino</a>
      </div>
    </div>
  );
}

export default Header;

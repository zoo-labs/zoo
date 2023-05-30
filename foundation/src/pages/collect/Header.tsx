import React, { useState } from 'react';
import Image from 'next/image';
function Header() {
  return (
    <div className="bg-black">
      <div className='flex max-md:flex-col items-center justify-between pt-20'>
        <div className='w-7/12 max-md:w-full md:pl-52 max-md:px-8 md:pr-8 md:pb-32'>
            <h1 className='text-white md:text-7xl xl:text-9xl max-md:text-5xl max-md:my-5'>Animals we support.</h1>
        </div>
        <div className='md:w-5/12 max-md:ml-16 md:pr-32 '>
            <Image
                className='intro-bg float-right'
                src='/images/collect-elephant.png'
                width='1000'
                height='1000'
                alt=''
            />
        </div>
      </div>
      <div className='flex max-md:flex-col items-center justify-center md:space-x-8 max-md:space-y-8 collect-link'>
      <a href="/animals/red_wolf" className="text-white px-5 py-2  text-lg font-medium">Red Wolf</a>
        <a href="/animals/nubian_giraffe" className="text-white px-5 py-2 active text-lg font-medium">Nubian Giraffe</a>
        <a href="/animals/amur_leopard" className="text-white px-5 py-2  text-lg font-medium">Amur Leopard</a>
        <a href="/animals/pygmy_hippo" className="text-white px-5 py-2  text-lg font-medium">Pygmy Hippo</a>
        <a href="/animals/siberian_tiger" className="text-white px-5 py-2  text-lg font-medium">Siberian Tiger</a>
        <a href="/animals/sumatran_elephant" className="text-white px-5 py-2  text-lg font-medium">Sumatran Elephant</a>
        <a href="/animals/javen_rhino" className="text-white px-5 py-2  text-lg font-medium">Javan Rhino</a>
      </div>
    </div>
  );
}

export default Header;

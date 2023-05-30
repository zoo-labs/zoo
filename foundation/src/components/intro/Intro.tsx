import React, { useState } from 'react';
import Image from 'next/image';
function Intro({breadcrumbs,title,comment}: {
    breadcrumbs: String;
    title: string;
    comment?: string;
  }) {
  return (
    <div className="bg-black">
      <div className='flex justify-between pt-20'>
        <div className='w-1/2 max-md:w-full max-md:z-10 max-md:pt-[280px] flex flex-col justify-between  max-md:pl-15 max-md:pr-15 pl-10 md:pl-32 pr-8'>
            <p className='text-white md:text-sm lg:text-lg xl:text-2xl'>{breadcrumbs}</p>
            <h1 className='text-white md:text-7xl xl:text-9xl max-md:text-5xl max-md:my-5'>{title}</h1>
            <p className='text-white md:text-lg lg:text-2xl xl:text-3xl max-md:pb-10'>{comment}</p>
            <hr className='max-md:hidden'/>
            <p className='text-white max-md:hidden pb-8 md:text-sm md:pb-20 lg:text-lg lg:pb-24 xl:text-2xl xl:pb-32'>Supporting endangered species via human endeavors and virtual animal sales.</p>
        </div>
        <div className='md:w-1/2 max-md:absolute max-md:w-4/5 max-md:right-0 max-md:z-0'>
            <Image
                className='intro-bg float-right'
                src='/images/intro_bg.png'
                width='1000'
                height='1000'
                alt=''
            />
        </div>
      </div>
    </div>
  );
}

export default Intro;

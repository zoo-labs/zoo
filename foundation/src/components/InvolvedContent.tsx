import React, { useState } from 'react';
import Image from 'next/image';
function InvolvedContent({title,content1,content2,image,direction,type}: {
    content1: string;
    title: string;
    content2?: string;
    image: string;
    direction: string;
    type: string;
  }) {
  return (
    <div className="bg-black pt-52">
      <div className={`flex items-center justify-between pt-20 ${direction == '2' ? 'flex-row-reverse' : ''}`}>
        <div className='md:w-1/2'>
            <Image
                className='intro-bg'
                src={image}
                width='1000'
                height='1000'
                alt=''
            />
        </div>
        <div className='w-1/2 max-md:w-full flex flex-col justify-between  max-md:pl-15 max-md:pr-15 pl-10 md:pl-32 xl:pr-48'>
            <h1 className='text-white md:text-5xl xl:text-6xl max-md:text-3xl max-md:my-5 md:pb-16'>{title}</h1>
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl max-md:pb-10 md:pb-10'>{content1}</p>
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl max-md:pb-10'>{content2}</p>
            { type == '2' ? (
              <div className='flex items-center md:pt-10 md:space-x-8'>
                <a
                    href="#"
                    className="text-black hover:bg-gray-700 bg-white hover:text-white px-6 py-1 rounded-full border-white border-2 text-lg font-medium hidden md:block"
                >
                    Donate
                </a>
                <a
                    href="#"
                    className="text-white hover:bg-gray-700 bg-black hover:text-black px-6 py-1 rounded-full border-white border-2 text-lg font-medium hidden md:block"
                >
                    Volunteer
                </a>
              </div>
            ): (
              <div className='flex items-center md:pt-10 md:space-x-16'>
                <a className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10'>
                    <span className='pr-[15px]'>Volunteer</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                </a>
                <a className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10'>
                    <span className='pr-[15px]'>Donate</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                </a>
                <a className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10'>
                    <span className='pr-[15px]'>Learn More</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                </a>
              </div>
            )
            }
        </div>
      </div>
    </div>
  );
}

export default InvolvedContent;

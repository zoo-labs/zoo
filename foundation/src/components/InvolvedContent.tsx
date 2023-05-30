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
    <div className="bg-black md:pt-52 max-md:pt-32">
      <div className={`flex max-md:flex-col items-center justify-between md:pt-20 ${direction == '2' ? 'flex-row-reverse' : ''}`}>
        <div className='md:w-1/2 w-full'>
            <Image
                className='intro-bg'
                src={image}
                width='1000'
                height='1000'
                alt=''
            />
        </div>
        <div className='w-1/2 max-md:w-full flex flex-col justify-between  px-8 md:pl-32 xl:pr-48'>
            <h1 className='text-white md:text-5xl xl:text-6xl max-md:text-3xl max-md:my-5 md:pb-16'>{title}</h1>
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl max-md:pb-4 md:pb-10'>{content1}</p>
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl '>{content2}</p>
            { type == '2' ? (
              <div className='flex items-center md:pt-10 max-md:pt-4 space-x-8'>
                <a
                    href="#"
                    className="text-black hover:bg-gray-700 bg-white hover:text-white px-6 py-1 rounded-full border-white border-2 text-lg font-medium  md:block"
                >
                    Donate
                </a>
                <a
                    href="#"
                    className="text-white hover:bg-gray-700 bg-black hover:text-black px-6 py-1 rounded-full border-white border-2 text-lg font-medium  md:block"
                >
                    Volunteer
                </a>
              </div>
            ): (
              <div>
              <div className='flex items-center md:pt-10 max-md:pt-4 space-x-16'>
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
                <a className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10 hidden md:flex'>
                    <span className='pr-[15px]'>Learn More</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                </a>
              </div>
              <a className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10 md:hidden max-md:block'>
                <u className='pr-[15px]'>Learn More</u>
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

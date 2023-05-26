import React, { useState } from 'react';
import Image from 'next/image';
function Detail() {
  return (
    <div className="bg-black xl:px-56 lg:px-40 px-32">
      <div className='flex items-center justify-between py-20 px-16 space-x-16'>
        <div className='md:w-1/2 max-md:absolute max-md:w-4/5 max-md:right-0 max-md:z-0'>
            <Image
                className='w-4/5'
                src='/images/red_wolf.png'
                width='800'
                height='800'
                alt=''
            />
        </div>
        <div className='w-1/2 max-md:w-full max-md:z-10 max-md:pt-[280px] flex flex-col  max-md:pl-15 max-md:pr-15 pl-10 md:pl-32 pr-8'>
            <p className='text-white md:text-sm lg:text-md xl:text-lg'>ENDANGERED SPECIES WE SUPPORT</p>
            <h1 className='text-white md:text-3xl xl:text-5xl max-md:text-2xl mt-5 mb-12'>The Red Wolf</h1>
            <p className='text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10'>Visual guides also allow you to define the information hierarchy of the design</p>
            <div className='flex items-center justify-between mt-10'>
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
        </div>
      </div>
    </div>
  );
}

export default Detail;

import React, { useState } from 'react';
import Image from 'next/image';
function Detail() {
  return (
    <div>
    <div className="bg-black xl:px-56 lg:px-40 px-32 max-md:hidden">
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
        <div className='w-1/2 max-md:w-full max-md:z-10 max-md:pt-[280px] flex flex-col  max-md:pl-15 max-md:pr-15 pl-10 xl:pl-16 pr-8'>
            <p className='text-white md:text-sm lg:text-md xl:text-xl'>ENDANGERED SPECIES WE SUPPORT</p>
            <h1 className='text-white md:text-3xl xl:text-6xl max-md:text-2xl mt-5 mb-12'>The Red Wolf</h1>
            <p className='text-white md:text-sm lg:text-md xl:text-xl max-md:pb-10'>Visual guides also allow you to define the information hierarchy of the design</p>
            <div className='flex items-center justify-between mt-10'>
                <a className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-xl max-md:pb-10'>
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
    <div className='bg-black flex flex-col hidden max-md:block px-4'>
        <p className='text-white text-center pb-8 max-md:text-lg'>ENDANGERED SPECIES WE SUPPORT</p>
        <div className='max-md:w-full relative flex flex-col items-center justify-between border rounded-xl border-white space-y-8'>
            <Image
                className='w-full'
                src='/images/red_wolf.png'
                width='800'
                height='800'
                alt=''
            />
            <a className='flex items-center absolute bottom-[20px] cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10'>
                <span className='pr-[15px]'>Red Wolf</span>
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                </svg>
            </a>
        </div>
    </div>
    </div>
  );
}

export default Detail;

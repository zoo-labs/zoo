import React, { useState } from 'react';
import Image from 'next/image';
function Volunteer() {
  return (
    <div className="bg-black pt-52">
      <div className="flex items-center justify-between pt-20">
        <div className='w-1/2 max-md:w-full flex flex-col justify-between  max-md:pl-15 max-md:pr-15 md:pl-48 xl:pr-52'>
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl max-md:pb-10 md:pb-6'>Doing good feels great</p>
            <h1 className='text-white md:text-5xl xl:text-6xl max-md:text-3xl max-md:my-5 md:pb-6'>Volunteer</h1>
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl md:pb-12'>Share your details so we can get in touch!</p>
            <input className='bg-white text-black pl-4 py-4 rounded-full outline-none md:mb-4' placeholder='First and Last Name' />
            <input className='bg-white text-black pl-4 py-4 rounded-full outline-none md:mb-8' placeholder='Email' />
            <div className='flex space-x-16 items-center'>
                <button className='rounded-full px-12 py-2 bg-white'>Inquire</button>
                <p className='text-white text-sm'>The future generations of endangered species thank you.</p>
            </div>
        </div>
        <div className='md:w-1/2'>
            <Image
                className='intro-bg'
                src="/images/involved6.png"
                width='1000'
                height='1000'
                alt=''
            />
        </div>
      </div>
    </div>
  );
}

export default Volunteer;

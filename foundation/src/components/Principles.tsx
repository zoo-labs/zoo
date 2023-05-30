import React, { useState } from 'react';
function Principles() {
  return (
    <div className="bg-black py-52 max-md:py-28">
        <div className='w-full text-center flex flex-col justify-between pb-20 max-md:px-16'>
            <h1 className='text-white md:text-4xl xl:text-7xl max-md:text-3xl max-md:my-5'>The principles that drive <u>us.</u></h1>
            <p className='text-white md:text-md lg:text-lg xl:text-3xl max-md:pb-10 pb-5 pt-16'>We <b>promote wildlife</b> conservation.</p>
            <p className='text-white md:text-md lg:text-lg xl:text-3xl max-md:pb-10 pb-5'>We inspire <b>positive action through education.</b></p>
            <p className='text-white md:text-md lg:text-lg xl:text-3xl max-md:pb-10 pb-5'>We leverage <b>innovative technology.</b></p>
            <p className='text-white md:text-md lg:text-lg xl:text-3xl max-md:pb-10 pb-5'>We engage communities for <b>species protection.</b></p>
            <p className='text-white md:text-md lg:text-lg xl:text-3xl max-md:pb-10 pb-8'>We foster human-nature <b>coexistence.</b></p>
            <div className='flex items-center justify-center space-x-6'>
                <a
                    href="#"
                    className="text-black hover:bg-gray-700 bg-white hover:text-white px-6 py-1 rounded-full border-white border-2 text-xl font-medium hidden md:block"
                >
                    Donate
                </a>
                <a
                    href="#"
                    className="text-white hover:bg-gray-700 bg-black hover:text-black px-6 py-1 rounded-full border-white border-2 text-xl font-medium hidden md:block"
                >
                    Get Involved
                </a>
                <a
                    href="#"
                    className="text-white hover:bg-gray-700 bg-black hover:text-black px-6 py-1 rounded-full border-white border-2 text-xl font-medium hidden max-md:block"
                >
                    Learn More
                </a>
            </div>
        </div>
    </div>
  );
}

export default Principles;

import React, { useState } from 'react';
function Campaign() {
  return (
    <div className="bg-black">
        <div className='w-full text-center items-center flex flex-col justify-between pb-20'>
            <p className='text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10 pb-5 pt-16'>Bring your community TO the Zoo foundation</p>
            <h1 className='text-white md:text-4xl xl:text-6xl max-md:text-3xl max-md:my-5'>Create your own campaign.</h1>
            
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl max-md:pb-10 pb-8 pt-8'>A self-tailored campaign to raise funds for<br /> these animals by leveraging your network. </p>
            <a
                href="#"
                className="text-black w-[150px] hover:bg-gray-700 bg-white hover:text-white px-6 py-1 rounded-full border-white border-2 text-lg font-medium hidden md:block"
            >
                Learn More
            </a>
               
        </div>
    </div>
  );
}

export default Campaign;

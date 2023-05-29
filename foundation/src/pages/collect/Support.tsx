import React, { useState } from 'react';
function Support() {
  return (
    <div className="bg-black py-52">
      <div className='flex flex-col px-64'>
        <h1 className='text-white  xl:text-5xl md:text-3xl'>Supporting endangered species with a digital collectible.</h1>
        <div className='flex justify-between space-x-16  pt-16'>
          <p className='w-1/2 text-white text-lg'>These digital collectibles, embodied as lifelike 3D representations of endangered animals, encapsulate the unique characteristics of each species, tied with educational content </p>
          <p className='w-1/2 text-white text-lg'>effectively raising awareness about their vulnerable conditions and the urgent need for conservation efforts.</p>
          <p className='w-1/2 text-white text-lg'>Buying these collectibles fuels Zoo Labs' efforts in research, habitat preservation, and anti-poaching to save endangered species.</p>
        </div>
      </div>
    </div>
  );
}

export default Support;

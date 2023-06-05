import React, { useState } from 'react';
import Image from 'next/image';
import Switch from "react-switch";
function Header() {
    const [checked, setChecked] = useState(false);
    const handleChange = (e:boolean) => {
        setChecked(e);
    }
  return (
    <div className="bg-black">
      <div className='flex max-md:flex-col items-center justify-between pt-20'>
        <div className='w-1/2 max-md:w-full max-md:px-8 flex flex-col xl:pl-52 lg:pl-28 md:pl-16 pr-8 lg:pb-32'>
            <p className='text-lg text-white pb-8'>End the road to extinction</p>
            <h1 className='text-white md:text-3xl lg:text-5xl xl:text-7xl max-md:text-3xl max-md:my-5 pb-9'>Donate to the Zoo Labs Foundation</h1>
            <p className='lg:text-lg md:text-md text-white pb-8'>"It is our driving purpose to deepen the connection humans have with animals by creating sustainable animal sanctuaries for endangered species. Share the Zoo Sanctuary with local visitors, educators, host fundraisers/events, and get the Zoo Community as involved as possible to saving endandered animals all over the world. You could save a life todav w/ a monthlv donation or a one.-time contribution.
"</p>
            <div className='lg:flex hidden items-center justify-between'>
                <div className='flex flex-col items-center space-y-2'>
                    <Switch onChange={handleChange} checked={checked} />
                    <p className='text-xs text-center text-white'>Switch to Monthly</p>
                </div>
                <input className=' w-1/3 rounded-md outline-none text-center px-4 py-2 md:text-sm lg:text-md xl:text-lg' placeholder='Enter $ Amount' />
                <button className='w-1/3 rounded-md px-4 py-2 text-white bg-blue'>Donate Now</button>
            </div>
        </div>
        <div className='md:w-1/2 xl:pr-32 pr-4 max-md:w-full'>
            <Image
                className='intro-bg float-right'
                src='/images/donation_header.png'
                width='1000'
                height='1000'
                alt=''
            />
        </div>
      </div>
      <div className='md:flex pl-16 lg:hidden w-2/3 items-center justify-between md:pb-32'>
          <div className='flex flex-col items-center space-y-2'>
              <Switch onChange={handleChange} checked={checked} />
              <p className='text-xs text-center text-white'>Switch to Monthly</p>
          </div>
          <input className=' w-1/3 rounded-md outline-none text-center px-4 py-2 md:text-sm lg:text-md xl:text-lg' placeholder='Enter $ Amount' />
          <button className='w-1/3 rounded-md px-4 py-2 text-white bg-blue'>Donate Now</button>
      </div>
    </div>
  );
}

export default Header;

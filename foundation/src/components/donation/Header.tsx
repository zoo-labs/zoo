import React, { useState } from 'react';
import Image from 'next/image';
import Switch from "react-switch";
function Header() {
    const [checked, setChecked] = useState(false);
    const handleChange = (e:boolean) => {
        setChecked(e);
    }
  return (
    <div className="bg-black max-md:pt-20">
      <div className='flex max-md:flex-col items-center justify-between pt-20'>
        <div className='w-1/2 max-md:w-full max-md:px-8 flex flex-col xl:pl-52 lg:pl-28 md:pl-16 pr-8 lg:pb-32'>
            <p className='text-lg text-white pb-8'>End the road to extinction</p>
            <h1 className='text-white md:text-3xl lg:text-5xl xl:text-7xl max-md:text-3xl max-md:my-5 pb-9'>Donate to the Zoo Labs Foundation</h1>
            <p className='lg:text-lg md:text-md text-white pb-8'>"It is our driving purpose to deepen the connection humans have with animals by creating sustainable animal sanctuaries for endangered species. Share the Zoo Sanctuary with local visitors, educators, host fundraisers/events, and get the Zoo Community as involved as possible to saving endandered animals all over the world. You could save a life todav w/ a monthlv donation or a one.-time contribution.
"</p>
            <div className='lg:flex hidden items-center justify-between'>
                <div className='flex flex-col items-center space-y-1 lg:space-y-2'>
                    <Switch onChange={handleChange} height={24} width={48}  uncheckedIcon={false} checkedIcon={false} checked={checked} />
                    <p className='text-xs leading-[0.5rem] text-center text-white'>Switch to Monthly</p>
                </div>
                <input className=' w-1/3 rounded-md outline-none text-center px-4 border border-white py-2 md:text-sm lg:text-md xl:text-lg' placeholder='Enter $' />
                <button className='w-1/3 rounded-md px-4 py-2 text-white border border-white md:text-sm lg:text-md xl:text-lg'>Donate Now</button>
            </div>
        </div>
        <div className='md:w-1/2 xl:pr-32 pr-4 max-md:w-full'>
        
            {/* <Image
                className='intro-bg float-right'
                src='/images/donation_header.png'
                width='1000'
                height='1000'
                alt=''
            /> */}
            <video  autoPlay loop muted playsInline className="w-full float-right">
              <source src="/videos/pygmy_flower.mp4" type="video/mp4"/>
            </video>
        </div>
      </div>
      <div className='md:flex md:pl-16 max-md:flex space-x-4 max-md:px-4 lg:hidden w-2/3 max-md:w-full items-center justify-between md:pb-32'>
          <div className='flex w-1/3 flex-col items-center space-y-1'>
              <Switch onChange={handleChange} height={20} width={40}  uncheckedIcon={false} checkedIcon={false} checked={checked} />
              <p className='text-[0.5rem] leading-[0.5rem] text-center text-white'>Switch to Monthly</p>
          </div>
          <input className=' w-1/3 rounded-md max-md:rounded-full outline-none max-md:text-xs  border border-white text-center px-4 py-2 md:text-sm lg:text-md xl:text-lg' placeholder='Enter $ Amount' />
          <button className='w-1/3 rounded-md max-md:rounded-full px-4 py-2 max-md:px-2 max-md:text-xs md:text-sm border border-white text-white'>Donate Now</button>
      </div>
    </div>
  );
}

export default Header;

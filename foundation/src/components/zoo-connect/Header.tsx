import Link from 'next/link';
import Image from 'next/image';
import React,{useState} from "react";
import Slider from 'react-slick';
import ProgressBar from "@ramonak/react-progress-bar";
function Header() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        autoplay: true,
        arrows: false
      };
  return (
    <div className="bg-black max-md:pt-20 md:flex-1">
        <div className='zoo-connect hidden max-md:block'>
            <Slider {...settings} className='bg-black w-full'>
                <Image
                    className='w-full'
                    src='/images/zoo_connect_2.png'
                    width='1000'
                    height='1000'
                    alt=''
                />
                <Image
                    className='w-full'
                    src='/images/zoo_connect_2.png'
                    width='1000'
                    height='1000'
                    alt=''
                />
            </Slider>
        </div>
        <div className="flex flex-col max-md:py-4 px-4">
          <p className='px-2 max-md:py-2 text-white text-2xl pb-4'>Fund Zoo Connect A Voice for Endangered Animals</p>
          <p className='px-2 text-white text-sm'><span className='text-[#3C9465]'>$2,679</span> fund raised from $25,000</p>
          <ProgressBar className='px-2 pt-2' completed={80} isLabelVisible={false} bgColor='#3C9465' height="5px"/>
          <div className='flex justify-between px-2 pt-2 text-white text-sm'>
            <p><span className='text-[#3C9465]'>3,274</span> Donors</p>
            <p><span className='text-[#3C9465]'>12</span> days left</p>
          </div>
          <div className='flex items-center justify-between px-2 pt-6 text-white text-sm'>
            <div className='flex items-center space-x-1'>
                <Image
                    className='w-[40px]'
                    src='/images/donators.png'
                    width='1000'
                    height='1000'
                    alt=''
                />
                <p className=' text-white text-sm'>3,438 donators</p>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_173_2420)">
                    <path d="M4.16659 10.8333H13.4749L9.40825 14.9C9.08325 15.225 9.08325 15.7583 9.40825 16.0833C9.73325 16.4083 10.2583 16.4083 10.5833 16.0833L16.0749 10.5917C16.3999 10.2667 16.3999 9.74166 16.0749 9.41666L10.5916 3.91666C10.2666 3.59166 9.74159 3.59166 9.41659 3.91666C9.09159 4.24166 9.09159 4.76666 9.41659 5.09166L13.4749 9.16666H4.16659C3.70825 9.16666 3.33325 9.54166 3.33325 10C3.33325 10.4583 3.70825 10.8333 4.16659 10.8333Z" fill="#3C9465"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_173_2420">
                    <rect width="20" height="20" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>
          </div>
          <Link href='/donation' className='bg-[#3C9465] text-center py-2 my-5 rounded-full w-full text-white text-xl'>Donate Now</Link>
          <hr />
        </div>
    </div>
  );
}

export default Header;

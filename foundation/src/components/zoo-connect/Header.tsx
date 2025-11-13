import Link from 'next/link';
import Image from 'next/image';
import React,{useState} from "react";
import Slider from 'react-slick';
import ProgressBar from "@ramonak/react-progress-bar";
import { useStripe } from '@stripe/react-stripe-js'
import { fetchPostJSON, fetchGetJSON } from '../../utils/api_helpers'
function Header() {
  const prefix = '$';
  const stripe = useStripe();
  const [amount, setAmount] = useState("$20");
  const handleInputChange = (e:any) => {
    const input = e.target.value
    e.target.value = prefix + input.substr(prefix.length)
    setAmount(e.target.value);
  };
  const handleSubmit = async () => {
    if(amount == null || amount == "$")return;
      const response = await fetchPostJSON('/api/checkout_sessions', {
        amount: Number(amount.replace('$','')),
      })

      if (response.statusCode === 500) {
        console.error(response.message)
        return
      }

      const { error } = await stripe!.redirectToCheckout({
        sessionId: response.id,
      })
      console.warn(error.message)
  };
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
    <div className='md:px-12 lg:px-24 xl:px-32 bg-black'>
      <p className='hidden md:block text-white text-2xl text-center py-12'>Fund Zoo Connect A Voice for Endangered Animals</p>
      <div className="bg-black max-md:pt-20 block md:grid grid-cols-2 gap-8 lg:gap-16 xl:gap-24 ">
          <div className='zoo-connect block'>
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
          <div className="flex flex-col max-md:py-4 px-4 md:hidden">
            <p className='px-2 max-md:py-2 text-white text-2xl pb-4'>Fund Zoo Connect A Voice for Species Globally</p>
            <p className='px-2 text-white text-sm'><span className='text-[#3C9465]'>$6,679</span> fund raised from $8,200</p>
            <ProgressBar className='px-2 pt-2' completed={80} isLabelVisible={false} bgColor='#3C9465' height="5px"/>
            <div className='flex justify-between px-2 pt-2 text-white text-sm'>
              <p><span className='text-[#3C9465]'>3,274</span> Donators</p>
              <p><span className='text-[#3C9465]'>12</span> days left</p>
            </div>
            <div className='flex items-center justify-between px-2 pt-6 text-white text-sm'>
              <button className='text-[#3C9465] border border-[#3C9465] rounded-full px-2 py-[2px] text-xs'>Medical</button>
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
          <div className='md:flex flex-col text-white max-md:hidden justify-between'>
            <ProgressBar className='pt-2' completed={80} isLabelVisible={false} bgColor='#3C9465' height="5px"/>
            <div className='flex flex-col space-y-1'>
              <p className='text-lg 2xl:text-3xl xl:text-2xl lg:text-xl text-[#3C9465] pt-6'>$6,679</p>
              <p className='text-sm 2xl:text-xl xl:text-lg lg:text-base text-[#DADEE3] '>raised of $8,200 goal</p>
            </div>
            <div className='flex flex-col space-y-1'>
              <p className='text-lg 2xl:text-3xl xl:text-2xl lg:text-xl text-[#3C9465] '>841</p>
              <p className='text-sm 2xl:text-xl xl:text-lg lg:text-base text-[#DADEE3] '>donations</p>
            </div>
            <div className='flex flex-col space-y-1'>
              <p className='text-lg 2xl:text-3xl xl:text-2xl lg:text-xl text-[#3C9465]'>11</p>
              <p className='text-sm 2xl:text-xl xl:text-lg lg:text-base text-[#DADEE3]'>days to go</p>
            </div>
            <div className='flex pt-6 space-x-4 2xl:space-x-16'>
              <input onChange={handleInputChange} value={amount} className='w-1/2 outline-none bg-transparent text-white text-center px-4 py-1 md:text-sm lg:text-md xl:text-lg border border-white rounded-full' placeholder='Enter $' />
              <button onClick={handleSubmit} className='w-1/2 bg-white hover:bg-black hover:text-white border border-white px-4 py-1 rounded-full text-black font-medium md:text-sm transition-colors'>Donate</button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Header;

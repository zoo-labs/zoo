import Image from 'next/image';
import Link from 'next/link';
import ProgressBar from "@ramonak/react-progress-bar";
function Aiding() {
  return (
    <div className="bg-black md:py-32 lg:py-52 max-md:py-28 max-md:px-8">
      <div className='flex flex-col'>
        <h1 className='text-white md:text-center xl:text-5xl md:text-4xl max-md:text-4xl '>Aiding Species with Digital Twins</h1>
        <div className='flex max-md:flex-col  justify-between md:space-x-16 max-md:space-y-8 xl:px-64 lg:px-32 md:px-16 pt-16'>
          <p className='w-1/2 max-md:w-full text-white text-xl'>Our endeavors are made possible through philanthropic donations and the proceeds garnered from the sale of our virtual animals and trading cards.</p>
          <p className='w-1/2 max-md:w-full text-white text-xl'>We are developing intellectually stimulating content for both children and adults. Our  platform will host a variety of interactive experiences with our Zoo Animals, aimed at lasting impact and raising awareness.</p>
        </div>

        <Link href='#' className="hidden max-md:flex bg-[#1E1F23] flex-col border border-[#1E1F23] mt-12 rounded-xl pb-4">
          <>
          <Image
            className='w-full'
            src='/images/zoo_connect.png'
            width='1000'
            height='1000'
            alt=''
          />
          <p className='px-2 py-2 text-white text-base'>Fund Zoo Connect - A voice for neglected, mistreated and endangered animals globally</p>
          <p className='px-2 text-white text-sm'><span className='text-[#3C9465]'>$7379</span> of $12,400 goal</p>
          <ProgressBar className='px-2 pt-2' completed={80} isLabelVisible={false} bgColor='#3C9465' height="5px"/>
          <div className='flex justify-between px-2 pt-2 text-white text-sm'>
            <p><span className='text-[#3C9465]'>3,274</span> Donators</p>
            <p><span className='text-[#3C9465]'>12</span> days left</p>
          </div>
          </>
        </Link>
      </div>
    </div>
  );
}

export default Aiding;

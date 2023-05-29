import React, { useState } from 'react';
import Image from 'next/image';
function Header() {
  return (
    <div className="bg-black px-64">
      <div className="flex items-center justify-between py-20">
        <div className='relative md:w-1/2 pr-32'>
            <Image
                className='intro-bg border rounded-xl p-3'
                src="/images/trading_card1.png"
                width='1000'
                height='1000'
                alt=''
            />
            <div className='absolute top-4 right-36 w-[45px] h-[45px] flex justify-center bg-white rounded-full'>
                <svg width="15" height="45" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7586 2.72001H3.53201L4.52469 1.74131C4.78597 1.48362 4.88806 1.108 4.79244 0.756034C4.69675 0.403999 4.41795 0.129101 4.06091 0.0347546C3.70395 -0.059523 3.32299 0.0411294 3.06163 0.298754L0.303024 3.01872C0.109057 3.21004 0 3.46949 0 3.74C0 4.01051 0.109052 4.26997 0.303024 4.46128L3.06163 7.18124C3.32299 7.43886 3.70395 7.53951 4.06091 7.44524C4.41795 7.35089 4.69676 7.076 4.79244 6.72396C4.88806 6.372 4.78598 5.99637 4.52469 5.73868L3.53201 4.75998H12.7586C14.1305 4.75998 15.4461 5.29732 16.4162 6.2537C17.3862 7.21014 17.9311 8.50728 17.9311 9.86001C17.9311 11.2127 17.3862 12.5098 16.4162 13.4663C15.4462 14.4227 14.1306 14.96 12.7586 14.96H6.55177C6.18216 14.96 5.84071 15.1545 5.65587 15.47C5.4711 15.7856 5.4711 16.1745 5.65587 16.49C5.84071 16.8056 6.18216 17 6.55177 17H12.7586C16.7516 17 20 13.7972 20 9.8601C20 5.92304 16.7516 2.72019 12.7586 2.72019V2.72001Z" fill="black"/>
                </svg>
            </div>
        </div>
        <div className='w-1/2 max-md:w-full flex flex-col justify-between'>
            <h1 className='text-white md:text-5xl xl:text-6xl max-md:text-3xl max-md:my-5 md:pb-16'>Select any trading card to start learning.</h1>
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl max-md:pb-10 md:pb-10'>Discover our vibrant, fact-packed Zoo trading cards – a virtual treasure trove of animal knowledge and endangered species insights!</p>
            
            <div className='flex items-center md:pt-10 md:space-x-8'>
                <a
                    href="#"
                    className="text-black hover:bg-gray-700 bg-white hover:text-white px-12 py-1 rounded-full border-white border-2 text-lg font-medium hidden md:block"
                >
                    Buy $25
                </a>
                <a
                    href="#"
                    className="text-white hover:bg-gray-700 bg-black hover:text-black px-6 py-1 rounded-full border-white border-2 text-lg font-medium hidden md:block"
                >
                    + Cart
                </a>
            </div>
        </div>
        
      </div>
      <div className='flex items-center justify-center space-x-8 collect-link'>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Red Wolf</a>
        <a href="/" className="text-white px-3 py-2 active text-sm font-medium">Nubian Giraffe</a>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Amur Leopard</a>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Pygmy Hippo</a>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Siberian Tiger</a>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Sumatran Elephant</a>
        <a href="/" className="text-white px-3 py-2  text-sm font-medium">Javan Rhino</a>
      </div>
    </div>
  );
}

export default Header;

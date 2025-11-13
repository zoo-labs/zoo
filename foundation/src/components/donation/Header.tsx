import React from 'react';
import Image from 'next/image';

function CryptoSection({ isMobile = false }: { isMobile?: boolean }) {
  const buttonClasses = isMobile
    ? 'flex-1 h-[48px] rounded-full px-6 py-3 text-black bg-white hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] border-2 border-white transition-all duration-300 text-sm font-bold uppercase tracking-wide whitespace-nowrap'
    : 'min-w-[180px] h-[52px] rounded-full px-8 py-3 text-black bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] border-2 border-white transition-all duration-300 md:text-sm lg:text-base xl:text-lg font-bold uppercase tracking-wider whitespace-nowrap';
  
  return (
    <a 
      href="/donation/crypto" 
      className={buttonClasses}
    >
      ₿ Donate Crypto
    </a>
  );
}

function Header() {
  return (
    <div className="bg-black max-md:pt-20">
      <div className='flex max-md:flex-col items-center justify-between pt-20'>
        <div className='w-1/2 max-md:w-full max-md:px-8 flex flex-col 2xl:pl-52 xl:pl-36 lg:pl-28 md:pl-16 pr-8 lg:pb-32'>
            <p className='text-xl text-white pb-8 font-semibold'>🆘 End the road to extinction</p>
            <h1 className='text-white md:text-3xl lg:text-5xl xl:text-7xl max-md:text-3xl max-md:my-5 pb-9'>Donate to the Zoo Labs Foundation</h1>
            <p className='lg:text-lg md:text-md text-white pb-8 leading-relaxed'>&quot;It is our driving purpose to deepen the connection humans have with animals by creating sustainable animal sanctuaries for endangered species. Share the Zoo Sanctuary with local visitors, educators, host fundraisers/events, and get the Zoo Community as involved as possible to saving endangered animals all over the world. You could save a life today w/ a monthly donation or a one-time contribution.&quot;</p>
            <div className='lg:flex hidden items-center justify-start xl:space-x-8 space-x-6'>
                <div className='flex space-x-4'>
                  <a 
                    href="https://www.paypal.biz/zoongo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className='min-w-[180px] h-[52px] rounded-full px-8 py-3 text-black bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] border-2 border-white transition-all duration-300 md:text-sm lg:text-base xl:text-lg font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap'
                  >
                    💵 Donate Cash
                  </a>
                  <CryptoSection />
                </div>
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
      <div className='md:flex max-md:flex max-md:px-4 lg:hidden w-full items-center justify-start md:pl-16 md:pb-32'>
          <div className='flex flex-col space-y-3 w-full max-w-md'>
            <div className='flex space-x-3'>
              <a 
                href="https://www.paypal.biz/zoongo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='flex-1 h-[48px] rounded-full px-6 py-3 text-black bg-white hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] border-2 border-white transition-all duration-300 text-sm font-bold uppercase tracking-wide flex items-center justify-center whitespace-nowrap'
              >
                💵 Donate Cash
              </a>
              <CryptoSection isMobile={true} />
            </div>
          </div>
      </div>
    </div>
  );
}

export default Header;

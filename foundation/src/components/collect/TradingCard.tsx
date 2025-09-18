import Image from 'next/image';
import Link from 'next/link';
function TradingCard() {
  return (
    <div className="bg-black pb-32 max-md:pb-16 xl:px-64 lg:px-32 md:px-16 px-4">
      <h1 className='text-white max-md:text-3xl max-md:block hidden pb-8'>Select any trading card to start learning.</h1>
      <div className="flex items-center justify-between md:pt-20 flex-row-reverse">
        <div className='w-1/2 lg:pl-32 pl-8'>
            {/* <Image
                className='intro-bg'
                src="/images/trading_card1.png"
                width='1000'
                height='1000'
                alt=''
            /> */}
            <Link href="/animals/amur_leopard">
              <video autoPlay loop muted playsInline className="w-full aspect-[473/833] border rounded-xl p-1" >
                <source src="/videos/Leopard_Card_Front.webm"  type="video/webm"/>
                <source src="/videos/Leopard_Card_Front.mp4"  type="video/mp4"/>
              </video>
            </Link>
        </div>
        <div className='w-1/2  flex flex-col justify-between'>
            <h1 className='text-white md:text-5xl xl:text-6xl max-md:text-3xl max-md:my-5 md:pb-16 max-md:hidden'>Select any trading card to start learning.</h1>
            <p className='text-white md:text-lg lg:text-xl max-md:text-xl xl:text-2xl max-md:pb-10 md:pb-10'>Discover our vibrant, fact-packed Zoo trading cards – a virtual treasure trove of animal knowledge and endangered species insights!</p>

            <Link href='/animals/amur_leopard'  className='flex items-center md:pt-10 cursor-pointer text-white md:text-sm lg:text-md max-md:text-md xl:text-lg max-md:pb-10'>
              <>
                <span className='pr-[15px]'>View Amur Leopard</span>
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                </svg>
              </>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default TradingCard;

import Link from 'next/link';
import Image from 'next/image';
function Collecting() {
  return (
    <div className="bg-black lg:py-52 md:py-32 max-md:py-0">
        <div className='w-full text-center items-center flex flex-col justify-between'>
            <Link href='/animals'  className='text-white md:text-4xl xl:text-6xl max-md:text-3xl max-md:my-5 pb-8'>Start Collecting</Link>
            <Link href='/animals'  className='text-center w-3/5 max-md:w-[90%] py-12'>
              <div className='relative top-0 left-0 w-full aspect-[1182/833]'>
                <div className='absolute w-[38%] left-0 top-0 -rotate-6 z-[10]'>
                  <video autoPlay loop muted playsInline className="w-full aspect-[473/833] border rounded-xl">
                    <source src="/videos/Hippo_Card_front.webm"  type="video/webm"/>
                    <source src="/videos/Hippo_Card_front.mp4"  type="video/mp4"/>
                  </video>
                </div>
                <div className='absolute w-[38%] left-[31%] -top-3 z-[15]'>
                  <video autoPlay loop muted playsInline className="w-full aspect-[473/833] border rounded-xl">
                    <source src="/videos/TIGER_Card_front.webm"  type="video/webm"/>
                    <source src="/videos/TIGER_Card_front.mp4"  type="video/mp4"/>
                  </video>
                </div>
                <div className='absolute top-0 right-0 w-[38%] rotate-6 z-[10]'>
                  <video autoPlay loop muted playsInline className="w-full aspect-[473/833] border rounded-xl">
                    <source src="/videos/TIGER_Card_Back.webm"  type="video/webm"/>
                    <source src="/videos/TIGER_Card_Back.mp4"  type="video/mp4"/>
                  </video>
                </div>
              </div>
            </Link>
            <div className='flex max-md:flex-col pt-8 items-center justify-center md:space-x-8 max-md:space-y-4'>
                <Link href="/animals"  className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-xl max-md:pb-10' legacyBehavior>
                  <a>
                    <span className='pr-[15px]'>View Endangered Cards</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                  </a>
                </Link>
                <Link href="https://app.zoolabs.io/"  className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-6' legacyBehavior>
                  <a>
                    <span className='pr-[15px]'>Shop Digital Collectibles</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                  </a>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Collecting;

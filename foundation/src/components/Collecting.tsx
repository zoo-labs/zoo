import Link from 'next/link';
import Image from 'next/image';
function Collecting() {
  return (
    <div className="bg-black py-52 max-md:py-0">
        <div className='w-full text-center items-center flex flex-col justify-between'>
            <h1 className='text-white md:text-4xl xl:text-6xl max-md:text-3xl max-md:my-5 pb-8'>Start Collecting</h1>
            <Image
                className='w-3/5'
                src='/images/collecting.png'
                width='800'
                height='800'
                alt=''
            />
            <div className='flex max-md:flex-col max-md:pt-8 items-center justify-center md:space-x-8'>
                <Link href="#" className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-xl max-md:pb-10'>
                    <span className='pr-[15px]'>View Endangered Cards</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                </Link>
                <Link href="/collect" className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-6'>
                    <span className='pr-[15px]'>Shop Digital Collectibles</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Collecting;

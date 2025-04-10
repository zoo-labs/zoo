import Image from 'next/image';
function Newsletter() {
  return (
    <div className="bg-black pt-32 max-md:pb-32">
      <div className='flex justify-between md:space-x-16'>
        <div className='md:w-1/3 max-md:hidden'>
            <Image
                className='w-11/12 pt-16'
                src='/images/newsletter.png'
                width='800'
                height='800'
                alt=''
            />
        </div>
        <div className='w-2/3 max-md:w-full flex flex-col xl:pr-32 lg:pr-16 xl:pl-32 lg:pl-16 md:pr-8 max-md:px-8'>
            <h1 className='text-white lg:text-3xl md:text-2xl xl:text-5xl  md:pb-8 lg:pb-16 xl:pb-24 max-md:pb-8'>The foundation&apos;s mission is to protect our planet&apos;s precious wildlife biodiversity through research, education, and collaboration with aligned charities. 
</h1>
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl max-md:pb-4'>Join our newsletter for events and progress reports.</p>
            <div className='flex max-md:flex-col items-center justify-between mt-10 md:space-x-16 max-md:space-y-8'>
                <div className='flex flex-col w-full'>
                    <div className='flex items-center text-white md:text-md lg:text-lg xl:text-xl pb-2'>
                        <input className='pl-3 border-no bg-transparent outline-none w-full text-sm' placeholder='Your Name'/>
                    </div>
                    <hr />
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex items-center text-white md:text-md lg:text-lg xl:text-xl pb-2'>
                        <input className='pl-3 border-no bg-transparent outline-none w-full text-sm' placeholder='Your Email'/>
                        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.25 8H19.25" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M13.25 1L20.25 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M13.25 15L20.25 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>

                    </div>
                    <hr />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
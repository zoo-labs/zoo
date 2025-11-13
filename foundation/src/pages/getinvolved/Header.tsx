import Image from 'next/image';
function Header() {
  return (
    <div className="bg-black flex flex-col relative max-md:pt-20">
      <div className='flex'>
        <div className='space-dog-bg'></div>
        <div className='dog-bg'>
            <Image
                className='intro-bg float-right'
                src='/images/dog.png'
                width='1000'
                height='1000'
                alt=''
            />
        </div>
      </div>
      <h1 className='md:absolute w-full text-center max-md:pt-4 involved-header md:text-7xl xl:text-9xl max-md:text-5xl text-white'>Get Involved.</h1>
      <p className='text-white md:absolute xl:w-1/4 md:w-1/2 max-md:px-8 max-md:pt-8 text-xl bottom-0 left-[2rem]'>Supporting endangered species that are threatened with extinction.
</p>
      <p className='hidden max-md:block text-white text-right w-full pt-4 pr-8 text-lg'>hello@zoo.NGO</p>
    </div>
  );
}

export default Header;

import Image from 'next/image';
function Volunteer() {
  return (
    <div className="bg-black md:pt-52 max-md:py-32" id='volunteer'>
      <div className="flex max-md:flex-col max-md:flex-col-reverse items-center justify-between">
        <div className='w-1/2 max-md:w-full flex flex-col justify-between  max-md:px-12 max-md:pt-4 2xl:pl-48 xl:px-32 lg:pl-16 md:pl-8 md:pr-4 2xl:pr-52'>
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl max-md:text-lg max-md:pb-4 md:pb-6'>Doing good feels great</p>
            <h1 className='text-white md:text-5xl xl:text-6xl max-md:text-3xl max-md:my-5 md:pb-6'>Volunteer</h1>
            <p className='text-white md:text-lg lg:text-xl xl:text-2xl lg:pb-12 max-md:pb-6 md:pb-6'>Share your details so we can get in touch!</p>
            <input className='bg-white text-black pl-4 lg:py-4 py-2 rounded-full outline-none mb-4 md:text-sm lg:text-md' placeholder='First and Last Name' />
            <input className='bg-white text-black pl-4 lg:py-4 py-2 rounded-full outline-none mb-8 md:text-sm lg:text-md' placeholder='Email' />
            <div className='flex lg:space-x-16 md:space-x-4 max-md:space-x-4 items-center'>
                <button className='bg-white hover:bg-black hover:text-white border border-white px-12 py-2 rounded-full font-medium text-black transition-colors'>Inquire</button>
                <p className='text-white text-sm'>The future generations of endangered species thank you.</p>
            </div>
        </div>
        <div className='md:w-1/2 w-full'>
            <Image
                className='intro-bg'
                src="/images/involved6.png"
                width='1000'
                height='1000'
                alt=''
            />
        </div>
      </div>
    </div>
  );
}

export default Volunteer;

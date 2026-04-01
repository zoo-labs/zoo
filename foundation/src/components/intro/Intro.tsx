import Image from 'next/image';
function Intro({breadcrumbs,title,comment}: {
    breadcrumbs: String;
    title: string;
    comment?: string;
  }) {
  return (
    <div className="bg-black relative max-md:pt-20">
      <div className='max-md:hidden block relative'>
        <video autoPlay loop muted playsInline className="w-full">
          <source src="/videos/Giraffe_teen.webm" type="video/webm"/>
          <source src="/videos/Giraffe_teen.mp4" type="video/mp4"/>
        </video>
        <div className='absolute xl:top-32 top-20 w-3/5 flex flex-col justify-between  pl-10 md:pl-12 lg:pl-24 xl:pl-32 pr-8'>
            <p className='text-white md:text-sm lg:text-lg xl:text-2xl md:pb-6 lg:pb-12 2xl:pb-24'>{breadcrumbs}</p>
            <h1 className='text-white md:text-7xl  2xl:text-9xl max-md:text-5xl max-md:my-5 md:pb-6 lg:pb-12 2xl:pb-16'>{title}</h1>
            <p className='text-white md:text-lg lg:text-2xl xl:text-3xl pr-20 max-md:pb-10 md:pb-6 lg:pb-12 2xl:pb-16'>{comment}</p>
            <hr className='max-md:hidden mr-20'/>
            <p className='text-white max-md:hidden pr-20 md:pt-8 lg:pt-16 2xl:pt-18 md:text-sm md:pb-6 lg:pb-20 lg:text-lg lg:pb-24 xl:text-2xl xl:pb-32'>Supporting endangered species via human endeavors and virtual animal sales.</p>
        </div>
      </div>
      <div className='max-md:flex hidden justify-between pt-10 z-10'>
        <div className='w-1/2 max-md:w-full max-md:z-10 max-md:pt-[350px] flex flex-col justify-between  max-md:pl-15 max-md:pr-15 pl-10 md:pl-32 pr-8'>
            <p className='text-white md:text-sm lg:text-lg xl:text-2xl'>{breadcrumbs}</p>
            <h1 className='text-white md:text-7xl xl:text-9xl max-md:text-5xl max-md:my-5'>{title}</h1>
            <p className='text-white md:text-lg lg:text-2xl xl:text-3xl max-md:pb-10'>{comment}</p>
            <hr className='max-md:hidden'/>
            <p className='text-white max-md:hidden pb-8 md:text-sm md:pb-20 lg:text-lg lg:pb-24 xl:text-2xl xl:pb-32'>Supporting endangered species that are threatened with extinction.</p>
        </div>
        <div className='md:w-1/2 max-md:absolute max-md:w-[800px] max-md:right-0 max-md:z-0'>
            {/* <Image
                className='intro-bg float-right'
                src='/images/intro_bg.png'
                width='1000'
                height='1000'
                alt=''
            /> */}
            <video  autoPlay loop muted playsInline className="w-full">
              <source src="/videos/Giraffe_teen.webm" type="video/webm"/>
              <source src="/videos/Giraffe_teen.mp4" type="video/mp4"/>
            </video>
        </div>
      </div>

    </div>
  );
}

export default Intro;

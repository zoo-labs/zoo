import Link from 'next/link';
function Campaign() {
  return (
    <div className="bg-black">
        <div className='w-full text-center items-center flex flex-col justify-between pb-20'>
            <p className='text-white md:text-sm lg:text-md xl:text-xl max-md:text-lg max-md:px-16 pb-5 pt-16'>Bring your community TO the Zoo foundation</p>
            <h1 className='text-white md:text-4xl xl:text-7xl max-md:text-4xl max-md:my-5'>Create your own campaign.</h1>

            <p className='text-white md:text-lg lg:text-xl xl:text-3xl max-md:text-lg pb-10 pt-8'>A self-tailored campaign to raise funds for<br /> these animals by leveraging your network. </p>
            <Link
                href="/campaign_guide"
                rel="noopener noreferrer" target="_blank"
                className="w-[180px] bg-white hover:bg-transparent hover:text-white px-6 py-1 rounded-full border-white border-2 text-xl font-medium md:block transition-colors"
                style={{ color: 'black !important' }}
            >
              {'Learn More'}
            </Link>

        </div>
    </div>
  );
}

export default Campaign;

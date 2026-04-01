import Link from 'next/link';
function Safeguard() {
    const contents = [
        {
          title: "Restoration",
          content: "and other on-the-ground activities like planning, that accounts for the health and safety of endangered species."
        },
        {
          title: "Collect Data",
          content: "On behavior and population data to combat poaching, rescue and reintegrate orphaned animals."
        },
        {
          title: "Rescue Animals",
          content: "orphaned by poachers and helping reintegrated these animals back."
        },
        {
          title: "Legal Avenues",
          content: "to enact change in policy and create lasting impact, for the best routes to end extinction."
        }
      ];
  return (
    <div className="bg-black py-32">
        <div className='flex  max-md:flex-col xl:px-56 lg:px-40 md:px-20 max-md:px-4'>
          <div className='w-1/2 max-md:w-full flex flex-col md:pr-32'>
            <h1 className='text-white md:text-4xl xl:text-6xl max-md:text-5xl pb-12'>We safeguard wildlife and restore habitats.</h1>
            <Link
              href='https://youtu.be/6yYuYtMWgOU'
              className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-xl max-md:pb-10'
              >
                <>
                  <span className='pr-[15px]'>Short video link</span>
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.40173 12.0243L11.6111 9.44867L7.40173 7.10596V12.0243Z" fill="#F5F9FC"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 6.2998L12.2 9.4998L7 12.6998V6.2998ZM7.60051 11.6259L11.0567 9.4998L7.60051 7.37346V11.6259Z" fill="#F5F9FC"/>
                    <circle cx="9" cy="9.5" r="8.5" stroke="white"/>
                  </svg>
                </>
            </Link>
          </div>
          <div className='w-1/2 max-md:w-full grid md:grid-cols-2 grid-cols-1 gap-8 max-md:gap-4 max-md:px-8'>
            {contents.map((data, index) => (
              <div key={index} className='flex flex-col'>
                  <h1 className='text-white md:text-xl xl:text-3xl max-md:text-2xl max-md:my-5 pb-4 max-md:pb-2'>{data.title}</h1>
                  <p className='text-white text-md max-md:text-lg xl:text-xl'>{data.content}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export default Safeguard;

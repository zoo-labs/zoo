import Image from 'next/image';
import Link from 'next/link';
function Ourefforts() {
    const efforts = [
        {
          title: "Restoring Habitats",
          content: "Landscaping and other on-the-ground activities like planning, that accounts for the health and safety of endangered species.",
          icon: "/images/habitat.png",
          url: "/getinvolved#ground_activity"
        },
        {
            title: "Collecting Data",
            content: "Through data collection of behavioral and population data we can create targeted strategies to combat poaching effectively.",
            icon: "/images/collecting_data.png",
            url: "/getinvolved#collecting_data"
        },
        {
            title: "Rescuing Animals",
            content: "Dedicated to animals orphaned by poachers, by providing care and assistance to help reintegrate them back into their habitats.",
            icon: "/images/rescuing.png",
            url: "/getinvolved#rescuing_animal"
        },
        {
            title: "Legal Avenues",
            content: "Enacts change in policy to create action and lasting impact, for the best routes to end extinction. ",
            icon: "/images/avenues.png",
            url: "/getinvolved#legal_avenues"
        }
      ];
  return (
    <div className="bg-black xl:py-52 md:py-32 max-md:py-32 2xl:px-52 xl:px-32 lg:px-24 md:px-8 max-md:px-4">
        <p className='text-gray-300 text-md xl:text-2xl text-center'>Over 38,000 endangered species</p>
        <h1 className='text-white text-center md:text-2xl xl:text-5xl max-md:text-xl mt-8 mb-12 2xl:px-48 xl:px-32 lg:px-32 md:px-16'>We&apos;ve started initiating efforts with 7 species to raise awareness, secure funding, and strive for their conservation.</h1>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-4 md:px-8 lg:px-0'>
      {efforts.map((data, index) => (
        <div key={index} className='flex flex-col md:mb-16 lg:mb-0 max-md:mb-0'>
        <Link href={data.url} className='text-white text-2xl pb-4 max-md:text-2xl max-md:hidden md:block lg:hidden text-center'>{data.title}</Link>
        <div className='flex max-md:hidden items-center text-white lg:pt-16 md:pt-4 max-md:pt-16 xl:space-x-16 lg::space-x-8 md:space-x-4 xl:mx-12 lg:mx-6 md:mx-4'>
            <Image
                className='w-1/3 pr-4'
                src={data.icon}
                width='800'
                height='800'
                alt=''
            />
            <div className='flex flex-col w-2/3'>
                <Link href={data.url} className='text-white text-2xl pb-4 max-md:text-2xl md:hidden lg:block max-md:block'>{data.title}</Link>
                <p className='text-white max-md:text-lg lg:text-md md:text-sm'>{data.content}</p>
            </div>
        </div>
        <div className='max-md:flex flex-col hidden pt-12'>
            <div className='flex items-center'>
            <Image
                className='w-1/5 pr-4 m-2'
                src={data.icon}
                width='800'
                height='800'
                alt=''
            />
            <Link href={data.url} className='w-4/5 text-white text-3xl'>{data.title}</Link>
            </div>
            <p className='text-white text-lg pt-5'>{data.content}</p>
        </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Ourefforts;

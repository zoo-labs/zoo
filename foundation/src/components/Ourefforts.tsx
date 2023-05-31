import Image from 'next/image';
function Ourefforts() {
    const efforts = [
        {
          title: "Restoring Habitats",
          content: "Landscaping and other on-the-ground activities like planning, that accounts for the health and safety of endangered species.",
          icon: "/images/habitat.png"
        },
        {
            title: "Collecting Data",
            content: "Through data collection of behavioral and population data we can create targeted strategies to combat poaching effectively.",
            icon: "/images/collecting_data.png"
        },
        {
            title: "Rescuing Animals",
            content: "Dedicated to animals orphaned by  poachers, by providing care and assistance to help reintegrate them back into their habitats.",
            icon: "/images/rescuing.png"
        },
        {
            title: "Legal Avenues",
            content: "Enacts change in policy to create action and lasting impact, for the best routes to end extinction. ",
            icon: "/images/avenues.png"
        }
      ];
  return (
    <div className="bg-black py-52 max-md:py-32 xl:px-56 lg:px-40 md:px-32 max-md:px-4">
        <p className='text-gray-300 text-md xl:text-2xl text-center'>Over 38,000 endangered species</p>
        <h1 className='text-white text-center md:text-2xl xl:text-5xl max-md:text-xl mt-8 mb-12 md:px-48'>We've started initiating efforts with 7 species to raise awareness, secure funding, and strive for their conservation.</h1>
      <div className='grid md:grid-cols-2 grid-cols-1 md:px-8'>
      {efforts.map((data, index) => (
        <div className='flex items-center text-white pt-16 md:space-x-16 md:mx-12'>
            <Image
                className='w-1/3 pr-4'
                src={data.icon}
                width='800'
                height='800'
                alt=''
            />
            <div className='flex flex-col w-2/3'>
                <p className='text-white text-2xl pb-4 max-md:text-2xl'>{data.title}</p>
                <p className='text-white text-lg'>{data.content}</p>
            </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Ourefforts;

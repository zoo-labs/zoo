import Link from 'next/link';
function Donation() {
    const comments = [
        {
          title: "$50",
          comment: "Can go towards planting native species and restoring habitats and water sources.",
          type: "normal"
        },
        {
          title: "$100",
          comment: "Fund staff and volunteers working hands-on to protect and care for endangered animals.",
          type: "normal"
        },
        {
          title: "Custom",
          comment: "85% of your donation funds program activities and 15% goes towards operational costs.",
          type: "custom"
        }
      ];
  return (
    <div className="bg-black">
        <p className='text-gray-300 text-sm xl:text-xl text-center'>Fuel Conservation Impact</p>
        <h1 className='text-white text-center md:text-3xl xl:text-6xl max-md:text-4xl mt-5 mb-12'>Select your donation</h1>
      <div className='flex max-md:flex-col xl:px-56 lg:px-40 md:px-32 max-md:px-5 md:space-x-16 max-md:space-y-8'>
      {comments.map((data, index) => (
        <div className='max-md:w-full flex flex-col items-center justify-between w-1/3 px-16 py-16 max-md:py-8 border rounded-xl border-white'>
            <h1 className='text-white md:text-xl xl:text-4xl max-md:text-2xl max-md:my-5'>{data.title}</h1>
            <p className='text-white md:text-md lg:text-lg xl:text-2xl max-md:text-xl text-center max-md:pb-10 py-10'>{data.comment}</p>
            { data.type == 'normal' ? (
                <Link href='/donation' className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-xl max-md:text-xl max-md:pb-10'>
                    <span className='pr-[15px]'>Donate</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                </Link>
            ) : (
                <div className='flex flex-col w-full'>
                    <div className='flex items-center text-white md:text-md lg:text-lg xl:text-xl pb-2'>
                        <span>$</span>
                        <input className='pl-3 border-no bg-transparent outline-none w-full text-lg' placeholder='Enter your donation amount'/>
                        <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                        </svg>
                    </div>
                    <hr />
                </div>
            )
            }
        </div>
      ))}
      </div>
    </div>
  );
}

export default Donation;

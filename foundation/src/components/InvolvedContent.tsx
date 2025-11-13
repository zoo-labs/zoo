import Link from 'next/link';
import Image from 'next/image';
import React,{useState} from "react";
import { MdOutlineCancel } from "react-icons/md";
const contents = [[],[
  {
    title: "Wildlife Monitoring",
    content: "Activities include conducting wildlife surveys, setting up and maintaining camera traps, and collecting data on species distribution and behavior."
  },
  {
    title: "Trail Maintenance",
    content: "Erosion control measures include repairing damaged trails, and creating barriers to protect sensitive areas and nesting sites."
  },
  {
    title: "Nesting Site Protection",
    content: "Building and maintaining artificial nesting structures, monitoring, and implementing protective measures to reduce predation and disturbance."
  },
  {
    title: "Education",
    content: "We lead workshops, promoting awareness and understanding of endangered species, their habitats, and the importance of conservation efforts."
  },
],
[
  {
    title: "Rescue",
    content: "When an orphaned animal is found, teams are deployed to safely recover and transport the animal to a rehabilitation center with knowledgeable vets."
  },
  {
    title: "Medical Care",
    content: "Animal receive thorough examination and any necessary treatment. This may include addressing injuries and treating illnesses."
  },
  {
    title: "Socializing",
    content: "Staff and volunteers facilitate socialization with other animals of the same species for necessary skills for life back in the wild."
  },
  {
    title: "Rehabilitation",
    content: "Teaching the animals essential survival skills, such as foraging, hunting, and avoiding predators though hands-on training and exposure to native landscapes."
  },
],
[
  {
    title: "Tracking Devices",
    content: "Advanced tracking technology, we closely monitor the movements of various animals, enabling us to pinpoint essential habitats, and migration routes."
  },
  {
    title: "Camera Traps",
    content: "Utilizing strategically placed camera traps, we are able to capture vivid images and videos of wildlife in their natural settings.These visual records offer an intimate glimpse into their daily routines, behavior patterns, and social interactions, thereby enriching our understanding of these amazing creatures and informing our conservation efforts."
  },
  {
    title: "Field Observation",
    content: "Researchers and scientists undertake rigorous on-the-ground investigations of the various species and their intricate ecosystems. These field observations not only foster deeper insights into the challenges faced by endangered animals but also equip us with the necessary data to tailor our conservation initiatives accordingly."
  }
],
[
  {
    title: "Lobby",
    content: "Advocate for the development and implementation of more stringent laws that protect endangered species and their habitats."
  },
  {
    title: "Collaborate",
    content: "Partner with environmental lawyers, legal organizations, and academic institutions to develop well-informed legal strategies and frameworks."
  },
  {
    title: "Wildlife Crimes",
    content: "Establish a system to track and report illegal activities, such as poaching and illegal wildlife trade, and ensure violators are held accountable."
  },
  {
    title: "Policy Research",
    content: "Fund and conduct research to identify gaps in existing legal frameworks and recommend improvements to enhance the effectiveness of wildlife protection laws."
  }
]
];
  
function InvolvedContent({id,title,content1,content2,image,direction,type,index}: {
    content1: string;
    id: string;
    title: string;
    content2?: string;
    image: string;
    direction: string;
    type: string;
    index: number;
  }) {
    const [flag ,setFlag] = useState(false);
  return (
    <div className="bg-black lg:pt-52 md:pt-32 max-md:pt-32" id={id}>
      <div className={`flex max-md:flex-col items-center justify-between md:pt-20 ${direction == '2' ? 'flex-row-reverse' : ''}`}>
        <div className='md:w-1/2 w-full'>
            <Image
                className='intro-bg'
                src={image}
                width='1000'
                height='1000'
                alt=''
            />
        </div>
        <div className='w-1/2 max-md:w-full flex flex-col justify-between  px-8 xl:pl-24 2xl:pl-32 lg:pl-16 md:pl-8 2xl:pr-48'>
            <h1 className='text-white md:text-4xl lg:text-5xl xl:text-6xl max-md:text-3xl max-md:my-5 md:pb-4 lg:pb-8 xl:pb-10'>{title}</h1>
            <p className='text-white md:text-sm lg:text-lg xl:text-2xl max-md:pb-4 md:pb-4 lg:pb-8 '>{content1}</p>
            <p className='text-white md:text-sm lg:text-lg xl:text-2xl '>{content2}</p>
            { type == '2' ? (
              <div className='flex items-center md:pt-4 lg:pt-10 max-md:pt-4 space-x-8'>
                <Link
                    href="/donation"
                    rel="noopener noreferrer" target="_blank"
                    className="bg-white hover:bg-black hover:text-white border border-white px-6 py-1 rounded-full text-lg font-medium text-black transition-colors"
                >
                    Donate
                </Link>
                <Link
                    href="#volunteer"
                    className="text-white hover:bg-gray-700 bg-black hover:text-black px-6 py-1 rounded-full border-white border-2 text-lg font-medium  md:block"
                >
                    Volunteer
                </Link>
              </div>
            ): (
              <div>
              <div className='flex items-center md:pt-10 max-md:pt-4 xl:space-x-16 lg:space-x-12 space-x-8'>
                <Link href='#volunteer' className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10'>
                  <>
                    <span className='pr-[15px]'>Volunteer</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                  </>
                </Link>
                <Link href='/donation'  rel="noopener noreferrer" target="_blank" className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10'>
                  <>
                    <span className='pr-[15px]'>Donate</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                  </>
                </Link>
                <button onClick={()=>setFlag(!flag)} className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10' >
                  <>
                    <span className='pr-[15px]'>Learn More</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                  </>
                </button>
              </div>
              {/* <Link href='/about' className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-lg max-md:pb-10 md:hidden max-md:block'>
                <u className='pr-[15px]'>Learn More</u>
              </Link> */}
              </div>
            )
            }
        </div>
      </div>
      <div className={`${flag ? 'flex' : 'hidden'} flex-col pt-12 space-y-8`}>
        <div className='text-right text-white pr-8 2xl:pr-32 xl:pr-24 lg:pr-16 md:pr-8 text-3xl'>
          <MdOutlineCancel className='cursor-pointer' onClick={()=>setFlag(false)}/>
        </div>
        <div className={`flex justify-between md:space-x-8 2xl:space-x-16 px-8 xl:px-24 lg:px-16 md:px-8 2xl:px-32 max-md:flex-col max-md:space-y-8`}>
          {contents[index].map((data, i) => (
              <div key={i} className='flex flex-1 text-white flex-col space-y-8 max-md:space-y-4'>
                  <p className='2xl:text-2xl xl:text-2xl text-xl'>{data.title}</p>
                  <p className='2xl:text-xl xl:text-lg text-sm'>{data.content}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default InvolvedContent;

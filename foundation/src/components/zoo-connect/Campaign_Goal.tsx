import React, { useState,useEffect } from 'react';
import Slider from 'react-slick';
import Comments from './Comments';
function Campaign_Goal() {
    const [moreFlag, setMoreFlag] = useState(false);
//     const size = useWindowSize();
//   function useWindowSize() {
//     // Initialize state with undefined width/height so server and client renders match
//     // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
//     const [windowSize, setWindowSize] = useState({
//       width: undefined,
//       height: undefined,
//     });

//     useEffect(() => {
//       // only execute all the code below in client side
//       // Handler to call on window resize
//       function handleResize() {
//         // Set window width/height to state
//         setWindowSize({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         });
//       }

//       // Add event listener
//       window.addEventListener("resize", handleResize);

//       // Call handler right away so state gets updated with initial window size
//       handleResize();

//       // Remove event listener on cleanup
//       return () => window.removeEventListener("resize", handleResize);
//     }, []); // Empty array ensures that effect is only run on mount
//     return windowSize;
//   }
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,
        autoplay: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: false,
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              slidesToShow: 1.2,
              slidesToScroll: 1
            },
          }
        ],
      };
    const comments = [
        {
            name: "Esther Howard",
            img: "/images/face1.png",
            date: "Today",
            content: "Finally, an easy and interactive way to support the wildlife we love. Keep up the excellent work, and count me in for future support!",
            like_text: "You and 48 liked this comment",
            like_flag: true
        },
        {
            name: "Robert Fox",
            img: "/images/face2.png",
            date: "Today",
            content: "Donated and shared with my friends. This is the kind of cause I want to support—transparent, dedicated, and meaningful.",
            like_text: "39 people liked this comment",
            like_flag: false
        },
        {
          name: "Esther Howard",
          img: "/images/face1.png",
          date: "Today",
          content: "Hopefully Alice can get surgery soon, recover from her illness.",
          like_text: "You and 48 liked this comment",
          like_flag: true
      },
      {
          name: "Robert Fox",
          img: "/images/face2.png",
          date: "Today",
          content: "Hopefully Alice can get surgery soon, recover from her illness.",
          like_text: "39 people liked this comment",
          like_flag: false
      },
    ];
  return (
    <div className="bg-black md:px-12 lg:px-24 xl:px-32 text-white md:py-8 lg:py-12 px-16 max-md:py-4 max-md:px-4">
      <div className='flex flex-col space-y-4'>
        <p className='text-xl'>Campaign Goal</p>
        <p className='text-sm pt-2'>To provide an App/platform for vulnerable, ill-treated, and endangered species worldwide, by boosting the reach and influence of organizations of all sizes that are dedicated to their preservation and well-being. <span onClick={()=>setMoreFlag(false)} className={`${moreFlag ? 'inherit' : 'hidden'} cursor-pointer text-[#3C9465]`}>Read less</span></p>
        <p onClick={()=>setMoreFlag(true)} className={`${moreFlag ? 'hidden' : 'block'} cursor-pointer text-base text-[#3C9465] md:pt-12 pt-0`}>Read More...</p>
        <div className={`${moreFlag ? 'flex' : 'hidden'} flex-col space-y-5`}>
            <hr />
            <p className='text-xl'>What we know</p>
            <p className='text-sm'>The International Union for Conservation of Nature has identified over 16,000 animal species currently under threat of extinction. These staggering numbers include 41% of amphibians, 38% of sharks and rays, 27% of mammals, and 13% of birds. Much of this threat comes from human activities, including deforestation, overexploitation, and climate change.</p>
            <p className='text-sm'>Despite these daunting figures, only 3% of donor dollars in the US go to environmental and animal welfare organizations combined. However, a hopeful 62% of Americans believe that the government is doing too little to protect animals and their habitats.</p>
            <p className='text-sm'>It seems there&apos;s a disconnect: if so many Americans care about animal welfare and conservation, why aren&apos;t more donor dollars going towards these causes? We&apos;re determined to bridge this gap. This is why we are launching Zoo Connect - an interactive platform that brings our zoo community closer to the animals they love and support.</p>

            <hr />
            <p className='text-xl'>Our Vision</p>
            <p className='text-sm'>We envision Zoo Connect to become the most comprehensive and accessible digital platform for our zoo community, enhancing our mission of wildlife conservation and education. On Zoo Connect, you will be able to discover detailed information about our resident animals, their natural habitats, conservation statuses, and more.</p>

            <hr />
            <p className='text-xl'>How it Works</p>
            <p className='text-sm'>Zoo Connect will be a user-friendly website designed for both desktop and mobile use, allowing our zoo community to explore and learn about our work.</p>

            <hr />
            <p className='text-xl'>For Patrons</p>
            <p className='text-sm'>Patrons will be able to use Zoo Connect for free (no registration required) to:</p>
            <ul className="list-disc list-inside text-decor-dotted space-y-4 text-sm">
                <li>
                Learn about Animals: Discover the animals living at our zoo, their natural habitats, conservation status, and any special care we provide for them.
                </li>
                <li>
                Discover Educational Programs: Find out about educational programs and events at the zoo, from wildlife lectures to animal encounters and kids&apos; camps.
                </li>
                <li>
                Support Conservation Efforts: Learn about our conservation efforts both in the zoo and in the wild. Patrons can directly contribute to these efforts through donations.
                </li>
                <li>
                Plan Visits: Get all the information needed to plan a visit to our zoo, from hours and admission fees to special exhibits and events.
                </li>
            </ul>

            <hr />
            <p className='text-xl'>For Zoo Connect</p>
            <p className='text-sm'>Our team will provide continuous updates to Zoo Connect, ensuring the platform offers the most accurate and up-to-date information about our animals, conservation efforts, and all Zoo Foundation events.</p>

            <hr />
            <p className='text-xl'>Fundraising Purpose</p>
            <p className='text-sm'>Funds raised through this campaign will go towards developing the Zoo Connect platform and maintaining it for the first year of operation. By enhancing our outreach and educational capabilities, Zoo Connect will further our mission to conserve wildlife and their habitats.</p>
        </div>
        <hr />
        <div className='flex justify-between items-center'>
            <p className='text-xl'>Comments from campaign donors</p>
            <p className='text-sm text-[#13B156]'>See all</p>
        </div>
        <Slider {...settings} className='comments bg-black w-full pb-8'>
            {comments.map((data, index) => (
                <Comments key={index} name={data.name} img={data.img} date={data.date} like_text={data.like_text} like_flag={data.like_flag} content={data.content}/>
            ))}
        </Slider>
      </div>
    </div>
  );
}

export default Campaign_Goal;

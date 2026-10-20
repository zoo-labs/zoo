import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';

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

/**
 * A quiet link with a chevron after it.
 *
 * The chevron used to be a hand-drawn `<path fill="white">`, which is invisible
 * on the paper this site is now set on — three of them per section. lucide draws
 * it in `currentColor`, so it is whatever the text beside it is, on any ground.
 */
function Onward({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ChevronRight size={16} aria-hidden />
    </>
  );
}

const onward = 'inline-flex items-center gap-2 cursor-pointer text-foreground';

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

  const media = (
    <div key='media' style={{ flex: '1 1 20rem' }}>
      <Image
        src={image}
        width={1000}
        height={1000}
        alt=''
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );

  const copy = (
    <div key='copy' className='flex flex-col' style={{ flex: '1 1 20rem' }}>
      {/* A section head on a page that already has its h1, and the size comes
          from the classes either way. */}
      <h2 className='text-foreground md:text-4xl lg:text-5xl xl:text-6xl max-md:text-3xl max-md:my-5 md:pb-4 lg:pb-8 xl:pb-10'>{title}</h2>
      <p className='text-foreground text-lg md:text-xl mb-4'>{content1}</p>
      {content2 && <p className='text-foreground text-lg md:text-xl'>{content2}</p>}
      {type === '2' ? (
        <div className='flex flex-wrap items-center gap-4 mt-6'>
          <Link href='/donation' rel='noopener noreferrer' target='_blank' className='action' data-fill>
            Donate
          </Link>
          <Link href='#volunteer' className='action'>
            Volunteer
          </Link>
        </div>
      ) : (
        <div className='flex flex-wrap items-center gap-6 mt-6'>
          <Link href='#volunteer' className={onward}>
            <Onward>Volunteer</Onward>
          </Link>
          <Link href='/donation' rel='noopener noreferrer' target='_blank' className={onward}>
            <Onward>Donate</Onward>
          </Link>
          <button onClick={() => setFlag(!flag)} aria-expanded={flag} className={onward}>
            <Onward>Learn More</Onward>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className='bg-background py-24' id={id}>
      <div className='container mx-auto px-4'>
        {/* Which side the picture takes is settled in the markup, not by
            `flex-row-reverse` — so the reading order matches what is seen, and
            the same two elements stack in that order on a phone. */}
        <div className='flex flex-col md:flex-row items-center gap-8'>
          {direction === '2' ? [copy, media] : [media, copy]}
        </div>

        <div className={flag ? 'flex flex-col mt-12 space-y-8' : 'hidden'}>
          <div className='text-right text-foreground'>
            <button onClick={() => setFlag(false)} aria-label='Close' className='cursor-pointer'>
              <X size={28} aria-hidden />
            </button>
          </div>
          <div className='grid-cards'>
            {contents[index].map((data, i) => (
              <div key={i} className='flex flex-col text-foreground space-y-4'>
                <p className='text-xl font-semibold'>{data.title}</p>
                <p className='text-sm'>{data.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvolvedContent;

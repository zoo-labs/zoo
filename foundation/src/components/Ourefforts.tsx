import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Four efforts, drawn once each.
 *
 * Each one used to be written out three times over — a centred title, an
 * icon-and-copy row, and a phone block — with `max-md:hidden`, `max-md:flex`,
 * `max-md:block` and `lg:block` deciding which of the three you saw. The
 * stylesheet publishes none of those four, so what actually happened was: the
 * phone block never appeared at any width, the row always appeared, and the
 * title appeared twice below 48rem and NOT AT ALL from 64rem up. Three renderings
 * of one thing is where that kind of thing hides; there is now one.
 */
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
    <div className="bg-background py-24">
      <div className='container mx-auto px-4'>
        <p className='text-secondary text-lg text-center'>Over 38,000 endangered species</p>
        <h2 className='text-foreground text-center md:text-2xl xl:text-5xl max-md:text-xl mt-8 mb-12 mx-auto' style={{ maxWidth: '48rem' }}>
          We&apos;ve started initiating efforts with 7 species to raise awareness, secure funding, and strive for their conservation.
        </h2>
        {/* Two across on a desktop, one on a phone, and the switch is the column
            floor rather than a breakpoint. --grid-card-min is the knob .grid-cards
            publishes for exactly this. */}
        <div className='grid-cards' style={{ ['--grid-card-min']: '26rem' } as React.CSSProperties}>
          {efforts.map((data) => (
            <div key={data.title} className='flex items-start gap-4'>
              <Image
                className='shrink-0'
                src={data.icon}
                width={800}
                height={800}
                alt=''
                style={{ width: 'clamp(64px, 22%, 128px)', height: 'auto' }}
              />
              <div className='flex flex-col'>
                <Link href={data.url} className='text-foreground text-2xl mb-2'>{data.title}</Link>
                <p className='text-foreground text-lg'>{data.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ourefforts;

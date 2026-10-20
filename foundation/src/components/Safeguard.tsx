import Link from 'next/link';
import { CirclePlay } from 'lucide-react';

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
    <div className="bg-background py-24">
      <div className='container mx-auto px-4 flex flex-col md:flex-row gap-8'>
        <div className='flex flex-col' style={{ flex: '1 1 20rem' }}>
          {/* A section head, so it is an h2. Every one of these was an `h1` —
              four of them in this component alone, on pages that already had
              one — while the size came from the utility classes either way, so
              the element was carrying rank it did not have and no type. */}
          <h2 className='text-foreground md:text-4xl xl:text-6xl max-md:text-5xl pb-12'>We safeguard wildlife and restore habitats.</h2>
          {/* The play mark was a hand-drawn circle stroked `white` and filled
              `#F5F9FC` — two near-whites on a near-white page. currentColor is
              the ink beside it, whatever the ground turns out to be. */}
          <Link
            href='https://youtu.be/6yYuYtMWgOU'
            className='inline-flex items-center gap-2 cursor-pointer text-foreground'
            style={{ alignSelf: 'flex-start' }}
          >
            <CirclePlay size={20} aria-hidden />
            Short video link
          </Link>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-8' style={{ flex: '1 1 20rem' }}>
          {contents.map((data, index) => (
            <div key={index} className='flex flex-col'>
                <h3 className='text-foreground md:text-xl xl:text-3xl max-md:text-2xl max-md:my-5 pb-4 max-md:pb-2'>{data.title}</h3>
                <p className='text-foreground text-lg'>{data.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Safeguard;

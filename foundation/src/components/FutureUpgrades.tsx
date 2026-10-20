import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Accordion from './Accordion';

function FutureUpgrades() {
    const comments = [
        {
          title: "New Animal Drops",
          comment: "Celebrity, influencer , B2B partnerships<br><br>Mythical creature drop<br><br>Marine animals<br><br>Extinct animals"
        },
        {
          title: "Metaverse Land",
          comment: "Secret Lands with treasure<br><br>Find Commodities like Gold, Silver, Uranium, Copper, etc. that can be redeemed in real life<br><br>Unique Lands for your animals to live in<br><br>Mint NFT portals of your land to share with friends for alternative hangout/meeting space"
        },
        {
          title: "Mutations",
          comment: "Magic Powers: flying, fire breathing, invisibility, etc.<br><br>Horns<br><br>Double Head<br><br>Wings<br><br>Various Animal Skins"
        },
        {
          title: "Virtual Pets",
          comment: "Launch VR/AR app on all major “app” stores<br><br>Animal Health, take care of your animal<br><br>Animal emotions: sad, happy, scared, sleepy, angry, hungry<br><br>Emotional support pet in your phone, with AI"
        }
      ];
  return (
    <div className="bg-background py-24">
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div style={{ flex: '2 1 16rem' }}>
            <Image
                src="/images/future_upgrade.png"
                width={1000}
                height={1000}
                alt=''
                style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div className='flex flex-col' style={{ flex: '3 1 20rem' }}>
            <h2 className='text-foreground md:text-4xl lg:text-5xl xl:text-6xl max-md:text-3xl max-md:my-5 md:pb-4 lg:pb-8 xl:pb-10'>Want More?</h2>
            <p className='text-foreground text-lg md:text-xl mb-6'>Join our DAO to suggest upgrades and make votes for developments you want incorporated in Zoo!</p>
            {/* `.action` is the site's one control: 44px, pill, hairline, and it
                draws itself correctly on paper or on the night. The 200px-wide
                box with a white-filled arrow inside it was neither — the arrow
                was invisible against a light page. */}
            <Link href='#' className='action' style={{ alignSelf: 'flex-start' }}>
              Join Zoo DAO
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
        <div className='grid-cards mt-12' style={{ ['--grid-card-min']: '14rem' } as React.CSSProperties}>
          {comments.map((data, index) => (
            <Accordion key={index} open={true} header={data.title} content={data.comment}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FutureUpgrades;

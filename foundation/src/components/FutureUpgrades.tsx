import Link from 'next/link';
import Image from 'next/image';
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
    <div className="bg-black lg:py-32 md:py-20 max-md:py-32 md:px-16 lg:px-16 xl:px-24 2xl:px-32">
      <div className="flex max-md:flex-col items-center justify-between md:pt-20">
        <div className='md:w-2/5 w-full'>
            <Image
                className='intro-bg'
                src="/images/future_upgrade.png"
                width='1000'
                height='1000'
                alt=''
            />
        </div>
        <div className='w-3/5 max-md:w-full flex flex-col   px-8 xl:pl-24 2xl:pl-32 lg:pl-16 md:pl-8 2xl:pr-48'>
            <h1 className='text-white md:text-4xl lg:text-5xl xl:text-6xl max-md:text-3xl max-md:my-5 md:pb-4 lg:pb-8 xl:pb-10'>Want More?</h1>
            <p className='text-white md:text-sm lg:text-lg xl:text-2xl max-md:pb-4 md:pb-4 lg:pb-12 '>Join our DAO to suggest upgrades and make votes for developments you want incorporated in Zoo!</p>
            <Link href='#' className='flex items-center justify-center text-white md:text-sm lg:text-md xl:text-lg max-md:mt-4 border border-white rounded-full px-4 w-[200px] py-2'>
                <>
                <span className='pr-[15px]'>Join Zoo DAO</span>
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.29289L15.3431 0.928932C14.9526 0.538408 14.3195 0.538408 13.9289 0.928932C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 9L21 9L21 7L1 7L1 9Z" fill="white"/>
</svg>

                </>
            </Link>
        </div>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 items-baseline pt-24 lg:gap-4 md:gap-8 2xl:gap-8 max-md:px-8 max-md:grid-cols-1 max-md:gap-8'>
      {comments.map((data, index) => (
        <Accordion key={index} className='flex-1' open={true} header={data.title} content={data.comment}/>
      ))}
      </div>
    </div>
  );
}

export default FutureUpgrades;

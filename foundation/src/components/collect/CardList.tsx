// import Image from 'next/image';
import Link from 'next/link';
function CardList() {
    const cardlist = [
        {
            card: "/videos/TIGER_Card_front.webm",
            card_mp4: "/videos/TIGER_Card_front.mp4",
            url: "/animals/siberian_tiger"
        },
        {
            card: "/videos/Redwolf_Card_front.webm",
            card_mp4: "/videos/Redwolf_Card_front.mp4",
            url: "/animals/red_wolf"
        },
        {
            card: "/videos/GIRAFFE_Card_Front.webm",
            card_mp4: "/videos/GIRAFFE_Card_Front.mp4",
            url: "/animals/nubian_giraffe"
        },
        {
            card: "/videos/elephant_card_front.webm",
            card_mp4: "/videos/Elephant_Card_Front.mp4",
            url: "/animals/sumatran_elephant"
        },
        {
            card: "/videos/RHINO_Card_front.webm",
            card_mp4: "/videos/RHINO_Card_front.mp4",
            url: "/animals/javan_rhino"
        },
        {
            card: "/videos/Hippo_Card_front.webm",
            card_mp4: "/videos/Hippo_Card_front.mp4",
            url: "/animals/pygmy_hippo"
        },
      ];
  return (
    <div className="bg-background">
      <div className='grid md:grid-cols-3 gap-12 px-4 md:px-16 lg:px-32 xl:px-32'>
      {cardlist.map((data, index) => (
        <div key={index} className=' flex flex-col items-center justify-between'>
            {/* <Image
                className='w-full'
                src={data.card}
                width='800'
                height='800'
                alt=''
            /> */}
            <Link href={data.url} legacyBehavior>
            <video autoPlay loop muted playsInline className="w-full border rounded-xl p-1" style={{ aspectRatio: '473 / 833' }} >
            <source src={data.card}  type="video/webm"/>
                <source src={data.card_mp4}  type="video/mp4"/>
                
            </video>
            </Link>
        </div>
      ))}
      </div>
    </div>
  );
}

export default CardList;

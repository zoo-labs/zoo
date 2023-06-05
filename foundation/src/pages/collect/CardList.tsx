// import Image from 'next/image';
import Link from 'next/link';
function CardList() {
    const cardlist = [
        {
            card: "/videos/TIGER_Card_front.webm",
            url: "/animals/siberian_tiger"
        },
        {
            card: "/videos/Redwolf_Card_front.webm",
            url: "/animals/red_wolf"
        },
        {
            card: "/videos/GIRAFFE_Card_Front.webm",
            url: "/animals/nubian_giraffe"
        },
        {
            card: "/videos/elephant_card_front.webm",
            url: "/animals/sumatran_elephant"
        },
        {
            card: "/videos/RHINO_Card_front.webm",
            url: "/animals/javen_rhino"
        },
        {
            card: "/videos/Hippo_Card_front.webm",
            url: "/animals/pygmy_hippo"
        },
      ];
  return (
    <div className="bg-black">
      <div className='grid grid-cols-3 gap-12 xl:px-40 lg:px-32 max-md:px-4'>
      {cardlist.map((data, index) => (
        <div className=' flex flex-col items-center justify-between'>
            {/* <Image
                className='w-full'
                src={data.card}
                width='800'
                height='800'
                alt=''
            /> */}
            <Link href={data.url} >
            <video autoPlay loop className="border rounded-xl p-1" src={data.card}>
                {/* <source src={front} /> */}
            </video>
            </Link>
        </div>
      ))}
      </div>
    </div>
  );
}

export default CardList;

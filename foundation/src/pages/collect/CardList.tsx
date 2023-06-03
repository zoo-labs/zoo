import Image from 'next/image';
function CardList() {
    const cardlist = [
        {
            card: "/videos/TIGER_Card_front.webm"
        },
        {
            card: "/videos/Redwolf_Card_front.webm"
        },
        {
            card: "/videos/GIRAFFE_Card_Front.webm"
        },
        {
            card: "/videos/elephant_card_front.webm"
        },
        {
            card: "/videos/RHINO_Card_front.webm"
        },
        {
            card: "/videos/Hippo_Card_front.webm"
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
            <video autoPlay loop className="border rounded-xl p-1" src={data.card}>
                {/* <source src={front} /> */}
            </video>
        </div>
      ))}
      </div>
    </div>
  );
}

export default CardList;

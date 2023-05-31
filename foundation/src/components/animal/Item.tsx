import Link from 'next/link';
import Image from 'next/image';
function Item({list}: {
  list?: { title: string; img: string; href: string;}[];
}) {
    const animals = list != undefined ? list : [
        {
          title: "Nubian Giraffe",
          img: "/images/giraffe.png",
          href: "/animals/nubian_giraffe"
        },
        {
          title: "Amur Leopard",
          img: "/images/leopard.png",
          href: "/animals/amur_leopard"
        },
        {
          title: "Sumatran Elephant",
          img: "/images/elephant.png",
          href: "/animals/sumatran_elephant"
        },
        {
          title: "Siberian Tiger",
          img: "/images/tiger.png",
          href: "/animals/sibertian_tiger"
        },
        {
          title: "Pygmy Hippo",
          img: "/images/hippo.png",
          href: "/animals/pygmy_hippo"
        },
        {
          title: "Javan Rhino",
          img: "/images/rhino.png",
          href: "/animals/javan_rhino"
        }
      ];
  return (
    <div className="bg-black py-52 max-md:py-8">
      <div className='grid md:grid-cols-3 grid-cols-1 gap-8 xl:px-56 lg:px-40 md:px-32 max-md:px-4'>
      {animals.map((data, index) => (
        <div className='max-md:w-full flex flex-col items-center justify-between px-16 py-8 border rounded-xl border-white space-y-8'>
            <Image
                className='w-full'
                src={data.img}
                width='800'
                height='800'
                alt=''
            />
            <Link href={data.href} className='flex items-center cursor-pointer text-white md:text-sm lg:text-md xl:text-xl max-md:pb-10'>
                <span className='pr-[15px]'>{data.title}</span>
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                </svg>
            </Link>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Item;

import Link from 'next/link';
import dynamic from "next/dynamic";

import React,{useState} from "react";
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const animals = [
  {
    usdz: "/models/Wolf/WOLF_ADULT.usdz",
    glb: "/models/Wolf/WOLF_ADULT.glb",
    url: "/animals/red_wolf",
    name: "Red Wolf",
    index: 0
  },
  {
    usdz: "/models/Giraffe/GIRAFFE_ADULT.usdz",
    glb: "/models/Giraffe/GIRAFFE_ADULT.glb",
    url: "/animals/nubian_giraffe",
    name: "Nubian Giraffe",
    index: 1
  },
  {
    usdz: "/models/Leopard/LEOPARD_ADULT.usdz",
    glb: "/models/Leopard/LEOPARD_ADULT.glb",
    url: "/animals/amur_leopard",
    name: "Amur Leopard",
    index: 2
  },
  {
    usdz: "/models/Elephant/ELEPHANT_ADULT.usdz",
    glb: "/models/Elephant/ELEPHANT_ADULT.glb",
    url: "/animals/sumatran_elephant",
    name: "Sumatran Elephant",
    index: 3
  },
  {
    usdz: "/models/Tiger/TIGER_ADULT.usdz",
    glb: "/models/Tiger/TIGER_ADULT.glb",
    url: "/animals/siberian_tiger",
    name: "Siberian Tiger",
    index: 4
  },
  {
    usdz: "/models/Hippo/HIPPO_ADULT.usdz",
    glb: "/models/Hippo/HIPPO_ADULT.glb",
    url: "/animals/pygmy_hippo",
    name: "Pygmy Hippo",
    index: 5
  },
  {
    usdz: "/models/Rhino/RHINO_ADULT.usdz",
    glb: "/models/Rhino/RHINO_ADULT.glb",
    url: "/animals/javan_rhino",
    name: "Javan Rhino",
    index: 6
  }
];

function Header() {
  const [animal ,setAnimal] = useState(animals[3]);
  const link = () => {
    window.location.href = animals[animal.index].url;
  };
  
  return (<>
    <div className="bg-black max-md:pt-20 max-md:hidden block">
      <div className='flex max-md:flex-col items-center justify-between pt-20 max-md:pt-8'>
        <div className='w-7/12 max-md:w-full md:pl-24 lg:pl-36 xl:pl-52 max-md:px-8 md:pr-8 md:pb-32'>
            <h1 className='text-white md:text-7xl xl:text-9xl max-md:text-5xl max-md:my-5'>Animals we support.</h1>
        </div>
        <div className='md:w-5/12 max-md:ml-16 '>
            {/* <Image
                className='intro-bg float-right'
                src='/images/collect-elephant.png'
                width='1000'
                height='1000'
                alt=''
            /> */}
            <ModelViewer  className='float-right max-md:h-[190px] aspect-square'
              usdz={animal.usdz}
              glb={animal.glb}
            ></ModelViewer>
        </div>
      </div>
      <div className='flex max-md:flex-col items-center justify-center mt-8 lg:space-x-8 md:space-x-2 md:px-4 max-md:space-y-8 collect-link'>
        <Link href="/animals/red_wolf"  onMouseOver={()=>setAnimal(animals[0])} className={`text-white text-center px-3 border hover:rounded-full border-black hover:border-white py-2 ${ animal.index == 0 ? 'active' : ''} text-lg md:text-sm font-medium`}>{'Red Wolf'}</Link>
        <Link href="/animals/nubian_giraffe"  onMouseOver={()=>setAnimal(animals[1])} className={`text-white text-center px-3 border hover:rounded-full border-black hover:border-white py-2 ${ animal.index == 1 ? 'active' : ''} text-lg md:text-sm font-medium`}>{'Nubian Giraffe'}</Link>
        <Link href="/animals/amur_leopard"  onMouseOver={()=>setAnimal(animals[2])} className={`text-white text-center px-3 border hover:rounded-full border-black hover:border-white py-2 ${ animal.index == 2 ? 'active' : ''} text-lg md:text-sm font-medium`} >{'Amur Leopard'}</Link>
        <Link href="/animals/pygmy_hippo"  onMouseOver={()=>setAnimal(animals[5])} className={`text-white text-center px-3 border hover:rounded-full border-black hover:border-white py-2 ${ animal.index == 5 ? 'active' : ''} text-lg md:text-sm font-medium`} >{'Pygmy Hippo'}</Link>
        <Link href="/animals/siberian_tiger"  onMouseOver={()=>setAnimal(animals[4])} className={`text-white text-center px-3 border hover:rounded-full border-black hover:border-white py-2 ${ animal.index == 4 ? 'active' : ''} text-lg md:text-sm font-medium`} >{'Siberian Tiger'}</Link>
        <Link href="/animals/sumatran_elephant"  onMouseOver={()=>setAnimal(animals[3])} className={`text-white text-center px-3 border hover:rounded-full border-black hover:border-white py-2 ${ animal.index == 3 ? 'active' : ''} text-lg md:text-sm font-medium`} >{'Sumatran Elephant'}</Link>
        <Link href="/animals/javan_rhino"  onMouseOver={()=>setAnimal(animals[6])} className={`text-white text-center px-3 border hover:rounded-full border-black hover:border-white py-2 ${ animal.index == 6 ? 'active' : ''} text-lg md:text-sm font-medium`} >{'Javan Rhino'}</Link>
      </div>
    </div>
    <div className="bg-black max-md:pt-20 hidden max-md:block">
      <div className='w-full px-8'>
          <h1 className='text-white text-5xl py-5'>Animals we support.</h1>
      </div>
    </div>
    </>
  );
}

export default Header;

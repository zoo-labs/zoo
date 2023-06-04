import Link from 'next/link';
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});
function Header() {
  return (
    <div className="bg-black">
      <div className='flex max-md:flex-col items-center justify-between pt-20'>
        <div className='w-7/12 max-md:w-full md:pl-52 max-md:px-8 md:pr-8 md:pb-32'>
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
            <ModelViewer className='float-right aspect-square'
              usdz="/models/Elephant/ELEPHANT_ADULT.usdz"
              glb="/models/Elephant/ELEPHANT_ADULT.glb"
            ></ModelViewer>
        </div>
      </div>
      <div className='flex max-md:flex-col items-center justify-center md:space-x-8 max-md:space-y-8 collect-link'>
        <Link href="/animals/red_wolf" className="text-white px-5 py-2  text-lg font-medium" legacyBehavior><a>Red Wolf</a></Link>
        <Link href="/animals/nubian_giraffe" className="text-white px-5 py-2  text-lg font-medium" legacyBehavior><a>Nubian Giraffe</a></Link>
        <Link href="/animals/amur_leopard" className="text-white px-5 py-2  text-lg font-medium" legacyBehavior><a>Amur Leopard</a></Link>
        <Link href="/animals/pygmy_hippo" className="text-white px-5 py-2  text-lg font-medium" legacyBehavior><a>Pygmy Hippo</a></Link>
        <Link href="/animals/siberian_tiger" className="text-white px-5 py-2  text-lg font-medium" legacyBehavior><a>Siberian Tiger</a></Link>
        <Link href="/animals/sumatran_elephant" className="text-white px-5 py-2  text-lg font-medium" legacyBehavior><a>Sumatran Elephant</a></Link>
        <Link href="/animals/javen_rhino" className="text-white px-5 py-2  text-lg font-medium" legacyBehavior><a>Javan Rhino</a></Link>
      </div>
    </div>
  );
}

export default Header;

import Link from 'next/link';
import Slider from 'react-slick';
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});
import animals from "@/components/animals/animals.json";

function Carosuel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    autoplay: true,
    arrows: false
  };

  return (
    <div className="Carousel bg-black text-center xl:px-52 lg:px-32 md:px-16 px-6 pt-32">
        <p className='text-gray-300 text-lg md:text-center text-left'>3D Metaverse Animals</p>
        <h1 className='text-white md:text-center text-left md:text-3xl xl:text-6xl max-md:text-2xl mt-5 mb-8'>Emotional Intelligence with AI</h1>
        <p className='text-gray-300 text-sm md:text-center text-left xl:text-xl pb-16 xl:px-52 lg:px-32 md:px-16'>The future upgrades will have powers, allow them to speak with you, play with you and much more for you to decide!</p>
        <Slider {...settings} className='w-1/2 max-md:w-full m-auto aspect-square border rounded-xl border-white mb-20'>
          {animals.map((data, index) => (
            <div key={index}>
              <ModelViewer 
                className='aspect-square'
                usdz={data.avatars[2].usdz}
                glb={data.avatars[2].glb}
              />
            </div>
          ))}
        </Slider>
        <Link href='https://app.zoolabs.io/' className='bg-white m-auto text-black text-lg rounded-full px-6 py-2'>Digital</Link>
    </div>
  );
}

export default Carosuel;
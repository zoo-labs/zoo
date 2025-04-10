import Slider from 'react-slick';
import Link from 'next/link';
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
    ssr: false,
  });
function Slide() {
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
      const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        draggable: true,
        autoplay: false,
        arrows: true
      };
    return (
        <Slider {...settings} className='bg-black w-full py-10 collect-slider'>

            {animals.map((data, index) => (
            <Link key={index} href={data.url} className='flex flex-col items-center text-center space-y-4 max-sm:p-2 p-4'>
            <div className='rounded-lg p-[4px] bg-[#3C9465]'>
                <ModelViewer className='aspect-square  bg-[#3C9465]'
                usdz={data.usdz}
                glb={data.glb}
                ar={false}
                control = {false}
                auto_play = {false}
            ></ModelViewer>
            <p className='text-[10px] text-black'>{data.name}</p>
            </div>
            </Link>
        ))}
        </Slider>
    );
  }
  
  export default Slide;
import Link from 'next/link';
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});
function Item({list, linkFlag=true}: {
  list?: { title: string; href: string; usdz: string; glb: string; camera_orbit: string; camera_target: string;}[];
  linkFlag?: boolean;
}) {
    const animals = list != undefined ? list : [
        {
          title: "Nubian Giraffe",
          href: "/animals/nubian_giraffe",
          usdz: "/models/Giraffe/GIRAFFE_ADULT.usdz",
          glb: "/models/Giraffe/GIRAFFE_ADULT.glb",
          camera_orbit: "",
          camera_target: "0m 28m 0m"
        },
        {
          title: "Amur Leopard",
          href: "/animals/amur_leopard",
          usdz: "/models/Leopard/LEOPARD_ADULT.usdz",
          glb: "/models/Leopard/LEOPARD_ADULT.glb",
          camera_orbit: "",
          camera_target: ""
        },
        {
          title: "Sumatran Elephant",
          href: "/animals/sumatran_elephant",
          usdz: "/models/Elephant/ELEPHANT_ADULT.usdz",
          glb: "/models/Elephant/ELEPHANT_ADULT.glb",
          camera_orbit: "",
          camera_target: ""
        },
        {
          title: "Siberian Tiger",
          href: "/animals/siberian_tiger",
          usdz: "/models/Tiger/TIGER_ADULT.usdz",
          glb: "/models/Tiger/TIGER_ADULT.glb",
          camera_orbit: "",
          camera_target: ""
        },
        {
          title: "Pygmy Hippo",
          href: "/animals/pygmy_hippo",
          usdz: "/models/Hippo/HIPPO_ADULT.usdz",
          glb: "/models/Hippo/HIPPO_ADULT.glb",
          camera_orbit: "",
          camera_target: ""
        },
        {
          title: "Javan Rhino",
          href: "/animals/javan_rhino",
          usdz: "/models/Rhino/RHINO_ADULT.usdz",
          glb: "/models/Rhino/RHINO_ADULT.glb",
          camera_orbit: "",
          camera_target: "0m 1m 0m"
        }
      ];
  return (
    <div className="bg-black lg:py-52 md:py-32 max-md:py-8">
      <div className='grid md:grid-cols-3 grid-cols-1 gap-8 xl:px-56 lg:px-40 md:px-24 max-md:px-4'>
      {animals.map((data, index) => (
        <div key={index} className='flex flex-col items-center space-y-4'>
          <div className='w-full max-md:w-full flex flex-col items-center justify-between  border rounded-xl border-white space-y-8'>
              {/* <Image
                  className='w-full'
                  src={data.img}
                  width='800'
                  height='800'
                  alt=''
              /> */}
              <ModelViewer className='aspect-square'
                usdz={data.usdz}
                glb={data.glb}
                camera_orbit={data.camera_orbit}
                camera_target={data.camera_target}
              ></ModelViewer>
              
          </div>
          {
            linkFlag ? (
              <Link
                href={data.href}
                className='w-full items-center flex justify-center cursor-pointer text-white md:text-sm lg:text-md xl:text-xl max-md:pb-10 '>
                  <>
                    <span className='pr-[15px]'>{data.title}</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="white"/>
                    </svg>
                  </>
              </Link>
            ) : (
              <p className='text-white md:text-sm lg:text-md xl:text-xl max-md:pb-10'>{data.title}</p>
            )
          }
          
        </div>
      ))}
      </div>
    </div>
  );
}

export default Item;

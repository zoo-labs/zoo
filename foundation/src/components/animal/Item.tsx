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
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            🐾 Interactive 3D Sanctuary
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Meet the Species We Protect
          </h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Rotate, zoom, and explore endangered wildlife in full 3D and AR directly in your browser.
          </p>
        </div>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
        {animals.map((data, index) => (
          <div key={index} className='bg-gray-50/70 p-6 rounded-3xl border border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col items-center justify-between'>
            <div className='w-full aspect-square bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden'>
              <ModelViewer className='w-full h-full'
                usdz={data.usdz}
                glb={data.glb}
                camera_orbit={data.camera_orbit}
                camera_target={data.camera_target}
              ></ModelViewer>
            </div>
            <div className="w-full mt-6 text-center">
              {linkFlag ? (
                <Link
                  href={data.href}
                  className='inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-white hover:bg-emerald-50 text-gray-900 hover:text-emerald-700 font-bold rounded-xl border border-gray-200 transition-colors shadow-sm text-base'
                >
                  <span>{data.title}</span>
                  <span>→</span>
                </Link>
              ) : (
                <p className='text-gray-900 font-bold text-lg'>{data.title}</p>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

export default Item;

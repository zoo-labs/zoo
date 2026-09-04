import Link from 'next/link';
import Image from 'next/image';
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});
function Detail() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 max-md:hidden">
        <div className='flex items-center justify-between py-12 lg:gap-16 gap-8 bg-gray-50/80 rounded-3xl p-10 border border-gray-200'>
          <div className='w-1/2 flex justify-center'>
            <div className="w-full max-w-md aspect-square bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
              <ModelViewer className='w-full h-full'
                usdz="/models/Wolf/WOLF_ADULT.usdz"
                glb="/models/Wolf/WOLF-ADULT.glb"
                camera_target="0.05m 0.05m 0m"
              ></ModelViewer>
            </div>
          </div>
          <div className='w-1/2 flex flex-col'>
            <span className='inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 w-fit mb-3'>
              CRITICALLY ENDANGERED
            </span>
            <h3 className='text-gray-900 text-4xl lg:text-5xl font-extrabold tracking-tight mb-4'>
              The Red Wolf
            </h3>
            <p className='text-gray-600 text-base lg:text-lg leading-relaxed mb-6'>
              Fewer than 25 red wolves remain in the wild. Our non-profit foundation deploys GPS collaring, bioacoustic sensors, and genetic tracking to support their recovery.
            </p>
            <div className='flex flex-wrap items-center gap-4'>
              <Link href='/animals/red_wolf' className='bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm text-sm' >
                Explore Species & 3D →
              </Link>
              <Link href='/donation' className='bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-bold px-6 py-2.5 rounded-xl transition-colors text-sm'>
                Support Sanctuary
              </Link>
              <Link href='/getinvolved#volunteer' className='text-emerald-700 hover:text-emerald-800 font-semibold text-sm'>
                Volunteer in the Field
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='max-md:block hidden px-6'>
        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 text-center">
          <span className='inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 mb-3'>
            CRITICALLY ENDANGERED
          </span>
          <h3 className='text-2xl font-bold text-gray-900 mb-4'>The Red Wolf</h3>
          <div className='w-full aspect-square bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-4'>
            <ModelViewer className='w-full h-full'
              usdz="/models/Wolf/WOLF_ADULT.usdz"
              glb="/models/Wolf/WOLF-ADULT.glb"
              camera_target="0.05m 0.05m 0m"
            ></ModelViewer>
          </div>
          <Link href='/animals/red_wolf' className='inline-block w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-center'>
            Learn More About The Red Wolf →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Detail;

import Link from 'next/link';
import Slider from 'react-slick';
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});
import animals from "@/components/animals/animals.json";

/**
 * The models, one at a time.
 *
 * The slider was sized by `w-1/2 max-md:w-full aspect-square` and the model
 * inside it by `aspect-square` again — none of which the stylesheet answers, so
 * nothing held a shape and a viewer that failed to paint left a hole. It sits
 * on a `.plate` now, which keeps its ratio and its ground whether or not WebGL
 * arrives, inside a measure that needs no breakpoint to halve itself.
 */
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
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
        <p className='text-lg text-secondary md:text-center text-left'>3D Metaverse Animals</p>
        <h1 className='text-foreground md:text-center text-left md:text-3xl xl:text-6xl max-md:text-2xl mt-5 mb-8'>Emotional Intelligence with AI</h1>
        <p className='text-secondary text-sm md:text-xl md:text-center text-left mx-auto pb-12' style={{ maxWidth: '58ch' }}>The future upgrades will have powers, allow them to speak with you, play with you and much more for you to decide!</p>
        <div className='mx-auto mb-12' style={{ width: '100%', maxWidth: '32rem' }}>
          <Slider {...settings}>
            {animals.map((data, index) => (
              <div key={index}>
                <div className='plate' style={{ aspectRatio: '1 / 1', width: '100%' }}>
                  <ModelViewer
                    usdz={data.avatars[2].usdz}
                    glb={data.avatars[2].glb}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className='flex justify-center'>
          <Link href='https://app.zoolabs.io/' className='action' data-fill>Digital</Link>
        </div>
    </section>
  );
}

export default Carosuel;

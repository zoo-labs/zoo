import dynamic from 'next/dynamic';

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), { ssr: false });

/**
 * The three ages of one animal, as models you can turn around.
 *
 * This used to carry a second job — a hardcoded list of the six species, shown
 * on /animals with a `linkFlag` deciding which of the two things it was. The
 * species list is on the page that owns it now and reads animals.json, so this
 * is one component doing one job and `list` is required.
 *
 * Each model sits on a `.plate` with a stated aspect ratio. The classes that
 * used to size them — `aspect-square`, `md:py-32`, `xl:px-56` — are Tailwind
 * names, and Tailwind has never been in this build; the stylesheet answers a
 * fixed set of them and silently drops the rest. Nothing sized these, so a
 * viewer that failed to paint left a hole the height of the page. The plate
 * holds its shape and its colour whether or not WebGL gets there, which is the
 * difference between a page with a dark panel on it and a page with a gap in it.
 */
export default function Item({
  list,
}: {
  list: {
    title: string;
    href: string;
    usdz: string;
    glb: string;
    camera_orbit: string;
    camera_target: string;
  }[];
}) {
  return (
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div className='grid-cards'>
        {list.map((data) => (
          <figure key={data.title}>
            <div className='plate' style={{ aspectRatio: '1 / 1', width: '100%' }}>
              <ModelViewer
                usdz={data.usdz}
                glb={data.glb}
                camera_orbit={data.camera_orbit}
                camera_target={data.camera_target}
              />
            </div>
            <figcaption className='mt-3 text-center font-medium'>{data.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

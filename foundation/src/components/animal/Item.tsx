import Image from 'next/image';
import Link from 'next/link';

/**
 * The species grid.
 *
 * It used to mount a <ModelViewer> per tile against `/models/**.glb`. Those
 * files are not in the repo and not on the host, so every tile rendered an
 * empty box under a heading promising "full 3D and AR" — six blank squares in
 * the middle of the home page. The still renders under public/images DO exist,
 * so the grid shows those and the copy claims only what is there.
 *
 * Each render is a square on solid black with no alpha, so the tile is given
 * that same ground (`--plate`) and the picture and its plate read as one
 * surface instead of a black box on a light card.
 */

const SPECIES = [
  { slug: 'nubian_giraffe', title: 'Nubian giraffe', img: '/images/giraffe.png' },
  { slug: 'amur_leopard', title: 'Amur leopard', img: '/images/leopard.png' },
  { slug: 'sumatran_elephant', title: 'Sumatran elephant', img: '/images/elephant.png' },
  { slug: 'siberian_tiger', title: 'Siberian tiger', img: '/images/tiger.png' },
  { slug: 'pygmy_hippo', title: 'Pygmy hippo', img: '/images/hippo.png' },
  { slug: 'javan_rhino', title: 'Javan rhino', img: '/images/rhino.png' },
  { slug: 'red_wolf', title: 'Red wolf', img: '/images/red_wolf.png' },
];

/** The renders, keyed the way a passed-in list names them. */
const IMG: Record<string, string> = Object.fromEntries(
  SPECIES.map((s) => [s.slug, s.img])
);

const slugOf = (href: string) => href.split('/').filter(Boolean).pop() ?? '';

function Item({
  list,
  linkFlag = true,
}: {
  list?: { title: string; href: string }[];
  linkFlag?: boolean;
}) {
  const species = (
    list
      ? list.map((a) => ({
          slug: slugOf(a.href),
          title: a.title,
          img: IMG[slugOf(a.href)],
        }))
      : SPECIES.slice(0, 6)
  ).filter((a) => a.img);

  /**
   * A tile with no render is an empty black square, and the species pages pass
   * their `avatars` list — Baby/Teen/Adult, keyed to `/models/**.glb` that are
   * not in the repo — so every species page drew three of them under a heading.
   * A grid with nothing to show is not a grid.
   */
  if (species.length === 0) return null;

  return (
    <section style={{ paddingBlock: 'clamp(4rem, 8vw, 6rem)' }}>
      <div className='mx-auto' style={{ maxWidth: 1280, paddingInline: 'var(--page-gutter)' }}>
        <div className='max-w-2xl'>
          <p className='eyebrow'>Species</p>
          <h2 className='title mt-3'>The animals we work on</h2>
          <p className='lede mt-4'>
            Seven endangered species, each with its own programme, field partners and
            published population data.
          </p>
        </div>

        <div className='mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {species.map((a) => {
            const inner = (
              <>
                <div
                  className='relative w-full overflow-hidden'
                  style={{
                    aspectRatio: '1 / 1',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--plate)',
                  }}
                >
                  {a.img && (
                    <Image
                      src={a.img}
                      alt={a.title}
                      fill
                      sizes='(min-width: 768px) 30vw, 90vw'
                      className='object-contain transition-transform duration-500 group-hover:scale-105'
                    />
                  )}
                </div>
                <p className='mt-4 flex items-center justify-between text-base font-semibold'>
                  {a.title}
                  {linkFlag && <span aria-hidden className='more'>→</span>}
                </p>
              </>
            );

            return linkFlag ? (
              <Link key={a.slug} href={`/animals/${a.slug}`} className='card group p-4'>
                {inner}
              </Link>
            ) : (
              <div key={a.slug} className='card p-4'>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Item;

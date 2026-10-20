import Image from 'next/image';

/**
 * The Get Involved hero.
 *
 * It was built out of five bespoke names — `space-dog-bg`, `dog-bg`,
 * `intro-bg`, `involved-header` and `md:absolute` — none of which the stylesheet
 * publishes, so the empty spacer div held nothing, the photograph took its
 * intrinsic 1000px, and the heading and the line under it fell into the flow
 * below it instead of sitting over it. The contact line was `hidden max-md:block`,
 * and only the first half of that pair exists, so it never appeared at any width.
 *
 * Two flex bases say the same layout without a breakpoint: copy and picture side
 * by side while both fit, stacked when they do not.
 */
function Header() {
  return (
    <header className='bg-background'>
      <div className='container mx-auto px-4 py-24 flex flex-wrap items-center gap-8'>
        <div style={{ flex: '999 1 20rem' }}>
          <h1 className='text-foreground'>Get Involved.</h1>
          <p className='text-foreground text-xl mt-6' style={{ maxWidth: '30rem' }}>
            Supporting endangered species that are threatened with extinction.
          </p>
          <p className='text-secondary mt-4'>hello@zoo.NGO</p>
        </div>
        <div style={{ flex: '1 1 18rem' }}>
          <Image
            src='/images/dog.png'
            width={1000}
            height={1000}
            alt=''
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;

import Section from '@/components/Section';

/**
 * The 3D band.
 *
 * This was a slider of seven <ModelViewer>s pointed at `/models/**.glb`. There
 * is no `public/models` directory — not here and not on the host — so the
 * slider was seven empty boxes rotating under a heading that promised 3D. The
 * band now says what exists and links to where the models actually run,
 * instead of holding an empty frame open for them.
 */
function Carousel() {
  return (
    <Section>
      <div className='max-w-2xl'>
        <p className='eyebrow'>Digital twins</p>
        <h2 className='title mt-3'>Emotional intelligence with AI</h2>
        <p className='lede mt-4'>
          Our species models are being built to speak, play and teach — an interactive way
          for students and wildlife lovers to meet an endangered animal up close.
        </p>
        <div className='mt-8'>
          <a
            href='https://app.zoolabs.io/'
            target='_blank'
            rel='noopener noreferrer'
            className='action'
          >
            Open the 3D app <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </Section>
  );
}

export default Carousel;

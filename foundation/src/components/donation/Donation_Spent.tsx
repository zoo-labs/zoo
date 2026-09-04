import Section from '@/components/Section';

/**
 * Where a donation goes.
 *
 * This was a square-cornered `#3C9465` band that turned solid black below the
 * md breakpoint — two different designs for one section, neither of them the
 * site's. The split is now one bar built from the single accent at three
 * strengths, so the same picture is shown at every width.
 */
const SPLIT = [
  {
    share: 70,
    title: 'Programmes and services',
    body: '70% of your donation supports practical conservation work — habitat preservation, species protection and community engagement.',
    fill: 'var(--brand)',
  },
  {
    share: 20,
    title: 'Marketing',
    body: '20% raises further awareness and financial support, broadening our reach and our impact in the conservation landscape.',
    fill: 'color-mix(in srgb, var(--brand) 55%, white)',
  },
  {
    share: 10,
    title: 'Administrative costs',
    body: '10% backs the operational backbone of the organisation — legal work and the collaborations that wildlife protection depends on.',
    fill: 'color-mix(in srgb, var(--brand) 25%, white)',
  },
];

function Donation_Spent() {
  return (
    <Section>
      <div className='max-w-2xl'>
        <p className='eyebrow'>Transparency</p>
        <h2 className='title mt-3'>How is your donation spent?</h2>
      </div>

      <div
        className='mt-10 flex h-11 overflow-hidden'
        style={{ borderRadius: 'var(--radius-full)', border: '1px solid var(--border)' }}
        role='img'
        aria-label='70% programmes and services, 20% marketing, 10% administrative costs'
      >
        {SPLIT.map((part) => (
          <div
            key={part.title}
            className='flex items-center justify-center text-xs font-medium'
            style={{
              width: `${part.share}%`,
              background: part.fill,
              color: part.share === 70 ? 'var(--brand-foreground)' : 'var(--foreground)',
            }}
          >
            {part.share}%
          </div>
        ))}
      </div>

      <div className='mt-10 grid gap-6 md:grid-cols-3'>
        {SPLIT.map((part) => (
          <div key={part.title} className='card p-6'>
            <p className='text-2xl font-semibold tracking-tight'>{part.share}%</p>
            <h3 className='mt-1 text-lg font-semibold'>{part.title}</h3>
            <p
              className='mt-2 text-sm leading-relaxed'
              style={{ color: 'var(--muted-foreground)' }}
            >
              {part.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Donation_Spent;

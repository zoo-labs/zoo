import Link from 'next/link';

/** The case for the work, in four numbers. */
const FACTS = [
  {
    id: 'elephants',
    value: '100',
    body: 'African elephants are killed by poachers each day, by best estimate.',
    label: 'Sumatran elephant',
    href: '/animals/sumatran_elephant',
  },
  {
    id: 'trade',
    value: '$23B',
    body: 'Illegal wildlife trade is worth $7–23 billion a year, one of the largest illicit markets in the world.',
    label: 'The species',
    href: '/animals',
  },
  {
    id: 'habitat',
    value: '18.7M',
    body: 'Acres of forest lost annually, affecting the habitats of 80% of terrestrial species.',
    label: 'Get involved',
    href: '/getinvolved',
  },
  {
    id: 'extinction',
    value: '38,000+',
    body: 'Species threatened with extinction — 27% of every species assessed.',
    label: 'Donate',
    href: '/donation',
  },
];

function Comment() {
  return (
    <section
      style={{
        background: 'var(--surface-card)',
        borderBottom: '1px solid var(--border)',
        paddingBlock: 'clamp(4rem, 8vw, 6rem)',
      }}
    >
      <div className='mx-auto' style={{ maxWidth: 1280, paddingInline: 'var(--page-gutter)' }}>
        <div className='max-w-2xl'>
          <p className='eyebrow'>Why it matters</p>
          <h2 className='title mt-3'>The scale of the problem</h2>
          <p className='lede mt-4'>
            We work on it with field science, open grants and monitoring that anyone can
            audit.
          </p>
        </div>

        <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {FACTS.map((f) => (
            <div key={f.id} className='flex flex-col justify-between gap-5'>
              <div>
                <p className='text-4xl font-semibold tracking-tight'>{f.value}</p>
                <p
                  className='mt-3 text-sm leading-relaxed'
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {f.body}
                </p>
              </div>
              <Link href={f.href} className='more'>
                {f.label} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Comment;

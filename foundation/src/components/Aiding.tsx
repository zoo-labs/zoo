import Section from '@/components/Section';

function Aiding() {
  return (
    <Section tone='card' edge='block'>
      <div className='flex flex-col'>
        <div className='max-w-2xl'>
          <p className='eyebrow'>Digital conservation</p>
          <h2 className='title mt-3'>Aiding species with digital twins</h2>
          <p className='lede mt-4'>
            3D and educational content for children, students and wildlife lovers, to
            experience endangered animals up close.
          </p>
        </div>
        <div className='mt-12 grid gap-6 md:grid-cols-2'>
          <div className='card p-8'>
            <h3 className='text-lg font-semibold'>Philanthropic support</h3>
            <p
              className='mt-2 text-sm leading-relaxed'
              style={{ color: 'var(--muted-foreground)' }}
            >
              Our work is made possible through philanthropic grants, donations and
              educational awareness programmes worldwide.
            </p>
          </div>
          <div className='card p-8'>
            <h3 className='text-lg font-semibold'>Family education</h3>
            <p
              className='mt-2 text-sm leading-relaxed'
              style={{ color: 'var(--muted-foreground)' }}
            >
              We are developing interactive experiences with the Zoo animals, aimed at
              lasting educational impact, empathy for wildlife and conservation awareness.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Aiding;

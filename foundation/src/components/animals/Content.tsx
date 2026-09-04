import Section from '@/components/Section';

function Content({ title, content }: { content: string; title: string }) {
  return (
    <Section tone='card' edge='block'>
      <div className='grid gap-12 lg:grid-cols-12'>
        <div className='lg:col-span-5'>
          <h2 className='title'>{title}</h2>
        </div>
        <div className='lg:col-span-7'>
          <div
            className='lede'
            style={{ color: 'var(--muted-foreground)' }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </Section>
  );
}

export default Content;

import Section from '@/components/Section';

function Campaign() {
  return (
    <Section tone='card' edge='block'>
      <div className='max-w-2xl'>
        <p className='eyebrow'>Bring your community to the Zoo Foundation</p>
        <h2 className='title mt-3'>Create your own campaign</h2>
        <p className='lede mt-4'>
          A self-tailored campaign to raise funds for these animals by leveraging your own
          network.
        </p>
        <div className='mt-8'>
          <a
            href='/guidebook.pdf'
            download='zoo-campaign-guidebook.pdf'
            className='action'
          >
            Download the guide
          </a>
        </div>
      </div>
    </Section>
  );
}

export default Campaign;

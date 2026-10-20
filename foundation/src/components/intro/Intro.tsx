import Link from 'next/link';
import { useCorpus } from '@/config/corpus';

function Intro({
  breadcrumbs,
  title,
  comment,
}: {
  breadcrumbs: string;
  title: string;
  comment?: string;
}) {
  const corpus = useCorpus();
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '2rem 1.5rem 4rem 1.5rem' }}>
      <div className="glow-backdrop" />

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <div className="pill" style={{ fontSize: '0.75rem' }}>
            <span>🐬</span>
            <span>{breadcrumbs}</span>
          </div>
          <div className="pill" style={{ fontSize: '0.75rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34d399', display: 'inline-block' }} />
            <span>501(c)(3) Non-Profit · EIN 88-3538992</span>
          </div>
        </div>

        <h1 className="display-chrome" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
          {title}
        </h1>

        {comment && (
          <p className="text-secondary" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.6, maxWidth: '800px' }}>
            {comment}
          </p>
        )}

        <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '800px', opacity: 0.8 }}>
          Zoo Labs Foundation is a 501(c)(3) research organization dedicated to advancing sovereign frontier AI, open reasoning models, decentralized compute & mining protocols, and the Zoo Gym alignment framework.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem' }}>
          <a
            href="https://zoolabs.io"
            target="_blank"
            rel="noopener noreferrer"
            className="action"
            data-fill
            style={{ minHeight: '46px', padding: '0 1.75rem', fontSize: '0.875rem' }}
          >
            <span>🐬 Launch Studio ↗</span>
          </a>

          <a
            href="https://papers.zoo.ngo"
            target="_blank"
            rel="noopener noreferrer"
            className="action"
            style={{ minHeight: '46px', padding: '0 1.5rem', fontSize: '0.875rem' }}
          >
            <span>📄 {corpus.papers} Papers ↗</span>
          </a>

          <a
            href="https://zips.zoo.ngo"
            target="_blank"
            rel="noopener noreferrer"
            className="action"
            style={{ minHeight: '46px', padding: '0 1.5rem', fontSize: '0.875rem' }}
          >
            <span>⚡ ZIPs Standards ↗</span>
          </a>

          <Link
            href="/donation"
            className="action"
            style={{ minHeight: '46px', padding: '0 1.5rem', fontSize: '0.875rem' }}
          >
            <span>💚 Support Sanctuaries &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Intro;

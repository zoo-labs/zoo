import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { useCorpus } from '@/config/corpus';

/**
 * What can be checked, and where to check it.
 *
 * This page used to publish a full income statement — $18,271,591 in revenue,
 * the same in expenses, broken down by programme — and link to six documents:
 * an IRS Form 990, an independent audit, an annual report, bylaws,
 * certifications, an impact report. None of the six exist; /reports is not a
 * directory. The figures were placeholders, which their own digits give away
 * ($3,456,789, $4,567,890, $8,234,567).
 *
 * The IRS ruling is real and dated 2025-06-01, and the public record carries no
 * filing yet, which is what you would expect this soon. So the page says that,
 * and links to the record so a reader confirms it rather than trusting us. A
 * verifiable "not yet" is worth more than an unverifiable eighteen million.
 */

const IRS_RECORD = 'https://projects.propublica.org/nonprofits/organizations/883538992';

const FACTS = [
  { label: 'Legal name', value: 'Zoo Labs Foundation Inc.' },
  { label: 'EIN', value: '88-3538992' },
  { label: 'IRS status', value: '501(c)(3) public charity' },
  { label: 'Determination', value: 'June 2025' },
  { label: 'State', value: 'California' },
];

export default function Transparency() {
  const corpus = useCorpus();
  return (
    <Layout>
      <Seo
        templateTitle="Transparency"
        description="Zoo Labs Foundation's registration, filings and published work — with links to the public record."
      />
      <Navbar />

      <section className="container py-24">
        <h1 className="text-5xl md:text-7xl font-black">Transparency</h1>
        <p className="mt-6 text-lg text-secondary" style={{ maxWidth: '58ch' }}>
          Everything on this page can be checked somewhere that is not this page. Where a
          document does not exist yet, it says so.
        </p>

        <dl className="grid-cards" style={{ marginTop: 'var(--space-10)' }}>
          {FACTS.map((fact) => (
            <div key={fact.label} className="card p-5">
              <dt className="text-xs tracking-wide text-muted">{fact.label}</dt>
              <dd className="mt-2 text-xl font-bold">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6">
          <a
            href={IRS_RECORD}
            className="font-bold"
          >
            Look us up in the IRS public record →
          </a>
        </p>
      </section>

      <section className="container py-24">
        <h2 className="text-3xl md:text-4xl font-black">Filings</h2>
        <div className="mt-6 card p-6" style={{ borderLeft: '10px solid var(--berry)' }}>
          <h3 className="text-xl font-bold">No Form 990 has been filed yet.</h3>
          <p className="mt-3 text-secondary" style={{ maxWidth: '62ch' }}>
            The foundation&rsquo;s determination is recent, so no annual return has come due
            and the public record carries none. When the first one is filed it will be
            published here and will appear in the IRS record at the link above, where you can
            read it without taking our word for anything.
          </p>
          <p className="mt-3 text-secondary" style={{ maxWidth: '62ch' }}>
            The same goes for an independent audit and an annual report: neither exists yet,
            so neither is linked. We would rather show you an empty shelf than a locked door.
          </p>
        </div>
      </section>

      <section className="container py-24">
        <h2 className="text-3xl md:text-4xl font-black">What we have produced</h2>
        <p className="mt-3 text-secondary" style={{ maxWidth: '58ch' }}>
          Research is the output we can show you today. All of it is public, and the counts
          are the number of documents in the repositories, not an estimate.
        </p>

        <div className="mt-8 grid-cards">
          <article className="card p-6" style={{ borderLeft: '10px solid var(--berry)' }}>
            <p className="text-4xl font-black">{corpus.papers}</p>
            <h3 className="mt-2 text-lg font-bold">Papers</h3>
            <a
              href="https://papers.zoo.ngo"
              className="mt-3 inline-flex font-bold"
            >
              Read them →
            </a>
          </article>

          <article className="card p-6" style={{ borderLeft: '10px solid var(--blue)' }}>
            <p className="text-4xl font-black">{corpus.proposals}</p>
            <h3 className="mt-2 text-lg font-bold">Improvement proposals</h3>
            <a
              href="https://zips.zoo.ngo"
              className="mt-3 inline-flex font-bold"
            >
              Read them →
            </a>
          </article>

          <article className="card p-6" style={{ borderLeft: '10px solid var(--green)' }}>
            <p className="text-4xl font-black">Open</p>
            <h3 className="mt-2 text-lg font-bold">Models and code</h3>
            <a
              href="https://github.com/zooai"
              className="mt-3 inline-flex font-bold"
            >
              Read it →
            </a>
          </article>
        </div>
      </section>

      <section className="container py-24">
        <div className="card p-8 flex flex-wrap items-center justify-between gap-6">
          <div style={{ maxWidth: '52ch' }}>
            <h2 className="text-2xl md:text-3xl font-black">Donations</h2>
            <p className="mt-3 text-secondary">
              Gifts to Zoo Labs Foundation Inc. are tax-deductible to the extent the law
              allows. When we can show you how they were spent, that accounting will be on
              this page.
            </p>
          </div>
          <Link href="/donation" className="action" data-fill>
            Donate
          </Link>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}

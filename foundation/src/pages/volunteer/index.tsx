import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Volunteer() {
  return (
    <Layout>
      <Seo
        templateTitle="Volunteer & Contact"
        description="Join our conservation efforts and get in touch with Zoo Foundation"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              Get Involved
            </h1>
            <p className="text-xl md:text-2xl text-secondary">
              Join our mission to protect endangered wildlife through volunteer opportunities
              and conservation experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Shark Stewards Featured Experience */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="card p-8 mb-12" style={{ borderLeft: '10px solid var(--blue)' }}>
            <span className="pill eyebrow">Next expedition</span>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold mb-4">
              Shark Stewards expedition, this Sunday
            </h2>
            <p className="text-xl text-zinc-700 mb-6">
              Join us for an incredible Great White Shark expedition to the Farallone Islands
              this Sunday! Limited spots available for this once-in-a-lifetime conservation experience.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-3">Expedition Details:</h3>
                <ul className="space-y-2 text-zinc-700">
                  <li>• Date: <strong>Sunday, October 5th, 2025</strong></li>
                  <li>• Duration: 8+ hours</li>
                  <li>• Location: Farallone Islands, San Francisco</li>
                  <li>• Departure: San Francisco Marina</li>
                  <li>• Focus: Great White Shark observation & research</li>
                  <li>• Led by: Professional marine biologists</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-3">What's Included:</h3>
                <ul className="space-y-2 text-zinc-700">
                  <li>• Professional guide and marine biologist</li>
                  <li>• All safety equipment</li>
                  <li>• Educational materials</li>
                  <li>• Contribution to shark conservation</li>
                  <li>• Unforgettable wildlife experience</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/experiences"
                className="action"
                data-fill
                style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
              >
                View all expeditions
              </Link>
              <Link href="/donation" className="action">
                Donate to support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Contact Us
            </h2>
            <p className="text-xl text-secondary mb-12">
              Ready to make a difference? Get in touch with our team to learn about
              volunteer opportunities, conservation experiences, and how you can support
              our mission.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3 text-foreground">Email</h3>
                <a href="mailto:hello@zoo.ngo" style={{ color: 'var(--blue)' }}>
                  hello@zoo.ngo
                </a>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3 text-foreground">Experiences</h3>
                <a href="mailto:experiences@zoo.ngo" style={{ color: 'var(--blue)' }}>
                  experiences@zoo.ngo
                </a>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3 text-foreground">Partnerships</h3>
                <a href="mailto:partners@zoo.ngo" style={{ color: 'var(--blue)' }}>
                  partners@zoo.ngo
                </a>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Zoo Foundation
              </h3>
              <p className="text-secondary mb-2">
                EIN: 88-3538992
              </p>
              <p className="text-secondary mb-4">
                Registered 501(c)(3) Nonprofit Organization
              </p>
              <p className="text-secondary">
                Executive Director: Antje Worring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Ways to Volunteer
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mx-auto">
            <div className="card p-6 transition-all">
              <h3 className="text-xl font-bold mb-3">Field Research</h3>
              <p className="text-zinc-600">
                Join our research expeditions to study and protect endangered species in their natural habitats.
              </p>
            </div>
            <div className="card p-6 transition-all">
              <h3 className="text-xl font-bold mb-3">Education & Outreach</h3>
              <p className="text-zinc-600">
                Help educate communities about wildlife conservation and the importance of biodiversity.
              </p>
            </div>
            <div className="card p-6 transition-all">
              <h3 className="text-xl font-bold mb-3">Fundraising</h3>
              <p className="text-zinc-600">
                Support our mission by helping organize and participate in fundraising events and campaigns.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/donation"
              className="action"
              data-fill
              style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
            >
              Donate now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
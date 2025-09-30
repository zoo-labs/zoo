import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';
import Intro from '@/components/intro/Intro';
import Comment from '@/components/Comment';
import Principles from '@/components/Principles';
import AnimalDetail from '@/components/animal/Detail';
import AnimalItems from '@/components/animal/Item';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout>
      <Seo />
      <Navbar />

      <Intro
        breadcrumbs="Zoo Labs Foundation"
        title="Preserve"
        comment=" Wildlife biodiversity through aligned charities, education, research and active conservation efforts."
      />

      <Comment />

      <Principles />

      <div className='bg-black pt-32'>
        <AnimalDetail />
      </div>

      <AnimalItems />

      <section className="bg-black py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Research Grants', detail: 'Supporting conservation science' },
              { label: 'Educational Programs', detail: 'Wildlife awareness initiatives' },
              { label: 'Field Partnerships', detail: 'Working with conservation organizations' }
            ].map((metric, index) => (
              <div
                key={index}
                className="bg-black p-8 rounded-lg border border-gray-800 hover:border-gray-600 transition-all"
              >
                <div className="text-lg font-semibold text-white mb-1">{metric.label}</div>
                <div className="text-sm text-gray-400">{metric.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Our Mission</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Protecting Earth's most vulnerable species through research, education, and conservation partnerships.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">How We Protect Wildlife</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our comprehensive approach combines direct action, scientific research, and community engagement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-black p-8 rounded-lg border border-gray-800 hover:border-gray-600 transition-all">
              <div className="text-5xl mb-6">🔬</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Technology-Enhanced Monitoring</h3>
              <p className="text-gray-400 mb-4">
                Our research programs use camera traps and wildlife tracking systems to monitor
                endangered species populations and support conservation efforts.
              </p>
              <Link href="/ai" className="text-white font-medium hover:text-gray-400 transition-colors">
                Learn More →
              </Link>
            </div>

            <div className="bg-black p-8 rounded-lg border border-gray-800 hover:border-gray-600 transition-all">
              <div className="text-5xl mb-6">🌍</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Direct Conservation</h3>
              <p className="text-gray-400 mb-4">
                We protect 2.4 million hectares of critical habitat through partnerships with
                indigenous communities and local organizations.
              </p>
              <Link href="/programs" className="text-white font-medium hover:text-gray-400 transition-colors">
                Our Programs →
              </Link>
            </div>

            <div className="bg-black p-8 rounded-lg border border-gray-800 hover:border-gray-600 transition-all">
              <div className="text-5xl mb-6">💎</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Transparent Funding</h3>
              <p className="text-gray-400 mb-4">
                We maintain public financial records and provide regular reports on how donations
                are used, ensuring complete transparency and donor trust.
              </p>
              <Link href="/transparency" className="text-white font-medium hover:text-gray-400 transition-colors">
                See Financials →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">Conservation Technology</h2>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">Conservation Technology</h3>
                  <p className="text-gray-400 mb-4">
                    We deploy camera traps, GPS tracking, and monitoring systems to study wildlife
                    populations and inform conservation strategies.
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Monitoring programs across multiple species</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Anti-poaching support systems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Research data available to partners</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-64 h-64 bg-black rounded-lg border border-gray-800"></div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">Financial Accountability</h3>
                  <p className="text-gray-400 mb-4">
                    We maintain detailed financial records and publish annual reports showing how
                    donations support conservation projects.
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Public financial reporting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Donor-advised project selection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Quarterly impact updates</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-64 h-64 bg-black rounded-lg border border-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 text-center">Wildlife Volunteer Experiences</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Get up close with wildlife conservation through our volunteer programs at animal sanctuaries worldwide. Make a real impact while experiencing unforgettable adventures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/experiences/1" className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
              <div className="relative aspect-video overflow-hidden bg-gray-900">
                <img
                  src="/images/volunteer-experiences/luxury-yacht-shark-breach.jpg"
                  alt="Ultimate Luxury Great White Shark Expedition"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-black">
                <h3 className="font-bold mb-1 text-white">Ultimate Luxury Great White Shark Expedition (20 Guests)</h3>
                <p className="text-gray-400 text-sm mb-2">Farallone Islands, San Francisco, USA</p>
                <p className="text-lg font-bold text-white">$75,000 / group expedition</p>
              </div>
            </Link>

            <Link href="/experiences/7" className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
              <div className="relative aspect-video overflow-hidden bg-gray-900">
                <img
                  src="/images/volunteer-experiences/intimate-shark-two.jpg"
                  alt="Intimate Great White Shark Encounter"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-black">
                <h3 className="font-bold mb-1 text-white">Intimate Great White Shark Encounter (2 Guests)</h3>
                <p className="text-gray-400 text-sm mb-2">Farallone Islands, San Francisco, USA</p>
                <p className="text-lg font-bold text-white">$2,500 / intimate experience</p>
              </div>
            </Link>

            <Link href="/experiences/8" className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
              <div className="relative aspect-video overflow-hidden bg-gray-900">
                <img
                  src="/images/volunteer-experiences/modular-shark-adventure.jpg"
                  alt="Premium Great White Shark Expedition"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-black">
                <h3 className="font-bold mb-1 text-white">Premium Great White Shark Expedition</h3>
                <p className="text-gray-400 text-sm mb-2">Farallone Islands, San Francisco, USA</p>
                <p className="text-lg font-bold text-white">$3,500 / expedition</p>
              </div>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link href="/experiences" className="inline-block bg-white hover:bg-gray-200 border border-white px-6 py-3 rounded-lg text-black font-medium transition-colors">
              Browse All Experiences
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Join the Movement</h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Whether through donations, volunteering, or spreading awareness, everyone can make
              a difference in protecting our planet's wildlife.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-all">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-2 text-white">Donate</h3>
                <p className="text-gray-400 mb-4">
                  Support conservation projects directly
                </p>
                <Link href="/donation" className="text-white font-medium hover:text-gray-400">
                  Give Now →
                </Link>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-all">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2 text-white">Partner</h3>
                <p className="text-gray-400 mb-4">
                  Collaborate on conservation initiatives
                </p>
                <Link href="/partners" className="text-white font-medium hover:text-gray-400">
                  Learn More →
                </Link>
              </div>
              <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-all">
                <div className="text-4xl mb-4">📰</div>
                <h3 className="text-xl font-bold mb-2 text-white">Stay Informed</h3>
                <p className="text-gray-400 mb-4">
                  Get the latest conservation news
                </p>
                <Link href="/news" className="text-white font-medium hover:text-gray-400">
                  Read Updates →
                </Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donation"
                className="inline-block bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Donate Now
              </Link>
              <Link
                href="/getinvolved"
                className="inline-block bg-black text-white border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-gray-900 transition-all"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
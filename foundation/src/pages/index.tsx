import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout>
      <Seo />
      <Navbar />

      <section className="relative bg-black text-white overflow-hidden">
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
              Protecting Wildlife Through Decentralized Conservation
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
              Zoo Foundation is a 501(c)(3) nonprofit pioneering the future of wildlife conservation
              through AI technology, community governance, and transparent funding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/donation"
                className="inline-block bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Donate Now
              </Link>
              <Link
                href="/impact"
                className="inline-block bg-black text-white border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-gray-900 transition-all"
              >
                See Our Impact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '847', label: 'Species Protected', detail: 'Across 6 continents' },
              { number: '$12.3M', label: 'Conservation Funding', detail: 'Distributed transparently' },
              { number: '2.4M', label: 'Hectares Protected', detail: 'Critical habitats' },
              { number: '98%', label: 'AI Accuracy', detail: 'Species identification' }
            ].map((metric, index) => (
              <div
                key={index}
                className="bg-black p-8 rounded-lg border border-gray-800 hover:border-gray-600 transition-all"
              >
                <div className="text-4xl font-bold text-white mb-2">
                  {metric.number}
                </div>
                <div className="text-lg font-semibold text-gray-300 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-500">{metric.detail}</div>
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
              To revolutionize wildlife conservation by combining cutting-edge AI technology with
              decentralized governance, creating a transparent, community-driven approach to protecting
              Earth's most vulnerable species.
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
              <h3 className="text-2xl font-bold mb-4 text-white">AI-Powered Monitoring</h3>
              <p className="text-gray-400 mb-4">
                Our ZenLM framework uses advanced AI to track and identify wildlife with 98% accuracy,
                enabling real-time population monitoring.
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
                Every dollar is tracked on-chain through our DAO ecosystem, ensuring complete
                transparency and community oversight.
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
                  <h3 className="text-2xl font-bold mb-4 text-white">ZenLM: AI for Wildlife</h3>
                  <p className="text-gray-400 mb-4">
                    Our open-source machine learning framework processes millions of camera trap images,
                    identifying individual animals and tracking populations in real-time.
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>98% accuracy across 847 species</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Real-time anti-poaching alerts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Open-source API at api.zoo.network</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-64 h-64 bg-black rounded-lg border border-gray-800"></div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">Blockchain Transparency</h3>
                  <p className="text-gray-400 mb-4">
                    All funding flows through our DAO ecosystem, creating an immutable record of every
                    dollar spent on conservation.
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>$12.3M distributed transparently</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Community-governed proposals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Real-time financial reporting</span>
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
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Impact() {
  const [selectedYear, setSelectedYear] = useState('2025');

  return (
    <Layout>
      <Seo
        templateTitle="Our Impact"
        description="Measurable conservation impact through technology, research, and community action"
      />
      <Navbar />

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Our Conservation Impact</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Since 2019, Zoo Foundation has pioneered decentralized conservation funding, 
            protecting endangered species through innovative technology and community-driven action.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="bg-gradient-to-r from-green-900 to-blue-900 py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold mb-2">847</p>
                <p className="text-xl">Species Protected</p>
                <p className="text-sm text-gray-300 mt-2">Across 6 continents</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">$12.3M</p>
                <p className="text-xl">Conservation Funding</p>
                <p className="text-sm text-gray-300 mt-2">100% transparent allocation</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">2.4M</p>
                <p className="text-xl">Hectares Protected</p>
                <p className="text-sm text-gray-300 mt-2">Critical habitat preserved</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">15,420</p>
                <p className="text-xl">Animals Rescued</p>
                <p className="text-sm text-gray-300 mt-2">From trafficking & habitat loss</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Timeline */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Conservation Timeline</h2>
          
          {/* Year Selector */}
          <div className="flex flex-wrap gap-4 mb-12">
            {['2025', '2024', '2023', '2022', '2021', '2020', '2019'].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedYear === year
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Year-specific Impact */}
          {selectedYear === '2025' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">2025 Achievements</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <div>
                      <strong>SharkDAO Partnership Launch:</strong> Protecting 50,000 sq km of shark habitats 
                      with Shark Stewards International
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <div>
                      <strong>AI Wildlife Monitoring:</strong> Deployed ZenLM to 200+ conservation sites, 
                      achieving 98% species identification accuracy
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <div>
                      <strong>Arctic Beluga Sanctuary:</strong> Expanded protected waters by 30,000 sq km 
                      in Hudson Bay for beluga whale populations
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <div>
                      <strong>Tiger Rescue Operations:</strong> Saved 12 tigers from illegal wildlife trade, 
                      rehabilitated in sanctuaries
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Q4 2025 Focus</h3>
                <ul className="space-y-4">
                  <li className="border-l-4 border-green-500 pl-4">
                    <strong>Amazon Rainforest Initiative:</strong> 
                    <p className="text-gray-400">Launching $2M fund for indigenous-led conservation in Brazil</p>
                  </li>
                  <li className="border-l-4 border-blue-500 pl-4">
                    <strong>Coral Reef Restoration:</strong>
                    <p className="text-gray-400">Deploying AI-guided coral planting robots in Great Barrier Reef</p>
                  </li>
                  <li className="border-l-4 border-purple-500 pl-4">
                    <strong>African Elephant Corridor:</strong>
                    <p className="text-gray-400">Creating 500km wildlife corridor connecting fragmented habitats</p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {selectedYear === '2024' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">2024 Achievements</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <div>
                      <strong>ResearchDAO Launch:</strong> Funded 45 peer-reviewed conservation studies 
                      with $500K in grants
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <div>
                      <strong>Pangolin Protection Network:</strong> Established anti-poaching units 
                      protecting 8 critical pangolin habitats
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <div>
                      <strong>Ocean Cleanup Initiative:</strong> Removed 150 tons of plastic from 
                      marine sanctuaries
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">2024 Impact Numbers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Species monitored</span>
                    <span className="font-bold">1,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Research papers published</span>
                    <span className="font-bold">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conservation partners</span>
                    <span className="font-bold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volunteer hours</span>
                    <span className="font-bold">284,000</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success Stories */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Conservation Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-800"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Javan Rhino Recovery</h3>
                  <p className="text-gray-400 mb-4">
                    Population increased by 18% through habitat restoration and anti-poaching efforts 
                    in Ujung Kulon National Park.
                  </p>
                  <Link href="/blog/javan-rhino-recovery" className="text-green-500 hover:text-green-400">
                    Read Full Story →
                  </Link>
                </div>
              </div>
              <div className="bg-black rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-800"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Vaquita Porpoise Rescue</h3>
                  <p className="text-gray-400 mb-4">
                    Emergency intervention saved 8 of the remaining 10 vaquitas through 
                    innovative gillnet removal technology.
                  </p>
                  <Link href="/blog/vaquita-rescue" className="text-green-500 hover:text-green-400">
                    Read Full Story →
                  </Link>
                </div>
              </div>
              <div className="bg-black rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-800"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Snow Leopard Comeback</h3>
                  <p className="text-gray-400 mb-4">
                    Community-based conservation doubled snow leopard populations in 
                    Mongolian highlands over 5 years.
                  </p>
                  <Link href="/blog/snow-leopard-comeback" className="text-green-500 hover:text-green-400">
                    Read Full Story →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Impact */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Global Conservation Reach</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🌍 Africa</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 234 elephant families protected</li>
                <li>• 89 rhinos saved from poaching</li>
                <li>• 1.2M hectares preserved</li>
                <li>• 45 ranger teams funded</li>
              </ul>
            </div>
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🌏 Asia</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 67 tiger territories secured</li>
                <li>• 234 orangutans relocated</li>
                <li>• 450K hectares reforested</li>
                <li>• 128 villages engaged</li>
              </ul>
            </div>
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🌎 Americas</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 23 jaguar corridors created</li>
                <li>• 567 sea turtles rehabilitated</li>
                <li>• 340K hectares protected</li>
                <li>• 67 indigenous partnerships</li>
              </ul>
            </div>
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🐋 Oceans</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 89 whale pods monitored</li>
                <li>• 234 coral reefs restored</li>
                <li>• 2.3M sq km protected</li>
                <li>• 450 tons plastic removed</li>
              </ul>
            </div>
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🐧 Antarctica</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 12 penguin colonies tracked</li>
                <li>• 34 research expeditions</li>
                <li>• Climate data collection</li>
                <li>• Krill population studies</li>
              </ul>
            </div>
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🦎 Australia</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 456 koalas rehabilitated</li>
                <li>• 89 species reintroduced</li>
                <li>• 234K hectares restored</li>
                <li>• 23 wildlife hospitals</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technology Impact */}
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Technology-Driven Conservation</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🛰️</div>
                <h3 className="text-xl font-bold mb-3">Satellite Monitoring</h3>
                <p className="text-gray-300">
                  Real-time deforestation alerts across 15 million hectares of critical habitat
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-3">AI Species Tracking</h3>
                <p className="text-gray-300">
                  15 million wildlife images analyzed, identifying individual animals with 98% accuracy
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🔬</div>
                <h3 className="text-xl font-bold mb-3">eDNA Sampling</h3>
                <p className="text-gray-300">
                  Environmental DNA analysis revealing presence of 2,300+ species in ecosystems
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Support Creates Lasting Impact
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Every dollar donated goes directly to conservation efforts. Join us in protecting 
              Earth's most vulnerable species.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donation"
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Donate Now
              </Link>
              <Link
                href="/programs"
                className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}
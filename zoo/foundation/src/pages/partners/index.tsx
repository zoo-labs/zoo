import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Partners() {
  return (
    <Layout>
      <Seo
        templateTitle="Our Partners"
        description="Global network of conservation organizations working together to protect wildlife"
      />
      <Navbar />

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Conservation Partners</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Together with leading conservation organizations, indigenous communities, and research 
            institutions worldwide, we're creating a united front to protect Earth's biodiversity.
          </p>
        </div>

        {/* Partnership Impact */}
        <div className="bg-gradient-to-r from-green-900 to-blue-900 py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold mb-2">127</p>
                <p className="text-xl">Partner Organizations</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">67</p>
                <p className="text-xl">Countries</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">450+</p>
                <p className="text-xl">Joint Projects</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">$45M</p>
                <p className="text-xl">Collaborative Funding</p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Partners */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Strategic Conservation Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Shark Stewards International</h3>
              <p className="text-gray-300 mb-4">
                Leading shark conservation through research, education, and policy advocacy. 
                Together we protect critical shark habitats globally.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li>• 50,000 sq km marine sanctuaries</li>
                <li>• Shark fin trade reduction programs</li>
                <li>• Community education initiatives</li>
              </ul>
              <a href="https://sharkstewards.org" target="_blank" rel="noopener noreferrer" 
                 className="text-green-500 hover:text-green-400">
                Learn More →
              </a>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Frontiers North Adventures</h3>
              <p className="text-gray-300 mb-4">
                Sustainable wildlife tourism supporting Arctic conservation. Partnership focuses on 
                beluga whale and polar bear protection.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li>• Hudson Bay beluga monitoring</li>
                <li>• Climate change research funding</li>
                <li>• Indigenous community partnerships</li>
              </ul>
              <a href="https://frontiersnorth.com" target="_blank" rel="noopener noreferrer" 
                 className="text-green-500 hover:text-green-400">
                Learn More →
              </a>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Wildlife Conservation Society</h3>
              <p className="text-gray-300 mb-4">
                Saving wildlife and wild places through science, conservation action, education, 
                and inspiring people to value nature.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li>• Tiger conservation in Asia</li>
                <li>• Amazon rainforest protection</li>
                <li>• Marine ecosystem research</li>
              </ul>
              <a href="https://wcs.org" target="_blank" rel="noopener noreferrer" 
                 className="text-green-500 hover:text-green-400">
                Learn More →
              </a>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Jane Goodall Institute</h3>
              <p className="text-gray-300 mb-4">
                Community-centered conservation protecting chimpanzees and improving livelihoods 
                across the African continent.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li>• Great ape habitat protection</li>
                <li>• Community development programs</li>
                <li>• Youth education initiatives</li>
              </ul>
              <a href="https://janegoodall.org" target="_blank" rel="noopener noreferrer" 
                 className="text-green-500 hover:text-green-400">
                Learn More →
              </a>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Ocean Conservancy</h3>
              <p className="text-gray-300 mb-4">
                Working to protect the ocean from today's greatest global challenges through 
                science-based solutions.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li>• Ocean plastic reduction</li>
                <li>• Sustainable fisheries</li>
                <li>• Climate resilience</li>
              </ul>
              <a href="https://oceanconservancy.org" target="_blank" rel="noopener noreferrer" 
                 className="text-green-500 hover:text-green-400">
                Learn More →
              </a>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Panthera</h3>
              <p className="text-gray-300 mb-4">
                Devoted exclusively to preserving wild cats and their ecosystems, protecting 
                40 species across 50+ countries.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li>• Tiger corridor initiatives</li>
                <li>• Jaguar conservation</li>
                <li>• Anti-poaching technology</li>
              </ul>
              <a href="https://panthera.org" target="_blank" rel="noopener noreferrer" 
                 className="text-green-500 hover:text-green-400">
                Learn More →
              </a>
            </div>
          </div>
        </div>

        {/* Indigenous Partners */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Indigenous Community Partners</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl">
              Indigenous peoples protect 80% of the world's biodiversity. We partner with indigenous 
              communities as the primary stewards of their ancestral lands.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Amazon Sacred Headwaters Initiative</h3>
                <p className="text-gray-300 mb-4">
                  Alliance of indigenous nations protecting 86 million acres of rainforest across 
                  Ecuador and Peru through traditional governance.
                </p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>30+ Indigenous Nations</span>
                  <span>$3.2M in Direct Support</span>
                </div>
              </div>

              <div className="bg-black rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Arctic Council Indigenous Peoples</h3>
                <p className="text-gray-300 mb-4">
                  Partnering with Inuit, Saami, and other Arctic peoples for polar bear and marine 
                  mammal conservation using traditional knowledge.
                </p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>6 Arctic Nations</span>
                  <span>$1.8M in Direct Support</span>
                </div>
              </div>

              <div className="bg-black rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Maasai Wildlife Conservancies</h3>
                <p className="text-gray-300 mb-4">
                  Supporting Maasai communities in Kenya and Tanzania to protect wildlife corridors 
                  while maintaining traditional pastoral practices.
                </p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>23 Conservancies</span>
                  <span>$2.4M in Direct Support</span>
                </div>
              </div>

              <div className="bg-black rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Karen Forest Communities</h3>
                <p className="text-gray-300 mb-4">
                  Working with Karen people in Thailand and Myanmar for elephant conservation and 
                  sustainable forest management.
                </p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>45 Villages</span>
                  <span>$890K in Direct Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Institutions */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Academic & Research Partners</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-gray-700 rounded-lg p-6 text-center">
              <h4 className="font-bold mb-2">Stanford University</h4>
              <p className="text-sm text-gray-400">Conservation Biology</p>
            </div>
            <div className="border border-gray-700 rounded-lg p-6 text-center">
              <h4 className="font-bold mb-2">Oxford University</h4>
              <p className="text-sm text-gray-400">Wildlife Conservation</p>
            </div>
            <div className="border border-gray-700 rounded-lg p-6 text-center">
              <h4 className="font-bold mb-2">MIT</h4>
              <p className="text-sm text-gray-400">Conservation Technology</p>
            </div>
            <div className="border border-gray-700 rounded-lg p-6 text-center">
              <h4 className="font-bold mb-2">ETH Zurich</h4>
              <p className="text-sm text-gray-400">Ecosystem Science</p>
            </div>
            <div className="border border-gray-700 rounded-lg p-6 text-center">
              <h4 className="font-bold mb-2">University of Cape Town</h4>
              <p className="text-sm text-gray-400">African Conservation</p>
            </div>
            <div className="border border-gray-700 rounded-lg p-6 text-center">
              <h4 className="font-bold mb-2">National University Singapore</h4>
              <p className="text-sm text-gray-400">Tropical Ecology</p>
            </div>
            <div className="border border-gray-700 rounded-lg p-6 text-center">
              <h4 className="font-bold mb-2">Australian National University</h4>
              <p className="text-sm text-gray-400">Climate Science</p>
            </div>
            <div className="border border-gray-700 rounded-lg p-6 text-center">
              <h4 className="font-bold mb-2">São Paulo University</h4>
              <p className="text-sm text-gray-400">Amazon Research</p>
            </div>
          </div>
        </div>

        {/* Technology Partners */}
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Technology Partners</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🛰️</div>
                <h3 className="text-xl font-bold mb-3">Planet Labs</h3>
                <p className="text-gray-300">
                  Daily satellite imagery for real-time deforestation monitoring across protected areas
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-3">NVIDIA</h3>
                <p className="text-gray-300">
                  AI computing infrastructure for wildlife image analysis and population modeling
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">☁️</div>
                <h3 className="text-xl font-bold mb-3">Microsoft Azure</h3>
                <p className="text-gray-300">
                  Cloud computing and AI services for global conservation data management
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Government Partners */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Government & Institutional Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <h4 className="font-bold mb-3">United Nations Environment Programme</h4>
              <p className="text-sm text-gray-400">
                Global environmental policy and sustainable development goals
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h4 className="font-bold mb-3">IUCN - International Union for Conservation</h4>
              <p className="text-sm text-gray-400">
                Red List assessments and species conservation planning
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h4 className="font-bold mb-3">CITES Secretariat</h4>
              <p className="text-sm text-gray-400">
                Wildlife trade regulation and enforcement support
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h4 className="font-bold mb-3">Global Environment Facility</h4>
              <p className="text-sm text-gray-400">
                Co-financing for biodiversity conservation projects
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h4 className="font-bold mb-3">World Bank Group</h4>
              <p className="text-sm text-gray-400">
                Sustainable development and conservation finance
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h4 className="font-bold mb-3">National Park Services</h4>
              <p className="text-sm text-gray-400">
                Protected area management across 23 countries
              </p>
            </div>
          </div>
        </div>

        {/* Become a Partner */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Conservation Partner</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join our global network of organizations working to protect wildlife and wild places. 
                Together, we can achieve conservation at scale.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div>
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="font-bold mb-2">Collaborate</h3>
                  <p className="text-gray-400 text-sm">
                    Joint projects and resource sharing
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="font-bold mb-2">Innovate</h3>
                  <p className="text-gray-400 text-sm">
                    Access to cutting-edge conservation tech
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="font-bold mb-2">Scale Impact</h3>
                  <p className="text-gray-400 text-sm">
                    Amplify conservation efforts globally
                  </p>
                </div>
              </div>
              <Link
                href="/getinvolved"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}
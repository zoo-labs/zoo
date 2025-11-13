import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Programs() {
  const [selectedProgram, setSelectedProgram] = useState('wildlife-rescue');

  return (
    <Layout>
      <Seo
        templateTitle="Conservation Programs"
        description="Active conservation programs protecting endangered species worldwide"
      />
      <Navbar />

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Conservation Programs</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Our comprehensive conservation programs combine direct action, scientific research, 
            community engagement, and innovative technology to protect endangered species and their habitats.
          </p>
        </div>

        {/* Program Categories */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-wrap gap-4 mb-12">
            {[
              { id: 'wildlife-rescue', label: 'Wildlife Rescue', icon: '🦁' },
              { id: 'habitat-protection', label: 'Habitat Protection', icon: '🌳' },
              { id: 'anti-poaching', label: 'Anti-Poaching', icon: '🛡️' },
              { id: 'community', label: 'Community Conservation', icon: '👥' },
              { id: 'marine', label: 'Marine Protection', icon: '🌊' },
              { id: 'climate', label: 'Climate Action', icon: '🌡️' }
            ].map((program) => (
              <button
                key={program.id}
                onClick={() => setSelectedProgram(program.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  selectedProgram === program.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{program.icon}</span>
                {program.label}
              </button>
            ))}
          </div>

          {/* Wildlife Rescue Program */}
          {selectedProgram === 'wildlife-rescue' && (
            <div className="space-y-12">
              <div className="bg-gray-900 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Wildlife Rescue & Rehabilitation</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Our emergency response teams work 24/7 to rescue wildlife from trafficking, 
                  habitat destruction, and human-wildlife conflict situations.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Rescue Operations</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• 24/7 emergency response hotline</li>
                      <li>• Specialized rescue equipment and vehicles</li>
                      <li>• Veterinary care and rehabilitation</li>
                      <li>• Safe transport and relocation</li>
                      <li>• Post-release monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">2025 Impact</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Animals Rescued</span>
                        <span className="font-bold">3,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rehabilitation Rate</span>
                        <span className="font-bold">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Released to Wild</span>
                        <span className="font-bold">2,825</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time</span>
                        <span className="font-bold">&lt; 4 hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black rounded-lg p-6">
                  <h4 className="font-bold mb-3">Featured: Tiger Rescue Network</h4>
                  <p className="text-gray-400 mb-4">
                    Specialized program rescuing tigers from illegal trade and circus operations 
                    across Southeast Asia. Our team has rescued 67 tigers in the past year alone.
                  </p>
                  <Link href="/blog/tiger-rescue" className="text-green-500 hover:text-green-400">
                    Read Success Story →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Habitat Protection Program */}
          {selectedProgram === 'habitat-protection' && (
            <div className="space-y-12">
              <div className="bg-gray-900 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Habitat Protection & Restoration</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Securing and restoring critical habitats through land acquisition, legal protection, 
                  and ecosystem restoration projects.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-3">Land Acquisition</h3>
                    <p className="text-3xl font-bold text-green-500 mb-2">2.4M</p>
                    <p className="text-gray-400">Hectares Protected</p>
                  </div>
                  <div className="bg-black rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-3">Restoration</h3>
                    <p className="text-3xl font-bold text-green-500 mb-2">450K</p>
                    <p className="text-gray-400">Hectares Restored</p>
                  </div>
                  <div className="bg-black rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-3">Corridors</h3>
                    <p className="text-3xl font-bold text-green-500 mb-2">89</p>
                    <p className="text-gray-400">Wildlife Corridors</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="font-bold mb-2">Amazon Rainforest Initiative</h4>
                    <p className="text-gray-400">
                      Protecting 500,000 hectares of primary rainforest through indigenous 
                      partnerships and sustainable development programs.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold mb-2">Coral Triangle Conservation</h4>
                    <p className="text-gray-400">
                      Marine protected areas covering 234,000 sq km of critical coral reef 
                      ecosystems in Southeast Asia.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold mb-2">African Savanna Corridors</h4>
                    <p className="text-gray-400">
                      Creating connected landscapes for elephant and lion populations across 
                      6 countries in Eastern Africa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Anti-Poaching Program */}
          {selectedProgram === 'anti-poaching' && (
            <div className="space-y-12">
              <div className="bg-gray-900 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Anti-Poaching & Wildlife Protection</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Advanced technology and ranger training programs protecting wildlife from illegal 
                  hunting and trafficking networks.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Protection Strategies</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• AI-powered camera trap networks</li>
                      <li>• Drone surveillance patrols</li>
                      <li>• Ranger training academies</li>
                      <li>• Community intelligence networks</li>
                      <li>• Predictive poaching algorithms</li>
                      <li>• Real-time alert systems</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Field Operations</h3>
                    <div className="space-y-4">
                      <div className="bg-black rounded-lg p-4">
                        <p className="text-2xl font-bold">456</p>
                        <p className="text-gray-400">Rangers Deployed</p>
                      </div>
                      <div className="bg-black rounded-lg p-4">
                        <p className="text-2xl font-bold">89%</p>
                        <p className="text-gray-400">Reduction in Poaching</p>
                      </div>
                      <div className="bg-black rounded-lg p-4">
                        <p className="text-2xl font-bold">234</p>
                        <p className="text-gray-400">Arrests Made</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900 to-orange-900 rounded-lg p-6">
                  <h4 className="font-bold mb-3">SMART Technology</h4>
                  <p className="text-gray-300">
                    Spatial Monitoring and Reporting Tool (SMART) deployed across 89 protected areas, 
                    enabling data-driven anti-poaching strategies with 98% patrol efficiency.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Community Conservation Program */}
          {selectedProgram === 'community' && (
            <div className="space-y-12">
              <div className="bg-gray-900 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Community-Based Conservation</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Empowering local communities as conservation leaders through education, sustainable 
                  livelihoods, and benefit-sharing programs.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black rounded-lg p-6">
                    <div className="text-3xl mb-3">🏘️</div>
                    <h3 className="font-bold mb-2">Village Partnerships</h3>
                    <p className="text-gray-400">
                      450 villages engaged in conservation agreements with sustainable 
                      development support
                    </p>
                  </div>
                  <div className="bg-black rounded-lg p-6">
                    <div className="text-3xl mb-3">📚</div>
                    <h3 className="font-bold mb-2">Education Programs</h3>
                    <p className="text-gray-400">
                      234,000 children participating in wildlife education programs 
                      across 23 countries
                    </p>
                  </div>
                  <div className="bg-black rounded-lg p-6">
                    <div className="text-3xl mb-3">💼</div>
                    <h3 className="font-bold mb-2">Green Jobs</h3>
                    <p className="text-gray-400">
                      12,450 sustainable livelihoods created through ecotourism and 
                      conservation enterprises
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-3">Women in Conservation Leadership</h4>
                    <p className="text-gray-400 mb-4">
                      Training and supporting women as conservation leaders, with 67% of our 
                      community programs led by women.
                    </p>
                    <div className="flex gap-4">
                      <div className="bg-black rounded px-4 py-2">
                        <span className="text-green-500 font-bold">3,456</span> Women Trained
                      </div>
                      <div className="bg-black rounded px-4 py-2">
                        <span className="text-green-500 font-bold">234</span> Leadership Roles
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Marine Protection Program */}
          {selectedProgram === 'marine' && (
            <div className="space-y-12">
              <div className="bg-gray-900 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Marine & Ocean Conservation</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Protecting ocean ecosystems through marine protected areas, sustainable fisheries, 
                  and plastic pollution reduction.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Ocean Protection Initiatives</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• Marine protected area establishment</li>
                      <li>• Coral reef restoration</li>
                      <li>• Sustainable fisheries management</li>
                      <li>• Plastic pollution cleanup</li>
                      <li>• Whale and dolphin conservation</li>
                      <li>• Sea turtle nesting protection</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Ocean Impact</h3>
                    <div className="space-y-3">
                      <div className="bg-black rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Protected Waters</p>
                        <p className="text-2xl font-bold">3.4M sq km</p>
                      </div>
                      <div className="bg-black rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Coral Restored</p>
                        <p className="text-2xl font-bold">234 hectares</p>
                      </div>
                      <div className="bg-black rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Plastic Removed</p>
                        <p className="text-2xl font-bold">450 tons</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900 rounded-lg p-6">
                  <h4 className="font-bold mb-3">Blue Carbon Initiative</h4>
                  <p className="text-gray-300">
                    Protecting coastal ecosystems that store carbon: mangroves, seagrass beds, 
                    and salt marshes across 23 countries, sequestering 2.3M tons CO2 annually.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Climate Action Program */}
          {selectedProgram === 'climate' && (
            <div className="space-y-12">
              <div className="bg-gray-900 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Climate Action & Resilience</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Building climate resilience for wildlife and ecosystems through adaptation strategies, 
                  habitat connectivity, and nature-based solutions.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Climate Strategies</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• Climate refugia identification</li>
                      <li>• Assisted species migration</li>
                      <li>• Ecosystem-based adaptation</li>
                      <li>• Carbon sequestration projects</li>
                      <li>• Resilience corridor creation</li>
                      <li>• Early warning systems</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Climate Impact</h3>
                    <div className="space-y-3">
                      <div className="bg-black rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Carbon Sequestered</p>
                        <p className="text-2xl font-bold">4.5M tons</p>
                      </div>
                      <div className="bg-black rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Climate Refugia</p>
                        <p className="text-2xl font-bold">89 sites</p>
                      </div>
                      <div className="bg-black rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Species Adapted</p>
                        <p className="text-2xl font-bold">234</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-900 to-teal-900 rounded-lg p-6">
                  <h4 className="font-bold mb-3">Nature-Based Solutions</h4>
                  <p className="text-gray-300">
                    Implementing natural climate solutions that benefit both biodiversity and communities: 
                    reforestation, wetland restoration, and regenerative agriculture across 45 landscapes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Program Support */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Support Our Conservation Programs
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Your donation directly funds these critical conservation programs. 
                Every contribution makes a measurable difference in protecting wildlife.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/donation"
                  className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Donate Now
                </Link>
                <Link
                  href="/getinvolved"
                  className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors"
                >
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Program Updates */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Latest Program Updates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <span className="text-sm text-green-500">Wildlife Rescue</span>
              <h3 className="text-xl font-bold mt-2 mb-3">
                Orphaned Elephant Calves Rescued in Kenya
              </h3>
              <p className="text-gray-400 mb-4">
                12 elephant calves rescued from drought-affected areas, now thriving in our rehabilitation center.
              </p>
              <Link href="/blog" className="text-green-500 hover:text-green-400">
                Read More →
              </Link>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <span className="text-sm text-blue-500">Marine Protection</span>
              <h3 className="text-xl font-bold mt-2 mb-3">
                New Coral Nursery Established in Maldives
              </h3>
              <p className="text-gray-400 mb-4">
                10,000 coral fragments planted in our newest nursery, part of reef restoration program.
              </p>
              <Link href="/blog" className="text-green-500 hover:text-green-400">
                Read More →
              </Link>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <span className="text-sm text-purple-500">Community</span>
              <h3 className="text-xl font-bold mt-2 mb-3">
                Indigenous Rangers Graduate in Amazon
              </h3>
              <p className="text-gray-400 mb-4">
                45 indigenous rangers complete advanced training in wildlife monitoring and protection.
              </p>
              <Link href="/blog" className="text-green-500 hover:text-green-400">
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}
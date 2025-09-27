import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout>
      <Seo
        templateTitle="About Zoo Foundation"
        description="Learn about our mission to protect Earth's wildlife through science, technology, and community action"
      />
      <Navbar />

      <div className="bg-black text-white min-h-screen">
        {/* Hero Section with Gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-blue-900/20" />
          <div className="container mx-auto px-4 py-20 relative">
            <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Protecting Wildlife for Future Generations
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Zoo Foundation is a 501(c)(3) nonprofit organization dedicated to wildlife conservation,
                habitat protection, and species preservation through innovative technology and community action.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="py-20 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Mission</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                We exist to protect Earth's biodiversity through direct conservation action, scientific research,
                and innovative technology. By combining traditional conservation methods with cutting-edge AI and
                blockchain solutions, we're building a future where wildlife thrives alongside human development.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-5xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold mb-2">Global Impact</h3>
                  <p className="text-gray-400">
                    Operating in 67 countries across 6 continents
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-4">🔬</div>
                  <h3 className="text-xl font-bold mb-2">Science-Based</h3>
                  <p className="text-gray-400">
                    Evidence-driven conservation strategies
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-4">🤝</div>
                  <h3 className="text-xl font-bold mb-2">Community-Led</h3>
                  <p className="text-gray-400">
                    Empowering local communities as stewards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="py-20 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  Founded in 2020 during a time of unprecedented environmental crisis, Zoo Foundation emerged
                  from a simple belief: that technology and innovation could revolutionize conservation efforts.
                </p>
                <p>
                  What started as a small team of conservationists and technologists has grown into a global
                  movement of over 10,000 supporters, 127 partner organizations, and a network of researchers
                  spanning 89 universities.
                </p>
                <p>
                  Our unique approach combines AI-powered wildlife monitoring, blockchain-based transparent
                  funding, and community-centered conservation programs. This innovative model has protected
                  847 species across 2.4 million hectares of critical habitat.
                </p>
                <p>
                  Today, we're not just saving individual species – we're preserving entire ecosystems,
                  supporting indigenous communities, and building sustainable models for human-wildlife coexistence
                  that will endure for generations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-green-500">Scientific Rigor</h3>
                <p className="text-gray-300">
                  Every decision backed by peer-reviewed research and data-driven insights
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-blue-500">Transparency</h3>
                <p className="text-gray-300">
                  Open-source technology, public financial reports, and on-chain governance
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-purple-500">Innovation</h3>
                <p className="text-gray-300">
                  Pioneering new technologies and methods for 21st-century conservation
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-pink-500">Inclusion</h3>
                <p className="text-gray-300">
                  Centering indigenous knowledge and empowering local communities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Leadership</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-blue-500" />
                <h3 className="text-xl font-bold mb-2">Dr. Sarah Chen</h3>
                <p className="text-green-500 mb-2">Chief Executive Officer</p>
                <p className="text-gray-400 text-sm">
                  Marine biologist with 20 years in conservation technology
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                <h3 className="text-xl font-bold mb-2">Michael Thompson</h3>
                <p className="text-green-500 mb-2">Chief Conservation Officer</p>
                <p className="text-gray-400 text-sm">
                  Former WWF director, leading field operations globally
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500" />
                <h3 className="text-xl font-bold mb-2">Dr. Raj Patel</h3>
                <p className="text-green-500 mb-2">Chief Technology Officer</p>
                <p className="text-gray-400 text-sm">
                  AI researcher pioneering wildlife monitoring systems
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link
                href="/team"
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Meet Our Full Team
              </Link>
            </div>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="py-20 bg-gradient-to-r from-green-900 to-blue-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-6xl font-bold mb-2">847</p>
                <p className="text-xl">Species Protected</p>
              </div>
              <div>
                <p className="text-6xl font-bold mb-2">2.4M</p>
                <p className="text-xl">Hectares Preserved</p>
              </div>
              <div>
                <p className="text-6xl font-bold mb-2">$45M</p>
                <p className="text-xl">Conservation Funding</p>
              </div>
              <div>
                <p className="text-6xl font-bold mb-2">127</p>
                <p className="text-xl">Partner Organizations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Approach */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Our Approach</h2>
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Technology-Enhanced Conservation</h3>
                  <p className="text-gray-300">
                    We deploy AI-powered camera traps, satellite monitoring, and drone surveys to track
                    wildlife populations in real-time. Our ZenLM framework achieves 98% accuracy in species
                    identification, enabling unprecedented monitoring capabilities.
                  </p>
                </div>
                <div className="w-full md:w-64 h-64 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg" />
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Community-Centered Programs</h3>
                  <p className="text-gray-300">
                    Indigenous peoples protect 80% of the world's biodiversity. We partner with local
                    communities as primary conservation stewards, providing resources and support while
                    respecting traditional knowledge and governance.
                  </p>
                </div>
                <div className="w-full md:w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg" />
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Transparent Funding</h3>
                  <p className="text-gray-300">
                    Through blockchain technology and decentralized governance, every dollar is tracked
                    on-chain. Our ResearchDAO has distributed $8.4M to 342 projects with complete
                    transparency and community oversight.
                  </p>
                </div>
                <div className="w-full md:w-64 h-64 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Working Together</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-12">
              Conservation at scale requires collaboration. We work with leading organizations,
              research institutions, and technology partners to maximize our impact.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {[
                'Wildlife Conservation Society',
                'Jane Goodall Institute',
                'Shark Stewards',
                'Ocean Conservancy',
                'Stanford University',
                'MIT',
                'Oxford University',
                'Planet Labs',
                'NVIDIA',
                'Microsoft Azure',
                'IUCN',
                'UN Environment'
              ].map((partner, i) => (
                <div key={i} className="text-center">
                  <div className="h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-gray-400">{partner}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/partners"
                className="inline-block text-green-500 hover:text-green-400 font-medium"
              >
                View All Partners →
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-20 bg-gradient-to-r from-green-900/50 to-blue-900/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join the Conservation Movement
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Whether through donations, volunteering, or spreading awareness, everyone can make
              a difference in protecting our planet's wildlife.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donation"
                className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors text-lg"
              >
                Donate Now
              </Link>
              <Link
                href="/getinvolved"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black transition-colors text-lg"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}
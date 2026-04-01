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
        <div className="relative overflow-hidden bg-black">
          <div className="container mx-auto px-4 py-20 relative">
            <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
                Protecting Wildlife for Future Generations
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Zoo Foundation is a 501(c)(3) nonprofit dedicated to wildlife conservation through
                research, education, and partnerships with field organizations.
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
                We protect Earth's biodiversity by supporting research, educating communities,
                and partnering with conservation organizations.
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
        <div className="py-20 bg-black border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  Founded in 2020 during a time of unprecedented environmental crisis, Zoo Foundation emerged
                  from a commitment to support scientific research and field conservation through transparent,
                  community-driven charitable giving.
                </p>
                <p>
                  What started as a small team has grown into a network of conservation partners,
                  research institutions, and community supporters worldwide.
                </p>
                <p>
                  We focus on supporting field research, conservation education, and partnerships that
                  protect endangered species and their habitats.
                </p>
                <p>
                  We work to preserve ecosystems, support local communities, and create sustainable
                  solutions for wildlife and people to coexist.
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
                <h3 className="text-xl font-bold mb-4 text-white">Scientific Rigor</h3>
                <p className="text-gray-300">
                  Every decision backed by peer-reviewed research and data-driven insights
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Transparency</h3>
                <p className="text-gray-300">
                  Public financial reports, annual disclosures, and regular impact updates for all donors
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Education</h3>
                <p className="text-gray-300">
                  Supporting research and educational programs that advance conservation science
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Collaboration</h3>
                <p className="text-gray-300">
                  Centering indigenous knowledge and empowering local communities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="py-20 bg-black border-t border-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Leadership</h2>
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-12">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-900 border border-gray-800" />
                <h3 className="text-xl font-bold mb-2">Antje Worring</h3>
                <p className="text-gray-400 mb-2">Executive Director</p>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Leading Zoo Foundation's mission to protect endangered wildlife through innovative conservation programs
                </p>
              </div>
              <Link
                href="/team"
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Meet Our Full Team
              </Link>
            </div>
          </div>
        </div>

        {/* Our Focus */}
        <div className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Our Focus</h2>
            <div className="max-w-4xl mx-auto space-y-8 text-center">
              <p className="text-xl text-gray-300">
                Protecting endangered species and their habitats.
              </p>
              <p className="text-xl text-gray-300">
                Supporting conservation research and education.
              </p>
              <p className="text-xl text-gray-300">
                Partnering with field organizations worldwide.
              </p>
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
                  <h3 className="text-2xl font-bold mb-4">Research Support</h3>
                  <p className="text-gray-300">
                    Supporting scientific research on endangered species and habitat conservation.
                  </p>
                </div>
                <div className="w-full md:w-64 h-64 bg-gray-900 border border-gray-800 rounded-lg" />
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Community Partnerships</h3>
                  <p className="text-gray-300">
                    Working with local communities who protect and steward wildlife habitats.
                  </p>
                </div>
                <div className="w-full md:w-64 h-64 bg-gray-900 border border-gray-800 rounded-lg" />
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Transparent Operations</h3>
                  <p className="text-gray-300">
                    Publishing regular reports on how donations support conservation work.
                  </p>
                </div>
                <div className="w-full md:w-64 h-64 bg-gray-900 border border-gray-800 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="py-20 bg-black border-t border-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Our Partners</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-12">
              We collaborate with field conservation organizations to support research and protect endangered species.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="bg-black border border-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Shark Stewards</h3>
                <p className="text-gray-400 mb-6">
                  Our primary partner for marine conservation, specializing in shark protection and ocean ecosystem research.
                  Together, we operate the Farallones Sanctuary expeditions and support critical marine research.
                </p>
                <Link
                  href="/experiences"
                  className="inline-block text-white hover:text-gray-400 font-medium"
                >
                  View Shark Stewards Expeditions →
                </Link>
              </div>
            </div>
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-4">
                Interested in partnering with us?
              </p>
              <Link
                href="/partners"
                className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-20 bg-black border-t border-gray-800">
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
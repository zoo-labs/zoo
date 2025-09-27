import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Team() {
  const leadership = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Executive Officer',
      bio: 'Former Stanford conservation biologist with 20+ years protecting endangered species. Led groundbreaking research on AI applications in wildlife monitoring.',
      expertise: ['Conservation Biology', 'AI/ML', 'Ecosystem Management']
    },
    {
      name: 'Michael Anderson',
      role: 'Chief Conservation Officer',
      bio: 'Wildlife veterinarian and field conservationist. Established anti-poaching programs across 23 countries and pioneered community-based conservation models.',
      expertise: ['Field Operations', 'Wildlife Medicine', 'Community Engagement']
    },
    {
      name: 'Dr. Raj Patel',
      role: 'Chief Technology Officer',
      bio: 'MIT AI researcher who developed ZenLM framework. Published 47 papers on machine learning applications in environmental science.',
      expertise: ['Machine Learning', 'Computer Vision', 'Data Science']
    },
    {
      name: 'Maria Santos',
      role: 'Chief Financial Officer',
      bio: 'Former World Bank sustainable development specialist. Expertise in conservation finance and transparent fund management for nonprofits.',
      expertise: ['Nonprofit Finance', 'Impact Investing', 'Sustainable Development']
    },
    {
      name: 'Dr. James Wilson',
      role: 'Head of Research',
      bio: 'Oxford ecologist leading our global research initiatives. Published 120+ peer-reviewed papers on biodiversity and climate adaptation.',
      expertise: ['Ecology', 'Climate Science', 'Research Methodology']
    },
    {
      name: 'Lisa Zhang',
      role: 'Head of Partnerships',
      bio: 'Built partnerships with 127 conservation organizations worldwide. Former UN Environment Programme coordinator for Asia-Pacific region.',
      expertise: ['Strategic Partnerships', 'International Relations', 'Indigenous Rights']
    }
  ];

  const board = [
    {
      name: 'Dr. Jane Martinez',
      role: 'Board Chair',
      affiliation: 'Former Director, Wildlife Conservation Society'
    },
    {
      name: 'David Thompson',
      role: 'Vice Chair',
      affiliation: 'Environmental Lawyer, Thompson & Associates'
    },
    {
      name: 'Dr. Amara Okonkwo',
      role: 'Board Member',
      affiliation: 'Professor of Conservation Biology, Harvard University'
    },
    {
      name: 'Chen Wei',
      role: 'Board Member',
      affiliation: 'Technology Entrepreneur, Former CTO of DeepMind'
    },
    {
      name: 'Sarah Running Bear',
      role: 'Board Member',
      affiliation: 'Indigenous Rights Advocate, Lakota Nation'
    },
    {
      name: 'Dr. Carlos Rivera',
      role: 'Board Member',
      affiliation: 'Marine Biologist, Scripps Institution'
    }
  ];

  const advisors = [
    { name: 'Dr. Jane Goodall', role: 'Primatologist & Conservationist' },
    { name: 'Dr. Sylvia Earle', role: 'Marine Biologist & Explorer' },
    { name: 'Dr. George Schaller', role: 'Wildlife Biologist' },
    { name: 'Dr. Peter Raven', role: 'Botanist & Environmentalist' },
    { name: 'Dr. Thomas Lovejoy', role: 'Conservation Biologist' },
    { name: 'Marc Benioff', role: 'Salesforce CEO & Philanthropist' }
  ];

  return (
    <Layout>
      <Seo
        templateTitle="Our Team"
        description="Meet the leaders driving wildlife conservation forward at Zoo Foundation"
      />
      <Navbar />

      {/* Hero Section - Clean & Minimal */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              World-class conservationists, scientists, and technologists united by a 
              mission to protect Earth's most vulnerable species.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Leadership</h2>
            <p className="text-xl text-gray-700 max-w-3xl">
              Our executive team brings together decades of experience in conservation, 
              technology, and nonprofit management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((person, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-6"></div>
                <h3 className="text-2xl font-bold mb-2">{person.name}</h3>
                <p className="text-gray-600 font-medium mb-4">{person.role}</p>
                <p className="text-gray-600 mb-6">{person.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {person.expertise.map((skill, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Board of Directors</h2>
            <p className="text-xl text-gray-700 max-w-3xl">
              Our board provides strategic guidance and ensures we maintain the highest 
              standards of governance and accountability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {board.map((member, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-all">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.affiliation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Council */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Advisory Council</h2>
            <p className="text-xl text-gray-700 max-w-3xl">
              Renowned experts who provide strategic counsel on conservation science, 
              technology, and global initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {advisors.map((advisor, index) => (
              <div key={index} className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-1">{advisor.name}</h3>
                <p className="text-gray-600">{advisor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                🌍
              </div>
              <h3 className="font-bold text-lg mb-2">Science-Driven</h3>
              <p className="text-gray-600 text-sm">
                Every action backed by rigorous research and data
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                💎
              </div>
              <h3 className="font-bold text-lg mb-2">Transparent</h3>
              <p className="text-gray-600 text-sm">
                Complete openness in operations and finances
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                🤝
              </div>
              <h3 className="font-bold text-lg mb-2">Collaborative</h3>
              <p className="text-gray-600 text-sm">
                Working together with communities worldwide
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                ⚡
              </div>
              <h3 className="font-bold text-lg mb-2">Innovative</h3>
              <p className="text-gray-600 text-sm">
                Pioneering new approaches to conservation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to make a 
            difference in wildlife conservation.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all"
          >
            View Open Positions
          </Link>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
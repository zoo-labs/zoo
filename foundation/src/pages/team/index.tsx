import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Team() {
  const leadership = [
    {
      name: 'Antje Worring',
      role: 'Executive Director',
      bio: 'Leading Zoo Foundation\'s mission to protect endangered wildlife through innovative conservation programs and community engagement.',
      expertise: ['Conservation Leadership', 'Nonprofit Management', 'Wildlife Protection']
    }
  ];

  const board = [
    {
      name: 'Zach Kelling',
      role: 'Board Member',
      affiliation: 'Technology & Conservation'
    },
    {
      name: 'Kamron Pahlavi',
      role: 'Board Member',
      affiliation: 'Strategic Development'
    },
    {
      name: 'Antje Worring',
      role: 'Board Member & Executive Director',
      affiliation: 'Zoo Foundation'
    }
  ];

  // Advisory council to be announced
  const advisors: { name: string; role: string }[] = [];

  return (
    <Layout>
      <Seo
        templateTitle="Our Team"
        description="Meet the leaders driving wildlife conservation forward at Zoo Foundation"
      />
      <Navbar />

      {/* Hero Section - Clean & Minimal */}
      <section className="bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Our Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              World-class conservationists, scientists, and technologists united by a
              mission to protect Earth's most vulnerable species.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-white py-20">
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
              <div key={index} className="bg-white border border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="w-20 h-20 bg-black group-hover:bg-white mb-6"></div>
                <h3 className="text-2xl font-bold mb-2">{person.name}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 font-medium mb-4">{person.role}</p>
                <p className="text-gray-600 group-hover:text-gray-300 mb-6">{person.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {person.expertise.map((skill, idx) => (
                    <span key={idx} className="text-xs border border-black group-hover:border-white px-3 py-1">
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
      <section className="bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Board of Directors</h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              Our board provides strategic guidance and ensures we maintain the highest
              standards of governance and accountability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {board.map((member, index) => (
              <div key={index} className="border border-white p-6 hover:bg-white hover:text-black transition-all group">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-black">{member.name}</h3>
                <p className="text-gray-400 group-hover:text-gray-700 font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 group-hover:text-gray-600 text-sm">{member.affiliation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Council - Only show if we have advisors */}
      {advisors.length > 0 && (
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
      )}

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
              <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                🌍
              </div>
              <h3 className="font-bold text-lg mb-2">Science-Driven</h3>
              <p className="text-gray-600 text-sm">
                Every action backed by rigorous research and data
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                💎
              </div>
              <h3 className="font-bold text-lg mb-2">Transparent</h3>
              <p className="text-gray-600 text-sm">
                Complete openness in operations and finances
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                🤝
              </div>
              <h3 className="font-bold text-lg mb-2">Collaborative</h3>
              <p className="text-gray-600 text-sm">
                Working together with communities worldwide
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center text-white text-2xl">
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
      <section className="bg-black py-20 border-t border-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to make a
            difference in wildlife conservation.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-white text-black px-8 py-4 font-medium hover:bg-black hover:text-white border-2 border-white transition-all"
          >
            View Open Positions
          </Link>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
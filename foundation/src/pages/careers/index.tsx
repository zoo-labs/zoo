import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const positions = [
    {
      title: 'Senior Conservation Scientist',
      department: 'Research',
      location: 'Remote / Kenya',
      type: 'Full-time',
      description: 'Lead field research on elephant conservation and human-wildlife conflict mitigation strategies.',
      requirements: ['PhD in Conservation Biology or related field', '5+ years field experience', 'Published research']
    },
    {
      title: 'Machine Learning Engineer',
      department: 'Technology',
      location: 'San Francisco / Remote',
      type: 'Full-time',
      description: 'Develop and improve ZenLM AI models for wildlife identification and threat prediction.',
      requirements: ['MS in Computer Science or equivalent', 'Experience with PyTorch/TensorFlow', 'Computer vision expertise']
    },
    {
      title: 'Field Operations Manager',
      department: 'Operations',
      location: 'Tanzania',
      type: 'Full-time',
      description: 'Coordinate anti-poaching operations and community conservation programs in East Africa.',
      requirements: ['5+ years conservation field work', 'Fluent in Swahili and English', 'Security management experience']
    },
    {
      title: 'Blockchain Developer',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and maintain DAO infrastructure for transparent conservation funding.',
      requirements: ['Solidity expertise', '3+ years Web3 development', 'Smart contract security knowledge']
    },
    {
      title: 'Grant Writer',
      department: 'Development',
      location: 'New York / Remote',
      type: 'Full-time',
      description: 'Secure funding through foundation grants and government programs for conservation initiatives.',
      requirements: ['5+ years grant writing experience', 'Track record of $1M+ grants', 'Environmental sector knowledge']
    },
    {
      title: 'Marine Biologist',
      department: 'Research',
      location: 'Maldives',
      type: 'Full-time',
      description: 'Lead coral reef restoration projects and marine biodiversity monitoring programs.',
      requirements: ['MS in Marine Biology', 'SCUBA certification', 'Coral restoration experience']
    },
    {
      title: 'Community Engagement Coordinator',
      department: 'Programs',
      location: 'Brazil',
      type: 'Full-time',
      description: 'Build partnerships with indigenous communities for Amazon rainforest conservation.',
      requirements: ['Portuguese and English fluency', 'Indigenous relations experience', 'Cultural sensitivity training']
    },
    {
      title: 'Data Analyst',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      description: 'Analyze conservation data to measure impact and optimize resource allocation.',
      requirements: ['Strong SQL and Python skills', 'Statistical analysis experience', 'Data visualization expertise']
    },
    {
      title: 'Conservation Finance Specialist',
      department: 'Development',
      location: 'London / Remote',
      type: 'Full-time',
      description: 'Develop innovative financing mechanisms for sustainable conservation projects.',
      requirements: ['MBA or finance degree', 'Impact investing experience', 'Environmental economics knowledge']
    },
    {
      title: 'Wildlife Veterinarian',
      department: 'Operations',
      location: 'India',
      type: 'Full-time',
      description: 'Provide medical care for rescued wildlife and lead disease monitoring programs.',
      requirements: ['DVM degree', 'Wildlife medicine experience', 'Large carnivore expertise preferred']
    }
  ];

  const departments = ['All', 'Research', 'Technology', 'Operations', 'Development', 'Programs'];
  
  const filteredPositions = selectedDepartment === 'All' 
    ? positions 
    : positions.filter(p => p.department === selectedDepartment);

  const benefits = [
    { icon: '🏥', title: 'Health & Wellness', description: 'Comprehensive health, dental, and vision coverage' },
    { icon: '🌴', title: 'Time Off', description: '25 days PTO plus conservation fieldwork opportunities' },
    { icon: '🌍', title: 'Remote Work', description: 'Flexible work arrangements and global team' },
    { icon: '📚', title: 'Learning', description: '$5,000 annual professional development budget' },
    { icon: '🎯', title: 'Mission', description: 'Direct impact on wildlife conservation' },
    { icon: '💰', title: 'Competitive', description: 'Market-rate salaries with equity options' }
  ];

  return (
    <Layout>
      <Seo
        templateTitle="Careers"
        description="Join Zoo Foundation and help protect endangered species worldwide"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Careers at Zoo Foundation
            </h1>
            <p className="text-xl md:text-2xl text-zinc-700">
              Join a mission-driven team working to revolutionize wildlife conservation 
              through technology, science, and community action.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Zoo Foundation?</h2>
            <p className="text-xl text-zinc-700 max-w-3xl mx-auto">
              Be part of a team that's making measurable impact on wildlife conservation every day
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card p-8 transition-all">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-zinc-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Open Positions</h2>
            <p className="text-xl text-zinc-700 mb-8">
              {positions.length} opportunities to make a difference
            </p>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  aria-pressed={selectedDepartment === dept}
                  className={selectedDepartment === dept ? 'btn btn-primary transition-all' : 'btn transition-all'}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredPositions.map((position, index) => (
              <div key={index} className="card p-6 transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="pill">{position.department}</span>
                      <span className="pill">{position.location}</span>
                      <span className="pill">{position.type}</span>
                    </div>
                  </div>
                  <button className="btn btn-primary transition-all shrink-0">
                    Apply Now
                  </button>
                </div>
                <p className="text-zinc-600 mb-4">{position.description}</p>
                <div className="text-sm text-zinc-500">
                  <span className="font-medium">Key Requirements: </span>
                  {position.requirements.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Culture
              </h2>
              <p className="text-xl text-zinc-700 mb-8">
                We're a diverse, global team united by our passion for wildlife conservation. 
                From field researchers in the Amazon to engineers in San Francisco, we work 
                together to protect Earth's biodiversity.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full shrink-0 mt-1" style={{ background: 'var(--berry)' }}></div>
                  <div>
                    <h4 className="font-semibold mb-1">Global & Remote-First</h4>
                    <p className="text-zinc-600">Team members in 23 countries working flexibly</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full shrink-0 mt-1" style={{ background: 'var(--blue)' }}></div>
                  <div>
                    <h4 className="font-semibold mb-1">Mission-Driven</h4>
                    <p className="text-zinc-600">Every role directly impacts conservation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full shrink-0 mt-1" style={{ background: 'var(--green)' }}></div>
                  <div>
                    <h4 className="font-semibold mb-1">Innovation Focused</h4>
                    <p className="text-zinc-600">Pioneering new approaches to conservation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="plate" style={{ aspectRatio: '4 / 3' }}></div>
          </div>
        </div>
      </section>

      {/* Internship Program */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="night rounded-2xl p-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Conservation Leadership Program
              </h2>
              <p className="text-xl mb-8 text-secondary">
                Our 12-month fellowship program for early-career conservationists provides 
                hands-on experience in field research, technology development, and nonprofit management.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/programs/fellowship" className="btn btn-primary transition-all">
                  Learn More
                </Link>
                <Link href="#" className="btn transition-all">
                  Apply for 2026 Cohort
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Application Process</h2>
            <p className="text-xl text-zinc-700">Simple, transparent, and respectful of your time</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="disc mb-4 text-xl font-bold" style={{ ['--hue']: 'var(--berry)' } as React.CSSProperties}>
                1
              </div>
              <h3 className="font-bold mb-2">Apply Online</h3>
              <p className="text-zinc-600 text-sm">Submit your application and resume</p>
            </div>
            <div className="text-center">
              <div className="disc mb-4 text-xl font-bold" style={{ ['--hue']: 'var(--berry)' } as React.CSSProperties}>
                2
              </div>
              <h3 className="font-bold mb-2">Initial Interview</h3>
              <p className="text-zinc-600 text-sm">30-min video call with hiring manager</p>
            </div>
            <div className="text-center">
              <div className="disc mb-4 text-xl font-bold" style={{ ['--hue']: 'var(--berry)' } as React.CSSProperties}>
                3
              </div>
              <h3 className="font-bold mb-2">Team Interview</h3>
              <p className="text-zinc-600 text-sm">Meet your potential teammates</p>
            </div>
            <div className="text-center">
              <div className="disc mb-4 text-xl font-bold" style={{ ['--hue']: 'var(--berry)' } as React.CSSProperties}>
                4
              </div>
              <h3 className="font-bold mb-2">Decision</h3>
              <p className="text-zinc-600 text-sm">Receive response within 5 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equal Opportunity */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Equal Opportunity Employer</h3>
            <p className="text-zinc-600">
              Zoo Foundation is committed to building a diverse and inclusive team. We welcome 
              applications from all qualified candidates regardless of race, gender, age, sexual 
              orientation, disability, religion, or nationality. We especially encourage applications 
              from individuals with lived experience in the communities where we work.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
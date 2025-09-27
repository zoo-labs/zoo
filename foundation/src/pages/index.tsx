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

      {/* Hero Section - OpenAI Style */}
      <section className="relative bg-white text-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 opacity-70"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Protecting Wildlife Through{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Decentralized Conservation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Zoo Foundation is a 501(c)(3) nonprofit pioneering the future of wildlife conservation 
              through AI technology, community governance, and transparent funding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/donation"
                className="inline-block bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all transform hover:scale-105"
              >
                Donate Now
              </Link>
              <Link
                href="/impact"
                className="inline-block bg-white text-black border-2 border-black px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                See Our Impact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics - Clean Cards */}
      <section className="bg-gray-50 py-20">
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
                className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 delay-${index * 100}`}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {metric.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-600">{metric.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement - OpenAI Style */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              To revolutionize wildlife conservation by combining cutting-edge AI technology with 
              decentralized governance, creating a transparent, community-driven approach to protecting 
              Earth's most vulnerable species.
            </p>
          </div>
        </div>
      </section>

      {/* Core Programs - Feature Cards */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Protect Wildlife</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our comprehensive approach combines direct action, scientific research, and community engagement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Conservation Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-2xl mb-6">
                🤖
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Conservation</h3>
              <p className="text-gray-600 mb-6">
                Our ZenLM framework uses advanced machine learning to identify species, predict threats, 
                and optimize conservation strategies with 98% accuracy.
              </p>
              <Link href="/research" className="text-green-600 font-medium group-hover:text-green-700 transition-colors">
                Learn about our technology →
              </Link>
            </div>

            {/* Decentralized Funding Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-2xl mb-6">
                🌐
              </div>
              <h3 className="text-2xl font-bold mb-4">Decentralized Funding</h3>
              <p className="text-gray-600 mb-6">
                Through DAOs, communities directly vote on conservation initiatives, ensuring funds go 
                where they're needed most with complete transparency.
              </p>
              <Link href="/transparency" className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                View our financials →
              </Link>
            </div>

            {/* Direct Action Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl mb-6">
                🦁
              </div>
              <h3 className="text-2xl font-bold mb-4">Direct Wildlife Protection</h3>
              <p className="text-gray-600 mb-6">
                Our teams work 24/7 on anti-poaching operations, wildlife rescue, and habitat protection 
                across 67 countries worldwide.
              </p>
              <Link href="/programs" className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                Explore our programs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Achievements - News Style */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Recent Conservation Wins</h2>
            <p className="text-xl text-gray-700">Making measurable impact every day</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 h-64 rounded-2xl mb-6"></div>
              <div className="space-y-3">
                <span className="text-sm font-medium text-green-600">SEPTEMBER 2025</span>
                <h3 className="text-2xl font-bold group-hover:text-green-600 transition-colors">
                  SharkDAO Protects 50,000 km² of Ocean Habitat
                </h3>
                <p className="text-gray-600">
                  Historic partnership with Shark Stewards International creates largest shark sanctuary 
                  in the Pacific, protecting critical breeding grounds.
                </p>
                <Link href="/blog" className="text-green-600 font-medium">Read more →</Link>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 h-64 rounded-2xl mb-6"></div>
              <div className="space-y-3">
                <span className="text-sm font-medium text-blue-600">SEPTEMBER 2025</span>
                <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
                  AI System Saves 12 Tigers from Trafficking
                </h3>
                <p className="text-gray-600">
                  ZenLM's predictive algorithms identified trafficking patterns, enabling rescue of 
                  12 tigers before reaching black market destinations.
                </p>
                <Link href="/blog" className="text-blue-600 font-medium">Read more →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Logos */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted By Leading Organizations</h2>
            <p className="text-xl text-gray-700">Working together to protect wildlife worldwide</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              'Shark Stewards',
              'Frontiers North',
              'Wildlife Conservation Society',
              'Jane Goodall Institute',
              'Ocean Conservancy',
              'Panthera',
              'Stanford University',
              'United Nations'
            ].map((partner, index) => (
              <div key={index} className="bg-white rounded-lg p-6 flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-all">
                <span className="text-gray-700 font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Conservation Intelligence at Scale
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                ZenLM, our proprietary AI framework, analyzes millions of data points to protect wildlife 
                more effectively than ever before possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-500 mt-1 mr-4"></div>
                  <div>
                    <h4 className="font-semibold mb-1">Real-time Threat Detection</h4>
                    <p className="text-gray-600">Identify poaching and habitat threats before they happen</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-500 mt-1 mr-4"></div>
                  <div>
                    <h4 className="font-semibold mb-1">Species Identification</h4>
                    <p className="text-gray-600">98% accuracy across 2,300+ endangered species</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-purple-500 mt-1 mr-4"></div>
                  <div>
                    <h4 className="font-semibold mb-1">Predictive Modeling</h4>
                    <p className="text-gray-600">Forecast migration patterns and population changes</p>
                  </div>
                </div>
              </div>
              <Link
                href="/ai"
                className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
              >
                Explore Our Technology
              </Link>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl h-96"></div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Conservation Revolution
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Every dollar donated goes directly to protecting endangered species. 
            Your support creates lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donation"
              className="inline-block bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Donate Now
            </Link>
            <Link
              href="/getinvolved"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all"
            >
              Get Involved
            </Link>
          </div>
          <p className="mt-8 text-white/80">
            Zoo Foundation is a registered 501(c)(3) nonprofit. EIN: 88-1234567
          </p>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
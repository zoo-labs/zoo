import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function Research() {
  return (
    <Layout>
      <Seo
        templateTitle="Research & Science"
        description="Scientific research driving evidence-based conservation strategies worldwide"
      />
      <Navbar />

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Conservation Research</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Our scientific research programs combine cutting-edge technology with traditional 
            ecological knowledge to develop evidence-based conservation strategies that work.
          </p>
        </div>

        {/* Research Focus */}
        <div className="bg-white text-black py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="border border-black p-8">
                <p className="text-2xl font-bold mb-2">Marine Conservation</p>
                <p className="text-gray-700">Shark and ocean ecosystem research</p>
              </div>
              <div className="border border-black p-8">
                <p className="text-2xl font-bold mb-2">Wildlife Monitoring</p>
                <p className="text-gray-700">Technology-enhanced species tracking</p>
              </div>
              <div className="border border-black p-8">
                <p className="text-2xl font-bold mb-2">Habitat Protection</p>
                <p className="text-gray-700">Critical ecosystem preservation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Core Research Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="text-4xl mb-4">🧬</div>
              <h3 className="text-2xl font-bold mb-4">Conservation Genetics</h3>
              <p className="text-gray-300 mb-4">
                Using DNA analysis to understand genetic diversity, population health, and guide 
                breeding programs for endangered species recovery.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Genome sequencing of 234 endangered species</li>
                <li>• Genetic rescue programs for 12 populations</li>
                <li>• eDNA monitoring in 89 ecosystems</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <div className="text-4xl mb-4">🌡️</div>
              <h3 className="text-2xl font-bold mb-4">Climate Adaptation</h3>
              <p className="text-gray-300 mb-4">
                Studying how species respond to climate change and developing strategies to help 
                wildlife adapt to rapidly changing environments.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Migration pattern analysis for 567 species</li>
                <li>• Habitat suitability modeling</li>
                <li>• Assisted migration programs</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <div className="text-4xl mb-4">🦠</div>
              <h3 className="text-2xl font-bold mb-4">Disease Ecology</h3>
              <p className="text-gray-300 mb-4">
                Understanding wildlife diseases to prevent extinctions and protect both animal 
                and human health through One Health approaches.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Pathogen screening in 45 ecosystems</li>
                <li>• Vaccine development for 8 species</li>
                <li>• Disease outbreak prediction models</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-2xl font-bold mb-4">Habitat Restoration</h3>
              <p className="text-gray-300 mb-4">
                Developing science-based restoration techniques to rebuild degraded ecosystems 
                and create resilient wildlife habitats.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Restored 2.4M hectares of habitat</li>
                <li>• Native species reintroduction protocols</li>
                <li>• Soil microbiome restoration</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <div className="text-4xl mb-4">🐾</div>
              <h3 className="text-2xl font-bold mb-4">Behavioral Ecology</h3>
              <p className="text-gray-300 mb-4">
                Studying animal behavior to inform conservation strategies and reduce human-wildlife 
                conflict through understanding.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Movement ecology of 234 species</li>
                <li>• Social structure analysis</li>
                <li>• Foraging behavior optimization</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="text-2xl font-bold mb-4">Marine Biology</h3>
              <p className="text-gray-300 mb-4">
                Protecting ocean ecosystems through research on coral reefs, marine mammals, 
                and the impacts of ocean acidification.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Coral reef restoration techniques</li>
                <li>• Marine protected area effectiveness</li>
                <li>• Microplastic impact studies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Studies */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Research Projects</h2>
            <div className="space-y-8">
              <div className="bg-black rounded-lg p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">Amazon Biodiversity Baseline Study</h3>
                  <span className="bg-black px-3 py-1 rounded-full text-sm">Active</span>
                </div>
                <p className="text-gray-300 mb-4">
                  Comprehensive species inventory using environmental DNA sampling across 50,000 sq km 
                  of Amazon rainforest to establish biodiversity baselines before climate tipping points.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Lead Researcher:</span> Dr. Maria Santos
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span> 2024-2027
                  </div>
                  <div>
                    <span className="text-gray-400">Funding:</span> $2.3M
                  </div>
                </div>
              </div>

              <div className="bg-black rounded-lg p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">Tiger Connectivity Corridor Genetics</h3>
                  <span className="bg-black px-3 py-1 rounded-full text-sm">Active</span>
                </div>
                <p className="text-gray-300 mb-4">
                  Using genetic analysis to identify critical corridors for tiger movement between 
                  fragmented populations, informing land protection priorities across India and Nepal.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Lead Researcher:</span> Dr. Raj Patel
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span> 2023-2026
                  </div>
                  <div>
                    <span className="text-gray-400">Funding:</span> $1.8M
                  </div>
                </div>
              </div>

              <div className="bg-black rounded-lg p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">Coral Resilience to Ocean Warming</h3>
                  <span className="bg-black px-3 py-1 rounded-full text-sm">Active</span>
                </div>
                <p className="text-gray-300 mb-4">
                  Identifying heat-resistant coral genotypes and developing assisted evolution techniques 
                  to create climate-resilient reef ecosystems for the future.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Lead Researcher:</span> Dr. Sarah Chen
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span> 2025-2028
                  </div>
                  <div>
                    <span className="text-gray-400">Funding:</span> $3.2M
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Publications */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Recent Publications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-700 rounded-lg p-6">
              <h4 className="font-bold mb-2">
                Machine Learning Applications in Wildlife Population Monitoring
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Chen, S., Patel, R., Santos, M., et al. (2025). Nature Conservation, 47, 234-251.
              </p>
              <p className="text-gray-300 mb-4">
                Revolutionary approach using computer vision and AI to automate population counts 
                with 98% accuracy across multiple species.
              </p>
              <a href="#" className="text-green-500 hover:text-green-400">
                Read Paper →
              </a>
            </div>

            <div className="border border-gray-700 rounded-lg p-6">
              <h4 className="font-bold mb-2">
                Genetic Rescue Success in Critically Endangered Vaquita Population
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Martinez, J., Thompson, K., Liu, W. (2025). Science, 381(6658), 567-571.
              </p>
              <p className="text-gray-300 mb-4">
                First successful genetic rescue of marine mammal using innovative breeding protocols 
                and genomic selection techniques.
              </p>
              <a href="#" className="text-green-500 hover:text-green-400">
                Read Paper →
              </a>
            </div>

            <div className="border border-gray-700 rounded-lg p-6">
              <h4 className="font-bold mb-2">
                Climate Refugia Mapping for Tropical Biodiversity Hotspots
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Anderson, P., Garcia, L., Kim, S. (2024). Conservation Biology, 38(4), e14089.
              </p>
              <p className="text-gray-300 mb-4">
                Identifies critical climate refugia that will remain suitable for biodiversity 
                under various warming scenarios through 2100.
              </p>
              <a href="#" className="text-green-500 hover:text-green-400">
                Read Paper →
              </a>
            </div>

            <div className="border border-gray-700 rounded-lg p-6">
              <h4 className="font-bold mb-2">
                Community-Based Conservation Economics in Southeast Asia
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Wong, A., Rahman, M., Nguyen, T. (2024). Environmental Economics, 15(3), 145-162.
              </p>
              <p className="text-gray-300 mb-4">
                Economic analysis showing 3.2x ROI for community-led conservation versus traditional 
                protected area management.
              </p>
              <a href="#" className="text-green-500 hover:text-green-400">
                Read Paper →
              </a>
            </div>
          </div>
        </div>

        {/* Research Network */}
        <div className="bg-black border-t border-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Global Research Network</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl mb-4">🏛️</div>
                <h3 className="text-xl font-bold mb-2">89</h3>
                <p>University Partners</p>
              </div>
              <div>
                <div className="text-5xl mb-4">🔬</div>
                <h3 className="text-xl font-bold mb-2">234</h3>
                <p>Research Stations</p>
              </div>
              <div>
                <div className="text-5xl mb-4">👩‍🔬</div>
                <h3 className="text-xl font-bold mb-2">1,247</h3>
                <p>Scientists Involved</p>
              </div>
              <div>
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-bold mb-2">67</h3>
                <p>Countries</p>
              </div>
            </div>
          </div>
        </div>

        {/* ResearchDAO */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gray-900 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ResearchDAO: Democratizing Science</h2>
            <p className="text-xl text-gray-300 mb-8">
              Our decentralized research funding platform has revolutionized how conservation science 
              gets funded, removing bureaucracy and accelerating critical research.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-3xl font-bold text-green-500">$8.4M</p>
                <p className="text-gray-400">Total Funded</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500">342</p>
                <p className="text-gray-400">Projects Supported</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500">14 days</p>
                <p className="text-gray-400">Average Funding Time</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/fund/research.html"
                className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors text-center"
              >
                Apply for Funding
              </Link>
              <Link
                href="/docs"
                className="bg-gray-700 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-600 transition-colors text-center"
              >
                Research Guidelines
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-black py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Support Conservation Science
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your donation directly funds groundbreaking research that saves species from extinction. 
              Every dollar makes a difference.
            </p>
            <Link
              href="/donation"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Donate to Research
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}
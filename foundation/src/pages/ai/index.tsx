import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

export default function AI() {
  return (
    <Layout>
      <Seo
        templateTitle="AI for Conservation"
        description="Zoo Foundation's AI initiatives for wildlife conservation through ZenLM and machine learning"
      />
      <Navbar />

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">AI for Conservation</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Leveraging artificial intelligence and machine learning to protect endangered species
            through advanced monitoring, prediction, and conservation strategies.
          </p>
        </div>

        {/* ZenLM Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">ZenLM Framework</h2>
              <p className="text-gray-300 mb-6">
                Our proprietary ZenLM (Zen Language Model) is specifically trained on conservation data,
                species behavior patterns, and environmental factors to provide unprecedented insights
                for wildlife protection.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">•</span>
                  <span>Species identification from camera trap images with 98% accuracy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">•</span>
                  <span>Predictive modeling for migration patterns and habitat changes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">•</span>
                  <span>Real-time poaching threat detection and alert systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">•</span>
                  <span>Ecosystem health monitoring through satellite imagery analysis</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">AI Impact Metrics</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-bold text-green-500">15M+</p>
                  <p className="text-gray-400">Wildlife images analyzed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-500">2,300+</p>
                  <p className="text-gray-400">Species identified and tracked</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-500">87%</p>
                  <p className="text-gray-400">Reduction in response time to threats</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">AI Research Areas</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Computer Vision</h3>
                <p className="text-gray-400">
                  Advanced image recognition for species identification, behavior analysis,
                  and population counting from drone and camera trap footage.
                </p>
              </div>
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Predictive Analytics</h3>
                <p className="text-gray-400">
                  Machine learning models that predict habitat loss, climate impact,
                  and migration pattern changes to enable proactive conservation.
                </p>
              </div>
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Natural Language Processing</h3>
                <p className="text-gray-400">
                  Analysis of research papers, field reports, and social media to track
                  conservation trends and identify emerging threats.
                </p>
              </div>
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Acoustic Monitoring</h3>
                <p className="text-gray-400">
                  AI-powered audio analysis to identify species by their calls,
                  monitor ecosystem health, and detect illegal activities.
                </p>
              </div>
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Genomic Analysis</h3>
                <p className="text-gray-400">
                  Machine learning applied to DNA sequencing data to understand
                  genetic diversity and guide breeding programs.
                </p>
              </div>
              <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Blockchain Integration</h3>
                <p className="text-gray-400">
                  AI-verified wildlife data stored on blockchain for transparent,
                  tamper-proof conservation records and tracking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* API Access */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Conservation AI API</h2>
          <p className="text-xl text-gray-300 mb-8">
            Access our conservation AI models through our API at <code className="bg-gray-800 px-2 py-1 rounded">api.zoo.network</code>
          </p>
          <div className="bg-gray-900 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-bold mb-4">Available Endpoints</h3>
            <ul className="space-y-3 font-mono text-sm">
              <li><span className="text-green-500">POST</span> /api/v1/species/identify</li>
              <li><span className="text-green-500">POST</span> /api/v1/habitat/analyze</li>
              <li><span className="text-green-500">GET</span> /api/v1/threats/monitor</li>
              <li><span className="text-green-500">POST</span> /api/v1/migration/predict</li>
              <li><span className="text-green-500">POST</span> /api/v1/audio/classify</li>
            </ul>
          </div>
          <Link
            href="/docs"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            View API Documentation
          </Link>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our AI Conservation Initiative</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Partner with us to develop and deploy AI solutions that make a real difference
              in wildlife conservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/getinvolved"
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Get Involved
              </Link>
              <Link
                href="https://github.com/zoo-labs"
                className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors"
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}
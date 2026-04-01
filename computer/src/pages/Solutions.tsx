import React from 'react';
import { Link } from 'react-router-dom';
import UseCases from '../../components/UseCases';
import WhyBuyHardware from '../../components/WhyBuyHardware';
import Testimonials from '../../components/Testimonials';
import TrustSecurity from '../../components/TrustSecurity';
import IndustrySolutions from '../../components/IndustrySolutions';

const Solutions: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/nvidia-dgx-superpod.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg/80 to-dark-bg"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Solutions for Every AI Workload
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              From startups training their first models to enterprises running large-scale
              inference, Hanzo provides the infrastructure you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <UseCases />

      {/* Why Buy vs. Rent/Co-locate */}
      <WhyBuyHardware />

      {/* Customer Stories */}
      <Testimonials />

      {/* Trust & Security */}
      <TrustSecurity />

      {/* Industry Solutions - New Component */}
      <IndustrySolutions />

      {/* Industry Solutions - Detailed */}
      <section className="py-20 bg-dark-card">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Industry-Specific Solutions
              </h2>
              <p className="text-xl text-gray-400">
                Tailored infrastructure for your industry's unique demands
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Healthcare & Life Sciences */}
              <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Healthcare & Life Sciences</h3>
                <p className="text-gray-400 mb-6">
                  HIPAA-compliant infrastructure for medical imaging analysis, drug discovery,
                  genomics research, and clinical decision support systems.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Medical image segmentation & analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Protein folding & drug discovery
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Genomic sequence analysis
                  </li>
                </ul>
              </div>

              {/* Financial Services */}
              <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-secondary/50 transition-all">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Financial Services</h3>
                <p className="text-gray-400 mb-6">
                  Ultra-low latency infrastructure for algorithmic trading, fraud detection,
                  risk modeling, and portfolio optimization at scale.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    High-frequency trading models
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Real-time fraud detection
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Credit risk assessment
                  </li>
                </ul>
              </div>

              {/* Autonomous Vehicles */}
              <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Autonomous Vehicles</h3>
                <p className="text-gray-400 mb-6">
                  Massive parallel compute for sensor fusion, 3D scene understanding,
                  path planning, and simulation at petabyte scale.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    LiDAR & camera data processing
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    End-to-end driving model training
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Simulation environment scaling
                  </li>
                </ul>
              </div>

              {/* Media & Entertainment */}
              <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-secondary/50 transition-all">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Media & Entertainment</h3>
                <p className="text-gray-400 mb-6">
                  High-performance rendering, video processing, and generative AI for creating
                  next-generation content and visual effects.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    AI-powered video upscaling
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Real-time VFX rendering
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Generative content creation
                  </li>
                </ul>
              </div>

              {/* Research & Academia */}
              <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Research & Academia</h3>
                <p className="text-gray-400 mb-6">
                  Flexible infrastructure for experimental AI research, from small-scale
                  prototypes to large-scale scientific computing.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Multi-tenant research clusters
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Academic pricing & grants
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Collaboration tools & sharing
                  </li>
                </ul>
              </div>

              {/* Enterprise AI */}
              <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-secondary/50 transition-all">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Enterprise AI</h3>
                <p className="text-gray-400 mb-6">
                  On-premises or hybrid cloud solutions for companies building proprietary
                  AI models with complete data control.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Private model training
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Custom deployment options
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    Enterprise SLA & support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-card">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Perfect Solution
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Not sure which option is right for you? Our team will help design
            a custom solution for your specific use case and budget.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/request-quote"
              className="px-10 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all text-lg"
            >
              Request Custom Quote
            </Link>
            <Link
              to="/features"
              className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-all text-lg"
            >
              Explore Hardware
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;

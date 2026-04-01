import React from 'react';
import { Link } from 'react-router-dom';
import HardwareSpec from '../../components/HardwareSpec';
import ImageGallery from '../../components/ImageGallery';
import FeaturesComponent from '../../components/Features';
import IndustrySolutions from '../../components/IndustrySolutions';

const FeaturesPage: React.FC = () => {
  const handleSelectProduct = (productId: string) => {
    // Navigate to pricing or cart with selected product
    window.location.hash = 'pricing';
  };

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
              Enterprise AI Infrastructure
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore our full range of NVIDIA DGX systems, H100s, and H200s.
              From single GPUs to complete supercomputing clusters.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/request-quote"
                className="px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all"
              >
                Request Custom Quote
              </Link>
              <Link
                to="/clusters"
                className="px-8 py-4 border border-dark-border text-white font-medium rounded-lg hover:bg-white/10 transition-all"
              >
                View GPU Clusters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <FeaturesComponent />

      {/* Hardware Specifications */}
      <section className="py-20 bg-dark-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Premium Hardware Lineup
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose from our curated selection of NVIDIA's most powerful AI accelerators,
              all managed and optimized by Hanzo.AI experts.
            </p>
          </div>
          <HardwareSpec onSelectProduct={handleSelectProduct} />
        </div>
      </section>

      {/* Image Gallery */}
      <ImageGallery />

      {/* Industry Solutions */}
      <IndustrySolutions />

      {/* Why Choose Hanzo */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Why Choose Hanzo for Your AI Infrastructure
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Instant Deployment</h3>
                <p className="text-gray-400">
                  Your infrastructure is ready when you are. Pre-configured environments, optimized networking,
                  and enterprise support means you can start training models immediately.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Enterprise Security</h3>
                <p className="text-gray-400">
                  SOC 2 Type II compliant infrastructure with dedicated VPCs, encrypted storage,
                  and enterprise-grade access controls. Your data never leaves your secure environment.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Transparent Pricing</h3>
                <p className="text-gray-400">
                  No hidden fees, no surprise charges. Pay only for what you use with flexible billing
                  options: hourly, monthly, or annual contracts tailored to your needs.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Expert Support</h3>
                <p className="text-gray-400">
                  Our team of AI infrastructure experts is available 24/7 to help optimize your workloads,
                  troubleshoot issues, and ensure peak performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-dark-card to-dark-bg">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Scale Your AI Infrastructure?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Whether you need a single DGX Spark or a complete supercomputing cluster,
            our team is ready to build your perfect solution.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/#dgx-spark"
              className="px-10 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all text-lg"
            >
              Buy DGX Spark - $4,000
            </Link>
            <Link
              to="/request-quote"
              className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-all text-lg"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;

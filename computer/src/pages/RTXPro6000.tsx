import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const RTXPro6000: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: 'rtx-pro-6000',
      name: 'RTX PRO 6000 Blackwell',
      price: 8999,
      description: 'Professional workstation GPU with 96GB GDDR7 memory. Perfect for AI-enhanced applications, data science, and visualization.',
      purchaseMethod: 'stripe',
      image: '/nvidia-blackwell-ultra.jpg',
    });
    setAdded(true);
    setTimeout(() => {
      navigate('/cart');
    }, 800);
  };

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: 'Blackwell Architecture',
      description: 'Latest NVIDIA Blackwell GPU architecture with 2nd-gen Transformer Engine for unmatched AI performance.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      title: '96 GB GDDR7 with ECC',
      description: 'Massive 96GB of error-correcting GDDR7 memory for handling the largest datasets and most complex models.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: '24,064 CUDA Cores',
      description: 'Exceptional parallel processing power with 24,064 CUDA cores for compute-intensive workloads.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: '752 Tensor Cores',
      description: '752 dedicated Tensor Cores accelerate AI training and inference with mixed-precision computing.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Professional Visualization',
      description: '4x DisplayPort 2.1 outputs for multi-monitor setups and professional visualization workflows.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Enterprise Support',
      description: 'Professional-grade support and reliability for mission-critical applications and deployments.',
    },
  ];

  const specs = [
    { label: 'GPU Memory', value: '96 GB GDDR7' },
    { label: 'Memory Bandwidth', value: '1792 GB/s' },
    { label: 'CUDA Cores', value: '24,064' },
    { label: 'Tensor Cores', value: '752' },
    { label: 'RT Cores', value: '188' },
    { label: 'Architecture', value: 'Blackwell' },
    { label: 'Display Outputs', value: '4x DisplayPort 2.1' },
    { label: 'Power', value: '300W Max' },
  ];

  const useCases = [
    {
      title: 'AI Development',
      description: 'Train and deploy large language models, computer vision systems, and advanced AI applications.',
    },
    {
      title: 'Data Science',
      description: 'Handle massive datasets, complex simulations, and data-intensive analytics with ease.',
    },
    {
      title: 'Professional Visualization',
      description: 'Create stunning 3D visualizations, CAD work, and professional rendering projects.',
    },
    {
      title: 'Scientific Computing',
      description: 'Accelerate computational science, molecular dynamics, and high-performance computing workloads.',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg pt-24">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{backgroundImage: "url('/nvidia-blackwell-ultra.jpg')"}}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-transparent to-dark-bg"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary rounded-full mb-6">
              <span className="text-primary font-semibold">Latest Blackwell Architecture</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              NVIDIA RTX PRO 6000
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Professional workstation GPU with 96GB GDDR7 memory, 24,064 CUDA cores, and cutting-edge Blackwell architecture for AI, data science, and visualization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-black hover:bg-primary-dark'
                }`}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart - $8,999'}
              </button>
              <a
                href="/#pricing"
                className="px-8 py-4 border border-dark-border text-white rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                View All Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Grid */}
      <section className="py-16 bg-dark-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Technical Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {specs.map((spec, index) => (
              <div key={index} className="text-center p-4 bg-dark-bg rounded-lg border border-dark-border">
                <div className="text-2xl font-bold text-primary mb-2">{spec.value}</div>
                <div className="text-sm text-gray-400">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-dark-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-dark-bg border border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Supercharge Your Workflow?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Get the NVIDIA RTX PRO 6000 Blackwell and experience unprecedented AI performance.
            </p>
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-primary text-black hover:bg-primary-dark'
              }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart - $8,999'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RTXPro6000;

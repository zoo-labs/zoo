import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const DGXSpark: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: 'dgx-spark',
      name: 'DGX Spark',
      price: 3999,
      description: 'Perfect for startups and researchers to kickstart projects on a powerful, dedicated DGX instance.',
      purchaseMethod: 'stripe',
      image: '/nvidia-dgx-spark-and-nvidia-dgx-station.jpg',
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: '1 Petaflop Performance',
      description: 'Desktop supercomputer power - 1,000 trillion floating point operations per second in a portable form factor.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: 'Portable Powerhouse',
      description: 'Backpack-portable design. Take your supercomputer anywhere - coffee shop, office, or home workspace.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: 'Dedicated DGX Instance',
      description: 'Your own private NVIDIA DGX system - not shared with other users. Full control and maximum performance.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '100 Hours Compute Included',
      description: 'Get started immediately with 100 hours of GPU compute time included in your one-time setup fee.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      title: '2 TB NVMe Storage',
      description: 'Ultra-fast NVMe SSD storage for your datasets, models, and results. Persistent across sessions.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Pre-configured AI Stack',
      description: 'PyTorch, TensorFlow, CUDA drivers, and all major AI frameworks pre-installed and ready to use.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'Flexible Configuration',
      description: 'Customize your environment, install any frameworks, and configure the system exactly how you need it.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Community Support',
      description: 'Access to documentation, community forums, and email support for your technical questions.',
    },
  ];

  const specs = [
    { label: 'AI Performance', value: '1+ Petaflop (FP16)' },
    { label: 'GPU Memory', value: 'Up to 640 GB' },
    { label: 'Max Performance', value: '32 PFLOPS FP8' },
    { label: 'Form Factor', value: 'Backpack Portable' },
    { label: 'Storage', value: '2 TB NVMe SSD' },
    { label: 'Compute Hours', value: '100 Hours Included' },
    { label: 'Setup Time', value: 'Instant' },
    { label: 'Support', value: 'Community & Docs' },
  ];

  const useCases = [
    {
      title: 'Model Training',
      description: 'Train large language models, computer vision models, and other deep learning architectures with ease.',
    },
    {
      title: 'Research & Development',
      description: 'Perfect for academic research, experiments, and prototyping new AI algorithms.',
    },
    {
      title: 'Startup MVP',
      description: 'Build and deploy your AI-powered product with production-grade infrastructure from day one.',
    },
    {
      title: 'Fine-tuning',
      description: 'Fine-tune pre-trained models on your custom datasets for specialized applications.',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg py-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-primary font-semibold">Most Popular Plan</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            DGX Spark
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            A <span className="text-primary font-semibold">1 petaflop supercomputer</span> that fits in a backpack.
            Perfect for developers, researchers, and startups who need enterprise-grade AI computing power
            without the enterprise price tag.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">$3,999</div>
              <div className="text-gray-400">One-Time Setup</div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-dark-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100 Hours</div>
              <div className="text-gray-400">Compute Included</div>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="max-w-4xl mx-auto mb-16">
          <img
            src="/nvidia-dgx-spark-and-nvidia-dgx-station.jpg"
            alt="NVIDIA DGX Spark"
            className="w-full rounded-2xl shadow-2xl border border-primary/30"
          />
        </div>

        {/* Supercomputer Highlight */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/30 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Your Personal Supercomputer, Anywhere
                </h3>
                <p className="text-gray-300 text-lg mb-4">
                  DGX Spark delivers <span className="text-primary font-semibold">1 petaflop of AI performance</span> in a
                  compact, portable form factor. Perfect for developers who need supercomputer-class power on the go -
                  from hackathons to coffee shops to your home office.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Backpack portable</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Work from anywhere</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Enterprise-grade power</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-dark-card border border-dark-border rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to get started?</h3>
                <p className="text-gray-400">Limited supply available - secure your instance today</p>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-amber-400 font-semibold mb-1">Limited Supply</p>
                  <p className="text-sm text-gray-300">Maximum 5 units per order. High demand - order soon.</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                added
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-primary text-black hover:bg-primary-dark shadow-lg hover:shadow-primary/50'
              }`}
            >
              {added ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart - $3,999
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Secure payment via Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Instant setup</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Everything You Need to Build AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specs */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Technical Specifications
          </h2>
          <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-4 border-b border-dark-border last:border-b-0 hover:bg-white/5 transition-colors"
              >
                <span className="text-gray-400">{spec.label}</span>
                <span className="text-white font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Perfect For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-dark-card border border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-dark-card border border-dark-border rounded-xl p-6 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex items-center justify-between">
                What happens after the 100 hours?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-400 mt-4">
                After your initial 100 hours, you can purchase additional compute time at competitive hourly rates. Your instance and all data remain accessible.
              </p>
            </details>

            <details className="bg-dark-card border border-dark-border rounded-xl p-6 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex items-center justify-between">
                Can I upgrade later?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-400 mt-4">
                Yes! You can upgrade to GPU On-Demand or Enterprise plans at any time. Contact sales for seamless migration options.
              </p>
            </details>

            <details className="bg-dark-card border border-dark-border rounded-xl p-6 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex items-center justify-between">
                Is my data secure?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-400 mt-4">
                Absolutely. Your dedicated instance is isolated from other users, and all data is encrypted at rest and in transit. We follow industry-standard security practices.
              </p>
            </details>

            <details className="bg-dark-card border border-dark-border rounded-xl p-6 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex items-center justify-between">
                What frameworks are supported?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-400 mt-4">
                PyTorch, TensorFlow, JAX, and all major AI/ML frameworks come pre-installed. You also have root access to install any additional frameworks you need.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DGXSpark;

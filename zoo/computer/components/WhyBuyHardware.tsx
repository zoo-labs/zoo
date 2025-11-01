
import React from 'react';

const WhyBuyHardware: React.FC = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Lower Total Cost of Ownership",
      description: "Own your hardware outright. No recurring monthly fees eating into your budget. DGX Spark pays for itself in just a few months vs cloud rental.",
      stat: "ROI in 3-6 months"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Complete Control & Privacy",
      description: "Your data never leaves your infrastructure. No shared tenancy, no performance throttling, no surprise rate limits. Full root access to customize everything.",
      stat: "100% dedicated resources"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Predictable Performance",
      description: "No noisy neighbors. No performance degradation during peak hours. Consistent, guaranteed performance for your training and inference workloads 24/7.",
      stat: "Zero performance variance"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      title: "Unlimited Usage",
      description: "Run experiments 24/7 with no usage caps, no hourly fees, no data transfer costs. Perfect for continuous training, batch processing, and research.",
      stat: "Unlimited compute hours"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-dark-bg to-dark-bg/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-4">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-primary font-semibold">Own Your Infrastructure</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Buy Hardware Instead of Renting Cloud?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            For serious AI development, owning your hardware delivers unmatched value. Here's why DGX Spark is the smarter choice.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full text-primary group-hover:bg-primary/20 transition-colors">
                    {benefit.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 mb-3 leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded-full">
                    <span className="text-primary font-semibold text-sm">{benefit.stat}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Comparison */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-3">
              Simple Math: Buy vs Rent
            </h3>
            <p className="text-gray-300 text-lg">
              Cloud seems cheaper upfront, but ownership wins over time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* DGX Spark */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border-2 border-primary">
              <div className="text-center mb-4">
                <div className="inline-block px-3 py-1 bg-primary/20 border border-primary/40 rounded-full mb-3">
                  <span className="text-primary font-bold text-sm">BEST VALUE</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">DGX Spark</h4>
                <p className="text-gray-400">Own Your Hardware</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary mb-2">$4,000</div>
                <div className="text-gray-400">One-time payment</div>
                <div className="text-gray-500 text-sm mt-1">+ 100 hours included</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Dedicated DGX instance</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Unlimited usage after 100hrs</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No monthly fees</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Complete control</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="text-center text-primary font-bold text-lg">
                  Pays for itself in 3-6 months
                </div>
              </div>
            </div>

            {/* Cloud 6-Month */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-dark-border">
              <div className="text-center mb-4">
                <h4 className="text-2xl font-bold text-white mb-2">Cloud (6 months)</h4>
                <p className="text-gray-400">Rented Infrastructure</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-300 mb-2">$135K+</div>
                <div className="text-gray-400">6-month commitment</div>
                <div className="text-gray-500 text-sm mt-1">H100 equivalent pricing</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Shared infrastructure</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Ongoing monthly costs</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Data transfer fees</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Limited customization</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="text-center text-gray-400 font-semibold">
                  33x more expensive
                </div>
              </div>
            </div>

            {/* Cloud Annual */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-dark-border">
              <div className="text-center mb-4">
                <h4 className="text-2xl font-bold text-white mb-2">Cloud (Annual)</h4>
                <p className="text-gray-400">12-Month Contract</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-300 mb-2">$240K+</div>
                <div className="text-gray-400">Annual commitment</div>
                <div className="text-gray-500 text-sm mt-1">H100 equivalent pricing</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Long-term lock-in</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>You own nothing</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Performance varies</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Renewal price increases</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="text-center text-gray-400 font-semibold">
                  60x more expensive
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Bottom line:</strong> For sustained AI development, owning your hardware is dramatically more cost-effective.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
            >
              Get DGX Spark for $4,000
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBuyHardware;

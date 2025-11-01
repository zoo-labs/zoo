
import React from 'react';

const UseCases: React.FC = () => {
  const useCases = [
    {
      icon: '🧠',
      title: 'Training',
      subtitle: 'Build Models from Scratch or Fine-Tune Foundation Models',
      description: 'Training is not a one-size-fits-all approach. Whether training Large Language Models (LLMs), Natural Language Processing (NLP), Generative AI (GenAI), or Computer Vision (CV) models, you need the right solution with scalability.',
      benefits: [
        'Profile and understand scaling needs',
        'Close coordination with data scientists',
        'Build from scratch or use foundation models',
        'Optimal resource allocation'
      ],
      badge: 'Most Intensive',
      color: 'primary'
    },
    {
      icon: '🎯',
      title: 'Fine-Tuning',
      subtitle: 'Optimize Models for Your Specific Use Case',
      description: 'Tuning a foundation AI model is imperative to achieving optimal results. Whether adding data to enhance training or adjusting model weights, tuning addresses specific use cases and needs.',
      benefits: [
        'Weight adjustments for better output',
        'Data augmentation with relevant prompts',
        'RLHF (Reinforcement Learning from Human Feedback)',
        'Supervised fine-tuning capabilities'
      ],
      badge: 'Precision Focus',
      color: 'secondary'
    },
    {
      icon: '⚡',
      title: 'Inference',
      subtitle: 'Deploy Models for Production Workloads',
      description: 'Run your trained models in production with optimal performance. Support for LLMs, NLP, and CV models with the right balance of speed and cost.',
      benefits: [
        'Real-time and batch inference',
        'Model footprint optimization',
        'Performance and cost guidance',
        'Enterprise-grade deployment'
      ],
      badge: 'Production Ready',
      color: 'green'
    }
  ];

  const industries = [
    {
      icon: '✨',
      title: 'Generative AI',
      description: 'Create breathtaking content with models specifically designed for generative AI workloads',
      examples: ['Text generation', 'Image synthesis', 'Code generation', 'Video creation']
    },
    {
      icon: '🤖',
      title: 'Autonomous & Robotics',
      description: 'Data collection and analysis for autonomous systems with expertise in risk mitigation',
      examples: ['Self-driving vehicles', 'Warehouse automation', 'Drone navigation', 'Robot vision']
    },
    {
      icon: '👁️',
      title: 'Computer Vision',
      description: 'Groundbreaking improvements across image and object classification, detection, and tracking',
      examples: ['Object detection', 'Facial recognition', 'Medical imaging', 'Quality inspection']
    },
    {
      icon: '🔬',
      title: 'High Performance Computing',
      description: 'Achieve ambitious goals with cloud-based HPC powered by top-tier GPUs',
      examples: ['Scientific simulations', 'Financial modeling', 'Weather forecasting', 'Drug discovery']
    },
    {
      icon: '🎧',
      title: 'Audio & NLP',
      description: 'Latest accelerators for NLP and audio processing across language applications',
      examples: ['Speech recognition', 'Language translation', 'Sentiment analysis', 'Audio synthesis']
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-dark-bg">
      <div className="container mx-auto px-6">
        {/* Use Cases Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-4">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-primary font-semibold">Use Cases</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for Every Stage of AI Development
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From initial model training to production inference, DGX Spark and our enterprise solutions support your entire AI workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                useCase.color === 'primary' ? 'from-primary to-primary/50' :
                useCase.color === 'secondary' ? 'from-secondary to-secondary/50' :
                'from-green-400 to-green-600'
              }`}></div>

              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{useCase.icon}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                  useCase.color === 'primary' ? 'bg-primary/20 text-primary' :
                  useCase.color === 'secondary' ? 'bg-secondary/20 text-secondary' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {useCase.badge}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-gray-400 font-semibold text-sm mb-4">{useCase.subtitle}</p>
                <p className="text-gray-300 leading-relaxed mb-6">{useCase.description}</p>
              </div>

              <div className="space-y-3">
                {useCase.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Industries Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-2 mb-4">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-secondary font-semibold">Industry Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powering Innovation Across Industries
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Leading organizations across industries trust our NVIDIA-powered infrastructure for their most demanding AI workloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6 hover:border-secondary/50 transition-all duration-300"
            >
              <div className="text-5xl mb-4 text-center">{industry.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">{industry.title}</h3>
              <p className="text-gray-300 mb-4 text-center text-sm">{industry.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {industry.examples.map((example, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-secondary/10 border border-secondary/30 rounded-full text-secondary text-xs font-semibold"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Accelerate Your AI Development?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Whether you're training massive language models, fine-tuning for specific use cases, or deploying inference at scale, we have the perfect solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
              >
                Get DGX Spark - $4,000
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </a>
              <a
                href="https://hanzo.ai/contact"
                className="inline-flex items-center px-8 py-4 border border-secondary text-secondary font-bold rounded-lg hover:bg-secondary/10 transition-all duration-300"
              >
                Contact Sales for Enterprise
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;

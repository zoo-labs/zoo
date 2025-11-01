import React from 'react';
import { Link } from 'react-router-dom';

const IndustrySolutions: React.FC = () => {
  const solutions = [
    {
      icon: '✨',
      title: 'Generative AI',
      description: 'Create breathtaking content with models specifically designed for generative AI workloads',
      features: ['Text generation', 'Image synthesis', 'Code generation', 'Video creation'],
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400'
    },
    {
      icon: '🤖',
      title: 'Autonomous & Robotics',
      description: 'Data collection and analysis for autonomous systems with expertise in risk mitigation',
      features: ['Self-driving vehicles', 'Warehouse automation', 'Drone navigation', 'Robot vision'],
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400'
    },
    {
      icon: '👁️',
      title: 'Computer Vision',
      description: 'Groundbreaking improvements across image and object classification, detection, and tracking',
      features: ['Object detection', 'Facial recognition', 'Medical imaging', 'Quality inspection'],
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-400'
    },
    {
      icon: '🔬',
      title: 'High Performance Computing',
      description: 'Achieve ambitious goals with cloud-based HPC powered by top-tier GPUs',
      features: ['Scientific simulations', 'Financial modeling', 'Weather forecasting', 'Drug discovery'],
      gradient: 'from-orange-500/20 to-red-500/20',
      iconBg: 'bg-orange-500/20',
      iconColor: 'text-orange-400'
    },
    {
      icon: '🎧',
      title: 'Audio & NLP',
      description: 'Latest accelerators for NLP and audio processing across language applications',
      features: ['Speech recognition', 'Language translation', 'Sentiment analysis', 'Voice synthesis'],
      gradient: 'from-indigo-500/20 to-purple-500/20',
      iconBg: 'bg-indigo-500/20',
      iconColor: 'text-indigo-400'
    },
    {
      icon: '🎮',
      title: 'Gaming & Metaverse',
      description: 'Power immersive experiences with real-time rendering and physics simulation',
      features: ['Real-time ray tracing', '3D world generation', 'Physics simulation', 'AI NPCs'],
      gradient: 'from-pink-500/20 to-rose-500/20',
      iconBg: 'bg-pink-500/20',
      iconColor: 'text-pink-400'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-card relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Industry Solutions
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Powering Innovation Across Industries
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Leading organizations across industries trust our NVIDIA-powered infrastructure for their most demanding AI workloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${solution.gradient} backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105 group`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${solution.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <span className="text-4xl">{solution.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {solution.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {solution.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-400">
                    <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <Link
                to="/solutions"
                className={`inline-flex items-center ${solution.iconColor} hover:underline text-sm font-semibold`}
              >
                Learn more
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Don't see your industry? We work with organizations across all sectors.
          </p>
          <Link
            to="/request-quote"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:opacity-90 transition-all"
          >
            Discuss Your Use Case
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;

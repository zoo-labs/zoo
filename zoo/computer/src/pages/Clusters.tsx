import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitClusterRequest } from '../lib/supabase';

interface ClusterFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  clusterRequirements: string;
  numberOfGPUs: string;
  rentalDuration: string;
  projectDescription: string;
  hearAboutUs: string;
  honeypot: string; // Anti-spam field
}

const Clusters: React.FC = () => {
  const [formData, setFormData] = useState<ClusterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    clusterRequirements: '',
    numberOfGPUs: '',
    rentalDuration: '',
    projectDescription: '',
    hearAboutUs: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      return; // Bot detected
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to Supabase
      await submitClusterRequest({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company,
        cluster_requirements: formData.clusterRequirements,
        number_of_gpus: formData.numberOfGPUs,
        rental_duration: formData.rentalDuration,
        project_description: formData.projectDescription,
        hear_about_us: formData.hearAboutUs,
      });

      setSubmitStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          clusterRequirements: '',
          numberOfGPUs: '',
          rentalDuration: '',
          projectDescription: '',
          hearAboutUs: '',
          honeypot: '',
        });
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Cluster request error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
              <span className="text-primary font-semibold">Enterprise GPU Clusters</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              High-Performance AI & HPC Clusters
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Built for Your Biggest Workloads
            </p>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Scale your AI, ML, and HPC projects with customizable, on-demand clusters designed for continuous performance and enterprise reliability.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#cluster-form"
                className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
              >
                Request a Cluster
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#why-clusters"
                className="inline-flex items-center px-8 py-4 border border-secondary text-secondary font-bold rounded-lg hover:bg-secondary/10 transition-all duration-300"
              >
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hanzo Clusters Section */}
      <section id="why-clusters" className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Hanzo Clusters
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Deploy scalable, high-performance compute for your AI, ML, and HPC projects. Our dedicated environments ensure reliable throughput and flexible resource allocations—perfect for continuous or large-scale workloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Scalable Performance',
                description: 'Seamlessly scale from tens to hundreds of GPUs. Start with 8 GPUs and expand to multi-rack SuperPOD configurations.',
              },
              {
                icon: '🔒',
                title: 'Trusted & Secure',
                description: 'Enterprise-grade security, SLAs, and round-the-clock support. SOC 2 Type II certified infrastructure.',
              },
              {
                icon: '🚀',
                title: 'Speed to Market',
                description: 'Rapid deployment through our NVIDIA Inception partnership. Spin up production-grade clusters in hours, not weeks.',
              },
              {
                icon: '💰',
                title: 'Cost-Efficient Clusters',
                description: 'Transparent pricing with volume discounts. Pay only for what you need—no hidden fees or surprise charges.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clusters Are Best For Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Clusters are best for
              </h2>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Ongoing, Large-Scale AI Workloads
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                You're training large or complex models (NLP, computer vision, recommendation engines) on a frequent basis.
                Multiple data scientists or teams depend on consistent GPU resources. You need guaranteed capacity and
                predictable performance for production workloads.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 text-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                See our on-demand GPUs if
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>
                    <strong>You Only Run Small or One-Off GPU Jobs:</strong> Occasional model training or inference tasks
                    that a single GPU instance can handle. Consider our <Link to="/#pricing" className="text-primary hover:underline">DGX Spark</Link> for
                    getting started.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>
                    <strong>You're Experimental or Short-Term:</strong> If you only need quick, ad-hoc bursts of compute,
                    check out <a href="https://hanzo.ai" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Hanzo Cloud</a> for
                    flexible hourly billing.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>
                    <strong>You Don't Need Guaranteed Capacity:</strong> If you're happy with spot instances or partial
                    availability, a dedicated cluster may be overkill. Our cloud offering provides on-demand access.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Benefits of Hanzo Clusters
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Enterprise-grade infrastructure with the flexibility and support you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Flexible, Dedicated Hardware',
                icon: '🎛️',
                description: 'Get exactly the CPU/GPU mix you need, plus custom networking and storage configurations. Scale up or down based on project phases—no wasted resources.',
                features: [
                  'B300, B200, H200, or H100 GPU configurations',
                  'Custom NVLink and InfiniBand networking',
                  'Flexible storage: NVMe, SSD, or high-capacity HDD',
                  'Scale from 8 GPUs to multi-rack SuperPODs',
                ],
              },
              {
                title: 'Transparent Billing & Monitoring',
                icon: '📊',
                description: 'Real-time cost tracking to align spend with usage and prevent overruns. Detailed resource utilization dashboards for performance analysis.',
                features: [
                  'Real-time usage and cost dashboards',
                  'Detailed billing breakdowns per project/team',
                  'GPU utilization and performance metrics',
                  'Automated cost alerts and budget controls',
                ],
              },
              {
                title: 'Full Integration & Toolchain Support',
                icon: '🔧',
                description: 'Seamlessly integrate popular ML frameworks and HPC libraries. Compatible with container-based workflows for easy deployment.',
                features: [
                  'Pre-configured ML frameworks (TensorFlow, PyTorch, JAX)',
                  'Container support (Docker, Kubernetes, Singularity)',
                  'HPC libraries (CUDA, cuDNN, NCCL, MPI)',
                  'Custom software stack installation',
                ],
              },
              {
                title: 'Expert Guidance & SLA-Backed Support',
                icon: '🤝',
                description: '24/7 assistance from HPC/AI specialists who can help optimize cluster performance. Enterprise-grade SLAs ensure peace of mind for mission-critical projects.',
                features: [
                  '24/7 technical support from AI/HPC experts',
                  '99.9% uptime SLA with service credits',
                  'Dedicated account manager for enterprise',
                  'Performance optimization consulting',
                ],
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-secondary/50 transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="text-5xl mr-4">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                </div>
                <p className="text-gray-300 mb-6">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cluster Form Section */}
      <section id="cluster-form" className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Start Building Your Cluster
            </h2>
            <p className="text-xl text-gray-400">
              Tell us about your requirements and we'll design a custom solution
            </p>
          </div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-1">Cluster Request Submitted!</h3>
                  <p className="text-gray-300">
                    Thank you for your interest. Our enterprise team will contact you within 24 hours to discuss your cluster requirements and provide a custom quote.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-red-400 mb-1">Submission Failed</h3>
                  <p className="text-gray-300">Please try again or contact us directly at enterprise@hanzo.ai</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 md:p-12 space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300 mb-2">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="John"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300 mb-2">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Smith"
                />
              </div>
            </div>

            {/* Email and Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-2">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Acme Inc"
                />
              </div>
            </div>

            {/* Cluster Requirements */}
            <div>
              <label htmlFor="clusterRequirements" className="block text-sm font-semibold text-gray-300 mb-2">
                Tell us about your cluster requirements <span className="text-red-400">*</span>
              </label>
              <textarea
                id="clusterRequirements"
                name="clusterRequirements"
                value={formData.clusterRequirements}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-vertical"
                placeholder="e.g., Need distributed training cluster for large language models, multi-node setup with high-speed networking..."
              />
            </div>

            {/* Number of GPUs and Rental Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="numberOfGPUs" className="block text-sm font-semibold text-gray-300 mb-2">
                  Number of GPUs <span className="text-red-400">*</span>
                </label>
                <select
                  id="numberOfGPUs"
                  name="numberOfGPUs"
                  value={formData.numberOfGPUs}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select GPU count</option>
                  <option value="8-16">8-16 GPUs (1-2 nodes)</option>
                  <option value="16-32">16-32 GPUs (2-4 nodes)</option>
                  <option value="32-64">32-64 GPUs (4-8 nodes)</option>
                  <option value="64-128">64-128 GPUs (8-16 nodes)</option>
                  <option value="128+">128+ GPUs (16+ nodes)</option>
                  <option value="custom">Custom configuration</option>
                </select>
              </div>

              <div>
                <label htmlFor="rentalDuration" className="block text-sm font-semibold text-gray-300 mb-2">
                  Rental Duration <span className="text-red-400">*</span>
                </label>
                <select
                  id="rentalDuration"
                  name="rentalDuration"
                  value={formData.rentalDuration}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select duration</option>
                  <option value="1-month">1 Month</option>
                  <option value="3-months">3 Months (5% discount)</option>
                  <option value="6-months">6 Months (10% discount)</option>
                  <option value="12-months">12 Months (20% discount)</option>
                  <option value="24-months">24 Months (30% discount)</option>
                  <option value="flexible">Flexible / On-Demand</option>
                </select>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="projectDescription" className="block text-sm font-semibold text-gray-300 mb-2">
                Please tell us about your project <span className="text-red-400">*</span>
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-vertical"
                placeholder="Describe your AI/ML project, research goals, expected workload patterns, team size, etc."
              />
            </div>

            {/* How did you hear about us */}
            <div>
              <label htmlFor="hearAboutUs" className="block text-sm font-semibold text-gray-300 mb-2">
                How did you hear about Hanzo.ai? <span className="text-red-400">*</span>
              </label>
              <select
                id="hearAboutUs"
                name="hearAboutUs"
                value={formData.hearAboutUs}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Please select</option>
                <option value="google">Google Search</option>
                <option value="nvidia">NVIDIA Inception Program</option>
                <option value="techstars">Techstars Network</option>
                <option value="social">Social Media (Twitter, LinkedIn)</option>
                <option value="blog">Blog or Article</option>
                <option value="referral">Referral</option>
                <option value="conference">Conference or Event</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Honeypot Field (hidden from users, catches bots) */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark text-black transform hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Request...
                  </span>
                ) : (
                  'Submit Cluster Request'
                )}
              </button>
              <p className="mt-4 text-center text-sm text-gray-400">
                By submitting this form, you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Scale Your Compute?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              If you're running high-volume AI or HPC workloads and need guaranteed performance, let's chat.
              Get in touch to design a custom solution that meets your exact specifications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#cluster-form"
                className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="mailto:enterprise@hanzo.ai"
                className="inline-flex items-center px-8 py-4 border border-secondary text-secondary font-bold rounded-lg hover:bg-secondary/10 transition-all duration-300"
              >
                Contact Enterprise Sales
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
              <div className="flex flex-col items-center">
                <img src="/nvidia-logo-clean.svg" alt="NVIDIA" className="h-8 w-auto opacity-60 mb-2" />
                <span className="text-xs text-gray-400 font-semibold tracking-wider">INCEPTION PARTNER</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex flex-col items-center">
                <img src="/techstars-white.svg" alt="Techstars" className="h-6 w-auto opacity-60 mb-2" />
                <span className="text-xs text-gray-400 font-semibold tracking-wider">PORTFOLIO COMPANY</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white opacity-60">SOC 2</span>
                <span className="text-xs text-gray-400 font-semibold tracking-wider">TYPE II CERTIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clusters;

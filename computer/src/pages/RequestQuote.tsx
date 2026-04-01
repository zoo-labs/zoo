import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitRFQ } from '../lib/supabase';
import { sendRFQConfirmationClient, generateId, formatDate } from '../lib/email-client';
import type { RFQData } from '../lib/email';

interface RFQFormData {
  // Company Information
  company: string;
  email: string;
  phone: string;
  name: string;

  // GPU Requirements
  gpuType: string;
  quantity: number;
  duration: string; // 'one-time', 'monthly', '6-month', 'annual'

  // Use Case & Requirements
  useCase: string;
  budgetRange: string;
  additionalRequirements: string;
}

const RequestQuote: React.FC = () => {
  const [formData, setFormData] = useState<RFQFormData>({
    company: '',
    email: '',
    phone: '',
    name: '',
    gpuType: '',
    quantity: 8,
    duration: 'monthly',
    useCase: '',
    budgetRange: '',
    additionalRequirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const gpuOptions = [
    { value: 'b300', label: '8-GPU NVIDIA B300 (Cutting Edge)', badge: 'New' },
    { value: 'b200', label: '8-GPU NVIDIA B200', badge: 'Next Gen' },
    { value: 'h200', label: '8-GPU NVIDIA H200', badge: 'Premium' },
    { value: 'h100', label: '8-GPU NVIDIA H100', badge: 'Standard' },
    { value: 'custom', label: 'Custom Configuration', badge: null },
  ];

  const durationOptions = [
    { value: 'one-time', label: 'One-Time Purchase', description: 'Own the hardware outright' },
    { value: 'monthly', label: 'Monthly Lease', description: 'Flexible month-to-month' },
    { value: '6-month', label: '6-Month Lease', description: 'Save 10% with commitment' },
    { value: 'annual', label: 'Annual Lease', description: 'Save 20% with yearly term' },
  ];

  const budgetRanges = [
    'Under $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    '$500,000 - $1,000,000',
    'Over $1,000,000',
    'Flexible / Open Budget',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.company || !formData.email || !formData.name || !formData.gpuType || !formData.useCase) {
      setErrorMessage('Please fill in all required fields');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Convert duration to months for database
      let duration_months: number | undefined;
      if (formData.duration === 'one-time') {
        duration_months = undefined; // null in database
      } else if (formData.duration === 'monthly') {
        duration_months = 1;
      } else if (formData.duration === '6-month') {
        duration_months = 6;
      } else if (formData.duration === 'annual') {
        duration_months = 12;
      }

      // Submit to Supabase
      await submitRFQ({
        company: formData.company,
        email: formData.email,
        phone: formData.phone || undefined,
        gpu_type: formData.gpuType,
        quantity: formData.quantity,
        duration_months,
        use_case: formData.useCase,
        budget_range: formData.budgetRange || undefined,
        additional_requirements: formData.additionalRequirements || undefined,
      });

      // Send email notifications
      const rfqNumber = generateId();
      const rfqEmailData: RFQData = {
        rfqNumber: rfqNumber,
        customerName: formData.name,
        customerEmail: formData.email,
        company: formData.company,
        gpuModel: formData.gpuType,
        quantity: formData.quantity,
        duration: formData.duration === 'one-time' ? 'One-time purchase' :
                  formData.duration === 'monthly' ? 'Monthly lease' :
                  formData.duration === '6-month' ? '6-month lease' :
                  'Annual lease',
        useCase: formData.useCase,
        message: formData.additionalRequirements,
        submittedAt: formatDate(new Date())
      };

      // Send confirmation email (non-blocking)
      sendRFQConfirmationClient(rfqEmailData).then(result => {
        if (!result.success) {
          console.error('Failed to send email:', result.error);
        }
      });

      setSubmitStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          company: '',
          email: '',
          phone: '',
          name: '',
          gpuType: '',
          quantity: 8,
          duration: 'monthly',
          useCase: '',
          budgetRange: '',
          additionalRequirements: '',
        });
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('RFQ submission error:', error);
      setErrorMessage('Failed to submit request. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Request a Quote
          </h1>
          <p className="text-xl text-gray-400">
            Get a custom quote for enterprise GPU infrastructure. Our team will respond within 24 hours.
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
                <h3 className="text-lg font-bold text-green-400 mb-1">Request Submitted Successfully!</h3>
                <p className="text-gray-300">
                  Thank you for your interest. Our team will review your requirements and send you a detailed quote within 24 hours.
                  Check your email for confirmation.
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
                <p className="text-gray-300">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 md:p-12 space-y-8">

          {/* Company Information Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Company Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@acme.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </section>

          {/* GPU Requirements Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              GPU Requirements
            </h2>

            <div className="space-y-6">
              {/* GPU Type */}
              <div>
                <label htmlFor="gpuType" className="block text-sm font-semibold text-gray-300 mb-3">
                  GPU Configuration <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {gpuOptions.map(option => (
                    <div key={option.value} className="relative">
                      <input
                        type="radio"
                        id={`gpu-${option.value}`}
                        name="gpuType"
                        value={option.value}
                        checked={formData.gpuType === option.value}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`gpu-${option.value}`}
                        className="flex items-center justify-between w-full px-4 py-3 bg-black/40 border-2 border-dark-border rounded-lg cursor-pointer hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/10 transition-all"
                      >
                        <span className="text-white font-medium">{option.label}</span>
                        {option.badge && (
                          <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
                            {option.badge}
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-semibold text-gray-300 mb-3">
                  Quantity (8-GPU Units)
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-2 bg-black/40 border border-dark-border rounded-lg text-white hover:border-primary transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    className="w-24 px-4 py-2 bg-black/40 border border-dark-border rounded-lg text-white text-center focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-2 bg-black/40 border border-dark-border rounded-lg text-white hover:border-primary transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <span className="text-gray-400">× 8 GPUs = {formData.quantity * 8} total GPUs</span>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Lease Duration <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {durationOptions.map(option => (
                    <div key={option.value} className="relative">
                      <input
                        type="radio"
                        id={`duration-${option.value}`}
                        name="duration"
                        value={option.value}
                        checked={formData.duration === option.value}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`duration-${option.value}`}
                        className="flex flex-col w-full px-4 py-3 bg-black/40 border-2 border-dark-border rounded-lg cursor-pointer hover:border-secondary/50 peer-checked:border-secondary peer-checked:bg-secondary/10 transition-all"
                      >
                        <span className="text-white font-medium">{option.label}</span>
                        <span className="text-sm text-gray-400">{option.description}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Use Case & Requirements Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Use Case & Requirements
            </h2>

            <div className="space-y-6">
              {/* Use Case */}
              <div>
                <label htmlFor="useCase" className="block text-sm font-semibold text-gray-300 mb-2">
                  Use Case Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-vertical"
                  placeholder="Describe your AI/ML workload: model training, inference, fine-tuning, research, etc."
                />
                <p className="mt-2 text-sm text-gray-400">
                  Help us understand your requirements: training LLMs, computer vision, genomics, etc.
                </p>
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="budgetRange" className="block text-sm font-semibold text-gray-300 mb-2">
                  Budget Range
                </label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a range (optional)</option>
                  {budgetRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Additional Requirements */}
              <div>
                <label htmlFor="additionalRequirements" className="block text-sm font-semibold text-gray-300 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/40 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-vertical"
                  placeholder="Any special requirements: networking, storage, managed services, support SLA, compliance, etc."
                />
              </div>
            </div>
          </section>

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
                'Submit Request for Quote'
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

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">What Happens Next?</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary mr-2">1.</span>
                  <span>Our team reviews your requirements within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">2.</span>
                  <span>We prepare a detailed quote with pricing, configuration, and timeline</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">3.</span>
                  <span>You review and accept the quote via your dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">4.</span>
                  <span>We provision your GPU infrastructure within 24-48 hours</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">
                Need immediate assistance? Contact us at{' '}
                <a href="mailto:sales@hanzo.ai" className="text-primary hover:underline">sales@hanzo.ai</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;

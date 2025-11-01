
import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What's included with DGX Spark?",
      answer: "DGX Spark includes a dedicated DGX instance with 100 hours of compute time, 2TB of NVMe storage, a pre-configured AI stack (PyTorch, TensorFlow, CUDA toolkit), and access to community support. Setup is instant—you can start training models within minutes of purchase."
    },
    {
      question: "How does pricing work?",
      answer: "DGX Spark is a one-time $4,000 payment that includes 100 hours of compute. For on-demand usage beyond that, check out Hanzo Cloud for pay-as-you-go pricing. Enterprise customers can contact sales for custom SuperPOD deployments and volume pricing."
    },
    {
      question: "Can I scale beyond DGX Spark?",
      answer: "Absolutely. Start with DGX Spark and seamlessly scale to Hanzo Cloud for on-demand H100/H200 access, or upgrade to dedicated SuperPODs for enterprise workloads. Your data and configurations can migrate easily across our infrastructure."
    },
    {
      question: "What kind of support do I get?",
      answer: "DGX Spark includes community support via our Discord and documentation. Cloud Compute users get email support with 24-hour response times. Enterprise customers receive 24/7 dedicated support with custom SLAs and a dedicated account manager."
    },
    {
      question: "How secure is my data?",
      answer: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Each instance is isolated with dedicated VPC networking. We're SOC 2 Type II certified and GDPR compliant. Enterprise customers can add HIPAA compliance and private networking."
    },
    {
      question: "What happens after 100 hours?",
      answer: "After your included 100 hours, you can top up compute time at competitive rates, upgrade to Hanzo Cloud for flexible pay-as-you-go access, or maintain your instance for data storage at a low monthly rate while you plan your next project."
    },
    {
      question: "Can I use my own software?",
      answer: "Yes! While we provide a pre-configured AI stack, you have full root access to install any frameworks, libraries, or custom software. Our instances support Docker, Kubernetes, and all major AI/ML frameworks."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 7-day money-back guarantee if you're not satisfied with your DGX Spark instance. For used compute hours, we'll prorate the refund. Enterprise contracts have custom terms negotiated with your sales representative."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about Hanzo.Computer and our AI infrastructure
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center group"
              >
                <span className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="https://hanzo.ai/contact"
            className="inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            Contact our sales team
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

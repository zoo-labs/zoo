
import React, { useState } from 'react';

type PricingPeriod = 'monthly' | '6-month' | 'annual';

interface GPUInstance {
  gpu: string;
  gpuCount: number;
  processor: string;
  ram: string;
  nvmeStorage: string;
  additionalStorage: string;
  network: string;
  monthlyPrice: number | null;
  sixMonthPrice: number | null;
  annualPrice: number | null;
  badge?: string;
}

const CloudPricing: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PricingPeriod>('monthly');

  const instances: GPUInstance[] = [
    {
      gpu: 'NVIDIA B300',
      gpuCount: 8,
      processor: 'Dual 64-Core',
      ram: '3TB',
      nvmeStorage: '960GB NVMe',
      additionalStorage: '(4) 3.84TB NVMe',
      network: '25Gb Bonded (3200Gb Available)',
      monthlyPrice: null,
      sixMonthPrice: null,
      annualPrice: null,
      badge: 'Cutting Edge'
    },
    {
      gpu: 'NVIDIA B200',
      gpuCount: 8,
      processor: 'Dual 48-Core',
      ram: '2TB',
      nvmeStorage: '960GB NVMe',
      additionalStorage: '(4) 3.84TB NVMe',
      network: '25Gb Bonded (3200Gb Available)',
      monthlyPrice: 34999,
      sixMonthPrice: 31499,
      annualPrice: 27999,
      badge: 'Next Gen'
    },
    {
      gpu: 'NVIDIA H200',
      gpuCount: 8,
      processor: 'Dual 48-Core',
      ram: '2TB',
      nvmeStorage: '960GB NVMe',
      additionalStorage: '(4) 3.84TB NVMe',
      network: '25Gb Bonded (3200Gb Available)',
      monthlyPrice: 26499,
      sixMonthPrice: 23849,
      annualPrice: 21199,
      badge: 'Most Popular'
    },
    {
      gpu: 'NVIDIA H100',
      gpuCount: 8,
      processor: 'Dual 48-Core',
      ram: '2TB',
      nvmeStorage: '(1) 960GB NVMe',
      additionalStorage: '(4) 3.84TB NVMe',
      network: '25Gb Bonded (3200Gb Available)',
      monthlyPrice: 24999,
      sixMonthPrice: 22499,
      annualPrice: 19999
    }
  ];

  const getPrice = (instance: GPUInstance): string => {
    let price: number | null = null;

    switch (selectedPeriod) {
      case 'monthly':
        price = instance.monthlyPrice;
        break;
      case '6-month':
        price = instance.sixMonthPrice;
        break;
      case 'annual':
        price = instance.annualPrice;
        break;
    }

    if (price === null) {
      return 'Contact Us';
    }

    return `$${price.toLocaleString()}`;
  };

  const getSavings = (instance: GPUInstance): string | null => {
    if (!instance.monthlyPrice) return null;

    let price: number | null = null;
    switch (selectedPeriod) {
      case '6-month':
        price = instance.sixMonthPrice;
        break;
      case 'annual':
        price = instance.annualPrice;
        break;
      default:
        return null;
    }

    if (price === null) return null;

    const savings = Math.round(((instance.monthlyPrice - price) / instance.monthlyPrice) * 100);
    return savings > 0 ? `Save ${savings}%` : null;
  };

  return (
    <section id="cloud-pricing" className="py-24 bg-gradient-to-b from-dark-bg/50 to-dark-bg">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-2 mb-4">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span className="text-secondary font-semibold">Need Cloud Instead?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Hanzo Cloud for On-Demand GPU Access
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
            While we recommend <strong className="text-white">buying your own hardware</strong> for the best value and control, Hanzo Cloud offers flexible, pay-as-you-go GPU instances when you need them.
          </p>
          <a
            href="https://hanzo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 mb-8"
          >
            Visit Hanzo Cloud
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-8">
            Reference pricing shown below for cloud instances. For detailed cloud pricing and instant deployment, visit Hanzo.AI.
          </p>

          {/* Period Selector */}
          <div className="inline-flex bg-black/40 backdrop-blur-sm border border-dark-border rounded-lg p-1">
            <button
              onClick={() => setSelectedPeriod('monthly')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                selectedPeriod === 'monthly'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPeriod('6-month')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                selectedPeriod === '6-month'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              6 Months
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Save 10%</span>
            </button>
            <button
              onClick={() => setSelectedPeriod('annual')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                selectedPeriod === 'annual'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Table Header */}
            <div className="grid grid-cols-10 gap-4 mb-4 px-6 py-4 bg-black/60 backdrop-blur-sm border border-dark-border rounded-t-xl">
              <div className="col-span-2 text-gray-400 font-semibold text-sm">Instance</div>
              <div className="text-gray-400 font-semibold text-sm">Processor</div>
              <div className="text-gray-400 font-semibold text-sm">RAM</div>
              <div className="col-span-2 text-gray-400 font-semibold text-sm">Storage</div>
              <div className="col-span-2 text-gray-400 font-semibold text-sm">Network</div>
              <div className="col-span-2 text-gray-400 font-semibold text-sm text-right">Pricing</div>
            </div>

            {/* Table Rows */}
            {instances.map((instance, index) => (
              <div
                key={index}
                className={`grid grid-cols-10 gap-4 px-6 py-6 bg-black/40 backdrop-blur-sm border border-dark-border hover:border-primary/50 transition-all duration-300 ${
                  index === instances.length - 1 ? 'rounded-b-xl' : ''
                } ${index === 2 ? 'border-primary/30 bg-primary/5' : ''}`}
              >
                {/* Instance */}
                <div className="col-span-2">
                  {instance.badge && (
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                      instance.badge === 'Most Popular'
                        ? 'bg-primary/20 text-primary'
                        : instance.badge === 'Next Gen'
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {instance.badge}
                    </div>
                  )}
                  <div className="text-white font-bold text-lg">{instance.gpuCount}-GPU</div>
                  <div className="text-gray-300 font-semibold">{instance.gpu}</div>
                </div>

                {/* Processor */}
                <div className="text-gray-300">{instance.processor}</div>

                {/* RAM */}
                <div className="text-gray-300">{instance.ram}</div>

                {/* Storage */}
                <div className="col-span-2">
                  <div className="text-gray-300">{instance.nvmeStorage}</div>
                  <div className="text-gray-500 text-sm">{instance.additionalStorage}</div>
                </div>

                {/* Network */}
                <div className="col-span-2 text-gray-300 text-sm leading-relaxed">
                  {instance.network}
                </div>

                {/* Pricing */}
                <div className="col-span-2 text-right">
                  <div className="text-white font-bold text-2xl mb-1">
                    {getPrice(instance)}
                  </div>
                  {instance.monthlyPrice && (
                    <div className="text-gray-400 text-sm">
                      per {selectedPeriod === 'monthly' ? 'month' : selectedPeriod === '6-month' ? '6 months' : 'year'}
                    </div>
                  )}
                  {getSavings(instance) && (
                    <div className="text-green-400 text-sm font-semibold mt-1">
                      {getSavings(instance)}
                    </div>
                  )}
                  <a
                    href="https://hanzo.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 inline-block px-6 py-2 rounded-lg font-semibold transition-all duration-300 text-center ${
                      instance.monthlyPrice
                        ? 'bg-secondary text-white hover:bg-secondary/90'
                        : 'border border-secondary text-secondary hover:bg-secondary/10'
                    }`}
                  >
                    {instance.monthlyPrice ? 'Get Cloud Access' : 'Contact Sales'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8">
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-left">
                <p className="text-gray-300 mb-3">
                  <strong className="text-white">Not seeing what you need?</strong> The above represents our most popular GPU cloud instances, but we have one of the largest selections of NVIDIA GPUs available.
                </p>
                <p className="text-gray-400">
                  Contact us for a specialized cloud quote for the exact configuration you need, including custom networking, storage, and scaling options.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://hanzo.ai/pricing"
                    className="inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors"
                  >
                    View Full Pricing Page
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href="https://hanzo.ai/contact"
                    className="inline-flex items-center text-secondary hover:text-secondary/80 font-semibold transition-colors"
                  >
                    Request Custom Quote
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">Instant Provisioning</h3>
            <p className="text-gray-400 text-sm">Deploy GPU instances in minutes, not weeks</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-full mb-4">
              <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">Enterprise SLA</h3>
            <p className="text-gray-400 text-sm">99.9% uptime guarantee with 24/7 support</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/10 rounded-full mb-4">
              <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">Flexible Scaling</h3>
            <p className="text-gray-400 text-sm">Scale up or down based on workload demands</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-500/10 rounded-full mb-4">
              <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">Managed Services</h3>
            <p className="text-gray-400 text-sm">Optional full infrastructure management by Hanzo.AI</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudPricing;

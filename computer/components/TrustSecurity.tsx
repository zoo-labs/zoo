
import React from 'react';

const TrustSecurity: React.FC = () => {
  const certifications = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "SOC 2 Type II",
      description: "Certified for security, availability, and confidentiality"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "GDPR Compliant",
      description: "Full compliance with EU data protection regulations"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "ISO 27001",
      description: "International standard for information security"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "HIPAA Available",
      description: "Healthcare compliance for enterprise customers"
    }
  ];

  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description: "AES-256 encryption at rest, TLS 1.3 in transit",
      icon: "🔒"
    },
    {
      title: "Private Networking",
      description: "Isolated VPCs with custom firewall rules",
      icon: "🌐"
    },
    {
      title: "24/7 Monitoring",
      description: "Real-time threat detection and response",
      icon: "👁️"
    },
    {
      title: "Regular Audits",
      description: "Third-party security audits quarterly",
      icon: "🛡️"
    },
    {
      title: "Access Controls",
      description: "Role-based permissions and 2FA",
      icon: "🔑"
    },
    {
      title: "Data Residency",
      description: "Choose your data center location",
      icon: "📍"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-dark-bg to-dark-bg/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-4">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-primary font-semibold">Enterprise-Grade Security</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Data, Your Control
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built on a foundation of security, compliance, and trust. Your AI workloads are protected by industry-leading safeguards.
          </p>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full text-primary mb-4">
                {cert.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-gray-400 text-sm">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Comprehensive Security Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">100%</div>
            <div className="text-gray-300 font-semibold mb-1">Uptime SLA</div>
            <div className="text-gray-500 text-sm">Guaranteed availability for enterprise</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">&lt;15min</div>
            <div className="text-gray-300 font-semibold mb-1">Incident Response</div>
            <div className="text-gray-500 text-sm">Average time to security incident resolution</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">Zero</div>
            <div className="text-gray-300 font-semibold mb-1">Data Breaches</div>
            <div className="text-gray-500 text-sm">Perfect security record since inception</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSecurity;

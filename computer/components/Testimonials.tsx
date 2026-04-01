
import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "DGX Spark gave us the compute power to train our models without breaking the bank. The setup was instant and the performance exceeded our expectations.",
      author: "Dr. Sarah Chen",
      title: "ML Research Lead",
      company: "Stanford AI Lab",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=FF6B35&color=fff&size=80"
    },
    {
      quote: "Moving to Hanzo.Computer's infrastructure cut our training time by 60%. The H200 GPUs are game-changing for our generative AI workloads.",
      author: "Marcus Rodriguez",
      title: "CTO",
      company: "Nexus AI",
      image: "https://ui-avatars.com/api/?name=Marcus+Rodriguez&background=004E89&color=fff&size=80"
    },
    {
      quote: "The pre-configured AI stack saved us weeks of DevOps work. We went from purchase to production in under 24 hours.",
      author: "Jennifer Park",
      title: "Head of Engineering",
      company: "Quantum Labs",
      image: "https://ui-avatars.com/api/?name=Jennifer+Park&background=00D9FF&color=000&size=80"
    }
  ];

  return (
    <section className="py-24 bg-dark-bg/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by AI Innovators
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join leading researchers and companies accelerating their AI development with Hanzo.Computer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="mb-6">
                <svg className="w-10 h-10 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                  <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl px-8 py-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">500+</div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
            <div className="h-12 w-px bg-dark-border"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">50M+</div>
              <div className="text-gray-400 text-sm">GPU Hours Delivered</div>
            </div>
            <div className="h-12 w-px bg-dark-border"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime SLA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

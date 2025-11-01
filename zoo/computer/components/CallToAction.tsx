
import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-dark-card/50">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Build the Future?
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10">
                Stop waiting for compute. Get access to the world's most powerful AI platform today and accelerate your innovation.
            </p>
            <a href="#contact" className="bg-primary text-black font-bold py-4 px-10 rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 text-lg inline-block shadow-lg shadow-primary/20">
                Request Your Access Now
            </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

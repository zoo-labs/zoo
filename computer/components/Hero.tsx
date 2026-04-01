
import React from 'react';

const PartnerLogos = () => (
    <div className="flex items-center justify-center gap-8 flex-wrap">
        <div className="flex flex-col items-center gap-1 opacity-70">
            <img src="/nvidia-logo-clean.svg" alt="NVIDIA" className="h-10 w-auto" />
            <span className="text-[9px] text-gray-400 font-semibold tracking-wider">INCEPTION PROGRAM</span>
        </div>
        <div className="opacity-70">
            <img src="/techstars-white.svg" alt="Techstars" className="h-7 w-auto" />
        </div>
        <div className="opacity-70">
            <img src="/digitalocean-white.svg" alt="DigitalOcean" className="h-6 w-auto" />
        </div>
    </div>
)

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden">
        <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{backgroundImage: "url('/nvidia-dgx-superpod.jpg')"}}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg/80 to-dark-bg"></div>

        <div className="container mx-auto px-6 text-center relative z-10 animate-fade-in-up">
            <div className="flex justify-center mb-6">
                <PartnerLogos />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                AI Supercomputing 
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                On Your Terms
                </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-10">
                Access NVIDIA's latest Blackwell architecture GPUs. Rent or buy B200 and B100 GPUs with unprecedented AI performance, 192GB HBM3e memory, and next-generation capabilities for frontier model training and inference.
            </p>
            <div className="flex justify-center items-center space-x-4">
                <a href="#pricing" className="bg-primary text-black font-bold py-4 px-10 rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 text-lg">
                    Get Started
                </a>
                <a href="#dgx-spark" className="border border-dark-border text-white font-medium py-4 px-10 rounded-lg hover:bg-white/10 transition-all duration-300 text-lg">
                    View Hardware
                </a>
            </div>
        </div>
    </section>
  );
};

export default Hero;
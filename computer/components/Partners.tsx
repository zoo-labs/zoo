
import React from 'react';

const HanzoAILogo = () => (
    <div className="flex items-center space-x-3">
        <img src="/hanzo-h-white.svg" alt="Hanzo" className="h-10 w-auto opacity-60" />
        <span className="text-3xl font-bold text-gray-400">Hanzo AI</span>
    </div>
);

const NvidiaInceptionLogo = () => (
    <div className="flex flex-col items-center justify-center gap-1.5 opacity-60">
        <img src="/nvidia-logo-clean.svg" alt="NVIDIA" className="h-12 w-auto" />
        <span className="text-[10px] text-gray-400 font-semibold tracking-wider">INCEPTION PROGRAM</span>
    </div>
);

const TechstarsLogo = () => (
    <div className="flex items-center justify-center">
        <img src="/techstars-logo.png" alt="Techstars" className="h-10 w-auto" />
    </div>
);

const DigitalOceanLogo = () => (
    <div className="flex items-center justify-center">
        <img src="/digitalocean-white.svg" alt="DigitalOcean" className="h-7 w-auto opacity-60" />
    </div>
);


const Partners: React.FC = () => {
  return (
    <section className="py-12 bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
          <HanzoAILogo />
          <div className="h-10 w-px bg-gray-700 hidden md:block"></div>
          <NvidiaInceptionLogo />
          <div className="h-10 w-px bg-gray-700 hidden md:block"></div>
          <TechstarsLogo />
          <div className="h-10 w-px bg-gray-700 hidden md:block"></div>
          <DigitalOceanLogo />
        </div>
      </div>
    </section>
  );
};

export default Partners;

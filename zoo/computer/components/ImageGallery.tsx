import React from 'react';

// Using local NVIDIA images from /public directory
const images = [
  { src: '/nvidia-dgx-superpod.jpg', alt: 'NVIDIA DGX SuperPOD - Liquid Cooled AI Infrastructure' },
  { src: '/robotics-and-omniverse.jpg', alt: 'NVIDIA Omniverse - Digital Twin and Robotics Platform' },
  { src: '/nvidia-ai-data-platform.jpg', alt: 'NVIDIA AI Data Platform - End-to-End AI Solutions' },
  { src: '/h200-nvl.jpg', alt: 'NVIDIA H200 NVL - Next-Gen AI GPU' },
  { src: '/industrial-ai.png', alt: 'Industrial AI - Manufacturing and Automation' },
  { src: '/quantum-computing.jpg', alt: 'Quantum Computing - Future of HPC' },
  { src: '/nvlink-fusion.jpg', alt: 'NVLink Fusion - High-Speed GPU Interconnect' },
  { src: '/silicon-photonics-networking.jpg', alt: 'Silicon Photonics - Next-Gen Networking' },
  { src: '/jetson-thor.png', alt: 'NVIDIA Jetson Thor - Robotics AI Computer' },
  { src: '/nvidia-blackwell-ultra.jpg', alt: 'NVIDIA Blackwell Ultra - Next-Gen Architecture' },
  { src: '/gtc-paris-dgx-cloud-lepton.jpg', alt: 'NVIDIA DGX Cloud - AI Infrastructure as a Service' },
  { src: '/tsmc-chip.jpg', alt: 'Advanced Silicon Manufacturing' },
];

const ImageGallery: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Inside the AI Revolution</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">A glimpse into the technology powering the future, from silicon to supercomputers.</p>
        </div>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg break-inside-avoid">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;

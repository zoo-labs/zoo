import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface QRCodeProps {
  data: string;
  alt: string;
}

function QRCodeImage({ data, alt }: QRCodeProps) {
  const [hasError, setHasError] = useState(false);
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=${encodeURIComponent(data)}`;
  
  if (hasError) {
    // Fallback to a different QR service if the first one fails
    const fallbackUrl = `https://chart.googleapis.com/chart?chs=192x192&cht=qr&chl=${encodeURIComponent(data)}`;
    return (
      <img 
        src={fallbackUrl}
        alt={alt}
        className="w-48 h-48"
        onError={() => console.warn('QR code generation failed')}
      />
    );
  }
  
  return (
    <img 
      src={qrCodeUrl}
      alt={alt}
      className="w-48 h-48"
      onError={() => setHasError(true)}
    />
  );
}

function CryptoDonationPage() {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${type} address copied to clipboard!`);
    });
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Header/Navigation would go here - you may want to include your existing Navbar component */}
      
      <div className="max-md:pt-20 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link 
              href="/donation" 
              className="text-white hover:text-gray-300 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Donation</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Donate with Crypto
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Support our mission to preserve wildlife biodiversity through cryptocurrency donations. 
              Your crypto donation helps fund animal sanctuaries and conservation efforts worldwide.
            </p>
          </div>

          {/* Crypto Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Bitcoin */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-400">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">₿</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Bitcoin (BTC)</h2>
                <p className="text-gray-400 mb-6">Send Bitcoin directly to our wallet</p>
                
                {/* QR Code for Bitcoin */}
                <div className="bg-white p-4 rounded-lg mb-4 inline-block">
                  <QRCodeImage 
                    data="bitcoin:3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk"
                    alt="Bitcoin QR Code"
                  />
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-2">Bitcoin Address:</p>
                  <button 
                    onClick={() => copyToClipboard('3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk', 'Bitcoin')}
                    className="text-sm text-white break-all hover:text-gray-300 transition-colors"
                  >
                    3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk
                  </button>
                </div>
                
                <button 
                  onClick={() => copyToClipboard('3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk', 'Bitcoin')}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Copy Bitcoin Address
                </button>
              </div>
            </div>

            {/* Ethereum */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Ethereum (ETH)</h2>
                <p className="text-gray-400 mb-6">Send Ethereum directly to our wallet</p>
                
                {/* QR Code for Ethereum */}
                <div className="bg-white p-4 rounded-lg mb-4 inline-block">
                  <QRCodeImage 
                    data="ethereum:0xA59Ad3199E6fdd0046d259944d3d18ee379152CB"
                    alt="Ethereum QR Code"
                  />
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-2">Ethereum Address:</p>
                  <button 
                    onClick={() => copyToClipboard('0xA59Ad3199E6fdd0046d259944d3d18ee379152CB', 'Ethereum')}
                    className="text-sm text-white break-all hover:text-gray-400 transition-colors"
                  >
                    0xA59Ad3199E6fdd0046d259944d3d18ee379152CB
                  </button>
                </div>
                
                <button 
                  onClick={() => copyToClipboard('0xA59Ad3199E6fdd0046d259944d3d18ee379152CB', 'Ethereum')}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Copy Ethereum Address
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Important Information</h3>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>• Please ensure you're sending to the correct network (Bitcoin or Ethereum)</p>
                <p>• Minimum donation amounts may apply depending on network fees</p>
                <p>• All cryptocurrency donations are non-refundable</p>
                <p>• You will receive a donation receipt via email if you contact us</p>
                <p>• For questions, contact us at <span className="text-white">hello@zoo.ngo</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoDonationPage;
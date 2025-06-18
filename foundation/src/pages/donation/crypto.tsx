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
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546z"/>
                    <path d="M17.415 11.688c.239-1.597-.977-2.456-2.638-3.03l.54-2.163-1.315-.328-.525 2.106c-.345-.086-.7-.167-1.053-.246l.53-2.123-1.315-.328-.539 2.163c-.286-.065-.566-.13-.84-.198l.001-.007-1.815-.453-.35 1.406s.977.224.957.238c.533.133.63.486.614.766l-.615 2.466c.037.009.085.023.138.043l-.139-.035-.862 3.456c-.065.161-.23.403-.602.311.013.019-.957-.239-.957-.239l-.654 1.507 1.713.427c.319.08.632.164.939.243l-.544 2.184 1.314.328.54-2.164c.359.097.707.186 1.048.272l-.539 2.157 1.315.328.544-2.183c2.244.425 3.931.253 4.643-1.776.574-1.639-.029-2.587-1.214-3.202.863-.199 1.513-.766 1.687-1.938zm-3.018 4.233c-.407 1.634-3.157.751-4.05.529l.722-2.895c.893.223 3.752.664 3.328 2.366zm.407-4.262c-.37 1.487-2.662.732-3.405.547l.655-2.628c.743.185 3.137.53 2.75 2.081z"/>
                  </svg>
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
                    className="text-sm text-white break-all hover:text-orange-400 transition-colors"
                  >
                    3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk
                  </button>
                </div>
                
                <button 
                  onClick={() => copyToClipboard('3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk', 'Bitcoin')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Copy Bitcoin Address
                </button>
              </div>
            </div>

            {/* Ethereum */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
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
                    className="text-sm text-white break-all hover:text-blue-400 transition-colors"
                  >
                    0xA59Ad3199E6fdd0046d259944d3d18ee379152CB
                  </button>
                </div>
                
                <button 
                  onClick={() => copyToClipboard('0xA59Ad3199E6fdd0046d259944d3d18ee379152CB', 'Ethereum')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
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
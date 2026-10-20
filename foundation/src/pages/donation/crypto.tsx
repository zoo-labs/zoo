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
        style={{ width: 192, height: 192 }}
        onError={() => console.warn('QR code generation failed')}
      />
    );
  }
  
  return (
    <img 
      src={qrCodeUrl}
      alt={alt}
      style={{ width: 192, height: 192 }}
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
    <div className="bg-background min-h-screen">
      {/* Header/Navigation would go here - you may want to include your existing Navbar component */}
      
      <div className="py-24">
        <div className="container">
          {/* Back button */}
          <div className="mb-8">
            <Link 
              href="/donation" 
              className="text-foreground flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Donation</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Donate with Crypto
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Support our mission to preserve wildlife biodiversity through cryptocurrency donations. 
              Your crypto donation helps fund animal sanctuaries and conservation efforts worldwide.
            </p>
          </div>

          {/* Crypto Options */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Bitcoin */}
            <div className="card p-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="disc" style={{ '--hue': 'var(--berry)' } as React.CSSProperties}>
                    <span className="text-2xl font-bold">₿</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Bitcoin (BTC)</h2>
                <p className="text-muted mb-6">Send Bitcoin directly to our wallet</p>
                
                {/* QR Code for Bitcoin */}
                <div className="bg-white p-4 rounded-lg mb-4 inline-flex">
                  <QRCodeImage 
                    data="bitcoin:3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk"
                    alt="Bitcoin QR Code"
                  />
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <p className="text-xs text-muted mb-2">Bitcoin Address:</p>
                  <button 
                    onClick={() => copyToClipboard('3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk', 'Bitcoin')}
                    className="text-sm text-foreground transition-colors" style={{ wordBreak: 'break-all' }}
                  >
                    3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk
                  </button>
                </div>
                
                <button 
                  onClick={() => copyToClipboard('3G3PrtfP5LxNe83T7GRFhLPSLURz4jBdYk', 'Bitcoin')}
                  className="btn btn-primary w-full"
                >
                  Copy Bitcoin Address
                </button>
              </div>
            </div>

            {/* Ethereum */}
            <div className="card p-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="disc" style={{ '--hue': 'var(--blue)' } as React.CSSProperties}>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
                  </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Ethereum (ETH)</h2>
                <p className="text-muted mb-6">Send Ethereum directly to our wallet</p>
                
                {/* QR Code for Ethereum */}
                <div className="bg-white p-4 rounded-lg mb-4 inline-flex">
                  <QRCodeImage 
                    data="ethereum:0xA59Ad3199E6fdd0046d259944d3d18ee379152CB"
                    alt="Ethereum QR Code"
                  />
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <p className="text-xs text-muted mb-2">Ethereum Address:</p>
                  <button 
                    onClick={() => copyToClipboard('0xA59Ad3199E6fdd0046d259944d3d18ee379152CB', 'Ethereum')}
                    className="text-sm text-foreground transition-colors" style={{ wordBreak: 'break-all' }}
                  >
                    0xA59Ad3199E6fdd0046d259944d3d18ee379152CB
                  </button>
                </div>
                
                <button 
                  onClick={() => copyToClipboard('0xA59Ad3199E6fdd0046d259944d3d18ee379152CB', 'Ethereum')}
                  className="btn btn-primary w-full"
                >
                  Copy Ethereum Address
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="card p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-foreground mb-4">Important Information</h3>
              <div className="text-secondary space-y-2 text-sm">
                <p>• Please ensure you're sending to the correct network (Bitcoin or Ethereum)</p>
                <p>• Minimum donation amounts may apply depending on network fees</p>
                <p>• All cryptocurrency donations are non-refundable</p>
                <p>• You will receive a donation receipt via email if you contact us</p>
                <p>• For questions, contact us at <span className="text-foreground">hello@zoo.ngo</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoDonationPage;
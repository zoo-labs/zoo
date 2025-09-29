import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PhoneBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('phoneBannerDismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('phoneBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] bg-black border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-4">
          <span className="text-white font-medium">Need help?</span>
          <Link
            href="tel:1-800-ZOO-HELP"
            className="text-white font-bold hover:text-gray-400 transition-colors"
          >
            1-800-ZOO-HELP
          </Link>
          <span className="text-gray-400 text-sm">(1-800-966-4357)</span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white transition-colors p-2"
          aria-label="Close banner"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
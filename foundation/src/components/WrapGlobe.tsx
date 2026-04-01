import dynamic from 'next/dynamic';
import React from 'react';

const WrapGlobe = dynamic(
  () => import('@/components/Globe').catch(() => {
    // Fallback component if Globe fails to load
    return {
      default: () => (
        <div className="bg-black py-16 text-center">
          <div className="text-gray-400">Interactive globe loading...</div>
        </div>
      )
    };
  }),
  {
    ssr: false,
    loading: () => (
      <div className="bg-black py-16 text-center">
        <div className="text-gray-400 animate-pulse">Loading interactive globe...</div>
      </div>
    )
  }
);

export default WrapGlobe;
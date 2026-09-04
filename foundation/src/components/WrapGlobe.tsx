import dynamic from 'next/dynamic';
import React from 'react';

const WrapGlobe = dynamic(
  () => import('@/components/Globe').catch(() => {
    // Fallback component if Globe fails to load
    return {
      default: () => (
        <div className="py-8 text-center">
          <div className="text-gray-500 text-sm">Interactive globe loading...</div>
        </div>
      )
    };
  }),
  {
    ssr: false,
    loading: () => (
      <div className="py-8 text-center">
        <div className="text-gray-500 text-sm animate-pulse">Loading interactive globe...</div>
      </div>
    )
  }
);

export default WrapGlobe;
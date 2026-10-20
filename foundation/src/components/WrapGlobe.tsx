import dynamic from 'next/dynamic';
import React from 'react';

const WrapGlobe = dynamic(
  () => import('@/components/Globe').catch(() => {
    // Fallback component if Globe fails to load
    return {
      default: () => (
        <div className="py-16 text-center text-muted">Interactive globe loading...</div>
      )
    };
  }),
  {
    ssr: false,
    loading: () => (
      <div className="py-16 text-center text-muted">Loading interactive globe...</div>
    )
  }
);

export default WrapGlobe;
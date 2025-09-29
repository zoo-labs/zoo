import * as React from 'react';
import PhoneBanner from '@/components/PhoneBanner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PhoneBanner />
      {children}
    </>
  );
}

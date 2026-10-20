import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div
            className='container flex flex-col items-center justify-center text-center text-black'
            style={{ minHeight: 'calc(100vh - var(--nav-h))' }}
          >
            <RiAlarmWarningFill size={60} className='text-zinc-500' aria-hidden />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            {/* A link, said once. This used to be three polymorphic components
                and a class merger stacked on `next/link`, for this one call —
                and what they added was a dotted underline, which is the thing
                this site does not draw. */}
            <Link href='/' className='mt-4 text-lg font-medium'>
              Back to Home →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}

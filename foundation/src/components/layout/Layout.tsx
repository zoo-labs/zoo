import * as React from 'react';
import Link from 'next/link';
export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return <>{children}
    {/* <div className='hidden max-md:block fixed top-5 z-[1000] right-5'>
      <Link href='/donation' className='bg-white rounded-full text-lg text-black px-4 py-2'>
        Donate
      </Link>
    </div> */}
  </>;
}

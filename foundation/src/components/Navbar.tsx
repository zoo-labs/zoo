import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { CTA, LABS, NAV } from '@/config/registry';

/**
 * The header, in the shape hanzo.ai's is: a sticky bar with the mark on the
 * left, sentence-case ghost links in the middle, and exactly ONE filled
 * control — so it is never ambiguous where the primary action is.
 *
 * Desktop and mobile render the same `NAV` array. They used to be two
 * hand-written copies that had drifted apart in both wording and destinations,
 * which is the whole reason the phone menu read as a different site.
 */
function Navbar() {
  const [open, setOpen] = useState(false);

  // A resize past the breakpoint leaves the sheet mounted but its trigger
  // hidden, so the page is left scroll-locked with no way to unlock it.
  useEffect(() => {
    if (!open) return;
    const wide = window.matchMedia('(min-width: 768px)');
    const close = () => setOpen(false);
    wide.addEventListener('change', close);
    return () => wide.removeEventListener('change', close);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className='sticky top-0 z-50'
      style={{
        background: 'var(--surface-header)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className='mx-auto flex items-center gap-3'
        style={{ height: 'var(--header)', paddingInline: 'var(--page-gutter)', maxWidth: 1280 }}
      >
        <Link href='/' className='flex shrink-0 items-center gap-2.5'>
          <Image
            alt=''
            aria-hidden
            src='/zooLogoLight.svg'
            width={28}
            height={28}
            className='rounded-full'
          />
          <span className='text-[15px] font-semibold tracking-tight'>
            Zoo <span style={{ color: 'var(--muted-foreground)' }}>Foundation</span>
          </span>
        </Link>

        <nav aria-label='Main' className='ml-4 hidden items-center gap-1 md:flex'>
          {NAV.map((item) => (
            <Link key={item.id} href={item.href} className='more px-3 py-1.5'>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='ml-auto flex items-center gap-2'>
          <a
            href={LABS.href}
            target='_blank'
            rel='noopener noreferrer'
            className='more hidden sm:inline-flex'
          >
            {LABS.label} <span aria-hidden>↗</span>
          </a>
          <Link
            href={CTA.href}
            className='action hidden sm:inline-flex'
            data-fill=''
            style={{ minHeight: 34, paddingInline: 16, fontSize: 13 }}
          >
            {CTA.label}
          </Link>

          <button
            type='button'
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls='menu'
            aria-label={open ? 'Close menu' : 'Open menu'}
            className='-mr-2 inline-flex items-center justify-center rounded-lg p-2 md:hidden'
            style={{ color: 'var(--foreground)' }}
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              aria-hidden
            >
              {open ? <path d='M6 18 18 6M6 6l12 12' /> : <path d='M4 7h16M4 12h16M4 17h16' />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id='menu'
          className='md:hidden'
          style={{ borderTop: '1px solid var(--border)', background: 'var(--background)' }}
        >
          <nav
            aria-label='Main'
            className='flex flex-col gap-1 px-5 pb-6 pt-4'
            style={{ paddingInline: 'var(--page-gutter)' }}
          >
            {NAV.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className='rounded-lg py-2.5 text-[15px] font-medium'
              >
                {item.label}
              </Link>
            ))}
            <a
              href={LABS.href}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setOpen(false)}
              className='rounded-lg py-2.5 text-[15px] font-medium'
              style={{ color: 'var(--muted-foreground)' }}
            >
              {LABS.label} <span aria-hidden>↗</span>
            </a>
            <Link
              href={CTA.href}
              onClick={() => setOpen(false)}
              className='action mt-3'
              data-fill=''
            >
              {CTA.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;

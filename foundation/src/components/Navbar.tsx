import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronDown, Menu, X } from 'lucide-react';
import { LABS, SECTIONS, type Dest, type Section } from '@/config/registry';
import Away from '@/components/Away';

/**
 * The bar.
 *
 * It reads `registry.ts` for what the site contains and `--night` for what
 * colour it is, so it holds no destinations and no palette of its own. A
 * section draws a chevron when — and only when — it has a menu, which is why
 * nothing anywhere carries a flag saying whether to draw one.
 *
 * The bar wears `.night`, so the pill on the right is drawn white-on-nothing by
 * the same `.action` rule that draws a filled berry button on the paper. There
 * is no colour override in this file.
 */

/** The section whose pages we are on. Nothing else claims `/`, so home is the Foundation's. */
function currentOf(path: string): Section {
  const owns = (s: Section) => {
    const root = s.href.split('#')[0];
    return root.startsWith('/') && root !== '/' && path.startsWith(root);
  };
  return SECTIONS.find(owns) ?? SECTIONS[SECTIONS.length - 1];
}

function Wordmark({ size }: { size: number }) {
  return <span style={{ fontSize: size, fontWeight: 700, letterSpacing: '0.06em', lineHeight: 1 }}>ZOO</span>;
}

const entry: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 6,
  padding: '8px 10px',
  borderRadius: 'var(--radius-md)',
  color: 'var(--carbon)',
};

/** One destination in a menu. Where it goes decides which element carries it. */
function Item({ to, onGo }: { to: Dest; onGo?: () => void }) {
  const body = (
    <span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-sm)', fontWeight: 500 }}>
        {to.label}
        {to.away && <Away />}
      </span>
      {to.note && (
        <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{to.note}</span>
      )}
    </span>
  );

  return to.away ? (
    <a href={to.href} target='_blank' rel='noopener noreferrer' style={entry} onClick={onGo}>
      {body}
    </a>
  ) : (
    <Link href={to.href} style={entry} onClick={onGo}>
      {body}
    </Link>
  );
}

/**
 * The bar takes the ground of the page it sits on.
 *
 * The landing opens on a night band and the bar is the top of it, so there the
 * two are one field. Every other page opens on paper, and a night bar there is
 * a dark slab laid across a light page — the seam this file exists to avoid.
 * Paper is the default because most pages are paper; only the landing asks.
 */
export default function Navbar({ ground = 'paper' }: { ground?: 'night' | 'paper' }) {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const current = currentOf(useRouter().pathname);
  const night = ground === 'night';

  // The bar has nothing to cover until something scrolls under it, so until then
  // it is not drawn. `passive` because this listener must never be the reason a
  // scroll stutters, and the state is a boolean rather than the offset so React
  // re-renders twice a page rather than once a frame.
  useEffect(() => {
    const read = () => setLifted(window.scrollY > 8);
    read();
    window.addEventListener('scroll', read, { passive: true });
    return () => window.removeEventListener('scroll', read);
  }, []);

  return (
    <nav
      // An open menu covers the page whether the page has scrolled or not, so
      // the glass comes with it.
      className={`${night ? 'night' : ''} bar ${lifted || open ? 'lifted' : ''} select-none`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        // The published ladder, not a number picked to win. 999 outranked every
        // rung there is, so the chat panel — a popover, and above the header by
        // construction — had nowhere left to sit.
        zIndex: 'var(--z-header)' as unknown as number,
      }}
    >
      <div
        className='flex items-center justify-between'
        style={{ height: 'var(--nav-h)', padding: '0 clamp(16px, 3vw, 32px)' }}
      >
        <Link href='/' aria-label='Zoo Labs Foundation'>
          <Wordmark size={22} />
        </Link>

        <div className='hidden lg:flex items-center gap-1'>
          {SECTIONS.map((s) => {
            const here = s === current;
            return (
              <div key={s.label} className='section relative' style={{ paddingBottom: 10, marginBottom: -10 }}>
                <Link
                  href={s.href}
                  aria-current={here ? 'page' : undefined}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 10px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    // The current page is said in ink and in aria-current, never with
                    // a rule under the word: a line under a link reads as an underline
                    // whatever draws it, and this shell draws none.
                    //
                    // The ink is the ground's own foreground, not a colour: `.night`
                    // redefines --carbon to white, so one declaration is full-strength
                    // on either ground and a hardcoded white would vanish on paper.
                    color: here ? 'var(--carbon)' : 'var(--text-secondary)',
                  }}
                >
                  {s.label}
                  {s.items && <ChevronDown size={13} strokeWidth={2} aria-hidden />}
                </Link>

                {s.items && (
                  <div
                    className='menu glass absolute'
                    style={{ left: '50%', transform: 'translateX(-50%)', marginTop: 10, padding: 6, width: 320 }}
                  >
                    {s.items.map((to) => (
                      <Item key={to.label} to={to} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className='flex items-center gap-2'>
          <a
            href={LABS.href}
            target='_blank'
            rel='noopener noreferrer'
            className='action'
            style={{ minHeight: 36, paddingInline: 'var(--space-4)', letterSpacing: '0.04em' }}
          >
            {LABS.label}
            <Away />
          </a>

          <button
            className='inline-flex lg:hidden'
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{ padding: 6 }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className='lg:hidden'
          style={{
            maxHeight: 'calc(100vh - var(--nav-h))',
            overflowY: 'auto',
            padding: '0 clamp(16px, 3vw, 32px) var(--space-6)',
            borderTop: '1px solid color-mix(in oklab, var(--carbon) 11%, transparent)',
          }}
        >
          {SECTIONS.map((s) => (
            <div key={s.label} style={{ paddingTop: 'var(--space-5)' }}>
              <Link href={s.href} onClick={() => setOpen(false)} style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                {s.label}
              </Link>
              {s.items && (
                <div style={{ paddingTop: 4 }}>
                  {s.items.map((to) => (
                    <Item key={to.label} to={to} onGo={() => setOpen(false)} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

import React from 'react';
import Link from 'next/link';
import { FaEnvelope, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { LABS, LEGAL, SECTIONS, SOCIAL } from '@/config/registry';
import Away from '@/components/Away';

/**
 * The foot.
 *
 * Same list as the bar, read from the same file, so the two can never disagree
 * about what the site contains. The four columns of hand-kept links that used
 * to be here were a second registry with its own idea of where things lived.
 *
 * The three marks below are logos, not line icons, which is why they come from
 * the brand set rather than from lucide — one library per job. `MARK` is keyed
 * by the label in the registry, so a social account is added there and drawn
 * here, and a name with no mark simply does not appear.
 */
const MARK: Record<string, React.ComponentType<{ size?: number }>> = {
  GitHub: FaGithub,
  X: FaXTwitter,
  Email: FaEnvelope,
};

const quiet: React.CSSProperties = { fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' };

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: '#ffffff' }}>
      <div className='container' style={{ paddingBlock: 'var(--space-12)' }}>
        <div className='flex flex-wrap items-center justify-between gap-6'>
          <div>
            <Link href='/' aria-label='Zoo Labs Foundation'>
              <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.06em', lineHeight: 1 }}>ZOO</span>
            </Link>
            <p style={{ marginTop: 10, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              &copy; 2026 Zoo Labs Foundation, Inc.{' '}
              {LEGAL.map((to) => (
                <Link key={to.label} href={to.href} style={{ color: 'inherit', marginLeft: 10 }}>
                  {to.label}
                </Link>
              ))}
            </p>
          </div>

          <nav className='flex flex-wrap items-center gap-6'>
            {SECTIONS.map((s) => (
              <Link key={s.label} href={s.href} style={quiet}>
                {s.label}
              </Link>
            ))}
            <a
              href={LABS.href}
              target='_blank'
              rel='noopener noreferrer'
              style={{ ...quiet, display: 'inline-flex', alignItems: 'center', gap: 4, letterSpacing: '0.04em' }}
            >
              {LABS.label}
              <Away />
            </a>
          </nav>

          <div className='flex items-center gap-4'>
            {SOCIAL.map((to) => {
              const Glyph = MARK[to.label];
              if (!Glyph) return null;
              return (
                <a
                  key={to.label}
                  href={to.href}
                  aria-label={to.label}
                  style={{ color: 'var(--text-tertiary)', display: 'inline-flex' }}
                  {...(to.away ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Glyph size={17} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

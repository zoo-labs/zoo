import Link from 'next/link';
import { BsMedium } from 'react-icons/bs';
import {
  FaDiscord,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import type { ComponentType } from 'react';

import {
  FOOTER_BOTTOM,
  FOOTER_COLUMNS,
  SOCIAL,
  type Link as Destination,
} from '@/config/registry';

/**
 * The footer, in the shape hanzo.ai's is: an auto-fitting column grid over a
 * legal bar, every link resolved from the registry.
 *
 * ONE tree, not two. This used to be a `max-md:hidden` desktop grid beside a
 * `hidden max-md:block` phone block, each with its own hand-written link list —
 * so the phone footer offered six destinations the desktop one did not, and
 * neither agreed with the header. `auto-fit` collapses to a single column on a
 * phone without a second copy existing to drift.
 */

const ICON: Record<string, ComponentType<{ size?: number }>> = {
  x: FaTwitter,
  telegram: FaTelegram,
  instagram: FaInstagram,
  discord: FaDiscord,
  medium: BsMedium,
  youtube: FaYoutube,
};

function Dest({ item }: { item: Destination }) {
  const props = item.external
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {};
  return (
    <Link href={item.href} {...props} className='more'>
      {item.label}
      {item.external && <span aria-hidden>↗</span>}
    </Link>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--background)' }}>
      <div
        className='mx-auto'
        style={{ maxWidth: 1280, padding: '64px var(--page-gutter) 32px' }}
      >
        <div
          className='grid gap-x-6 gap-y-10'
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}
        >
          <div className='flex flex-col gap-4' style={{ gridColumn: '1 / -1', maxWidth: '32rem' }}>
            <p className='text-[15px] font-semibold tracking-tight'>Zoo Labs Foundation</p>
            <p className='text-sm' style={{ color: 'var(--muted-foreground)' }}>
              A 501(c)(3) non-profit publishing open conservation research and open-weight
              ecological AI. Everything we make is public.
            </p>
            <div className='flex items-center gap-4' style={{ color: 'var(--muted-foreground)' }}>
              {SOCIAL.map((s) => {
                const Icon = ICON[s.id];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={s.label}
                    className='more'
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.id} aria-label={col.title}>
              <p className='mb-3.5 text-[13px] font-semibold'>{col.title}</p>
              <ul className='m-0 flex list-none flex-col gap-2.5 p-0'>
                {col.items.map((item) => (
                  <li key={item.id} className='m-0 list-none p-0'>
                    <Dest item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          className='mt-10 flex flex-col gap-3 pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between'
          style={{ borderTop: '1px solid var(--border)', color: 'var(--muted-foreground)' }}
        >
          <p>
            {FOOTER_BOTTOM.copyright} {FOOTER_BOTTOM.notice}
          </p>
          <div className='flex flex-wrap gap-5'>
            {FOOTER_BOTTOM.links.map((item) => (
              <Dest key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

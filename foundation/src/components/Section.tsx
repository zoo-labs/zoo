import * as React from 'react';

import { cn } from '@/lib/clsxm';

/**
 * The horizontal measure every band on the site shares.
 *
 * It is the same 1280 and the same `--page-gutter` the header and the footer
 * already use, so a page's first heading starts on the same vertical as the
 * wordmark above it. Pages used to spell their own measure — `container mx-auto
 * px-4`, whose padding is 16px and whose width tops out at 1400 — which is why
 * /about and /ai began their text ~60px to the left of the logo.
 */
export const measure = { maxWidth: 1280, paddingInline: 'var(--page-gutter)' } as const;

export function Band({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto', className)} style={measure}>
      {children}
    </div>
  );
}

/**
 * A page section: the shared vertical rhythm, an optional tint to separate two
 * neighbouring bands, and an optional hairline. `tone='card'` is the quiet
 * lifted surface, not a second page colour.
 */
export default function Section({
  children,
  tone = 'page',
  edge,
  className,
  id,
}: {
  children: React.ReactNode;
  tone?: 'page' | 'card';
  edge?: 'top' | 'block';
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      style={{
        paddingBlock: 'clamp(4rem, 8vw, 6rem)',
        ...(tone === 'card' ? { background: 'var(--surface-card)' } : null),
        ...(edge === 'top' ? { borderTop: '1px solid var(--border)' } : null),
        ...(edge === 'block' ? { borderBlock: '1px solid var(--border)' } : null),
      }}
    >
      <Band className={className}>{children}</Band>
    </section>
  );
}

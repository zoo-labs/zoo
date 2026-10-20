import * as React from 'react';

/**
 * The header is fixed, so the page has to start below it. `--nav-h` is the
 * header's own height, read from the one place it is written — the 80px that
 * used to be here was a guess against a 48px bar, and it left a strip of paper
 * above every hero.
 */
export default function Layout({
  children,
  noPadding = false,
}: {
  children: React.ReactNode;
  noPadding?: boolean;
}) {
  return (
    <div
      style={{
        paddingTop: noPadding ? '0px' : 'var(--nav-h, 64px)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}


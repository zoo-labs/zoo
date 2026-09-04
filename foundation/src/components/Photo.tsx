import * as React from 'react';

import { cn } from '@/lib/clsxm';

/**
 * A framed photograph that leaves its frame empty when the file is not there.
 *
 * About twenty pictures this site asks for are not in the repository — the
 * species card art, the newsletter illustration, several expedition photos —
 * and a plain `<img>` whose source 404s draws the browser's broken-image glyph.
 * An empty plate reads as "no photograph yet"; a broken glyph reads as a fault.
 *
 * The `ref` callback matters as much as `onError`: an image referenced in the
 * server-rendered HTML usually finishes failing BEFORE React attaches its
 * listeners, so an `onError` handler alone never fires and the glyph stays on
 * the page. Testing `complete && naturalWidth === 0` at mount catches that case,
 * and `onError` catches the one that fails later.
 */
export default function Photo({
  src,
  alt,
  ratio = '4 / 3',
  className,
  imgClassName,
  loading = 'lazy',
  plate = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
  /**
   * Every species render under `public/images` is a square on solid #000 with
   * no alpha. `plate` gives the frame that same ground and stops cropping the
   * subject, so picture and frame read as one specimen plate.
   */
  plate?: boolean;
}) {
  const [failed, setFailed] = React.useState(false);

  const check = React.useCallback((el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div
      className={cn('overflow-hidden', className)}
      style={{
        aspectRatio: ratio,
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        background: plate ? 'var(--plate)' : 'var(--muted)',
      }}
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={check}
          src={src}
          alt={alt}
          loading={loading}
          onError={() => setFailed(true)}
          className={cn('h-full w-full', plate ? 'object-contain' : 'object-cover', imgClassName)}
        />
      )}
    </div>
  );
}

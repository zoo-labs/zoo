import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Portal from '@/components/Portal';

/**
 * Blue, in the corner of every page.
 *
 * It used to be a second Blue: its own system prompt, its own transport with a
 * fallback host, its own turns and composer — 380 lines answering the same
 * question the room at zoolabs.io answers, and free to drift from it on every
 * one of them. Two Blues is two Blues to be wrong.
 *
 * So this is a door, and the room behind it is the room. The home page opens on
 * the same one full height; every other page reaches it here. Anything Blue
 * learns to do, it does in both places on the day it learns it.
 *
 * `open-chat-widget` still opens it, because that is the event the rest of the
 * site dispatches.
 */
export default function Ask() {
  const [open, setOpen] = useState(false);
  const [needed, setNeeded] = useState(true);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('open-chat-widget', show);
    return () => window.removeEventListener('open-chat-widget', show);
  }, []);

  // A door to the room you are already standing in is not a door. The home page
  // opens on the room full height, so the disc waits until it has scrolled away
  // and then offers to bring it back.
  useEffect(() => {
    const room = document.querySelector('.portal');
    if (!room || typeof IntersectionObserver === 'undefined') return;
    const watch = new IntersectionObserver(([e]) => setNeeded(!e.isIntersecting), { threshold: 0.2 });
    watch.observe(room);
    return () => watch.disconnect();
  }, []);

  const disc: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-full)',
    background: 'var(--blue)',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <>
      {open && (
        <div
          role='dialog'
          aria-label='Talk to Blue'
          style={{
            position: 'fixed',
            bottom: 88,
            right: 'clamp(12px, 3vw, 24px)',
            width: 400,
            maxWidth: 'calc(100vw - 24px)',
            height: 620,
            maxHeight: 'calc(100vh - 120px)',
            overflow: 'hidden',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: 'var(--shadow-2xl)',
            zIndex: 'var(--z-popover)' as unknown as number,
          }}
        >
          <Portal />
          <button
            onClick={() => setOpen(false)}
            aria-label='Close'
            style={{
              ...disc,
              position: 'absolute',
              top: 12,
              left: 12,
              width: 32,
              height: 32,
              background: 'rgb(0 0 0 / 0.45)',
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {(needed || open) && (
        /* The mark IS the button. It is already a circle — three overlapping
           discs clipped to one — so a coloured plate behind it would be a
           second circle around the first, and a chat glyph on that plate would
           say "some assistant" where the foundation's own mark says whose. */
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close Blue' : 'Ask Blue'}
          aria-expanded={open}
          style={{
            position: 'fixed',
            bottom: 'clamp(12px, 3vw, 24px)',
            right: 'clamp(12px, 3vw, 24px)',
            display: 'inline-flex',
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-full)',
            // A button paints its own face; without this the mark sits on the
            // browser's grey plate and the circle reads as a sticker on a disc.
            background: 'transparent',
            border: 0,
            padding: 0,
            cursor: 'pointer',
            // No plate and no ring. The mark is already a circle; anything drawn
            // around it is a second circle around the first.
            boxShadow: 'none',
            overflow: 'hidden',
            zIndex: 'var(--z-popover)' as unknown as number,
          }}
        >
          {/* logo.svg is a 1024 canvas holding a 540 disc — the mark is barely
              half of what it ships, and at 56px the rest reads as a button that
              missed. The image is drawn at the size that makes the disc 56 and
              pulled back by the difference, so the colour goes to the edge. */}
          <img
            src='/favicon/logo.svg'
            alt=''
            width={106}
            height={106}
            // maxWidth, because the sheet clamps every image to its box and
            // that clamp is exactly what would undo the crop.
            style={{ display: 'block', width: 106, height: 106, maxWidth: 'none', margin: -25 }}
          />
        </button>
      )}
    </>
  );
}

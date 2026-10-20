import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Off site.
 *
 * One glyph, one size, everywhere the site points away from itself — drawn
 * rather than typed, because the arrow character it replaces has an emoji
 * presentation on some systems and turns a quiet mark into a coloured sticker.
 */
export default function Away() {
  return <ArrowUpRight size={14} strokeWidth={2} aria-hidden />;
}

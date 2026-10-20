import React, { useState } from 'react';

/**
 * Blue.
 *
 * One still of the beluga the lab teaches with, cut from `public/videos/blue.mp4`
 * — the foundation's own footage — so the page opens on the actual animal
 * rather than on a stock photograph of an ocean.
 *
 * The picture lives at one path, named once here, and the plate behind it is
 * the thing that has the shape and the corners. If the file ever goes missing
 * the image takes itself out and what is left is deep water, not a browser's
 * broken-file glyph.
 */
export default function Blue({ ratio = '1 / 1' }: { ratio?: string }) {
  const [there, setThere] = useState(true);

  return (
    <div className='plate' style={{ aspectRatio: ratio, width: '100%' }}>
      {there && (
        <img
          src='/images/blue.jpg'
          alt='Blue, a beluga whale, underwater'
          width={1200}
          height={1200}
          decoding='async'
          onError={() => setThere(false)}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import Image from 'next/image';
import "@fontsource/poppins";

/**
 * One header joined to one panel, drawn as a card.
 *
 * The caret is the only control, so it is a button and says what it does. The
 * panel used to carry three `min-h-[…]` minimums to keep a row of these the
 * same height; the row is `flex` and every item is `flex-1`, so the default
 * `align-items: stretch` already does that and the minimums only fixed the
 * shortest panel's height to a number.
 */
function Accordion({
    header = "",
    content = "",
    open = false,
    className = "",
  }) {
  const [isOpen, setIsOpen] = useState(open);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`card text-foreground ${className}`}>
        <div className={`flex px-4 py-3 gap-4 justify-between items-center ${isOpen ? 'border-b' : ''}`}>
            <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: header }}></p>
            <button
                type="button"
                onClick={toggle}
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Collapse' : 'Expand'}
                className="shrink-0 cursor-pointer transition-all"
                style={{ lineHeight: 0, transform: isOpen ? undefined : 'rotate(180deg)' }}
            >
                <Image
                    src="/icons/caret.svg"
                    width={32}
                    height={32}
                    alt=""
                />
            </button>
        </div>
        <div className={isOpen ? '' : 'hidden'}>
            <p className="px-4 py-6 text-sm" dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
      </div>
  );
}

export default Accordion;

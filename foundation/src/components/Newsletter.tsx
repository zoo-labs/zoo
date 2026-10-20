import React, { useState } from 'react';

/**
 * The mission, and the list.
 *
 * The picture used to be a bare <Image> in a half-width column outside any
 * container, so it started at x=0 and ran under the heading beside it. It is in
 * a `.plate` inside `.container` now: rounded, cropped, and on the grid the
 * rest of the site is on. Its subject is shot against black, which is what the
 * plate's deep ground is for.
 *
 * The form is inert, and it is the same form the home page carries — one line,
 * one control, one `.field`. What was here posted to
 * `…/subscribe/post-json?u=YOUR_USER_ID&id=YOUR_LIST_ID` with `mode: 'no-cors'`
 * and then set "Thank you for subscribing" in the success branch, the failure
 * branch and the placeholder-id case alike, because a no-cors response cannot
 * be read. A form that cannot subscribe you should not say that it did. Give
 * this an endpoint and the handler is the one line below.
 */
export default function Newsletter() {
  const [there, setThere] = useState(true);

  return (
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }}
      >
        <div className='plate' style={{ aspectRatio: '1 / 1', width: '100%' }}>
          {there && (
            <img
              src='/images/newsletter.png'
              alt='A pygmy hippopotamus, photographed underwater'
              width={1000}
              height={1000}
              decoding='async'
              onError={() => setThere(false)}
            />
          )}
        </div>

        <div>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Protecting the planet&apos;s wildlife biodiversity through research, education and
            collaboration.
          </h2>
          <p className='mt-4 text-secondary' style={{ maxWidth: '44ch' }}>
            Join the newsletter for events and progress reports.
          </p>

          <form className='field mt-8' onSubmit={(e) => e.preventDefault()}>
            <input
              type='email'
              name='email'
              placeholder='Email address'
              aria-label='Email address'
            />
            <button
              type='submit'
              className='action'
              data-fill
              style={
                { ['--fill']: 'var(--night)', paddingInline: 'var(--space-5)' } as React.CSSProperties
              }
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

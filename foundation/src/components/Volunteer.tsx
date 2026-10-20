import React, { useState } from 'react';

/**
 * Volunteer.
 *
 * The button and the line beside it were laid out with `lg:space-x-16
 * md:space-x-4` — none of which the stylesheet answers — so a 12rem-wide pill
 * and a two-line sentence sat in a flex row with no gap between them and
 * touched. They are stacked in a form now: the control ends the form, and the
 * reassurance sits under it where it reads as a caption rather than as a label
 * that ran into the button.
 *
 * Inert, like every other form on this site, and for the same reason: there is
 * nowhere to post it. It used to be a bare <button> outside any <form>, which
 * at least never pretended otherwise.
 */
export default function Volunteer() {
  const [there, setThere] = useState(true);

  return (
    <section id='volunteer' className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }}
      >
        <div>
          <span className='pill eyebrow'>Doing good feels great</span>
          <h2 className='mt-5 text-3xl md:text-4xl font-bold'>Volunteer</h2>
          <p className='mt-4 text-secondary' style={{ maxWidth: '40ch' }}>
            Share your details and we will get in touch.
          </p>

          <form className='mt-8' onSubmit={(e) => e.preventDefault()}>
            <div className='field'>
              <input name='name' placeholder='First and last name' aria-label='First and last name' />
            </div>
            <div className='field mt-3'>
              <input
                type='email'
                name='email'
                placeholder='Email address'
                aria-label='Email address'
              />
            </div>
            <button
              type='submit'
              className='action mt-6'
              data-fill
              style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
            >
              Inquire
            </button>
            <p className='mt-4 text-sm text-secondary' style={{ maxWidth: '36ch' }}>
              The future generations of endangered species thank you.
            </p>
          </form>
        </div>

        <div className='plate' style={{ aspectRatio: '4 / 3', width: '100%' }}>
          {there && (
            <img
              src='/images/involved6.png'
              alt='Veterinarians measuring a sedated tiger during a field health check'
              width={1000}
              height={1000}
              decoding='async'
              onError={() => setThere(false)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

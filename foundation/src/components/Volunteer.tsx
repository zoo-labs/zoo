import Section from '@/components/Section';

/**
 * The volunteer sign-up band.
 *
 * The right half of this block was `/images/involved6.png`, which is not in the
 * repository — it drew a broken-image glyph beside the form. The form is the
 * whole point of the section, so it now stands on its own measure rather than
 * holding a column open for a picture that never arrives.
 */
function Volunteer() {
  const field =
    'w-full rounded-full border bg-transparent px-4 py-2.5 text-sm outline-none';

  return (
    <Section id='volunteer'>
      <div className='max-w-2xl'>
        <p className='eyebrow'>Doing good feels great</p>
        <h2 className='title mt-3'>Volunteer</h2>
        <p className='lede mt-4'>
          Share your details so we can get in touch. The future generations of endangered
          species thank you.
        </p>

        <form className='mt-8 flex flex-col gap-3 sm:flex-row'>
          <label className='sr-only' htmlFor='volunteer-name'>
            First and last name
          </label>
          <input
            id='volunteer-name'
            className={field}
            style={{ borderColor: 'var(--input)' }}
            placeholder='First and last name'
          />
          <label className='sr-only' htmlFor='volunteer-email'>
            Email
          </label>
          <input
            id='volunteer-email'
            type='email'
            className={field}
            style={{ borderColor: 'var(--input)' }}
            placeholder='Email'
          />
          <button type='submit' className='action shrink-0' data-fill=''>
            Inquire
          </button>
        </form>
      </div>
    </Section>
  );
}

export default Volunteer;

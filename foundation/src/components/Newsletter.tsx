import { useState } from 'react';

import Section from '@/components/Section';

/**
 * The newsletter band.
 *
 * This was a `bg-black` block with a 32rem top pad, and because /animals,
 * /donation, /experiences and every species page end with it, all four cut from
 * the light page straight into black just above the footer. It now sits on the
 * page like any other section.
 *
 * The illustration it used to carry, `/images/newsletter.png`, is not in the
 * repository — it drew a broken-image glyph on four routes — so the band is
 * one column and asks for nothing that does not exist.
 */
function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      setMessage('Please fill in both name and email fields.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Replace this URL with your actual Mailchimp signup URL
      // You'll need to get this from your Mailchimp account under Audience > Signup forms > Embedded forms
      const mailchimpUrl =
        'https://zoo.us13.list-manage.com/subscribe/post-json?u=YOUR_USER_ID&id=YOUR_LIST_ID&c=?';

      await fetch(mailchimpUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          FNAME: name,
          EMAIL: email,
        }),
      });

      // Since we're using no-cors, we can't read the response
      setMessage('Thank you for subscribing to our newsletter!');
      setName('');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const field =
    'w-full rounded-full border bg-transparent px-4 py-2.5 text-sm outline-none';

  return (
    <Section tone='card' edge='top'>
      <div className='max-w-2xl'>
        <p className='eyebrow'>Newsletter</p>
        <h2 className='title mt-3'>
          Protecting our planet’s wildlife biodiversity
        </h2>
        <p className='lede mt-4'>
          Through research, education and collaboration with aligned charities. Join our
          newsletter for events and progress reports.
        </p>

        <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-3 sm:flex-row'>
          <label className='sr-only' htmlFor='newsletter-name'>
            Your name
          </label>
          <input
            id='newsletter-name'
            className={field}
            style={{ borderColor: 'var(--input)' }}
            placeholder='Your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className='sr-only' htmlFor='newsletter-email'>
            Your email
          </label>
          <input
            id='newsletter-email'
            className={field}
            style={{ borderColor: 'var(--input)' }}
            placeholder='Your email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type='submit'
            disabled={isSubmitting}
            className='action shrink-0 disabled:opacity-50'
            data-fill=''
          >
            {isSubmitting ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <p className='mt-4 text-sm' style={{ color: 'var(--muted-foreground)' }}>
            {message}
          </p>
        )}
      </div>
    </Section>
  );
}

export default Newsletter;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '@/lib/supabase';

const suggestedAmounts = [25, 50, 100, 250, 500, 1000];
const IRS_LETTER_URL = '/images/healing-farm/zoolabs-irs-letter.jpg';

export default function DonateFarm() {
  const router = useRouter();
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>('monthly');
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const status = router.query.status as string | undefined;
    if (status === 'success') {
      toast.success('Thank you for your donation! Your contribution to The Zoolabs Foundation has been received. A receipt will be emailed to you.');
      router.replace('/donation/farm', undefined, { shallow: true });
    } else if (status === 'cancelled') {
      toast.warning('Donation cancelled. No charge was made. You can try again anytime.');
      router.replace('/donation/farm', undefined, { shallow: true });
    }
  }, [router.isReady]);

  const handlePresetClick = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      setAmount(parsed);
    }
  };

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      toast.error('Please choose a suggested amount or enter a custom amount.');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-donation-session', {
        body: {
          amount,
          currency: 'usd',
          frequency,
          email: email || undefined,
          success_url: `${window.location.origin}/donation/farm?status=success`,
          cancel_url: `${window.location.origin}/donation/farm?status=cancelled`,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url as string;
      } else {
        throw new Error('Donation checkout URL missing');
      }
    } catch (error) {
      console.error(error);
      toast.error('Checkout unavailable. Please try again or contact us for alternate donation methods.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Seo
        templateTitle="Donate to the Healing Farm"
        description="Donate to The Zoolabs Foundation's Regenerative Healing Farm. 100% tax deductible 501(c)(3). EIN #883538992."
      />
      <ToastContainer />
      <Navbar />

      <main className="pt-28 pb-28 bg-black text-white">
        <section className="container mx-auto px-6 max-w-5xl space-y-12">
          <div className="text-center space-y-5">
            <p className="text-xs tracking-[0.5em] text-gray-400">
              ZOO LABS FOUNDATION
            </p>
            <h1 className="text-4xl md:text-5xl tracking-[0.12em]">DONATE TO THE MISSION</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Your gift powers healthy, healing, and medicinal food access for underserved communities through
              The Zoolabs Foundation &mdash; a legal 501(c)(3) tax-exempt nonprofit based in San Francisco, CA.
            </p>
            <p className="text-sm text-gray-400">
              100% of your donation is tax deductible. EIN #883538992.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            {/* Donation Form */}
            <div className="rounded-[32px] border border-gray-800 bg-white/5 p-10 space-y-8">
              {/* Frequency Toggle */}
              <div className="flex rounded-2xl border border-gray-800 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`flex-1 py-3 text-sm font-medium transition ${
                    frequency === 'monthly'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-white hover:bg-white/5'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('one_time')}
                  className={`flex-1 py-3 text-sm font-medium transition ${
                    frequency === 'one_time'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-white hover:bg-white/5'
                  }`}
                >
                  One-time
                </button>
              </div>

              {/* Amount Selection */}
              <div className="space-y-4">
                <h2 className="text-2xl tracking-[0.12em]">CHOOSE AN AMOUNT</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {suggestedAmounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handlePresetClick(value)}
                      className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                        amount === value && !customAmount
                          ? 'border-white bg-white text-black'
                          : 'border-gray-800 bg-transparent text-white hover:border-gray-500'
                      }`}
                    >
                      ${value}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-[0.2em]">Custom amount</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(event) => handleCustomChange(event.target.value)}
                    className="w-full rounded-2xl border border-gray-800 bg-transparent text-white px-4 py-3 text-sm placeholder:text-gray-600 focus:border-white focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-[0.2em]">Email (optional)</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-gray-800 bg-transparent text-white px-4 py-3 text-sm placeholder:text-gray-600 focus:border-white focus:outline-none transition"
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                className="w-full rounded-full bg-white text-black hover:bg-white/90 px-8 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDonate}
                disabled={isLoading}
              >
                {isLoading ? 'Starting checkout...' : frequency === 'monthly' ? 'Donate monthly' : 'Donate now'}
              </button>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-[28px] border border-gray-800 bg-white/5 p-8 space-y-4">
                <h3 className="text-xl tracking-[0.12em]">WHERE YOUR DONATION GOES</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>Land acquisition and regenerative farm infrastructure.</li>
                  <li>Chef-led meal distribution for food-insecure households.</li>
                  <li>Community education on holistic diet and self-sustaining farming.</li>
                </ul>
              </div>

              <a
                href={IRS_LETTER_URL}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center rounded-full border border-gray-600 text-white hover:border-white px-8 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-300"
              >
                View IRS 501(c)(3) approval letter
              </a>

              <div className="rounded-[28px] border border-gray-800 bg-white/5 p-8 space-y-4">
                <h3 className="text-xl tracking-[0.12em]">OTHER WAYS TO GIVE</h3>
                <div className="space-y-3">
                  <Link
                    href="/donation"
                    className="block w-full text-center rounded-full border border-gray-600 text-white hover:border-white px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    General Donation
                  </Link>
                  <a
                    href="https://zoo.fund"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center rounded-full bg-amber-500/20 text-white hover:bg-amber-500/30 border border-amber-500/40 px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    Crowdfund via Zoo Fund
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  );
}

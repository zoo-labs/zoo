import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { signIn, supabase } from '@/lib/supabase';

export default function ZooConnect() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Redirect to home or previous page
      router.push('/');
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    if (error) setError(error.message);
  };

  return (
    <Layout>
        <Seo />
        <Navbar />
        <div className='bg-black py-32 text-white'>
          <div className='md:w-[500px] mx-auto w-full rounded-3xl px-12 md:border border-white py-8 flex flex-col'>
            <p className='text-white text-2xl text-center pb-8'>Sign in to your account</p>
            <form onSubmit={handleSignIn}>
              <label className='pb-2 pl-4 text-base block'>Email *</label>
              <input
                className='outline-none bg-[#262934] border border-[#333] text-sm rounded-full px-4 py-2 w-full'
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className='pb-2 pl-4 mt-6 text-base block'>Password *</label>
              <input
                className='outline-none bg-[#262934] border border-[#333] text-sm rounded-full px-4 py-2 w-full'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="pl-4 mt-8 flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-gray-400 bg-transparent border border-white rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-white">Remember me</label>
              </div>
              {error && (
                <div className="mt-4 p-3 bg-gray-500/10 border border-gray-500 rounded-lg text-gray-400 text-sm">
                  {error}
                </div>
              )}
              <button
                type='submit'
                disabled={loading}
                className='mt-8 rounded-full py-2 px-4 text-lg text-black bg-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full'
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <Link href='/forgot-password' className='hover:text-white text-gray-400 text-center mt-4'>Forgot the password?</Link>
            <p className='text-white text-sm text-center mt-8'>or continue with</p>
            <div className='flex items-center justify-center space-x-12 mt-6'>
              <button>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="#1E1F23"/>
                  <g clip-path="url(#clip0_210_8054)">
                  <path d="M32 44C38.6274 44 44 38.6274 44 32C44 25.3726 38.6274 20 32 20C25.3726 20 20 25.3726 20 32C20 38.6274 25.3726 44 32 44Z" fill="#3C5A9A"/>
                  <path d="M35.9019 23.6836H33.2436C31.6661 23.6836 29.9114 24.3471 29.9114 26.6338C29.9191 27.4305 29.9114 28.1936 29.9114 29.0524H28.0864V31.9565H29.9679V40.3168H33.4251V31.9013H35.7071L35.9135 29.0442H33.3656C33.3656 29.0442 33.3713 27.7733 33.3656 27.4042C33.3656 26.5006 34.3059 26.5523 34.3624 26.5523C34.8099 26.5523 35.6798 26.5536 35.9032 26.5523V23.6836H35.9019V23.6836Z" fill="white"/>
                  </g>
                  <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" stroke="#262934"/>
                  <defs>
                  <clipPath id="clip0_210_8054">
                  <rect width="24" height="24" fill="white" transform="translate(20 20)"/>
                  </clipPath>
                  </defs>
                </svg>
              </button>
              <button onClick={handleGoogleSignIn}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="0.5" width="62" height="63" rx="31" fill="#1E1F23"/>
                  <g clip-path="url(#clip0_210_8058)">
                  <path d="M43.4878 32.2247C43.4878 31.2414 43.4095 30.5239 43.2402 29.7798H32.229V34.2178H38.6923C38.5621 35.3207 37.8584 36.9816 36.2946 38.0977L36.2727 38.2463L39.7543 40.9965L39.9955 41.021C42.2107 38.9349 43.4878 35.8654 43.4878 32.2247" fill="#4285F4"/>
                  <path d="M32.2292 43.9173C35.3956 43.9173 38.0539 42.8543 39.9956 41.0207L36.2948 38.0973C35.3045 38.8016 33.9753 39.2932 32.2292 39.2932C29.1278 39.2932 26.4956 37.2071 25.5572 34.3237L25.4197 34.3356L21.7995 37.1925L21.7522 37.3267C23.6808 41.2332 27.6422 43.9173 32.2292 43.9173Z" fill="#34A853"/>
                  <path d="M25.5572 34.3238C25.3096 33.5797 25.1663 32.7824 25.1663 31.9586C25.1663 31.1347 25.3096 30.3375 25.5442 29.5934L25.5376 29.4349L21.8721 26.5322L21.7522 26.5904C20.9573 28.2115 20.5012 30.0319 20.5012 31.9586C20.5012 33.8853 20.9573 35.7056 21.7522 37.3267L25.5572 34.3238" fill="#FBBC05"/>
                  <path d="M32.2291 24.624C34.4313 24.624 35.9169 25.594 36.7639 26.4046L40.0738 23.1093C38.041 21.1826 35.3956 20 32.2291 20C27.6422 20 23.6808 22.6841 21.7522 26.5906L25.5442 29.5936C26.4955 26.7102 29.1278 24.624 32.2291 24.624" fill="#EB4335"/>
                  </g>
                  <rect x="1" y="0.5" width="62" height="63" rx="31" stroke="#262934"/>
                  <defs>
                  <clipPath id="clip0_210_8058">
                  <rect width="23" height="24" fill="white" transform="translate(20.5 20)"/>
                  </clipPath>
                  </defs>
                </svg>
              </button>
              <button>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="#1E1F23"/>
                  <g clip-path="url(#clip0_210_8064)">
                  <path d="M36.7729 20.012C36.7219 19.955 34.8844 20.0345 33.2854 21.77C31.6864 23.504 31.9324 25.493 31.9684 25.544C32.0044 25.595 34.2484 25.6745 35.6809 23.657C37.1134 21.6395 36.8239 20.0705 36.7729 20.012V20.012ZM41.7439 37.6115C41.6719 37.4675 38.2564 35.7605 38.5744 32.4785C38.8924 29.195 41.0869 28.295 41.1214 28.1975C41.1559 28.1 40.2259 27.0125 39.2404 26.462C38.5168 26.0739 37.716 25.8515 36.8959 25.811C36.7339 25.8065 36.1714 25.6685 35.0149 25.985C34.2529 26.1935 32.5354 26.8685 32.0629 26.8955C31.5889 26.9225 30.1789 26.1125 28.6624 25.898C27.6919 25.7105 26.6629 26.0945 25.9264 26.39C25.1914 26.684 23.7934 27.521 22.8154 29.7455C21.8374 31.9685 22.3489 35.4905 22.7149 36.5855C23.0809 37.679 23.6524 39.4715 24.6244 40.7795C25.4884 42.2555 26.6344 43.28 27.1129 43.628C27.5914 43.976 28.9414 44.207 29.8774 43.7285C30.6304 43.2665 31.9894 43.001 32.5264 43.0205C33.0619 43.04 34.1179 43.2515 35.1994 43.829C36.0559 44.1245 36.8659 44.0015 37.6774 43.6715C38.4889 43.34 39.6634 42.083 41.0344 39.5345C41.5549 38.3495 41.7919 37.709 41.7439 37.6115V37.6115Z" fill="white"/>
                  <path d="M36.7729 20.012C36.7219 19.955 34.8844 20.0345 33.2854 21.77C31.6864 23.504 31.9324 25.493 31.9684 25.544C32.0044 25.595 34.2484 25.6745 35.6809 23.657C37.1134 21.6395 36.8239 20.0705 36.7729 20.012V20.012ZM41.7439 37.6115C41.6719 37.4675 38.2564 35.7605 38.5744 32.4785C38.8924 29.195 41.0869 28.295 41.1214 28.1975C41.1559 28.1 40.2259 27.0125 39.2404 26.462C38.5168 26.0739 37.716 25.8515 36.8959 25.811C36.7339 25.8065 36.1714 25.6685 35.0149 25.985C34.2529 26.1935 32.5354 26.8685 32.0629 26.8955C31.5889 26.9225 30.1789 26.1125 28.6624 25.898C27.6919 25.7105 26.6629 26.0945 25.9264 26.39C25.1914 26.684 23.7934 27.521 22.8154 29.7455C21.8374 31.9685 22.3489 35.4905 22.7149 36.5855C23.0809 37.679 23.6524 39.4715 24.6244 40.7795C25.4884 42.2555 26.6344 43.28 27.1129 43.628C27.5914 43.976 28.9414 44.207 29.8774 43.7285C30.6304 43.2665 31.9894 43.001 32.5264 43.0205C33.0619 43.04 34.1179 43.2515 35.1994 43.829C36.0559 44.1245 36.8659 44.0015 37.6774 43.6715C38.4889 43.34 39.6634 42.083 41.0344 39.5345C41.5549 38.3495 41.7919 37.709 41.7439 37.6115V37.6115Z" fill="white"/>
                  </g>
                  <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" stroke="#262934"/>
                  <defs>
                  <clipPath id="clip0_210_8064">
                  <rect width="24" height="24" fill="white" transform="translate(20 20)"/>
                  </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
            <div className='flex items-center justify-center space-x-2 mt-8'>
              <p className='text-white text-sm'>Don’t have an account?</p>
              <Link href='/signup' className='hover:text-white text-gray-400 text-sm'>Sign Up</Link>
            </div>
          </div>
        </div>
        <Footer />
    </Layout>
  );
}

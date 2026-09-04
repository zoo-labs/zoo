import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "@fontsource/poppins";
import { supabase, getCurrentUser, signOut } from '@/lib/supabase';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    getCurrentUser().then(({ user }) => {
      setUser(user);
    });

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-20">
              <div className="md:hidden">
                  <button
                  type="button"
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-green-600 inline-flex items-center justify-center p-2 rounded-lg"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                  >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                      <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19 17.5H1V16H19V17.5ZM13 10.5H1V9H13V10.5ZM1 3.5V2H19V3.5H1Z"/>
                      </svg>
                  ) : (
                      <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                      />
                      </svg>
                  )}
                  </button>
              </div>
              <div className="flex items-center">
                  <div className="flex-shrink-0">
                  <Link
                      href="/"
                      className="flex items-center gap-3 px-2 py-1 text-gray-900 font-bold text-xl hover:opacity-90 transition-opacity">
                      <Image alt="Zoo Labs Foundation" src="/zooLogoLight.svg" width={44} height={44} className="rounded-full shadow-sm" />
                      <span className="hidden sm:inline font-extrabold tracking-tight text-gray-900">Zoo Labs <span className="text-green-600">Foundation</span></span>
                  </Link>
                  </div>
              </div>
              <div className="hidden md:block">
                  <div className="mx-6 flex items-center xl:space-x-8 lg:space-x-6 md:space-x-4">
                  <Link
                      href="/animals"
                      className="text-gray-700 hover:text-green-600 px-3 py-2 text-base font-semibold transition-colors"
                  >
                      Animals & Species
                  </Link>
                  <Link
                      href="/research"
                      className="text-gray-700 hover:text-green-600 px-3 py-2 text-base font-semibold transition-colors"
                  >
                      Research
                  </Link>
                  <Link
                      href="/ai"
                      className="text-gray-700 hover:text-green-600 px-3 py-2 text-base font-semibold transition-colors"
                  >
                      ZenLM AI
                  </Link>
                  <Link
                      href="/experiences"
                      className="text-gray-700 hover:text-green-600 px-3 py-2 text-base font-semibold transition-colors"
                  >
                      Experiences
                  </Link>
                  <Link
                      href="/about"
                      className="text-gray-700 hover:text-green-600 px-3 py-2 text-base font-semibold transition-colors"
                  >
                      About
                  </Link>
                  <Link
                      href="https://zoolabs.io"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 transition-all hover:scale-105"
                  >
                      <span>🔬</span> Labs →
                  </Link>
                  </div>
              </div>
              <div className='flex items-center gap-3'>
                  <Link
                      href="/donation"
                      className="bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-md px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200"
                  >
                      Donate
                  </Link>
              </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden fixed z-50 h-[100vh] top-20 w-full bg-white border-t border-gray-100 shadow-xl" id="mobile-menu">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link
                href="/animals"
                className="text-gray-800 hover:bg-gray-50 hover:text-green-600 block px-3 py-2.5 rounded-lg text-lg font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Animals & Species
              </Link>
              <Link
                href="/research"
                className="text-gray-800 hover:bg-gray-50 hover:text-green-600 block px-3 py-2.5 rounded-lg text-lg font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Research
              </Link>
              <Link
                href="/ai"
                className="text-gray-800 hover:bg-gray-50 hover:text-green-600 block px-3 py-2.5 rounded-lg text-lg font-semibold"
                onClick={() => setIsOpen(false)}
              >
                ZenLM AI
              </Link>
              <Link
                href="/experiences"
                className="text-gray-800 hover:bg-gray-50 hover:text-green-600 block px-3 py-2.5 rounded-lg text-lg font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Experiences
              </Link>
              <Link
                href="/about"
                className="text-gray-800 hover:bg-gray-50 hover:text-green-600 block px-3 py-2.5 rounded-lg text-lg font-semibold"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="https://zoolabs.io"
                className="bg-blue-50 text-blue-700 block px-4 py-3 rounded-xl text-lg font-bold border border-blue-200"
                onClick={() => setIsOpen(false)}
              >
                🔬 Zoo Labs (Ask Blue) →
              </Link>
              <Link
                href="/donation"
                className="bg-green-600 text-white text-center block px-4 py-3 rounded-xl text-lg font-bold uppercase tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                Donate to Wildlife
              </Link>
            </div>
          </div>
        )}
      </nav>
  );
}

export default Navbar;
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
      <nav className="bg-white border-b border-gray-200">
        <div className="max-md:fixed max-md:w-full max-md:left-0 max-md:top-0 max-md:z-[999] max-md:bg-white max-md:border-b max-md:border-gray-200 px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-20">
              <div className="md:hidden">
                  <button
                  type="button"
                  onClick={toggleMenu}
                  className="text-black inline-flex items-center justify-center p-2 "
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                  >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19 17.5H1V16H19V17.5ZM13 10.5H1V9H13V10.5ZM1 3.5V2H19V3.5H1Z" fill="black"/>
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
              <div className="flex items-center max-md:ml-[36px]">
                  <div className="flex-shrink-0">

                  <Link
                      href="/"
                      className="text-black hover:text-gray-600 px-3 py-2 text-md font-medium">
                      <Image alt="ZOO" src="/zooLogo.svg" width={64} height={64} className="invert" />
                  </Link>
                  </div>
              </div>
              <div className="hidden md:block">
                  <div className="mx-10 flex items-baseline xl:space-x-10 md:space-x-2 lg:space-x-4 2xl:space-x-12">
                  <Link
                      href="/about"
                      className="text-gray-600 hover:text-black px-3 py-2 text-md font-medium"
                  >
                      Mission
                  </Link>
                  <Link
                      href="/impact"
                      className="text-gray-600 hover:text-black px-3 py-2 text-md font-medium"
                  >
                      Impact
                  </Link>
                  <Link
                      href="/programs"
                      className="text-gray-600 hover:text-black px-3 py-2 text-md font-medium"
                  >
                      Programs
                  </Link>
                  <Link
                      href="/research"
                      className="text-gray-600 hover:text-black px-3 py-2 text-md font-medium"
                  >
                      Research
                  </Link>
                  <Link
                      href="/partners"
                      className="text-gray-600 hover:text-black px-3 py-2 text-md font-medium"
                  >
                      Partners
                  </Link>
                  <Link
                      href="/transparency"
                      className="text-gray-600 hover:text-black px-3 py-2 text-md font-medium"
                  >
                      Transparency
                  </Link>
                  </div>
              </div>
              <div className='flex items-center gap-3'>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-sm">{user.email}</span>
                      <button
                        onClick={handleSignOut}
                        className="text-gray-600 hover:text-black px-6 py-2 rounded-lg text-md font-medium border border-gray-300 hover:border-black transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/signin"
                      className="text-gray-600 hover:text-black px-6 py-2 rounded-lg text-md font-medium border border-gray-300 hover:border-black transition-colors"
                    >
                      Login
                    </Link>
                  )}
                  <Link
                      href="/donation"
                      className="bg-black text-white hover:bg-gray-800 border border-black px-6 py-2 rounded-lg text-md font-medium transition-all"
                  >
                      Donate
                  </Link>
              </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden fixed z-50 h-[100vh] top-20 w-full bg-white border-b border-gray-200" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/about"
                className="text-gray-600 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
              >
                Mission
              </Link>
              <Link
                href="/impact"
                className="text-gray-600 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
              >
                Impact
              </Link>
              <Link
                href="/programs"
                className="text-gray-600 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
              >
                Programs
              </Link>
              <Link
                href="/research"
                className="text-gray-600 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
              >
                Research
              </Link>
              <Link
                href="/partners"
                className="text-gray-600 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
              >
                Partners
              </Link>
              <Link
                href="/transparency"
                className="text-gray-600 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
              >
                Transparency
              </Link>
              {user ? (
                <>
                  <div className="text-gray-600 px-3 py-2 text-sm">{user.email}</div>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/signin"
                  className="text-gray-600 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
              )}
              <Link
                href="/donation"
                className="bg-black text-white hover:bg-gray-800 border border-black px-8 py-3 rounded-lg text-base font-medium transition-all mx-3 mt-4 text-center block"
              >
                Donate
              </Link>
            </div>
          </div>
        )}
      </nav>
  );
}

export default Navbar;
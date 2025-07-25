import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "@fontsource/poppins";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
      <nav className="bg-black">
        <div className="max-md:fixed max-md:w-full max-md:left-0 max-md:z-[999] max-md:bg-black px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-20">
              <div className="md:hidden">
                  <button
                  type="button"
                  onClick={toggleMenu}
                  className="text-white inline-flex items-center justify-center p-2 "
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                  >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19 17.5H1V16H19V17.5ZM13 10.5H1V9H13V10.5ZM1 3.5V2H19V3.5H1Z" fill="white"/>
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
                      className="text-gray-300  hover:text-white px-3 py-2  text-md font-medium">
                      <Image alt="ZOO" src="/zooLogo.svg" width={64} height={64} />
                  </Link>
                  </div>
              </div>
              <div className="hidden md:block">
                  <div className="mx-10 flex items-baseline xl:space-x-16 md:space-x-4 lg:space-x-8 2xl:space-x-20">
                  <Link
                      href="/animals"
                      className="text-gray-300  hover:text-white px-3 py-2  text-md font-medium"
                  >
                      Animals
                  </Link>
                  <Link
                      href="/about"
                      className="text-gray-300  hover:text-white px-3 py-2  text-md font-medium"
                  >
                      Mission
                  </Link>
                  <Link
                      href="/experiences"
                      className="text-gray-300  hover:text-white px-3 py-2  text-md font-medium"
                  >
                      Wanderlust
                  </Link>
                  <Link
                      href="/getinvolved"
                      className="text-gray-300  hover:text-white px-3 py-2  text-md font-medium"
                  >
                    <>
                      Get Involved
                    </>
                  </Link>
                  {/* Add more links here */}
                  </div>
              </div>
              <div className='flex items-center'>
                  <Link
                      href="/donation"
                      className="bg-white hover:bg-black hover:text-white border border-white px-6 py-1 rounded-full text-md font-medium text-black transition-colors"
                  >
                      Donate
                  </Link>
              </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden fixed z-50 h-[100vh] top-20 w-full bg-black" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/animals"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Animals
              </Link>
              
              <Link
                href="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Mission
              </Link>
              <Link
                href="/experiences"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Wanderlust
              </Link>
              <Link
                href="/getinvolved"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <>
                  Get Involved
                </>
              </Link>
              <Link
                href="/donation"
                className="bg-white hover:bg-black hover:text-white border border-white px-6 py-2 rounded-full text-base font-medium text-black transition-colors mx-3 mt-4 text-center block"
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
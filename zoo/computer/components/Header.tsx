
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../src/context/CartContext';
import { supabase } from '../src/lib/supabase';

const Logo: React.FC = () => (
  <div className="flex items-center gap-2">
    <svg viewBox="0 0 67 67" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white">
        <path d="M22.21 67V44.6369H0V67H22.21Z" fill="currentColor"></path>
        <path d="M0 44.6369L22.21 46.8285V44.6369H0Z" fill="currentColor" opacity="0.7"></path>
        <path d="M66.7038 22.3184H22.2534L0.0878906 44.6367H44.4634L66.7038 22.3184Z" fill="currentColor"></path>
        <path d="M22.21 0H0V22.3184H22.21V0Z" fill="currentColor"></path>
        <path d="M66.7198 0H44.5098V22.3184H66.7198V0Z" fill="currentColor"></path>
        <path d="M66.6753 22.3185L44.5098 20.0822V22.3185H66.6753Z" fill="currentColor" opacity="0.7"></path>
        <path d="M66.7198 67V44.6369H44.5098V67H66.7198Z" fill="currentColor"></path>
    </svg>
    <div className="text-xl font-bold tracking-wider">
        <span className="text-white">Zoo</span>
    </div>
  </div>
);

interface HeaderProps {
  onOpenSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for authenticated user
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const productLinks = [
    { name: 'DGX Spark', description: '$3,999 - Dedicated DGX Instance', href: '/dgx-spark' },
    { name: 'RTX PRO 6000', description: '$8,999 - Professional Blackwell GPU', href: '/rtx-pro-6000' },
    { name: 'Blackwell Systems', description: 'B200, B100, GB300 NVL72', href: '/#pricing' },
    { name: 'Clusters & SuperPODs', description: 'Enterprise AI Infrastructure', href: '/clusters' },
  ];

  const navLinks = [
    { href: '/features', label: 'Hardware' },
    { href: '/solutions', label: 'Solutions' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-bg/80 backdrop-blur-lg border-b border-dark-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" aria-label="Zoo Computer Home">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-1">
              Products
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isProductsOpen && (
              <div className="absolute top-full left-0 pt-2 w-80">
                <div className="bg-dark-card border border-dark-border rounded-lg shadow-xl overflow-hidden">
                  {productLinks.map((product) => (
                    <a
                      key={product.name}
                      href={product.href}
                      className="block px-4 py-3 hover:bg-primary/10 transition-colors border-b border-dark-border last:border-b-0"
                    >
                      <div className="font-semibold text-white mb-1">{product.name}</div>
                      <div className="text-sm text-gray-400">{product.description}</div>
                    </a>
                  ))}
                  <a
                    href="/#pricing"
                    className="block px-4 py-3 bg-primary/5 hover:bg-primary/10 transition-colors text-center text-primary font-semibold"
                  >
                    View All Plans →
                  </a>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-gray-300 hover:text-primary transition-colors duration-300">
              {link.label}
            </Link>
          ))}
          <a href="/#pricing" className="text-gray-300 hover:text-primary transition-colors duration-300">
            Pricing
          </a>
        </nav>
        <div className="flex items-center space-x-4">
            <button
              onClick={onOpenSearch}
              className="hidden md:flex items-center gap-2 text-gray-300 hover:text-primary transition-colors duration-300 px-3 py-1.5 border border-dark-border rounded-md hover:border-primary/50"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-xs bg-dark-bg border border-dark-border rounded">
                ⌘K
              </kbd>
            </button>
            {user ? (
              <div className="relative group">
                <button
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                  aria-label="My Account"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-dark-card border border-dark-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-300 hover:bg-primary/10 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-gray-300 hover:bg-primary/10 hover:text-white transition-colors"
                  >
                    Account Settings
                  </Link>
                  <hr className="border-dark-border" />
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/signin"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}
            <Link
              to="/cart"
              className="relative text-gray-300 hover:text-primary transition-colors duration-300"
              aria-label="Shopping Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-white z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-dark-card transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="flex flex-col items-center space-y-4 py-6">
             {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className="text-gray-300 hover:text-primary transition-colors duration-300 text-lg" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:text-primary transition-colors duration-300 text-lg" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/account" className="text-gray-300 hover:text-primary transition-colors duration-300 text-lg" onClick={() => setIsMenuOpen(false)}>
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors duration-300 text-lg"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="text-gray-300 hover:text-primary transition-colors duration-300 text-lg" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/signup" className="w-11/12 text-center bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-md hover:opacity-90 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
              <Link to="/request-quote" className="w-11/12 text-center bg-primary text-black font-bold py-3 px-6 rounded-md hover:bg-primary-dark transition-all duration-300 transform hover:scale-105" onClick={() => setIsMenuOpen(false)}>
                  Request Quote
              </Link>
          </div>
      </div>
    </header>
  );
};

export default Header;

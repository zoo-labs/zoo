import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './src/context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import DGXSparkHighlight from './components/DGXSparkHighlight';
import Partners from './components/Partners';
import Features from './components/Features';
import HardwareSpec from './components/HardwareSpec';
import Pricing from './components/Pricing';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import ImageGallery from './components/ImageGallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import TrustSecurity from './components/TrustSecurity';
import WhyBuyHardware from './components/WhyBuyHardware';
import UseCases from './components/UseCases';
import CloudPricing from './components/CloudPricing';
import SearchModal from './components/SearchModal';
import Cart from './src/pages/Cart';
import Checkout from './src/pages/Checkout';
import CheckoutSuccess from './src/pages/CheckoutSuccess';
import Account from './src/pages/Account';
import DGXSpark from './src/pages/DGXSpark';
import RTXPro6000 from './src/pages/RTXPro6000';
import TermsOfService from './src/pages/TermsOfService';
import PrivacyPolicy from './src/pages/PrivacyPolicy';
import RequestQuote from './src/pages/RequestQuote';
import Clusters from './src/pages/Clusters';
import FeaturesPage from './src/pages/Features';
import Solutions from './src/pages/Solutions';
import Dashboard from './src/pages/Dashboard';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import AdminDashboard from './src/pages/AdminDashboard';
import Analytics from './src/pages/Analytics';

const HomePage: React.FC<{ onSelectProduct: (productName: string) => void }> = ({ onSelectProduct }) => {
  return (
    <>
      <Hero />
      <DGXSparkHighlight />
      <Partners />
      <Features />
      <Pricing />
      <CallToAction />
    </>
  );
};

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSelectProduct = (productName: string) => {
    setSelectedProduct(productName);
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cmd+K or Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <CartProvider>
        <div className="bg-dark-bg text-gray-200 font-sans antialiased relative overflow-x-hidden max-w-full">
          <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px]"></div>
          </div>

          <div className="relative z-10">
            <Header onOpenSearch={() => setIsSearchOpen(true)} />
            <Routes>
              <Route
                path="/"
                element={
                  <main>
                    <HomePage onSelectProduct={handleSelectProduct} />
                  </main>
                }
              />
              <Route path="/dgx-spark" element={<DGXSpark />} />
              <Route path="/rtx-pro-6000" element={<RTXPro6000 />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/account" element={<Account />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/request-quote" element={<RequestQuote />} />
              <Route path="/clusters" element={<Clusters />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </div>

          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;

import * as React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Newsletter from '@/components/Newsletter';
import Campaign from '@/components/Campaign';
import Footer from '@/components/Footer';
import Header from '@/components/donation/Header';
import Donation_Spent from '@/components/donation/Donation_Spent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function DonationPage() {
  const router = useRouter();

  React.useEffect(() => {
    if (router.isReady) {
      const result = router.query.result;
      if(result=='success'){
        toast.success("Thank you for donating!");
      }else if(result=='cancelled') {
        toast.warning("Donation is cancelled!!!");
      }
    }
  }, [router]);
  return (
    <Layout>
        <Seo />
        <ToastContainer />
        <Navbar />
        <Header />
        <Donation_Spent />
        <div className="bg-black py-16">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-white text-3xl lg:text-5xl font-bold mb-6">Create Your Own Campaign</h2>
            <p className="text-gray-300 text-lg lg:text-xl mb-8">Start your own fundraising campaign to help save endangered species. Download our comprehensive guide to get started.</p>
            <a 
              href="/guidebook.pdf" 
              download="zoo-campaign-guidebook.pdf"
              className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Campaign Guide
            </a>
          </div>
        </div>
        <Campaign />
        <Newsletter />
        <Footer />
    </Layout>
  );
}

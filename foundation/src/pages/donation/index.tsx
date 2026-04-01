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
        <Campaign />
        <Newsletter />
        <Footer />
    </Layout>
  );
}

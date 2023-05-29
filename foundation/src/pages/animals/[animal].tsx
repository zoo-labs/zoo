import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import StartCollecting from '@/components/Collecting';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Header from '@/pages/animals/Header';
import Animal_Item from '@/components/animal/Detail';
import Animals from '@/components/animal/Item';
import Donation from '@/components/Donation';
import Volunteer from '@/components/Volunteer';
import Campaign from '@/components/Campaign';
import Aiding from '@/components/Aiding';
import TradingCard from '@/pages/collect/TradingCard';
import CardList from '@/pages/collect/CardList';
import Support from '@/pages/collect/Support';
import Avatars from '@/components/animal/Item';
import Content from '@/pages/animals/Content';
import Carousel from '@/pages/animals/Carousel';
export default function HomePage() {
    const avatars = [
        {
          title: "Baby Leopard",
          img: "/images/baby.png"
        },
        {
          title: "Teen Leopard",
          img: "/images/teen.png"
        },
        {
          title: "Adult Leopard",
          img: "/images/adult.png"
        }
      ];
  return (
    <Layout>
        <Seo />
        <Navbar />
        <Header />
        <Avatars list={avatars} />
        <Content title='The Amur leopard can run at speeds of up to 37 miles per hour.' content="This incredible animal has been reported to leap more than 19 feet horizontally and up to 10 feet vertically.<br><br>They are solitary, nimble and strong, it carries and hides unfinished kills so that they are not taken by other predators.<br><br>They live for 10-15 years, and in captivity up to 20 years. The Amur leopard is also known as the Far East leopard, the Manchurian leopard or the Korean leopard." />
        <Carousel />
        <Aiding />
        
        <Newsletter />
        <Footer />
    </Layout>
  );
}

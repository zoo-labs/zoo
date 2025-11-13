import React,{useEffect, useState} from "react";
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Header from '@/components/animals/Header';
import Aiding from '@/components/Aiding';
import Avatars from '@/components/animal/Item';
import Content from '@/components/animals/Content';
import FutureUpgrades from '@/components/FutureUpgrades';
import CoreHeader from '@/components/animals/CoreHeader';
import Carousel from '@/components/animals/Carousel';
import { Elements } from '@stripe/react-stripe-js';
import animals from "@/components/animals/animals.json";
import { loadStripe } from '@stripe/stripe-js';

import NotFoundPage from "../404";

export default function AnimalPage() {
  const router = useRouter();
  const [animalRoute, setAnimalRoute] = useState(router.query.animal);
  const [animal, setAnimal] = useState(animals.find((animal) => animal.route === router.query.animal));
  const [animal_index, setAnimalIndex] = useState(animals.findIndex(p => p.route == router.query.animal));
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');
  React.useEffect(() => {
    if (router.isReady) {
      setAnimalRoute(router.query.animal);
      setAnimal(animals.find((animal) => animal.route === router.query.animal));
      setAnimalIndex(animals.findIndex(p => p.route == router.query.animal));
    }
  }, [router]);

  return (
    <Layout>
        { animal == undefined ? <NotFoundPage /> : <>
        <Seo />
        <Navbar />
        <Elements stripe={stripePromise}>
        {/* <CoreHeader index={animal_index}/>
        <FutureUpgrades /> */}
        <Header title={animal.name} content={animal.description.head} front={animal.card_front} back={animal.card_back} front_m={animal.card_front_mp4} back_m={animal.card_back_mp4} route={animal.route}/>
        </Elements>
        <Avatars list={animal.avatars} linkFlag={false}/>
        <Content title={animal.description.subtitle} content={animal.description.desc} />
        <Carousel />
        <Aiding />
        <Newsletter />
        <Footer />
        </> }
    </Layout>
  );
}

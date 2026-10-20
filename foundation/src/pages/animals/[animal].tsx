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
import { stripe } from '@/lib/stripe';

import NotFoundPage from "../404";

/**
 * The site is a static export, so a dynamic route has to name its paths at build
 * time. Without this Next emitted one `/animals/[animal]` shell and nothing
 * else, and every species link on /animals — six of them, in the header of every
 * species page too — 404'd on the host.
 *
 * `animals.json` is already the list this page reads its content from, so it is
 * the list of routes as well; there is no second place to keep in step.
 */
export function getStaticPaths() {
  return {
    paths: animals.map((a) => ({ params: { animal: a.route } })),
    fallback: false,
  };
}

export function getStaticProps() {
  return { props: {} };
}

export default function AnimalPage() {
  const router = useRouter();
  const [animalRoute, setAnimalRoute] = useState(router.query.animal);
  const [animal, setAnimal] = useState(animals.find((animal) => animal.route === router.query.animal));
  const [animal_index, setAnimalIndex] = useState(animals.findIndex(p => p.route == router.query.animal));
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
        <Elements stripe={stripe}>
        {/* <CoreHeader index={animal_index}/>
        <FutureUpgrades /> */}
        <Header title={animal.name} content={animal.description.head} front={animal.card_front} back={animal.card_back} front_m={animal.card_front_mp4} back_m={animal.card_back_mp4} route={animal.route}/>
        </Elements>
        <Avatars list={animal.avatars} />
        <Content title={animal.description.subtitle} content={animal.description.desc} />
        <Carousel />
        <Aiding />
        <Newsletter />
        <Footer />
        </> }
    </Layout>
  );
}

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useGif } from '../../context/GifContext'
//import BabylonAnim from "components/Babylon";

import dynamic from 'next/dynamic'
const ModelViewer = dynamic(() => import('../../components/ModelViewer'), {
  ssr: false,
})

const animalFamilyData = [
  {
    id: '1',
    cameraZ: 100,
    upLimit: 120,
    lowLimit: 40,
    glb: '/models/ELEPHANT_ADULT.glb',
    image: 'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332888/zoo/images/sumatran-elephant_s3nww5.png',
    gif: 'https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/sumatran-elephant_bowsev.mov',
    name: 'Sumatran Elephant',
    slug: 'sumatran-elephant',
    scientificName: ' Elephas Maximus Sumatranus',
    description: `Sumatran elephants feed on a variety of plants and deposit seeds
    wherever they go, contributing to a healthy forest ecosystem.
    They also share their lush forest habitat with other endangered
    species.`,
    status: 'Critically Endangered',
    population: '2,400 - 2,800',
    size: '6.6 - 10.5 Feet',
    habitat: 'Tropical Forests',
    images: [
      'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332888/zoo/images/sumatran-elephant_s3nww5.png',
      'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332888/zoo/images/sumatran-elephant_s3nww5.png',
      'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332888/zoo/images/sumatran-elephant_s3nww5.png',
    ],
  },
  {
    id: '2',
    cameraZ: 80,
    upLimit: 120,
    lowLimit: 40,
    glb: '/models/RHINO_ADULT.glb',
    image: 'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png',
    gif: 'https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/javan-rhino_nkm1sw.mov',
    name: 'Javan Rhino',
    slug: 'javan-rhino',
    scientificName: 'Rhinoceros Sondaicus',
    description: `Once the most widespread of Asian rhinoceroses, the Javan
    rhinoceros ranged from the islands of Java and Sumatra,
    throughout Southeast Asia, and into India and China. The species
    is critically endangered, with only one known population in the
    wild, and no individuals in captivity. It is possibly the rarest
    large mammal on Earth.`,
    status: 'Critically Endangered',
    population: '18',
    size: '6.6 - 10.5 Feet',
    habitat: 'Forests',
    images: [
      'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png',
      'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png',
      'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png',
    ],
  },
  {
    id: '3',
    cameraZ: 50,
    upLimit: 80,
    lowLimit: 35,
    glb: '/models/TIGER_ADULT.glb',
    image: 'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png',
    gif: 'https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/siberian-tiger_gn44b5.mov',
    name: 'Siberian Tiger',
    slug: 'siberian-tiger',
    scientificName: 'Panthera Tigris Altaica',
    description: `The Siberian tiger is a tiger from a specific population of the
    Panthera tigris tigris subspecies native to the Russian Far
    East, Northeast China. It once ranged throughout the Korean
    Peninsula, north China, and eastern Mongolia. The population
    currently inhabits mainly the Sikhote-Alin mountain region in
    southwest Primorye Province in East Russia.`,
    status: 'endangered',
    population: '2,400 - 2,800',
    size: '6.6 - 10.5 Feet',
    habitat: 'Tropical Forests',
    images: [
      'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png',
      'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png',
      'https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png',
    ],
  },
]

const AnimalFamilySection = () => {
  const { state } = useGif()
  const { gifMode } = state

  return (
    <section className="AnimalFamily">
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold text-center lg:text-4xl">Our Animal Family</h2>
        {animalFamilyData.map((data) => {
          return (
            <div className="flex flex-col items-center mb-4 AnimalFamily__nfts" key={data.id}>
              <div className="flex flex-col items-center justify-center AnimalFamily__nft lg:flex-row">
                <div className="flex flex-col items-center w-full h-auto mb-8 AnimalFamily__image lg:basis-1/3">
                  <div className="p-px mb-8 overflow-hidden rounded-lg bg-nft-gradient ">
                    {gifMode === 'gif' ? (
                      <div className="overflow-hidden rounded">
                        <div className=" w-[400px] h-[400px]">
                          <ModelViewer glb={data.glb}></ModelViewer>
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-hidden bg-black rounded-lg">
                        <video autoPlay loop={true} playsInline={true} muted className="overflow-hidden rounded">
                          <source src={data.gif}></source>
                        </video>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center AnimalFamily__name lg:basis-1/3">
                  <h2 className="mb-6 text-3xl text-center font-bold lg:4xl">{data.name}</h2>
                  <a
                    href="/coming-soon"
                    className="px-8 py-3 text-sm font-semibold text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 lg:px-16"
                  >
                    Coming Soon
                  </a>
                </div>
                <div className="px-2 py-6 lg:px-6 lg:basis-1/3 text-center lg:bg-black100 lg:rounded-3xl">
                  <h3 className="mb-4 text-xl font-bold ">{data.scientificName}</h3>
                  <p className="mb-3 text-grey text-opacity-70 md:px-8 lg:px-0">{data.description}</p>
                  <Link href={`nft-product/${data.slug}`} passHref>
                    <span className="text-green font-bold underline hover:cursor-pointer">Learn more</span>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}

        <div className="flex items-center justify-center">
          <a
            href="/animal-list"
            className="px-5 py-3 text-sm border text-center rounded-full font-semibold border-green md:text-base text-green md:px-6 md:py-4 lg:px-20"
          >
            See the entire First Generation Animal NFT series
          </a>
        </div>
      </div>
    </section>
  )
}

export default AnimalFamilySection

{
  /* Another section */
}
{
  /* <div className="flex flex-col items-center mb-4 AnimalFamily__nfts">
          <div className="flex flex-col items-center justify-center AnimalFamily__nft lg:flex-row">
            <div className="flex flex-col items-center w-full h-auto mb-8 AnimalFamily__image lg:basis-1/3">
              <Image
                src="/img/javan-rhino.png"
                width={373}
                height={373}
                alt=""
              />
            </div>
            <div className="text-center AnimalFamily__name lg:basis-1/3">
              <h2 className="mb-6 text-3xl font-bold lg:4xl">Javan Rhino</h2>
              <a
                href="/nft"
                className="px-8 py-3 text-sm font-bold text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 lg:px-16"
              >
                Buy NFT
              </a>
            </div>
            <div className="px-2 py-6 lg:px-6 lg:basis-1/3 lg:bg-black100 lg:rounded-3xl">
              <h3 className="mb-4 text-xl font-bold ">Rhinoceros Sondaicus</h3>
              <p className="mb-3 text-grey text-opacity-70">
                Once the most widespread of Asian rhinoceroses, the Javan
                rhinoceros ranged from the islands of Java and Sumatra,
                throughout Southeast Asia, and into India and China. The species
                is critically endangered, with only one known population in the
                wild, and no individuals in captivity. It is possibly the rarest
                large mammal on Earth.
              </p>
              <a
                href=""
                rel="noreferrer"
                className="font-bold underline text-green"
              >
                Learn more
              </a>
            </div>
          </div>
        </div> */
}
{
  /* Another section */
}
{
  /* <div className="flex flex-col items-center AnimalFamily__nfts ">
          <div className="flex flex-col items-center justify-center AnimalFamily__nft lg:flex-row">
            <div className="flex flex-col items-center w-full h-auto mb-8 AnimalFamily__image lg:basis-1/3">
              <Image
                src="/img/siberian-tiger.png"
                width={373}
                height={373}
                alt=""
              />
            </div>
            <div className="text-center AnimalFamily__name lg:basis-1/3">
              <h2 className="mb-6 text-3xl font-bold lg:4xl">Siberian Tiger</h2>
              <a
                href="/nft"
                className="px-8 py-3 text-sm font-bold text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 lg:px-16"
              >
                Buy NFT
              </a>
            </div>
            <div className="px-2 py-6 lg:px-6 lg:basis-1/3 lg:bg-black100 lg:rounded-3xl">
              <h3 className="mb-4 text-xl font-bold ">Siberian Tiger</h3>
              <p className="mb-3 text-grey text-opacity-70">
                The Siberian tiger is a tiger from a specific population of the
                Panthera tigris tigris subspecies native to the Russian Far
                East, Northeast China. It once ranged throughout the Korean
                Peninsula, north China, and eastern Mongolia. The population
                currently inhabits mainly the Sikhote-Alin mountain region in
                southwest Primorye Province in East Russia.
              </p>
              <a
                href=""
                rel="noreferrer"
                className="font-bold underline text-green"
              >
                Learn more
              </a>
            </div>
          </div>
        </div> */
}

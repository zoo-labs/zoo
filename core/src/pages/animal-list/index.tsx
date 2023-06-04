import React, { useEffect } from "react";
import AnimalFamilyInfo from "components/AnimalInfo";
import Image from "next/image";
import Link from "next/link";
import animals from "../../animals.json";
import { ANIMAL_TYPE } from "../../types";

import { useGif } from "context/GifContext";
//import BabylonAnim from "components/Babylon";
import dynamic from "next/dynamic";
import SingleAnimal from "pages/home/SingleAnimal";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});
const animalFamilyData = [
  {
    id: "1",
    cameraZ: 90,
    upLimit: 120,
    lowLimit: 40,
    usdz: "/models/Elephant/ELEPHANT_ADULT.usdz",
    glb: "/models/Elephant/ELEPHANT_ADULT.glb",
    usdz_baby: "/models/Elephant/ELEPHANT_BABY.usdz",
    glb_baby: "/models/Elephant/ELEPHANT_BABY.glb",
    usdz_teen: "/models/Elephant/ELEPHANT_TEEN.usdz",
    glb_teen: "/models/Elephant/ELEPHANT_TEEN.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332888/zoo/images/sumatran-elephant_s3nww5.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332888/zoo/images/sumatran-elephant_s3nww5.png",
    name: "Sumatran Elephant",
    slug: "sumatran-elephant",
  },
  {
    id: "2",
    cameraZ: 90,
    upLimit: 100,
    lowLimit: 40,
    usdz: "/models/Rhino/RHINO_ADULT.usdz",
    glb: "/models/Rhino/RHINO.glb",
    usdz_baby: "/models/Rhino/RHINO_BABY.usdz",
    glb_baby: "/models/Rhino/RHINO_BABY.glb",
    usdz_teen: "/models/Rhino/RHINO_TEEN.usdz",
    glb_teen: "/models/Rhino/RHINO_TEEN.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png",
    name: "Javan Rhino",
    slug: "javan-rhino",
  },
  {
    id: "3",
    cameraZ: 40,
    upLimit: 80,
    lowLimit: 35,
    usdz: "/models/Tiger/TIGER_ADULT.usdz",
    glb: "/models/Tiger/TIGER_ADULT.glb",
    usdz_baby: "/models/Tiger/TIGER_BABY.usdz",
    glb_baby: "/models/Tiger/TIGER_BABY.glb",
    usdz_teen: "/models/Tiger/TIGER_TEEN.usdz",
    glb_teen: "/models/Tiger/TIGER_TEEN.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png",
    name: "Siberian Tiger",
    slug: "siberian-tiger",
  },
  {
    id: "4",
    cameraZ: 30,
    upLimit: 40,
    lowLimit: 20,
    usdz: "/models/Leopard/LEOPARD_ADULT.usdz",
    glb: "/models/Leopard/LEOPARD_ADULT.glb",
    usdz_baby: "/models/Leopard/LEOPARD_BABY.usdz",
    glb_baby: "/models/Leopard/LEOPARD_BABY.glb",
    usdz_teen: "/models/Leopard/LEOPARD_TEEN.usdz",
    glb_teen: "/models/Leopard/LEOPARD_TEEN.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332847/zoo/images/clouded-leopard_piqix9.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332847/zoo/images/clouded-leopard_piqix9.png",
    name: "Amur Leopard",
    slug: "amur-leopard",
  },
  {
    id: "5",
    cameraZ: 45,
    upLimit: 100,
    lowLimit: 40,
    usdz: "/models/Hippo/HIPPO_ADULT.usdz",
    glb: "/models/Hippo/HIPPO_ADULT.glb",
    usdz_baby: "/models/Hippo/HIPPO_BABY.usdz",
    glb_baby: "/models/Hippo/HIPPO_BABY.glb",
    usdz_teen: "/models/Hippo/HIPPO_TEEN.usdz",
    glb_teen: "/models/Hippo/HIPPO_TEEN.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332795/zoo/images/hippo_i4grms.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332795/zoo/images/hippo_i4grms.png",
    name: "Pygmy Hippo",
    slug: "pygmy-hippo",
  },
  {
    id: "6",
    cameraZ: 90,
    upLimit: 120,
    lowLimit: 40,
    usdz: "/models/Giraffe/GIRAFFE_ADULT.usdz",
    glb: "/models/Giraffe/GIRAFFE_ADULT.glb",
    usdz_baby: "/models/Giraffe/GIRAFFE_BABY.usdz",
    glb_baby: "/models/Giraffe/GIRAFFE_BABY.glb",
    usdz_teen: "/models/Giraffe/GIRAFFE_TEEN.usdz",
    glb_teen: "/models/Giraffe/GIRAFFE_TEEN.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332705/zoo/images/giraffe_caohec.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332705/zoo/images/giraffe_caohec.png",
    name: "Nubian Giraffe",
    slug: "nubian-giraffe",
  },
  {
    id: "7",
    cameraZ: 30,
    upLimit: 40,
    lowLimit: 20,
    usdz: "/models/Wolf/WOLF_ADULT.usdz",
    glb: "/models/Wolf/WOLF_ADULT.glb",
    usdz_baby: "/models/Wolf/WOLF_BABY.usdz",
    glb_baby: "/models/Wolf/WOLF_BABY.glb",
    usdz_teen: "/models/Wolf/WOLF_TEEN.usdz",
    glb_teen: "/models/Wolf/WOLF_TEEN.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332820/zoo/images/red-wolf_tjiwez.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332820/zoo/images/red-wolf_tjiwez.png",
    name: "Red Wolf",
    slug: "red-wolf",
  },
];

const AnimalList = () => {
  const [animalFilter, setAnimalFilter] = React.useState<ANIMAL_TYPE[]>([]);
  const [animalsModified, setAnimalsModified] = React.useState<ANIMAL_TYPE[]>(
    []
  );

  const { state } = useGif();
  const { gifMode } = state;

  useEffect(() => {
    setAnimalsModified([...animals, animals[0]]);
  }, []);
  const handleActive = (e: ANIMAL_TYPE) => {
    const active = animalsModified.filter((animal) => animal.name === e.name);
    active.length = 1;
    setAnimalFilter(active);
  };
  return (
    <section>
      <div className="py-16 mb-8 lg:max-w-7xl lg:mx-auto">
        <h1 className="mt-20 text-4xl font-bold text-center lg:text-6xl">
          Our Animal NFT Family
        </h1>
        <p className="max-w-4xl mx-auto mt-6 text-center">
          The gallery below contains each of the stunningly 3D rendered, AR-
          Enabled animal NFTs representing a critically-endangered species in
          the real world.{" "}
          <a
            href="https://zoolabsofficial.medium.com/introducing-zoo-labs-wildlife-conservation-powered-by-defi-67eacef5a07"
            target="_blank"
            rel="noreferrer"
            className="text-green underline"
          >
            Click here
          </a>{" "}
          to learn more about how purchasing a Zoo Labs Animal NFT will allow
          you to join us in the fight for conservation.
        </p>
      </div>
      <div className="flex flex-col flex-wrap items-center px-4 pb-16 lg:max-w-7xl lg:mx-auto lg:grid grid-cols-3 lg:justify-center lg:gap-2">
        {animalFamilyData.map((animal, index) => (
          <div
            key={animal.id}
            className="p-px  overflow-hidden rounded border border-gray-500 mx-auto w-full lg:max-w-md m-4  "
          >
            {gifMode === "gif" ? (
              <div className="overflow-hidden rounded ">
                {/* <div className="h-[350px] w-[300px]">
                  <ModelViewer
                     usdz={animal.usdz}
                     glb={animal.glb}
                   ></ModelViewer>
                 </div> */}
                <SingleAnimal data={animal} />

                <div className="mt-4">
                  <Link
                    href={`nft-product/${animal.slug}`}
                    className="AnimalFamily__image w-full bg-[#000]	 h-auto flex flex-col items-center lg:basis-1/3   p-4">

                    {animal.name}

                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-black rounded overflow-hidden">
                <div className="h-[300px] w-[300px]">
                  <Image
                    src={`${animal.gif}`}
                    width={373}
                    height={373}
                    alt=""
                    className="rounded-3xl"
                  />
                </div>

                <Link
                  href={`nft-product/${animal.slug}`}
                  className="AnimalFamily__image w-full bg-[#000] border border-[#000] rounded-3xl	 h-auto flex flex-col items-center lg:basis-1/3 p-4">

                  {animal.name}

                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* {animalFilter.length > 0 && (
        <div className="bg-[#2517FF] py-10 mb-20">
          {animalFilter.map((animal) => (
            <div key={animal.name} className="flex flex-col">
              <AnimalFamilyInfo
                name={animal.name}
                image={animal.image}
                descriptionHead={animal.description.head}
                description={animal.description.desc}
              />
            </div>
          ))}
        </div>
      )} */}
    </section>
  );
};

export default AnimalList;

import Image from "next/image";

const productsData = [
  {
    id: "1",
    image: "/img/sumatran-elephant.png",
    gif: "/gifs/sumatran-elephant.gif",
    name: "Sumatran Elephant",
    scientificName: " Elephas Maximus Sumatranus",
    description: `Sumatran elephants feed on a variety of plants and deposit seeds
    wherever they go, contributing to a healthy forest ecosystem.
    They also share their lush forest habitat with other endangered
    species.`,
    status: "Critically Endangered",
    population: "2,400 - 2,800",
    size: "6.6 - 10.5 Feet",
    habitat: "Forest",
    images: [
      "/gifs/sumatran-elephant.gif",
      "/gifs/sumatran-elephant.gif",
      "/gifs/sumatran-elephant.gif",
      "/gifs/sumatran-elephant.gif",
    ],
  },
  {
    id: "2",
    image: "/img/javan-rhino.png",
    gif: "/gifs/javan-rhino.gif",
    name: "Javan Rhino",
    scientificName: "Rhinoceros Sondaicus",
    description: `Once the most widespread of Asian rhinoceroses, the Javan
    rhinoceros ranged from the islands of Java and Sumatra,
    throughout Southeast Asia, and into India and China. The species
    is critically endangered, with only one known population in the
    wild, and no individuals in captivity. It is possibly the rarest
    large mammal on Earth.`,
    status: "Critically Endangered",
    population: "18",
    size: "6.6 - 10.5 Feet",
    habitat: "Forest",
    images: [
      "/gifs/javan-rhino.gif",
      "/gifs/javan-rhino.gif",
      "/gifs/javan-rhino.gif",
      "/gifs/javan-rhino.gif",
    ],
  },
  {
    id: "3",
    image: "/img/siberian-tiger.png",
    gif: "/gifs/siberian-tiger.gif",
    name: "Siberian Tiger",
    scientificName: "Siberian Tiger",
    description: `The Siberian tiger is a tiger from a specific population of the
    Panthera tigris tigris subspecies native to the Russian Far
    East, Northeast China. It once ranged throughout the Korean
    Peninsula, north China, and eastern Mongolia. The population
    currently inhabits mainly the Sikhote-Alin mountain region in
    southwest Primorye Province in East Russia.`,
    status: "endangered",
    population: "40",
    size: "6.6 - 10.5 Feet",
    habitat: "Tropical Forests",
    images: [
      "/gifs/siberian-tiger.gif",
      "/gifs/siberian-tiger.gif",
      "/gifs/siberian-tiger.gif",
    ],
  },
  {
    id: "4",
    image: "/img/clouded-leopard.png",
    gif: "/gifs/clouded-leopard.gif",
    name: "Clouded Leopard",
    scientificName: "Neofelis Diardi",
    description: `The Sunda Clouded Leopard is currently listed under CITES Appendix I (as Neofelis nebulosa), and warrants full listing under N. diardi. The species is fully protected in Sumatra and Kalimantan (Indonesia), Sabah and Sarawak (Malaysia), and Brunei. It occurs in most protected areas along the Sumatran mountain spine, and in most of the larger protected areas on Borneo, though maintaining or re-establishing connectivity among protected areas (e.g. via habitat corridors) remains a critical conservation priority for the species.`,
    status: "Vulnerable",
    population: "3750-5580",
    size: "6.6 - 10.5 Feet",
    habitat: "Forest",
    images: [
      "/gifs/clouded-leopard.gif",
      "/gifs/clouded-leopard.gif",
      "/gifs/clouded-leopard.gif",
    ],
  },
  {
    id: "5",
    image: "/img/ethiopian-wolf.png",
    gif: "/gifs/ethiopian-wolf.gif",
    name: "Ethiopian Wolf",
    scientificName: "Canis simensis",
    description: `TThe Ethiopian Wolf occurs in several protected areas: Bale Mountains National Park; Simien Mountains National Park; Borena Saiynt Regional Park (South Wollo); Guassa Community Conservation Area (North Shoa); Arsi Mountains Regional Park. As a result of boundary extensions (Simien) and new parks created (Arsi) the area of suitable wolf habitat within protected areas increased to 87%.`,
    status: "Endangered",
    population: "197",
    size: "6.6 - 10.5 Feet",
    habitat: "Shrubland, Grassland",
    images: [
      "/gifs/ethiopian-wolf.gif",
      "/gifs/ethiopian-wolf.gif",
      "/gifs/ethiopian-wolf.gif",
    ],
  },
];

//nubian-giraffe

const NFTProduct = ({ animal }) => {
  return (
    <div className="NFTProduct">
      <div className=" pt-16 pb-16 px-6 md:flex md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto lg:justify-center gap-4">
        <div className="lg:basis-1/2 flex items-center justify-center">
          <div className="p-px bg-nft-gradient mb-8 lg:mb-0 rounded">
            <div className="bg-black rounded">
              <Image
                src={`${animal.gif}`}
                width={373}
                height={373}
                alt=""
                className="rounded-3xl"
                objectFit="contain"
              />
            </div>
          </div>
        </div>

        <div
          className="bg-black100 rounded px-4 py-12 flex flex-col lg:flex-row items-start justify-between lg:basis-1/2 gap-2"
          key={animal.id}
        >
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{animal.name}</h2>
              <a href="/partnerships" className="text-sm underline">
                philanthropic partnership
              </a>
            </div>
            <div className="flex items-center mb-8">
              <Image src="/img/status-icon.svg" width={48} height={48} alt="" />
              <span className="ml-4">
                <p>Status</p>
                <p className="text-xs capitalize">{animal.status}</p>
              </span>
            </div>
            <div className="flex items-center mb-8">
              <Image
                src="/img/population-icon.svg"
                width={48}
                height={48}
                alt=""
              />
              <span className="ml-4">
                <p>Population</p>
                <p className="text-xs">{animal.population}</p>
              </span>
            </div>
            <div className="flex items-center mb-8">
              <Image
                src="/img/scientific-name-icon.svg"
                width={48}
                height={48}
                alt=""
              />
              <span className="ml-4">
                <p>Scientific Name</p>
                <p className="text-xs">{animal.scientificName}</p>
              </span>
            </div>
            <div className="flex items-center mb-8">
              <Image src="/img/size-icon.svg" width={48} height={48} alt="" />
              <span className="ml-4">
                <p>Size</p>
                <p className="text-xs">{animal.size}</p>
              </span>
            </div>
            <div className="flex items-center mb-8">
              <Image
                src="/img/environment-icon.svg"
                width={48}
                height={48}
                alt=""
              />
              <span className="ml-4">
                <p>Habitats</p>
                <p className="text-xs capitalize">{animal.habitat}</p>
              </span>
            </div>
          </div>

          <div className="basis-2/3">
            <p className="text-lg">{animal.description}</p>
          </div>
        </div>
      </div>
      <div className="pt-16 pb-16 px-6 md:flex md:flex-col lg:max-w-7xl lg:mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
          View Available {animal.name}
        </h2>

        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          {animal.images.map((img, index) => {
            return (
              <div
                className="p-px mb-4 rounded bg-nft-gradient overflow-hidden"
                key={index}
              >
                <div className="bg-black rounded overflow-hidden">
                  <Image
                    src={img}
                    width={263}
                    height={334}
                    alt=""
                    objectFit="contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NFTProduct;

export async function getStaticPaths() {
  const data = productsData;

  const paths = data.map((animal) => ({
    params: { id: animal.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const results = productsData;
  const productsLength = results.length;
  const data = results.filter((animal) => animal.id.toString() === params.id);

  return {
    props: {
      animal: data[0],
      productsLength,
    },
  };
}

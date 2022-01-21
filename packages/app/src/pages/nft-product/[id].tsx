import Image from "next/image";

const productsData = [
  {
    id: "1",
    image: "/img/sumatran-elephant.png",
    name: "Sumatran Elephant",
    scientificName: " Elephas Maximus Sumatranus",
    description: `Sumatran elephants feed on a variety of plants and deposit seeds
    wherever they go, contributing to a healthy forest ecosystem.
    They also share their lush forest habitat with other endangered
    species.`,
    status: "endangered",
    population: "2,400 - 2,800",
    size: "6.6 - 10.5 Feet",
    habitat: "Tropical Forests",
    images: [
      "/img/sumatran-elephant.png",
      "/img/sumatran-elephant.png",
      "/img/sumatran-elephant.png",
      "/img/sumatran-elephant.png",
    ],
  },
  {
    id: "2",
    image: "/img/javan-rhino.png",
    name: "Javan Rhino",
    scientificName: "Rhinoceros Sondaicus",
    description: `Once the most widespread of Asian rhinoceroses, the Javan
    rhinoceros ranged from the islands of Java and Sumatra,
    throughout Southeast Asia, and into India and China. The species
    is critically endangered, with only one known population in the
    wild, and no individuals in captivity. It is possibly the rarest
    large mammal on Earth.`,
    status: "endangered",
    population: "2,400 - 2,800",
    size: "6.6 - 10.5 Feet",
    habitat: "Tropical Forests",
    images: [
      "/img/javan-rhino.png",
      "/img/javan-rhino.png",
      "/img/javan-rhino.png",
      "/img/javan-rhino.png",
    ],
  },
  {
    id: "3",
    image: "/img/siberian-tiger.png",
    name: "Siberian Tiger",
    scientificName: "Siberian Tiger",
    description: `The Siberian tiger is a tiger from a specific population of the
    Panthera tigris tigris subspecies native to the Russian Far
    East, Northeast China. It once ranged throughout the Korean
    Peninsula, north China, and eastern Mongolia. The population
    currently inhabits mainly the Sikhote-Alin mountain region in
    southwest Primorye Province in East Russia.`,
    status: "endangered",
    population: "2,400 - 2,800",
    size: "6.6 - 10.5 Feet",
    habitat: "Tropical Forests",
    images: [
      "/img/javan-rhino.png",
      "/img/javan-rhino.png",
      "/img/javan-rhino.png",
      "/img/javan-rhino.png",
    ],
  },
];

const NFTProduct = ({ animal }) => {
  return (
    <div className="NFTProduct">
      <div className=" pt-16 pb-16 px-6 md:flex md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto lg:justify-center gap-4">
        <div className="lg:basis-1/2 flex items-center justify-center">
          <div className="p-px bg-gradient-to-b from-btn1 to-btn2 mb-8 lg:mb-0">
            <div className="bg-black">
              <Image src="/img/egg.png" width={300} height={300} alt="" />
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
                className="p-px mb-4"
                key={index}
              >
                <div className="bg-black">
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

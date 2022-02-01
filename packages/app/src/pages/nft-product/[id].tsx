import Image from "next/image";

const productsData = [
  {
    id: "1",
    image: "/img/sumatran-elephant.png",
    gif: "/videos/sumatran-elephant.mov",
    name: "Sumatran Elephant",
    scientificName: "Elephas Maximus Sumatranus",
    description: `<p class="mb-6">Sumatran elephants feed on a variety of plants and deposit seeds wherever they go, contributing to a healthy forest ecosystem. As herbivores, these noble animals spend their days munching on 150kg of plants and seeds as they move through the forests. They also share their lush forest habitat with several other endangered species, such as the Sumatran Rhinoceros, Sumatran Tiger, Sumatran Orangutan, and countless other species; all of which benefit from an elephant population that thrives in a healthy habitat.</p>
    <p>
    In 2012, the Sumatran elephant was changed from “Endangered” to “Critically Endangered” because half of its population has been lost in one generation—a decline that is largely due to habitat loss and as a result human-elephant conflict.
    </p>`,
    status: "Critically Endangered",
    population: "2,400 - 2,800",
    size: "Up to 6 meters (20 feet)",
    habitat: "Broadleaf, moist tropical forest",
    images: [
      "/videos/sumatran-elephant.mov",
      "/videos/sumatran-elephant.mov",
      "/videos/sumatran-elephant.mov",
      "/videos/sumatran-elephant.mov",
    ],
  },
  {
    id: "2",
    image: "/img/javan-rhino.png",
    gif: "/videos/javan-rhino.mov",
    name: "Javan Rhino",
    scientificName: "Rhinoceros Sondaicus",
    description: `<p class="mb-6">Once the most widespread of Asian rhinoceroses, the Javan
    rhinoceros ranged from the islands of Java and Sumatra,
    throughout Southeast Asia, and into India and China. The species
    is critically endangered, with only one known population in the
    wild, and no individuals in captivity. It is possibly the rarest
    large mammal on Earth.</p>
    <p>These 2+ ton herbivores can live from 30-45 years and are solitary animals, except for mating pairs and mothers with young. Despite their already extremely small population, they have held on after being declared virtually extinct in 2011.</p>
    `,
    status: "Critically Endangered",
    population: "Less than 100",
    size: "3 meters (10 ft)",
    habitat: "Tropical forests",
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
    gif: "/videos/siberian-tiger.mov",
    name: "Siberian Tiger",
    scientificName: "Panthera tigris sumatrae",
    description: `<p class="mb-6">The Siberian tiger, a subspecies of tiger, is the largest cat in the world from the Russian Far East, Northeast China, and possibly North Korea. It once ranged throughout the Korean Peninsula, north China, and eastern Mongolia. It averages about 11 feet in total length, with a tail that accounts for approximately 3 feet of it. Adult male Siberian tigers can weigh up to 700 pounds, while females are significantly smaller, weighing up to 400 pounds.
</p><p>
Siberian tigers are distinguishable by their striped fur. Similar to people’s unique fingerprints, no two tigers have the same stripe pattern. Siberian tigers differ from other tigers because they have fewer, paler stripes, and they also have manes. The mane, in addition to their thick fur, helps keep them warm and can be significant influences in both mating displays and in disputes.
</p>`,
    status: "Critically Endangered",
    population: "400",
    size: "3 meters (12 ft)",
    habitat: "Lowland to mountain forests",
    images: [
      "/gifs/siberian-tiger.gif",
      "/gifs/siberian-tiger.gif",
      "/gifs/siberian-tiger.gif",
    ],
  },
  {
    id: "4",
    image: "/img/clouded-leopard.png",
    gif: "/videos/clouded-leopard.mov",
    name: "Amur leopard",
    scientificName: "Panthera pardus orientalis",
    description: `<p class="mb-6">The Amur leopard is one of 10 subspecies of leopard, and one of the world’s rarest cats, with an estimated population of under 70 individuals left in the wild. They all live in a small area that hugs Russia’s far eastern border with China.</p>
    <p>
    <p>Many think of leopards stalking savannas of Africa but in the Russian Far East, a rare subspecies has adapted to life in the temperate forests that make up the northern-most part of the species’ range. Similar to other leopards, the Amur leopard can run at speeds of up to 37 miles per hour. This incredible animal has been reported to leap more than 19 feet horizontally and up to 10 feet vertically.</p>`,
    status: "Critically Endangered",
    population: "Approximately 84",
    size: "Up to 3.1 meters (7 feet)",
    habitat: "Temperate, Broadleaf Forest/Mountains",
    images: [
      "/gifs/clouded-leopard.gif",
      "/gifs/clouded-leopard.gif",
      "/gifs/clouded-leopard.gif",
    ],
  },
  {
    id: "5",
    image: "/img/hippo.png",
    gif: "/videos/hippo.mov",
    name: "Pygmy Hippo",
    scientificName: "Cheropsis liberiensis",
    description: `<p class="mb-6">The Pygmy Hippopotamus looks like a miniature version of its larger relative, the Hippopotamus (also known as the river or common hippopotamus), but it differs greatly in both behavior and physical characteristics. The Pygmy Hippo has adaptations for spending time in the water but is far less aquatic than the hippo. Its nose and ears close underwater just like its larger cousin’s do, but its head is rounder and narrower, its neck is proportionally longer, and its eyes are not on the top of its head.</p>The Pygmy Hippopotamus is much more rare in the wild, too, found only in the interior forests in parts of West Africa, mainly confined to Liberia, with small numbers in the neighboring countries of Sierra Leone, Guinea, and the Ivory Coast.<p>

    </p>`,
    status: "Critically Endangered",
    population: "2,000 to 3,000",
    size: "1 meters (3 ft)",
    habitat: "Forests and Swamps",
    images: ["/videos/hippo.mov", "/videos/hippo.mov", "/videos/hippo.mov"],
  },
  {
    id: "6",
    image: "/img/giraffe.png",
    gif: "/videos/giraffe.mov",
    name: "Nubian Giraffe",
    scientificName: "Canis simensis",
    description: `<p class="mb-6">The tallest of all giraffes is the Nubian species. This means they are considered to be the tallest land animal on the Earth, measuring up to a remarkable 6 meters, or 20 feet tall! They can also weigh approximately 2,800 pounds, with the males outweighing the females by several hundred pounds. The Nubian Giraffe is endangered with less than 2,645 individuals remaining, are now just one stage from becoming extinct in the wild.</p>
    <p>A distinguishing feature of the Nubian Giraffe is the number of horns on top of it’s head. Other Giraffe species typically have two horns, but the Nubian Giraffe can have up to five! They have two in the same place as other giraffes, one in the center, and two behind those.</p>`,
    status: "Critically Endangered",
    population: "2,645",
    size: "1.5 meters (9 ft)",
    habitat: "Savannahs and Woodlands",
    images: [
      "/videos/giraffe.mov",
      "/videos/giraffe.mov",
      "/videos/giraffe.mov",
    ],
  },
  {
    id: "7",
    image: "/img/red-wolf.png",
    gif: "/videos/red-wolf.mov",
    name: "Red Wolf",
    scientificName: "Canis simensis",
    description: `<p class="mb-6">The Red Wolf is the world’s most endangered member of the Canine family.</p>
    <p class="mb-6">Native to the United States, Red Wolves (Canis rufus) have a tawny, reddish coat, and they are intermediate in size between grey wolves and coyotes. That makes sense, as these two species interbred in the past to produce the red wolves’ ancestors. Nevertheless, recent research shows that red wolves are a unique species.</p><p>The only place where red wolves remain in the wild is the Alligator River National Wildlife Refuge in eastern North Carolina, and surrounding counties. There are only an estimated 35 or fewer wild red wolves.
  </p>`,
    status: "Critically Endangered",
    population: "Less than 10",
    size: "1.2 meters (4 ft)",
    habitat: "Forest, wetlands & bushlands",
    images: [
      "/videos/red-wolf.mov",
      "/videos/red-wolf.mov",
      "/videos/red-wolf.mov",
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
            <div className="bg-black rounded-lg">
              <video
                autoPlay
                loop={true}
                playsInline={true}
                muted
                className="rounded overflow-hidden"
              >
                <source src={animal.gif}></source>
              </video>
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
            <div
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: animal?.description }}
            />
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
                  <video
                    autoPlay
                    loop={true}
                    playsInline={true}
                    muted
                    className="rounded overflow-hidden"
                  >
                    <source src={animal.gif}></source>
                  </video>
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

import BabylonAnim from "components/Babylon";
import Image from "next/image";
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});
const productsData = [
  {
    id: "1",
    cameraZ: 90,
    upLimit: 120,
    lowLimit: 40,
    glb: "/models/ELEPHANT_ADULT.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332888/zoo/images/sumatran-elephant_s3nww5.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/sumatran-elephant_bowsev.mov",
    name: "Sumatran Elephant",
    slug: "sumatran-elephant",
    description: `<p class="mb-6">Sumatran elephants feed on a variety of plants and deposit seeds wherever they go, contributing to a healthy forest ecosystem. As herbivores, these noble animals spend their days munching on 150kg of plants and seeds as they move through the forests. They also share their lush forest habitat with several other endangered species, such as the Sumatran Rhinoceros, Sumatran Tiger, Sumatran Orangutan, and countless other species; all of which benefit from an elephant population that thrives in a healthy habitat.</p>
    <p class="mb-6" >With what many consider to be a “stranger” appearance to their more commonly depicted African cousins, the Sumatran Elephant is almost completely bald with small, rounded ears in place of the defining oversized ears many have come to expect. Female Sumatran Elephants rarely have tusks, but the females that do develop tusks keep them hidden away from sight until they open their mouths!</p>
    
    <p class="mb-6">In 2012, the Sumatran elephant was changed from “Endangered” to “Critically Endangered” because half of its population has been lost in one generation—a decline that is largely due to habitat loss and as a result human-elephant conflict.</p>
   `,
    status: "Critically Endangered",
    scientificName: "Elephas Maximus Sumatranus",
    habitat: "Broadleaf, moist tropical forest",
    population: "2,400 - 2,800",
    size: "Up to 6 meters (20 feet)",
    weight: "Approximately 5 tons (10,000 lbs)",
    height: "Up to 2.7 meters (9 feet)",
    images: [
      //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/sumatran-elephant_bowsev.mov",
      //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/sumatran-elephant_bowsev.mov",
      //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/sumatran-elephant_bowsev.mov",
      { cameraZ: 90, upLimit: 120, lowLimit: 40, glb: "/models/ELEPHTEEN.glb" },
      {
        cameraZ: 90,
        upLimit: 120,
        lowLimit: 40,
        glb: "/models/ELEPHANT_ADULT.glb",
      },
    ],
  },
  {
    id: "2",
    cameraZ: 50,
    upLimit: 100,
    lowLimit: 40,
    glb: "/models/RHINO_ADULT.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/javan-rhino_nkm1sw.mov",
    name: "Javan Rhino",
    slug: "javan-rhino",
    scientificName: "Rhinoceros Sondaicus",
    description: `<p class="mb-6">Once the most widespread of Asian rhinoceroses, the Javan Rhinoceros previously ranged from the islands of Java and Sumatra, throughout Southeast Asia, and into India and China. The species is critically endangered, with only one known population in the wild, and no individuals in captivity. It is possibly the rarest large mammal on Earth,  with a population of approximately 74 at the western tip of Java in Indonesia.</p>
    <p class="mb-6">These 2+ ton herbivores can live from 30-45 years and are solitary animals, except for mating pairs and mothers with young. Despite their already extremely small population, they have held on after being declared virtually extinct in 2011.</p>
    <p class="mb-6">The decline of the Javan rhinoceros is attributed to poaching, primarily for their horns, which are highly valued in traditional Chinese medicine, fetching as much as US$30,000 per kg on the black market. Poaching ultimately wiped out the species in Vietnam.</p>
    `,
    status: "Critically Endangered",
    population: "Less than 100",
    size: "3 meters (10 ft)",
    habitat: "Tropical forests",
    weight: "2,300 kgs (5,000 lbs)",
    images: [
      //   "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/javan-rhino_nkm1sw.mov",
      //  "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/javan-rhino_nkm1sw.mov",
      // "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/javan-rhino_nkm1sw.mov",

      {
        cameraZ: 50,
        upLimit: 100,
        lowLimit: 40,
        glb: "/models/RHINO_YOUNG_TEEN.glb",
      },
      {
        cameraZ: 50,
        upLimit: 100,
        lowLimit: 40,
        glb: "/models/RHINO_ADULT.glb",
      },
    ],
  },
  {
    id: "3",
    cameraZ: 40,
    upLimit: 80,
    lowLimit: 35,
    glb: "/models/TIGER_ADULT.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/siberian-tiger_gn44b5.mov",
    name: "Siberian Tiger",
    slug: "siberian-tiger",
    scientificName: "Panthera tigris sumatrae",
    description: `<p class="mb-6">The Siberian tiger, a subspecies of tiger, is the largest cat in the world from the Russian Far East, Northeast China, and possibly North Korea. It once ranged throughout the Korean Peninsula, north China, and eastern Mongolia. It averages about 11 feet in total length, with a tail that accounts for approximately 3 feet of it. Adult male Siberian tigers can weigh up to 700 pounds, while females are significantly smaller, weighing up to 400 pounds</p>
    <p class="mb-6">Siberian tigers are distinguishable by their striped fur. Similar to people’s unique fingerprints, no two tigers have the same stripe pattern. Siberian tigers differ from other tigers because they have fewer, paler stripes, and they also have manes. The mane, in addition to their thick fur, helps keep them warm and can be significant influences in both mating displays and in disputes.</p>
    <p class="mb-6">Siberian tigers are solitary animals, marking their scent on trees to keep other tigers away. They stalk their prey, which include elk, boar, bears, and deer, until they are close enough to pounce. Their diet in the wild also hunt smaller animals like rabbits, pikas, and fish. Because tigers are not always successful on their hunts, they need to hunt often and may establish and roam a territory several miles wide. They can eat up to 60 pounds of meat in one sitting!
</p>`,
    status: "Critically Endangered",
    population: "400",
    size: "3 meters (12 ft)",
    habitat: "Lowland to mountain forests",
    weight: "320 kgs (700 lbs)",
    images: [
      // "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/siberian-tiger_gn44b5.mov",
      //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/siberian-tiger_gn44b5.mov",
      //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/siberian-tiger_gn44b5.mov",
      { cameraZ: 40, upLimit: 80, lowLimit: 35, glb: "/models/TIGERTeen.glb" },
      {
        cameraZ: 40,
        upLimit: 80,
        lowLimit: 35,
        glb: "/models/TIGER_ADULT.glb",
      },
    ],
  },
  {
    id: "4",
    cameraZ: 30,
    upLimit: 40,
    lowLimit: 20,
    glb: "/models/LEO_ADULT.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332847/zoo/images/clouded-leopard_piqix9.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/clouded-leopard_tmjty9.mov",
    name: "Amur leopard",
    slug: "clouded-leopard",
    scientificName: "Panthera pardus orientalis",
    description: `<p class="mb-6">The Amur leopard is one of 10 subspecies of leopard, and one of the world’s rarest cats, with an estimated population of under 70 individuals left in the wild. They all live in a small area that hugs Russia’s far eastern border with China<p>
    <p class="mb-6" >Many think of leopards stalking savannas of Africa but in the Russian Far East, a rare subspecies has adapted to life in the temperate forests that make up the northern-most part of the species’ range. Similar to other leopards, the Amur leopard can run at speeds of up to 37 miles per hour. This incredible animal has been reported to leap more than 19 feet horizontally and up to 10 feet vertically.</p>
    <p class="mb-6" >The Amur leopard is solitary. Nimble-footed and strong, it carries and hides unfinished kills so that they are not taken by other predators. It has been reported that some males stay with females after mating, and may even help with rearing the young. Several males sometimes follow and fight over a female. They live for 10-15 years, and in captivity up to 20 years. The Amur leopard is also known as the Far East leopard, the Manchurian leopard or the Korean leopard.</p>`,
    status: "Critically Endangered",
    population: "Approximately 84",
    size: "Up to 3.1 meters (7 feet)",
    habitat: "Temperate, Broadleaf Forest/Mountains",
    weight: "Up to 47 kgs (105 lbs)",
    images: [
      //    "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/clouded-leopard_tmjty9.mov",
      //  "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/clouded-leopard_tmjty9.mov",
      //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/clouded-leopard_tmjty9.mov",
      {
        cameraZ: 20,
        upLimit: 30,
        lowLimit: 10,
        glb: "/models/LEOPARD_YOUNG_TEEN.glb",
      },
      { cameraZ: 20, upLimit: 30, lowLimit: 10, glb: "/models/LEO_ADULT.glb" },
    ],
  },
  {
    id: "5",
    cameraZ: 45,
    upLimit: 100,
    lowLimit: 40,
    glb: "/models/HIPPO_ADULT.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332795/zoo/images/hippo_i4grms.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/hippo_xpzo3k.mov",
    name: "Pygmy Hippo",
    slug: "pygmy-hippo",
    scientificName: "Cheropsis liberiensis",
    description: `<p class="mb-6">The Pygmy Hippopotamus looks like a miniature version of its larger relative, the Hippopotamus (also known as the river or common hippopotamus), but it differs greatly in both behavior and physical characteristics. The Pygmy Hippo has adaptations for spending time in the water but is far less aquatic than the hippo. Its nose and ears close underwater just like its larger cousin’s do, but its head is rounder and narrower, its neck is proportionally longer, and its eyes are not on the top of its head<p>
<p class="mb-6">The Pygmy Hippopotamus is much more rare in the wild, too, found only in the interior forests in parts of West Africa, mainly confined to Liberia, with small numbers in the neighboring countries of Sierra Leone, Guinea, and the Ivory Coast.</p>
<p class="mb-6">Pygmy Hippos are mainly nocturnal, resting well hidden in swamps, wallows, or rivers during the heat of the day until dark, when they leave the water to feed on land for a few hours in the cool of the night.</p>`,
    status: "Critically Endangered",
    population: "2,000 to 3,000",
    size: "1 meters (3 ft)",
    habitat: "Forests and Swamps",
    weight: "270 kgs (600 lbs)",
    images: [
      //   "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/hippo_xpzo3k.mov",
      // "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/hippo_xpzo3k.mov",
      //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/hippo_xpzo3k.mov",

      {
        cameraZ: 45,
        upLimit: 100,
        lowLimit: 40,
        glb: "/models/HIPPO_YOUNG_TEEN.glb",
      },
      {
        cameraZ: 45,
        upLimit: 100,
        lowLimit: 40,
        glb: "/models/HIPPO_ADULT.glb",
      },
    ],
  },
  {
    id: "6",
    cameraZ: 90,
    upLimit: 120,
    lowLimit: 40,
    glb: "/models/Gir.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332705/zoo/images/giraffe_caohec.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/giraffe_dz5ed1.mov",
    name: "Nubian Giraffe",
    slug: "nubian-giraffe",
    scientificName: "Canis simensis",
    description: `<p class="mb-6">The tallest of all giraffes is the Nubian species. This means they are considered to be the tallest land animal on the Earth, measuring up to a remarkable 6 meters, or 20 feet tall! They can also weigh approximately 2,800 pounds, with the males outweighing the females by several hundred pounds. The Nubian Giraffe is endangered with less than 2,645 individuals remaining, are now just one stage from becoming extinct in the wild</p>
    <p class="mb-6">A distinguishing feature of the Nubian Giraffe is the number of horns on top of it’s head. Other Giraffe species typically have two horns, but the Nubian Giraffe can have up to five! They have two in the same place as other giraffes, one in the center, and two behind those.</p>
    <p class="mb-6">Habitat loss through expanding agriculture, human-wildlife conflict, civil unrest, and poaching for their meat, pelts, and tails, are among the reasons for their staggering 40% population decline in the last three decades. </p>`,
    status: "Critically Endangered",
    population: "2,645",
    size: "1.5 meters (9 ft)",
    habitat: "Savannahs and Woodlands",
    weight: "1,360 kgs (3,000 pounds)",
    images: [
      //   "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/giraffe_dz5ed1.mov",
      //   "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/giraffe_dz5ed1.mov",
      //   "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/giraffe_dz5ed1.mov",
      //

      {
        cameraZ: 90,
        upLimit: 120,
        lowLimit: 40,
        glb: "/models/GIRAFFE_YOUNG_TEEN.glb",
      },
      { cameraZ: 90, upLimit: 120, lowLimit: 40, glb: "/models/Gir.glb" },
    ],
  },
  {
    id: "7",
    cameraZ: 30,
    upLimit: 40,
    lowLimit: 20,
    glb: "/models/WOLF_ADULT.glb",
    image:
      "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332820/zoo/images/red-wolf_tjiwez.png",
    gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644336263/zoo/red-wolf_hq2iuv.mov",
    name: "Red Wolf",
    slug: "red-wolf",
    scientificName: "Canis simensis",
    description: `<p class="mb-6">The Red Wolf is the world’s most endangered member of the Canine family.</p>
    <p class="mb-6">Native to the United States, Red Wolves (Canis rufus) have a tawny, reddish coat, and they are intermediate in size between grey wolves and coyotes. That makes sense, as these two species interbred in the past to produce the red wolves’ ancestors. Nevertheless, recent research shows that red wolves are a unique species</p>
   <p class="mb-6"> The only place where red wolves remain in the wild is the Alligator River National Wildlife Refuge in eastern North Carolina, and surrounding counties. There are only an estimated 35 or fewer wild red wolves.</p>
   <p class="mb-6">Like other wolves, these animals were hunted and persecuted on a massive scale in the 19th and early 20th century. By the 1960s, only a small population remained in southwestern Louisiana and eastern Texas. A rescue plan was launched, in which 14 animals were taken to establish a captive population at the Point Defiance Zoo and Aquarium in Washington State between 1974 and 1980.</p>`,
    status: "Critically Endangered",
    population: "Less than 10",
    weight: "36 kgs (80 lbs)",
    size: "1.2 meters (4 ft)",
    habitat: "Forest, wetlands & bushlands",
    images: [
      //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644336263/zoo/red-wolf_hq2iuv.mov",
      // "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644336263/zoo/red-wolf_hq2iuv.mov",
      //   "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644336263/zoo/red-wolf_hq2iuv.mov",
      { cameraZ: 30, upLimit: 40, lowLimit: 20, glb: "/models/WOLF.glb" },
      {
        cameraZ: 40,
        upLimit: 60,
        lowLimit: 20,
        glb: "/models/WOLF_ADULT.glb",
      },
    ],
  },
];

//nubian-giraffe

const NFTProduct = ({ animal }) => {
  return (
    <div className="NFTProduct mt-16 flex flex-col ">
      {/* first row */}
      <div className="gap-4 px-6 pt-20   md:flex md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto lg:justify-center">
        <div className="w-full flex items-center justify-center lg:basis-1/2">
          <div className="p-px  rounded bg-nft-gradient lg:mb-0">
            <div className="h-[300px] w-[300px] lg:h-[800px] lg:w-[600px]  overflow-hidden rounded">
              <ModelViewer zoom="50deg" glb={animal.glb}></ModelViewer>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-start justify-between gap-2 px-4 py-12 rounded bg-black100 lg:basis-1/2 lg:h-[800px]"
          key={animal.id}
        >
          <h2 className="mb-8 text-3xl font-bold text-center lg:text-4xl">
            {animal.name}
          </h2>

          <div className="basis-2/3">
            <div
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: animal?.description }}
            />
          </div>
        </div>
      </div>

      {/* second row */}
      <div className="flex flex-col justify-items-center   gap-4 lg:grid lg:grid-cols-3 rounded bg-black100 lg:basis-1/2 mt-10 w-full p-5">
        <div className="w-[200px] flex items-center mb-8  ">
          <Image src="/img/status-icon.svg" width={48} height={48} alt="" />
          <span className="ml-4">
            <p>Status</p>
            <p className="text-xs capitalize">{animal.status}</p>
          </span>
        </div>

        <div className="w-[200px] flex items-center mb-8">
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

        <div className="w-[200px] flex items-center mb-8">
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
        <div className="w-[200px] flex items-center mb-8">
          <Image src="/img/population-icon.svg" width={48} height={48} alt="" />
          <span className="ml-4">
            <p>Population</p>
            <p className="text-xs">{animal.population}</p>
          </span>
        </div>

        <div className="w-[200px] flex items-center mb-8">
          <Image src="/img/size-icon.svg" width={48} height={48} alt="" />
          <span className="ml-4">
            <p>Size</p>
            <p className="text-xs">{animal.size}</p>
          </span>
        </div>

        <div className="w-[200px] flex items-center mb-8">
          <Image src="/img/weight.svg" width={48} height={48} alt="" />
          <span className="ml-4">
            <p>Weight</p>
            <p className="text-xs">{animal.weight}</p>
          </span>
        </div>
      </div>

      {/* Third Row */}

      <div className="px-6 pt-16 pb-16 md:flex md:flex-col lg:max-w-7xl lg:mx-auto w-full">
        {/* <h2 className="mb-8 text-3xl font-bold text-center lg:text-4xl">
          View Available {animal.name}
        </h2> */}

        <div className="flex flex-col  items-center lg:flex-row justify-evenly">
          {animal.images.map((img, index) => {
            return (
              <div
                className="p-px mb-4 overflow-hidden rounded bg-nft-gradient"
                key={index}
              >
                <div className="overflow-hidden bg-black rounded w-[300px] h-[300px]">
                  <ModelViewer glb={img.glb}></ModelViewer>
                  {/* <video
                    autoPlay
                    loop={true}
                    playsInline={true}
                    muted
                    className="overflow-hidden rounded"
                  >
                    <source src={animal.gif}></source>
                  </video> */}
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
    params: { slug: animal.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const results = productsData;
  const productsLength = results.length;
  const data = results.filter((animal) => animal.slug === params.slug);

  return {
    props: {
      animal: data[0],
      productsLength,
    },
  };
}

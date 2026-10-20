import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});
const ReadMore = ({ className, children } : {className:string; children: any;}) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className={className}>
        {isReadMore ? text.slice(0, 1000) : text}
        {/* Was a `span` with an onClick: no keyboard, no role, and `read-or-hide`
            is a name the stylesheet does not answer. */}
        <button type="button" onClick={toggleReadMore} className="text-lg cursor-pointer text-foreground" dangerouslySetInnerHTML={{ __html: isReadMore ? " ... <u>Read More</u>" : " <u>Show Less</u>" }} />
      </p>
    );
  };
const productsData = [
    {
        id: "5",
        cameraZ: 45,
        upLimit: 100,
        lowLimit: 40,
        usdz: "/models/Hippo/HIPPO_ADULT.usdz",
        glb: "/models/Hippo/HIPPO_ADULT.glb",
        image:
          "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332795/zoo/images/hippo_i4grms.png",
        gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/hippo_xpzo3k.mov",
        name: "Pygmy Hippo",
        slug: "pygmy-hippo",
        scientificName: "Cheropsis liberiensis",
        description: `The Pygmy Hippopotamus looks like a miniature version of its larger relative, the Hippopotamus (also known as the river or common hippopotamus), but it differs greatly in both behavior and physical characteristics. The Pygmy Hippo has adaptations for spending time in the water but is far less aquatic than the hippo. Its nose and ears close underwater just like its larger cousin’s do, but its head is rounder and narrower, its neck is proportionally longer, and its eyes are not on the top of its head. The Pygmy Hippopotamus is much more rare in the wild, too, found only in the interior forests in parts of West Africa, mainly confined to Liberia, with small numbers in the neighboring countries of Sierra Leone, Guinea, and the Ivory Coast. Pygmy Hippos are mainly nocturnal, resting well hidden in swamps, wallows, or rivers during the heat of the day until dark, when they leave the water to feed on land for a few hours in the cool of the night.`,
        status: "Endangered",
        Maturity: "Adult",
        Generations: "1-7 Possible",
        Rewards: "Baby: 0.05 $ZOO Teen: 0.1 $ZOO Adult: 0.2 $ZOO",
        Price: "0.05 ETH",
        Price_Mint: "Hatch: Free, Teen: 0.05 ETH, Adult: 0.1 ETH, Breed: 0.15 ETH",
        Boosts: "1.1-1.4x",
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
    
            usdz: "/models/Hippo/HIPPO_BABY.usdz",
            glb: "/models/Hippo/HIPPO_BABY.glb",
          },
          {
            cameraZ: 45,
            upLimit: 100,
            lowLimit: 40,
    
            usdz: "/models/Hippo/HIPPO_TEEN.usdz",
            glb: "/models/Hippo/HIPPO_TEEN.glb",
          },
          {
            cameraZ: 45,
            upLimit: 100,
            lowLimit: 40,
    
            usdz: "/models/Hippo/HIPPO_ADULT.usdz",
            glb: "/models/Hippo/HIPPO_ADULT.glb",
          },
        ],
      },
      {
        id: "2",
        cameraZ: 50,
        upLimit: 100,
        lowLimit: 40,
        glb: "/models/Rhino/RHINO.glb",
        usdz: "/models/Rhino/RHINO_ADULT.usdz",
        image:
          "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332905/zoo/images/javan-rhino_aoxijc.png",
        gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/javan-rhino_nkm1sw.mov",
        name: "Javan Rhino",
        slug: "javan-rhino",
        scientificName: "Rhinoceros Sondaicus",
        description: `Once the most widespread of Asian rhinoceroses, the Javan Rhinoceros previously ranged from the islands of Java and Sumatra, throughout Southeast Asia, and into India and China. The species is critically endangered, with only one known population in the wild, and no individuals in captivity. It is possibly the rarest large mammal on Earth,  with a population of approximately 74 at the western tip of Java in Indonesia. These 2+ ton herbivores can live from 30-45 years and are solitary animals, except for mating pairs and mothers with young. Despite their already extremely small population, they have held on after being declared virtually extinct in 2011. The decline of the Javan rhinoceros is attributed to poaching, primarily for their horns, which are highly valued in traditional Chinese medicine, fetching as much as US$30,000 per kg on the black market. Poaching ultimately wiped out the species in Vietnam.
        `,
        status: "Endangered",
        Maturity: "Adult",
        Generations: "1-7 Possible",
        Rewards: "Baby: 0.05 $ZOO Teen: 0.1 $ZOO Adult: 0.2 $ZOO",
        Price: "0.05 ETH",
        Price_Mint: "Hatch: Free, Teen: 0.05 ETH, Adult: 0.1 ETH, Breed: 0.15 ETH",
        Boosts: "1.1-1.4x",
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
            glb: "/models/Rhino/RHINO_BABY.glb",
    
            usdz: "/models/Rhino/RHINO_BABY.usdz",
          },
          {
            cameraZ: 50,
            upLimit: 100,
            lowLimit: 40,
            glb: "/models/Rhino/RHINO_TEEN.glb",
    
            usdz: "/models/Rhino/RHINO_TEEN.usdz",
          },
          {
            cameraZ: 50,
            upLimit: 100,
            lowLimit: 40,
            glb: "/models/Rhino/RHINO.glb",
    
            usdz: "/models/Rhino/RHINO_ADULT.usdz",
          },
        ],
      },
      {
        id: "3",
        cameraZ: 40,
        upLimit: 80,
        lowLimit: 35,
        glb: "/models/Tiger/TIGER_ADULT.glb",
        usdz: "/models/Tiger/TIGER_ADULT.usdz",
        image:
          "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332724/zoo/images/siberian-tiger_djt67i.png",
        gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/siberian-tiger_gn44b5.mov",
        name: "Siberian Tiger",
        slug: "siberian-tiger",
        scientificName: "Panthera tigris sumatrae",
        description: `The Siberian tiger, a subspecies of tiger, is the largest cat in the world from the Russian Far East, Northeast China, and possibly North Korea. It once ranged throughout the Korean Peninsula, north China, and eastern Mongolia. It averages about 11 feet in total length, with a tail that accounts for approximately 3 feet of it. Adult male Siberian tigers can weigh up to 700 pounds, while females are significantly smaller, weighing up to 400 pounds. Siberian tigers are distinguishable by their striped fur. Similar to people’s unique fingerprints, no two tigers have the same stripe pattern. Siberian tigers differ from other tigers because they have fewer, paler stripes, and they also have manes. The mane, in addition to their thick fur, helps keep them warm and can be significant influences in both mating displays and in disputes. Siberian tigers are solitary animals, marking their scent on trees to keep other tigers away. They stalk their prey, which include elk, boar, bears, and deer, until they are close enough to pounce. Their diet in the wild also hunt smaller animals like rabbits, pikas, and fish. Because tigers are not always successful on their hunts, they need to hunt often and may establish and roam a territory several miles wide. They can eat up to 60 pounds of meat in one sitting!
    </p>`,
    status: "Endangered",
    Maturity: "Adult",
    Generations: "1-7 Possible",
    Rewards: "Baby: 0.05 $ZOO Teen: 0.1 $ZOO Adult: 0.2 $ZOO",
    Price: "0.05 ETH",
    Price_Mint: "Hatch: Free, Teen: 0.05 ETH, Adult: 0.1 ETH, Breed: 0.15 ETH",
    Boosts: "1.1-1.4x",
        population: "400",
        size: "3 meters (12 ft)",
        habitat: "Lowland to mountain forests",
        weight: "320 kgs (700 lbs)",
        images: [
          // "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/siberian-tiger_gn44b5.mov",
          //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/siberian-tiger_gn44b5.mov",
          //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/siberian-tiger_gn44b5.mov",
          {
            cameraZ: 40,
            upLimit: 80,
            lowLimit: 35,
            glb: "/models/Tiger/TIGER_BABY.glb",
    
            usdz: "/models/Tiger/TIGER_BABY.usdz",
          },
          {
            cameraZ: 40,
            upLimit: 80,
            lowLimit: 35,
            glb: "/models/Tiger/TIGER_TEEN.glb",
    
            usdz: "/models/Tiger/TIGER_TEEN.usdz",
          },
          {
            cameraZ: 40,
            upLimit: 80,
            lowLimit: 35,
            glb: "/models/Tiger/TIGER_ADULT.glb",
    
            usdz: "/models/Tiger/TIGER_ADULT.usdz",
          },
        ],
      },
      {
        id: "4",
        cameraZ: 30,
        upLimit: 40,
        lowLimit: 20,
    
        usdz: "/models/Leopard/LEOPARD_ADULT.usdz",
        glb: "/models/Leopard/LEOPARD_ADULT.glb",
        image:
          "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332847/zoo/images/clouded-leopard_piqix9.png",
        gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330489/zoo/clouded-leopard_tmjty9.mov",
        name: "Amur leopard",
        slug: "amur-leopard",
        scientificName: "Panthera pardus orientalis",
        description: `The Amur leopard is one of 10 subspecies of leopard, and one of the world’s rarest cats, with an estimated population of under 70 individuals left in the wild. They all live in a small area that hugs Russia’s far eastern border with China. Many think of leopards stalking savannas of Africa but in the Russian Far East, a rare subspecies has adapted to life in the temperate forests that make up the northern-most part of the species’ range. Similar to other leopards, the Amur leopard can run at speeds of up to 37 miles per hour. This incredible animal has been reported to leap more than 19 feet horizontally and up to 10 feet vertically. The Amur leopard is solitary. Nimble-footed and strong, it carries and hides unfinished kills so that they are not taken by other predators. It has been reported that some males stay with females after mating, and may even help with rearing the young. Several males sometimes follow and fight over a female. They live for 10-15 years, and in captivity up to 20 years. The Amur leopard is also known as the Far East leopard, the Manchurian leopard or the Korean leopard.`,
        status: "Rare",
        population: "Approximately 84",
        size: "Up to 3.1 meters (7 feet)",
        Maturity: "Adult",
        Generations: "1-7 Possible",
        Rewards: "Baby: 0.25 $ZOO Teen: 0.5 $ZOO Adult: 1 $ZOO",
        Price: "0.5 ETH",
        Price_Mint: "Hatch: Free, Teen: 0.5 ETH, Adult: 1 ETH, Breed: 1.5 ETH",
        Boosts: "1.1-1.4x",
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
    
            usdz: "/models/Leopard/LEOPARD_BABY.usdz",
            glb: "/models/Leopard/LEOPARD_BABY.glb",
          },
          {
            cameraZ: 20,
            upLimit: 30,
            lowLimit: 10,
    
            usdz: "/models/Leopard/LEOPARD_TEEN.usdz",
            glb: "/models/Leopard/LEOPARD_TEEN.glb",
          },
          {
            cameraZ: 20,
            upLimit: 30,
            lowLimit: 10,
            glb: "/models/Leopard/LEOPARD_ADULT.glb",
    
            usdz: "/models/Leopard/LEOPARD_ADULT.usdz",
          },
        ],
      },
      {
        id: "7",
        cameraZ: 30,
        upLimit: 40,
        lowLimit: 20,
        glb: "/models/Wolf/WOLF_ADULT.glb",
    
        usdz: "/models/Wolf/WOLF_ADULT.usdz",
        image:
          "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332820/zoo/images/red-wolf_tjiwez.png",
        gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644336263/zoo/red-wolf_hq2iuv.mov",
        name: "Red Wolf",
        slug: "red-wolf",
        scientificName: "Canis simensis",
        description: `The Red Wolf is the world’s most endangered member of the Canine family. Native to the United States, Red Wolves (Canis rufus) have a tawny, reddish coat, and they are intermediate in size between grey wolves and coyotes. That makes sense, as these two species interbred in the past to produce the red wolves’ ancestors. Nevertheless, recent research shows that red wolves are a unique species. The only place where red wolves remain in the wild is the Alligator River National Wildlife Refuge in eastern North Carolina, and surrounding counties. There are only an estimated 35 or fewer wild red wolves. Like other wolves, these animals were hunted and persecuted on a massive scale in the 19th and early 20th century. By the 1960s, only a small population remained in southwestern Louisiana and eastern Texas. A rescue plan was launched, in which 14 animals were taken to establish a captive population at the Point Defiance Zoo and Aquarium in Washington State between 1974 and 1980.`,
        status: "Critically Endangered",
        population: "Less than 10",
        weight: "36 kgs (80 lbs)",
        Maturity: "Adult",
        Generations: "1-7 Possible",
        Rewards: "Baby: 1 $ZOO Teen: 2 $ZOO Adult: 3 $ZOO",
        Price: "1 ETH",
        Price_Mint: "Hatch: Free, Teen: 1 ETH, Adult: 2 ETH, Breed: 3 ETH",
        Boosts: "1.1-1.4x",
        size: "1.2 meters (4 ft)",
        habitat: "Forest, wetlands & bushlands",
        images: [
          //"https://res.cloudinary.com/diu8hjwwe/video/upload/v1644336263/zoo/red-wolf_hq2iuv.mov",
          // "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644336263/zoo/red-wolf_hq2iuv.mov",
          //   "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644336263/zoo/red-wolf_hq2iuv.mov",
          {
            cameraZ: 30,
            upLimit: 40,
            lowLimit: 20,
            glb: "/models/Wolf/WOLF_BABY.glb",
    
            usdz: "/models/Wolf/WOLF_BABY.usdz",
          },
          {
            cameraZ: 30,
            upLimit: 40,
            lowLimit: 20,
            glb: "/models/Wolf/WOLF_TEEN.glb",
    
            usdz: "/models/Wolf/WOLF_TEEN.usdz",
          },
          {
            cameraZ: 40,
            upLimit: 60,
            lowLimit: 20,
            glb: "/models/Wolf/WOLF_ADULT.glb",
    
            usdz: "/models/Wolf/WOLF_ADULT.usdz",
          },
        ],
      },
      {
        id: "6",
        cameraZ: 90,
        upLimit: 120,
        lowLimit: 40,
        glb: "/models/Giraffe/GIRAFFE_ADULT.glb",
        usdz: "/models/Giraffe/GIRAFFE_ADULT.usdz",
        image:
          "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332705/zoo/images/giraffe_caohec.png",
        gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/giraffe_dz5ed1.mov",
        name: "Nubian Giraffe",
        slug: "nubian-giraffe",
        scientificName: "Canis simensis",
        description: `The tallest of all giraffes is the Nubian species. This means they are considered to be the tallest land animal on the Earth, measuring up to a remarkable 6 meters, or 20 feet tall! They can also weigh approximately 2,800 pounds, with the males outweighing the females by several hundred pounds. The Nubian Giraffe is endangered with less than 2,645 individuals remaining, are now just one stage from becoming extinct in the wild. A distinguishing feature of the Nubian Giraffe is the number of horns on top of it’s head. Other Giraffe species typically have two horns, but the Nubian Giraffe can have up to five! They have two in the same place as other giraffes, one in the center, and two behind those. Habitat loss through expanding agriculture, human-wildlife conflict, civil unrest, and poaching for their meat, pelts, and tails, are among the reasons for their staggering 40% population decline in the last three decades.`,
        status: "Rare",
        Maturity: "Adult",
        Generations: "1-7 Possible",
        Rewards: "Baby: 0.25 $ZOO Teen: 0.5 $ZOO Adult: 1 $ZOO",
        Price: "0.5 ETH",
        Price_Mint: "Hatch: Free, Teen: 0.5 ETH, Adult: 1 ETH, Breed: 1.5 ETH",
        Boosts: "1.1-1.4x",
        population: "2,645",
        size: "1.5 meters (9 ft)",
        habitat: "Savannahs and Woodlands",
        weight: "1,360 kgs (3,000 pounds)",
        images: [
          {
            cameraZ: 90,
            upLimit: 120,
            lowLimit: 40,
            glb: "/models/Giraffe/GIRAFFE_BABY.glb",
    
            usdz: "/models/Giraffe/GIRAFFE_BABY.usdz",
          },
          {
            cameraZ: 90,
            upLimit: 120,
            lowLimit: 40,
            glb: "/models/Giraffe/GIRAFFE_TEEN.glb",
    
            usdz: "/models/Giraffe/GIRAFFE_TEEN.usdz",
          },
          {
            cameraZ: 90,
            upLimit: 120,
            lowLimit: 40,
            glb: "/models/Giraffe/GIRAFFE_ADULT.glb",
    
            usdz: "/models/Giraffe/GIRAFFE_ADULT.usdz",
          },
        ],
      },
    {
      id: "1",
      cameraZ: 90,
      upLimit: 120,
      lowLimit: 40,
  
      usdz: "/models/Elephant/ELEPHANT_ADULT.usdz",
      glb: "/models/Elephant/ELEPHANT_ADULT.glb",
      image:
        "https://res.cloudinary.com/diu8hjwwe/image/upload/v1644332888/zoo/images/sumatran-elephant_s3nww5.png",
      gif: "https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330488/zoo/sumatran-elephant_bowsev.mov",
      name: "Sumatran Elephant",
      slug: "sumatran-elephant",
      description: `Sumatran elephants feed on a variety of plants and deposit seeds wherever they go, contributing to a healthy forest ecosystem. As herbivores, these noble animals spend their days munching on 150kg of plants and seeds as they move through the forests. They also share their lush forest habitat with several other endangered species, such as the Sumatran Rhinoceros, Sumatran Tiger, Sumatran Orangutan, and countless other species; all of which benefit from an elephant population that thrives in a healthy habitat. With what many consider to be a “stranger” appearance to their more commonly depicted African cousins, the Sumatran Elephant is almost completely bald with small, rounded ears in place of the defining oversized ears many have come to expect. Female Sumatran Elephants rarely have tusks, but the females that do develop tusks keep them hidden away from sight until they open their mouths! In 2012, the Sumatran elephant was changed from “Endangered” to “Critically Endangered” because half of its population has been lost in one generation—a decline that is largely due to habitat loss and as a result human-elephant conflict.
     `,
     status: "Endangered",
     Maturity: "Adult",
     Generations: "1-7 Possible",
     Rewards: "Baby: 0.05 $ZOO Teen: 0.1 $ZOO Adult: 0.2 $ZOO",
     Price: "0.05 ETH",
     Price_Mint: "Hatch: Free, Teen: 0.05 ETH, Adult: 0.1 ETH, Breed: 0.15 ETH",
     Boosts: "1.1-1.4x",
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
        {
          cameraZ: 90,
          upLimit: 120,
          lowLimit: 40,
          glb: "/models/Elephant/ELEPHANT_BABY.glb",
          usdz: "/models/Elephant/ELEPHANT_BABY.usdz",
        },
        {
          cameraZ: 90,
          upLimit: 120,
          lowLimit: 40,
          glb: "/models/Elephant/ELEPHANT_TEEN.glb",
          usdz: "/models/Elephant/ELEPHANT_TEEN.usdz",
        },
        {
          cameraZ: 90,
          upLimit: 120,
          lowLimit: 40,
          glb: "/models/Elephant/ELEPHANT_ADULT.glb",
          usdz: "/models/Elephant/ELEPHANT_ADULT.usdz",
        },
      ],
    },
    
    
    
    
    
    
  ];
  
  const utilities = [
    {
      title: "Play 👩‍💻🕹️",
      link: "",
    },
    {
      title: "Hatch 🐣",
      link: "",
    },
    {
      title: "Pools 🐋",
      link: "",
    },
    {
      title: "Feed 🍼 💳",
      link: "",
    },
    {
      title: "Burning 🔥",
      link: "",
    },
    {
      title: "Buy / Sell 🛍️",
      link: "",
    },
    {
      title: "Grow 💗 🐥",
      link: "",
    },
    {
      title: "Boosts 💲↗️",
      link: "",
    },
    {
      title: "Make Offers 🕊️",
      link: "",
    },
    {
      title: "Breed 🥚",
      link: "",
    },
    {
      title: "Earns 🎁️ 🤑",
      link: "",
    },
    {
      title: "Metaverse 👽",
      link: "",
    },
  ];
/**
 * One species: the model, its numbers, and what the NFT is for.
 *
 * Every surface here was a literal — `bg-[#333]` panels, `text-[#7D7D7D]`
 * labels, `bg-[#000000]` behind the model — and Tailwind has never been in this
 * build, so none of them resolved: eight transparent tiles with carbon text on
 * a near-white page, and two icons drawn in `fill="white"` that were invisible
 * on it. The tiles are `.card` now and the labels read the ink ladder, which is
 * the same pair every other card on this site is made of. The columns are a
 * grid whose `minmax()` decides when there is room for two, so no breakpoint is
 * named for a layout that only ever had one question to answer.
 */
function CoreHeader({index}: {
  index: number;
}) {
    const [activeTab, setActiveTab] = useState("description");
    const animal = productsData[index];

    /* Eight near-identical tiles, written out eight times, differing only in a
       label and a value. */
    const facts: [string, string][] = [
      ["Maturity", animal.Maturity],
      ["Generations", animal.Generations],
      ["Status", animal.status],
      ["Rewards", animal.Rewards],
      ["Original Egg Price (OEP)", animal.Price],
      ["Price to Mint", animal.Price_Mint],
      ["Scientific Name", animal.scientificName],
      ["Boosts Allowed", animal.Boosts],
    ];

    /* The egg and the three ages, as one list. */
    const ages = ["BABY", "TEEN", "ADULT"];

  return (
    <div className="container" style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
          gap: 'var(--space-12)',
          alignItems: 'start',
        }}
      >
        <div className="relative">
          <span
            className="badge badge-warm absolute z-10"
            style={{ top: 'var(--space-3)', right: 'var(--space-3)', background: 'var(--surface-3)' }}
          >
            {animal?.status}
          </span>

          {/* The plate holds the square whether or not WebGL arrives. The panel
              it replaces was `bg-[#000000]` with nothing sizing it. */}
          <div className="plate" style={{ aspectRatio: '1 / 1', width: '100%' }}>
            <ModelViewer
              usdz={animal.usdz}
              zoom="50deg"
              glb={animal.glb}
            ></ModelViewer>
          </div>

          {/* Was an `absolute bottom-0` bar of `h-20` buttons laid over the
              model. `.action` is the site's control, and below the plate it
              covers nothing. */}
          <div className="mt-4 flex items-center gap-3">
            <button className="action" style={{ flex: '1 1 0' }}>Browse</button>
            <button className="action" style={{ flex: '1 1 0' }}>
              <span>Sweep</span>
              <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M1.97028 17.6623H11.03C11.3744 17.6623 11.6542 17.3892 11.6542 17.0526C11.6542 16.716 11.3744 16.4429 11.03 16.4429H7.16953L7.00012 1.53851C7.00012 1.17737 6.8698 0.5 6.50012 0.5C6.13017 0.5 6.00012 1.17722 6.00012 1.53851L5.83064 16.4426H1.97049C1.62609 16.4426 1.34595 16.7156 1.34595 17.0522C1.34595 17.3888 1.62588 17.6623 1.97028 17.6623Z" fill="currentColor"/>
                <path d="M11.1189 18.207H1.88103L0.341309 23.5001H12.6589L11.1189 18.207Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="action" aria-label="Rewards calculator">
              <Image
                src="/images/calculator.png"
                width={20}
                height={20}
                alt=""
              />
            </button>
          </div>
        </div>

        <div key={animal.id}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {animal.name}
          </h2>

          <p className="mt-6 mb-4 text-xl text-foreground">
            Properties
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {facts.map(([label, value]) => (
              <div className="card p-4" key={label}>
                <p className="text-sm font-medium text-muted">{label}</p>
                <p className="mt-1 text-base font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xl text-muted">Click to</p>

          {/* Four small tiles. `max-md:hidden` hid this from a phone in the
              author's intent and from nobody in fact; it wraps instead, which
              is what the switcher on the species header already does. */}
          <div
            className="mt-4"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(7rem, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            <div>
              <div className="plate" style={{ aspectRatio: '1 / 1', width: '100%' }}>
                <Image
                    src="/images/egg.png"
                    width={120}
                    height={120}
                    alt=""
                />
              </div>
              <p className="mt-2 text-base text-center text-foreground">EGG</p>
            </div>
            {animal.images.map((img, index) => (
              <div key={index}>
                <div className="plate" style={{ aspectRatio: '1 / 1', width: '100%' }}>
                  <ModelViewer usdz={img.usdz} glb={img.glb}></ModelViewer>
                </div>
                <p className="mt-2 text-base text-center text-foreground">{ages[index]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex gap-8 text-lg md:text-xl">
          <button
            onClick={() => setActiveTab("description")}
            className="font-bold border-b text-foreground"
          >
            Description
          </button>
          <button className="text-secondary">
            Metadata <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M8.1292 0.200322V1.41029H2.63203C2.25257 1.41029 1.94491 1.68116 1.94491 2.01527V10.4852C1.94491 10.8193 2.25257 11.0902 2.63203 11.0902H12.2519C12.6315 11.0902 12.9391 10.8193 12.9391 10.4852V5.64516H14.3134V10.4852C14.3134 11.4875 13.3904 12.3002 12.2519 12.3002H2.63202C1.49354 12.3002 0.570557 11.4876 0.570557 10.4852V2.01527C0.570557 1.01289 1.49345 0.200242 2.63202 0.200242L8.1292 0.200322ZM13.6264 0.200322L13.6396 0.200447C13.6557 0.200697 13.6717 0.201448 13.6877 0.202699L13.6264 0.200322C13.6611 0.200322 13.6953 0.202573 13.7287 0.207014C13.7404 0.208578 13.7524 0.210454 13.7642 0.21258C13.7794 0.215207 13.7943 0.218397 13.809 0.221962C13.8197 0.224589 13.8303 0.227403 13.8408 0.230405C13.8543 0.234283 13.868 0.238599 13.8813 0.243352C13.8935 0.247605 13.9054 0.25217 13.9172 0.256986C13.9314 0.262865 13.9454 0.269182 13.9591 0.275875C13.9674 0.279877 13.9759 0.284193 13.9842 0.288634C14.0017 0.29814 14.0188 0.308335 14.0353 0.319092C14.0622 0.336605 14.0879 0.356117 14.1122 0.377507L14.0502 0.329036C14.0935 0.358995 14.1327 0.393455 14.1667 0.431607C14.1707 0.435922 14.1747 0.44055 14.1786 0.445179C14.1908 0.459814 14.2024 0.474825 14.2131 0.490335C14.2182 0.49759 14.2231 0.50497 14.2278 0.512475C14.2353 0.524421 14.2425 0.536742 14.2491 0.549314C14.2546 0.559634 14.2597 0.570079 14.2645 0.580648C14.2699 0.592594 14.2749 0.604602 14.2795 0.616735C14.2827 0.625741 14.2859 0.63506 14.2888 0.64438C14.293 0.657452 14.2966 0.670523 14.2996 0.683844C14.302 0.694352 14.3041 0.704921 14.3059 0.715492C14.308 0.727563 14.3097 0.740072 14.3109 0.752643C14.312 0.764026 14.3127 0.774908 14.3131 0.785791C14.3133 0.791858 14.3135 0.798612 14.3135 0.805305V3.83029H12.9392V2.26576L7.92798 6.67796C7.68028 6.89605 7.2905 6.91287 7.021 6.72831L6.95622 6.67796C6.68792 6.44173 6.68792 6.05865 6.95622 5.82235L11.9662 1.41016H10.1907V0.200195L13.6264 0.200322Z" fill="currentColor"/>
            </svg>
          </button>
          <button className="text-secondary">
            Rewards <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M8.1292 0.200322V1.41029H2.63203C2.25257 1.41029 1.94491 1.68116 1.94491 2.01527V10.4852C1.94491 10.8193 2.25257 11.0902 2.63203 11.0902H12.2519C12.6315 11.0902 12.9391 10.8193 12.9391 10.4852V5.64516H14.3134V10.4852C14.3134 11.4875 13.3904 12.3002 12.2519 12.3002H2.63202C1.49354 12.3002 0.570557 11.4876 0.570557 10.4852V2.01527C0.570557 1.01289 1.49345 0.200242 2.63202 0.200242L8.1292 0.200322ZM13.6264 0.200322L13.6396 0.200447C13.6557 0.200697 13.6717 0.201448 13.6877 0.202699L13.6264 0.200322C13.6611 0.200322 13.6953 0.202573 13.7287 0.207014C13.7404 0.208578 13.7524 0.210454 13.7642 0.21258C13.7794 0.215207 13.7943 0.218397 13.809 0.221962C13.8197 0.224589 13.8303 0.227403 13.8408 0.230405C13.8543 0.234283 13.868 0.238599 13.8813 0.243352C13.8935 0.247605 13.9054 0.25217 13.9172 0.256986C13.9314 0.262865 13.9454 0.269182 13.9591 0.275875C13.9674 0.279877 13.9759 0.284193 13.9842 0.288634C14.0017 0.29814 14.0188 0.308335 14.0353 0.319092C14.0622 0.336605 14.0879 0.356117 14.1122 0.377507L14.0502 0.329036C14.0935 0.358995 14.1327 0.393455 14.1667 0.431607C14.1707 0.435922 14.1747 0.44055 14.1786 0.445179C14.1908 0.459814 14.2024 0.474825 14.2131 0.490335C14.2182 0.49759 14.2231 0.50497 14.2278 0.512475C14.2353 0.524421 14.2425 0.536742 14.2491 0.549314C14.2546 0.559634 14.2597 0.570079 14.2645 0.580648C14.2699 0.592594 14.2749 0.604602 14.2795 0.616735C14.2827 0.625741 14.2859 0.63506 14.2888 0.64438C14.293 0.657452 14.2966 0.670523 14.2996 0.683844C14.302 0.694352 14.3041 0.704921 14.3059 0.715492C14.308 0.727563 14.3097 0.740072 14.3109 0.752643C14.312 0.764026 14.3127 0.774908 14.3131 0.785791C14.3133 0.791858 14.3135 0.798612 14.3135 0.805305V3.83029H12.9392V2.26576L7.92798 6.67796C7.68028 6.89605 7.2905 6.91287 7.021 6.72831L6.95622 6.67796C6.68792 6.44173 6.68792 6.05865 6.95622 5.82235L11.9662 1.41016H10.1907V0.200195L13.6264 0.200322Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <ReadMore
          className="mt-12 text-base text-foreground"
        >{animal?.description}</ReadMore>
      </div>

      <div className="text-foreground" style={{ paddingTop: 'var(--section-y-lg)' }}>
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          What can you do with your NFT?
        </h1>
        <p className="text-base mt-4 mb-12 text-center text-secondary">
          The Zoo NFTs have value and unique{" "}
          <em style={{ textDecoration: 'underline' }}>utility!</em>
        </p>
        <div className="grid-cards">
          {utilities.map((data, index) => (
            <div
              className="card p-4 flex items-center justify-between gap-4 text-2xl font-semibold"
              key={index}
            >
              <p>{data?.title}</p>
              {/* forward-arrow.svg is stroked in white, so on a white card it was
                  a 32px hole. The disc is what this site puts a white mark on. */}
              <span className="disc" style={{ ['--hue' as string]: 'var(--carbon)' }}>
                <Link href={data?.link} passHref={true} legacyBehavior>
                  <Image
                    src="/icons/forward-arrow.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoreHeader;

import { Experience } from "../types/experiences";

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Big Cat Conservation & Rehabilitation",
    location: {
      city: "Kruger",
      country: "South Africa",
      continent: "Africa",
      coordinates: {
        lat: -24.0,
        lng: 31.5,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    ],
    description:
      "Join our dedicated team in South Africa to rehabilitate and conserve endangered big cats. Work hands-on with lions, cheetahs and leopards.",
    overview:
      "This sanctuary focuses on the rehabilitation of big cats that have been rescued from captivity or injury. Our mission is to provide these magnificent animals with a safe environment where they can recover and, when possible, be reintroduced to the wild. You'll work alongside experienced conservationists who are passionate about protecting these endangered species.",
    wildlifeTypes: ["Big Cats"],
    volunteerTasks: [
      "Food Preparation",
      "Habitat Maintenance",
      "Research",
      "Conservation",
    ],
    ethicalConsiderations:
      "We maintain a strict no-contact policy with the big cats. Our focus is on conservation rather than entertainment, ensuring these animals maintain their natural behaviors. All activities are designed with the animals' welfare as the top priority.",
    requirements: [
      "Minimum age of 18",
      "Good physical fitness",
      "Passion for wildlife conservation",
      "No specific qualifications needed",
    ],
    pricing: {
      amount: 1200,
      currency: "USD",
      period: "2 weeks",
    },
    duration: {
      minWeeks: 2,
      maxWeeks: 12,
    },
    impact:
      "Your contribution directly supports the rehabilitation of injured and captive big cats, contributing to the conservation of endangered species and promoting biodiversity in South Africa.",
    rating: 4.8,
    reviewsCount: 157,
    featured: true,
  },
  {
    id: "2",
    title: "Elephant Sanctuary Volunteering",
    location: {
      city: "Chiang Mai",
      country: "Thailand",
      continent: "Asia",
      coordinates: {
        lat: 18.8,
        lng: 98.9,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    ],
    description:
      "Help care for rescued elephants in a natural environment focused on animal welfare and education.",
    overview:
      "This ethical elephant sanctuary provides a haven for elephants rescued from tourism and logging industries. The sanctuary focuses on allowing elephants to live naturally in a protected environment. As a volunteer, you'll participate in various activities to support the elephants' wellbeing while learning about conservation efforts in Thailand.",
    wildlifeTypes: ["Elephants"],
    volunteerTasks: [
      "Food Preparation",
      "Habitat Maintenance",
      "Education",
    ],
    ethicalConsiderations:
      "Our sanctuary operates on a no-riding, limited-contact policy. We focus on observation and natural behavior. All activities are designed with elephant welfare as the priority.",
    requirements: [
      "Minimum age of 18",
      "Moderate physical fitness",
      "Passion for elephant conservation",
      "Open mind and willingness to learn",
    ],
    pricing: {
      amount: 950,
      currency: "USD",
      period: "1 week",
    },
    duration: {
      minWeeks: 1,
      maxWeeks: 8,
    },
    impact:
      "Your participation supports the sanctuary's ability to rescue more elephants from exploitative industries, provide them with proper medical care, and educate visitors about ethical elephant tourism.",
    rating: 4.9,
    reviewsCount: 213,
    featured: true,
  },
  {
    id: "3",
    title: "Marine Conservation in the Maldives",
    location: {
      city: "Malé",
      country: "Maldives",
      continent: "Asia",
      coordinates: {
        lat: 4.1755,
        lng: 73.5093,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    ],
    description:
      "Dive into marine conservation efforts focusing on coral reef restoration and marine wildlife research.",
    overview:
      "Our marine conservation program focuses on preserving the delicate coral reef ecosystems of the Maldives. You'll work alongside marine biologists to monitor reef health, collect data on marine species, and participate in coral restoration projects. This hands-on experience provides valuable insights into marine conservation techniques and challenges.",
    wildlifeTypes: ["Marine Life"],
    volunteerTasks: [
      "Research",
      "Conservation",
      "Education",
    ],
    ethicalConsiderations:
      "We follow strict guidelines for marine interaction to minimize our impact on delicate ecosystems. All diving activities adhere to responsible tourism practices.",
    requirements: [
      "Diving certification (PADI Open Water or equivalent)",
      "Minimum age of 18",
      "Ability to swim confidently",
      "Basic understanding of marine ecosystems (preferred)",
    ],
    pricing: {
      amount: 1800,
      currency: "USD",
      period: "2 weeks",
    },
    duration: {
      minWeeks: 2,
      maxWeeks: 6,
    },
    impact:
      "Your contribution supports vital marine research and conservation efforts that are working to preserve one of the world's most threatened ecosystems. The data collected helps inform marine protection policies and reef restoration techniques.",
    rating: 4.7,
    reviewsCount: 89,
    featured: false,
  },
  {
    id: "4",
    title: "Primate Sanctuary Conservation",
    location: {
      city: "Puerto Maldonado",
      country: "Peru",
      continent: "South America",
      coordinates: {
        lat: -12.5933,
        lng: -69.1891,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    ],
    description:
      "Work with rescued monkeys and other primates in the Amazon rainforest while supporting conservation efforts.",
    overview:
      "Our primate sanctuary provides refuge for monkeys rescued from the illegal pet trade and habitat destruction. Located in the Amazon rainforest, the sanctuary works to rehabilitate these animals and, when possible, reintroduce them to protected areas of the forest. Volunteers play a critical role in the daily operations of the sanctuary.",
    wildlifeTypes: ["Primates"],
    volunteerTasks: [
      "Food Preparation",
      "Habitat Maintenance",
      "Animal Rehabilitation",
      "Conservation",
    ],
    ethicalConsiderations:
      "We maintain appropriate boundaries with primates to prevent dependency and ensure successful rehabilitation. Our interactions are guided by scientific research and best practices in primate care.",
    requirements: [
      "Minimum age of 18",
      "Good physical fitness",
      "Ability to work in hot, humid conditions",
      "Spanish language basics (helpful but not required)",
    ],
    pricing: {
      amount: 1100,
      currency: "USD",
      period: "2 weeks",
    },
    duration: {
      minWeeks: 2,
      maxWeeks: 12,
    },
    impact:
      "Your support helps combat the illegal wildlife trade and provides rescued primates with the care they need to recover. The sanctuary also conducts important research on primate behavior and rehabilitation techniques.",
    rating: 4.6,
    reviewsCount: 124,
    featured: false,
  },
  {
    id: "5",
    title: "Bird Conservation & Rehabilitation",
    location: {
      city: "Byron Bay",
      country: "Australia",
      continent: "Oceania",
      coordinates: {
        lat: -28.6474,
        lng: 153.6020,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1441057206919-63d19fac2369",
    ],
    description:
      "Help rescue, rehabilitate and release native bird species affected by habitat loss and human impact.",
    overview:
      "This bird sanctuary specializes in the rescue, rehabilitation, and release of native Australian bird species. Many birds arrive injured from human impacts such as pollution, habitat destruction, or domestic pet interactions. The sanctuary provides veterinary care, safe spaces for recovery, and eventual release back to appropriate habitats.",
    wildlifeTypes: ["Birds"],
    volunteerTasks: [
      "Food Preparation",
      "Habitat Maintenance",
      "Animal Rehabilitation",
      "Education",
    ],
    ethicalConsiderations:
      "We maintain minimal human contact with birds intended for release to prevent imprinting. Educational birds have special protocols to ensure their welfare while participating in conservation education.",
    requirements: [
      "Minimum age of 18",
      "Attention to detail",
      "Ability to follow strict hygiene protocols",
      "Patient and calm demeanor",
    ],
    pricing: {
      amount: 850,
      currency: "USD",
      period: "1 week",
    },
    duration: {
      minWeeks: 1,
      maxWeeks: 6,
    },
    impact:
      "Your contribution directly supports the recovery of injured birds and contributes to research on threats facing native bird populations. The sanctuary also provides important education to the local community about bird conservation.",
    rating: 4.5,
    reviewsCount: 78,
    featured: false,
  },
  {
    id: "6",
    title: "Wildlife Rescue & Rehabilitation",
    location: {
      city: "San José",
      country: "Costa Rica",
      continent: "North America",
      coordinates: {
        lat: 9.9281,
        lng: -84.0907,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1487252665478-49b61b47f302",
      "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
    ],
    description:
      "Support a diverse wildlife rescue center caring for animals affected by the illegal pet trade and habitat loss.",
    overview:
      "This wildlife rescue center provides care for a wide variety of Central American wildlife, including sloths, monkeys, parrots, and many other species. Most animals arrive due to the illegal pet trade, habitat destruction, or human-wildlife conflicts. The center's mission is to rehabilitate and release whenever possible, while providing sanctuary for animals that cannot return to the wild.",
    wildlifeTypes: ["General Wildlife", "Primates", "Birds"],
    volunteerTasks: [
      "Food Preparation",
      "Habitat Maintenance",
      "Animal Rehabilitation",
      "Education",
    ],
    ethicalConsiderations:
      "We follow strict protocols regarding animal contact based on each species' needs and release potential. Our primary goal is always the welfare of the animals and their potential for successful release.",
    requirements: [
      "Minimum age of 18",
      "Good physical fitness",
      "Ability to work in tropical climate",
      "Spanish basics recommended but not required",
    ],
    pricing: {
      amount: 1000,
      currency: "USD",
      period: "2 weeks",
    },
    duration: {
      minWeeks: 2,
      maxWeeks: 12,
    },
    impact:
      "Your support helps provide care for hundreds of animals each year and facilitates their return to the wild. The center also conducts important educational outreach to reduce future human-wildlife conflicts and combat the illegal wildlife trade.",
    rating: 4.8,
    reviewsCount: 142,
    featured: true,
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find((experience) => experience.id === id);
};

export const getFeaturedExperiences = (): Experience[] => {
  return experiences.filter((experience) => experience.featured);
};
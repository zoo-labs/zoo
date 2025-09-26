import { Experience } from "../types/experiences";

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Ultimate Luxury Great White Shark Expedition (20 Guests)",
    location: {
      city: "Farallone Islands, San Francisco",
      country: "USA",
      continent: "North America",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    images: [
      "/images/volunteer-experiences/luxury-yacht-shark-breach.jpg",
      "/images/volunteer-experiences/farallon-islands.jpg",
    ],
    description:
      "THE ULTIMATE GROUP EXPERIENCE: Charter a magnificent luxury yacht for you and 19 friends to encounter great white sharks at the Farallon Islands. This exclusive full-yacht charter includes gourmet dining, premium bar, and potential cage diving with one of the ocean's apex predators.",
    overview:
      "Transform your $75,000 donation into an unforgettable group adventure. You and up to 19 guests will have EXCLUSIVE use of a stunning 85-foot luxury yacht for a full day expedition to the Farallon Islands—home to one of the world's largest concentrations of great white sharks. This is not a shared tour—the entire vessel, crew, and experience are exclusively yours. Between September and November, witness hundreds of great whites hunting seals in their natural habitat. Your private expedition features multiple cage diving stations allowing your entire group to experience the thrill simultaneously. A team of world-renowned shark experts, a private chef preparing gourmet meals throughout the day, premium bar service, and professional photography/videography to capture every moment. This is how conservation meets luxury—creating memories with friends while saving a species.",
    wildlifeTypes: ["Great White Sharks", "Marine Wildlife", "Seals & Sea Lions", "Whales", "Sea Birds"],
    volunteerTasks: [
      "⭐ EXCLUSIVE FULL YACHT CHARTER for you + 19 guests",
      "🦈 Multiple cage diving stations for simultaneous group experiences",
      "🛥️ 85-foot luxury yacht with spacious decks and indoor lounges",
      "👨‍🍳 Private chef with customized gourmet menu throughout the day",
      "🍾 Premium open bar with champagne, wines, and craft cocktails",
      "📸 Professional photographer & videographer for your group",
      "🎓 Multiple marine biologists to engage all your guests",
      "🎁 Custom merchandise and conservation certificates for all guests",
      "🚁 Optional helicopter arrival/departure available",
    ],
    ethicalConsiderations:
      "In Partnership with Shark Stewards: This expedition follows strict wildlife viewing protocols to ensure minimal impact on shark behavior. All cage diving activities are conducted according to international best practices for shark tourism. Our expert team from Shark Stewards Foundation ensures that every encounter is both thrilling and respectful to these apex predators. Your participation directly funds shark research, protection initiatives, and efforts to ban shark finning globally. 100% of net proceeds support critical shark conservation programs.",
    requirements: [
      "Available with a $75,000 donation",
      "Tax-deductible portion: $40,000",
      "Fair Market Value (FMV) of experience: $35,000",
      "Accommodates up to 20 total guests",
      "Peak shark season: September - November",
      "Swimming ability required for cage diving",
      "Participants must be 18+ for cage diving",
      "Weather and ocean conditions dependent",
    ],
    pricing: {
      amount: 75000,
      currency: "USD",
      period: "group expedition",
    },
    duration: {
      minWeeks: 0,
      maxWeeks: 0,
    },
    impact:
      "Your expedition directly funds great white shark research and protection initiatives. These apex predators have declined by 70% globally, and the Farallon population is critical for the species' survival. Your contribution supports satellite tagging programs, anti-finning legislation, and education programs that are changing the narrative around sharks from fear to fascination and conservation.",
    rating: 4.9,
    reviewsCount: 43,
    featured: true,
  },
  {
    id: "7",
    title: "Intimate Shark Encounter for Two",
    location: {
      city: "Farallone Islands, San Francisco",
      country: "USA",
      continent: "North America",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    images: [
      "/images/volunteer-experiences/intimate-shark-two.jpg",
      "/images/volunteer-experiences/farallon-sharks.jpg",
    ],
    description:
      "A more intimate and relaxed shark watching experience for you and a companion. Enjoy a comfortable day at sea with expert naturalists, observing great whites in their natural habitat with gourmet food and beverages included.",
    overview:
      "Perfect for couples or close friends seeking a more personal shark encounter. Your $2,500 donation provides you and one guest with reserved spots on a comfortable expedition vessel to the Farallon Islands. This intimate experience focuses on observation and education, with a maximum of 12 passengers ensuring everyone has prime viewing spots. Enjoy a relaxed pace with gourmet breakfast and lunch, premium beverages, and extensive time with our expert naturalist who will share fascinating insights about great white behavior, conservation efforts, and the unique Farallon ecosystem. While this experience doesn't include cage diving, you'll witness sharks breaching, hunting, and patrolling these waters from the safety and comfort of the deck.",
    wildlifeTypes: ["Great White Sharks", "Marine Wildlife", "Seals & Sea Lions", "Whales", "Sea Birds"],
    volunteerTasks: [
      "👥 Intimate experience for you and one companion",
      "🦈 Prime shark viewing from comfortable observation deck",
      "🥐 Gourmet breakfast and lunch prepared fresh onboard",
      "🍷 Premium beverages including wine, beer, and non-alcoholic options",
      "🔭 High-quality binoculars and spotting scopes provided",
      "📚 Expert marine naturalist providing personalized education",
      "📷 Photography tips and best viewing spot guidance",
      "☕ Comfortable indoor cabin with refreshments all day",
    ],
    ethicalConsiderations:
      "This observation-focused experience maintains respectful distances from wildlife while providing incredible viewing opportunities. In partnership with Shark Stewards Foundation, we follow strict protocols to minimize disturbance to natural behaviors. Your contribution supports vital research and conservation programs protecting these magnificent predators.",
    requirements: [
      "Available with a $2,500 donation for 2 guests",
      "Tax-deductible portion: $1,500",
      "Fair Market Value (FMV) of experience: $1,000",
      "Peak shark season: September - November",
      "No swimming or diving included",
      "All ages welcome",
      "Weather dependent",
    ],
    pricing: {
      amount: 2500,
      currency: "USD",
      period: "for two guests",
    },
    duration: {
      minWeeks: 0,
      maxWeeks: 0,
    },
    impact:
      "Your contribution directly supports Shark Stewards' research and education programs, helping protect great white sharks through science-based conservation, policy advocacy, and public education initiatives.",
    rating: 4.7,
    reviewsCount: 89,
    featured: true,
  },
  {
    id: "8",
    title: "Modular Shark Adventure with Optional Cage Diving",
    location: {
      city: "Farallone Islands, San Francisco",
      country: "USA",
      continent: "North America",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    images: [
      "/images/volunteer-experiences/modular-shark-adventure.jpg",
      "/images/volunteer-experiences/farallon-expedition.jpg",
    ],
    description:
      "Customize your perfect shark expedition! Start with comfortable observation and education, then add the ultimate thrill of cage diving with great whites for those seeking an adrenaline rush.",
    overview:
      "Design your ideal shark conservation experience with our flexible expedition options. Your base $3,500 donation includes a full day expedition to the Farallon Islands on a well-equipped vessel with experienced crew and naturalists. Enjoy shark observation from deck, educational presentations, breakfast and lunch, and all standard amenities. For the ultimate adventure, add cage diving for $2,000 per person—descend in our professional-grade shark cage to come face-to-face with 15-20 foot great whites in crystal-clear Pacific waters. This modular approach lets you choose your comfort level while supporting critical conservation work. Groups can mix and match, with some observing from deck while others cage dive.",
    wildlifeTypes: ["Great White Sharks", "Marine Wildlife", "Seals & Sea Lions", "Whales", "Sea Birds"],
    volunteerTasks: [
      "🎯 BASE EXPERIENCE ($3,500 per person):",
      "  • Full day Farallon Islands expedition",
      "  • Shark observation from deck with expert guides",
      "  • Breakfast, lunch, and beverages included",
      "  • Educational presentations and conservation talks",
      "  • Use of binoculars and viewing equipment",
      "🦈 OPTIONAL CAGE DIVING ADD-ON (+$2,000 per person):",
      "  • 20-30 minutes in professional shark cage",
      "  • All diving equipment and wetsuit provided",
      "  • Certified dive master supervision",
      "  • Underwater GoPro footage of your dive",
      "  • Pre-dive safety briefing and training",
      "  • Hot drinks and warming blankets post-dive",
    ],
    ethicalConsiderations:
      "Whether observing from deck or cage diving, all activities follow international wildlife protection protocols. Shark Stewards Foundation guides ensure respectful, safe encounters that don't disrupt natural behaviors. Every participant, regardless of activity choice, contributes to vital shark conservation efforts.",
    requirements: [
      "Base experience: $3,500 per person donation",
      "Optional cage diving: +$2,000 per person",
      "Tax-deductible portion: Varies by options selected",
      "Peak shark season: September - November",
      "Cage diving requires: 18+ age, swimming ability",
      "Observation only: All ages welcome",
      "Groups can mix observers and divers",
      "Weather and conditions dependent",
    ],
    pricing: {
      amount: 3500,
      currency: "USD",
      period: "per person (base)",
    },
    duration: {
      minWeeks: 0,
      maxWeeks: 0,
    },
    impact:
      "Your flexible contribution model helps us reach more conservation supporters. Funds support shark research, satellite tagging, anti-finning campaigns, and education programs that are critical for the survival of great white sharks.",
    rating: 4.8,
    reviewsCount: 124,
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
      "/images/volunteer-experiences/elephant-sanctuary.jpg",
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
    featured: false,
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
      "/images/volunteer-experiences/marine-conservation.jpg",
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
      "/images/volunteer-experiences/primate-sanctuary.jpg",
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
      "/images/volunteer-experiences/bird-conservation.jpg",
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
      "/images/volunteer-experiences/wildlife-rescue-1.jpg",
      "/images/volunteer-experiences/wildlife-rescue-2.jpg",
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
    featured: false,
  },
  {
    id: "nonprofit-signup",
    title: "Partner w/ Us!",
    location: {
      city: "Global",
      country: "Worldwide",
      continent: "All Continents",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    images: [
      "/images/volunteer-experiences/create wildlife experience.jpg",
      "/images/volunteer-experiences/partnership.jpg",
    ],
    description:
      "Are you a non-profit working in wildlife conservation? Partner with Zoo Foundation to create and list your own conservation experience on our platform.",
    overview:
      "Create Your Conservation Experience\n\nJoin our network of conservation partners! If you're a registered non-profit organization working to protect endangered species and ecosystems, we invite you to create your own conservation experience on our platform. We provide the technology, marketing reach, and donor network while you bring the expertise and on-ground conservation work. Together, we can amplify your impact and connect you with passionate supporters who want to make a difference. Our platform handles all donation processing, provides tax receipts, and ensures compliance with international giving standards.",
    wildlifeTypes: ["All Wildlife", "Marine Life", "Birds", "Mammals", "Reptiles"],
    volunteerTasks: [
      "✨ FREE platform listing for qualified non-profits",
      "💰 100% of donations go to your organization",
      "🌍 Global reach to conservation-minded donors",
      "📊 Analytics dashboard to track engagement",
      "🎯 Marketing support and promotion",
      "📧 Automated donor communications",
      "🧾 Tax receipt generation for donors",
      "🤝 Partnership with Zoo Foundation brand",
    ],
    ethicalConsiderations:
      "We carefully vet all partner organizations to ensure they meet our strict ethical standards for wildlife conservation, animal welfare, and environmental protection. All experiences must prioritize conservation outcomes over tourist entertainment.",
    requirements: [
      "Registered 501(c)(3) or equivalent non-profit status",
      "Proven track record in conservation (2+ years)",
      "Commitment to ethical wildlife practices",
      "Insurance and safety protocols in place",
      "Regular impact reporting capability",
      "English-language program materials",
    ],
    pricing: {
      amount: 0,
      currency: "USD",
      period: "FREE for non-profits",
    },
    duration: {
      minWeeks: 0,
      maxWeeks: 0,
    },
    impact:
      "By joining our platform, you'll expand your reach to a global audience of conservation supporters, increase your funding opportunities, and join a network of organizations working together to save endangered species worldwide.",
    rating: 5.0,
    reviewsCount: 28,
    featured: true,
  },
  {
    id: "9",
    title: "Farallones Sanctuary Wildlife Expedition",
    location: {
      city: "Farallone Islands, San Francisco",
      country: "USA",
      continent: "North America",
      coordinates: {
        lat: 37.7,
        lng: -123.0,
      },
    },
    images: [
      "/images/volunteer-experiences/whale.jpg",
      "/images/volunteer-experiences/shark.jpg",
      "/images/volunteer-experiences/Great-White-Shark-1.webp",
    ],
    description:
      "Visit the Waters of the Devil's Teeth! Join marine biologist David McGuire on a unique exploration into the Greater Farallones National Marine Sanctuary, observing, photographing and recording marine wildlife from seabirds to whales, and maybe even a great white shark! We lead these unique trips each 'Sharktober' when the white sharks return from their amazing migration of over 4000 miles round trip to forage in our National Marine Sanctuary. As part of NOAA's National Marine Sanctuary White Shark Stewardship program, we collect data using photographs and encourage our guests to add observations on whales, seabirds and white sharks while educating the public on the importance of white sharks and all life in the ocean.",
    overview:
      "Journey to the Devil's Teeth – the Island of the Great White Shark – on this extraordinary conservation expedition into the Greater Farallones National Marine Sanctuary. These unique natural history trips focus on the geology, biology, and ecology of one of the world's most important marine sanctuaries, scheduled exclusively during 'Sharktober' when great whites return from their 4,000-mile Pacific migration.\n\n📍 **Meeting Point:** Fisherman's Wharf at 7:30 AM (between Castagnola's and Tarantino's restaurants, look for the EAT CRAB sign). Board the US Coast Guard inspected vessel AMIGO for an 8:00 AM departure, returning by 4:30 PM.\n\n🛤️ **Expedition Route:** Departing San Francisco Bay, we navigate the Marin coastline to Drakes Bay and deeper waters, ultimately reaching 'Shark Alley' – the zone with the highest predation probability on Earth, where great whites hunt elephant seals in their natural habitat.\n\n🐋 **Wildlife Encounters:** The sanctuary hosts an incredible diversity of life including 36 marine mammal species, 18 cetacean species (featuring blue, gray, and humpback whales), 5 pinniped species (elephant seals, sea lions, harbor seals), and over 250,000 seabirds from 12 nesting species. While we often see sharks, this is a comprehensive marine ecosystem expedition.\n\n⚠️ **Important:** This is a conservation-focused wildlife education expedition, not a commercial shark tour. We're one of the few operators permitted under NOAA's White Shark Stewardship Program. No attractants are used – this is pure, ethical wildlife observation. Landing on the protected islands is prohibited by federal regulations.",
    wildlifeTypes: ["Great White Sharks", "Humpback Whales", "Gray Whales", "Blue Whales", "Elephant Seals", "Sea Lions", "250,000+ Seabirds"],
    volunteerTasks: [
      "🔬 Participate in NOAA White Shark Stewardship data collection",
      "📸 Document and photograph marine wildlife for research",
      "🐋 Observe 18 species of cetaceans including blue, gray & humpback whales",
      "🦅 Identify 12 species of nesting seabirds in massive colony",
      "🦈 Learn shark conservation from marine biologist David McGuire",
      "🦭 Monitor 5 species of pinnipeds including elephant seals",
      "📝 Contribute observations to ongoing sanctuary research",
      "🌊 Experience 'Shark Alley' - highest predation probability zone globally",
    ],
    ethicalConsiderations:
      "WEATHER & SAFETY: Trips may depart in fog or light rain at captain's discretion. Call 415-350-3790 at 8 PM evening before for weather updates. No refunds once boat leaves dock. SEASICKNESS: Gulf waters can be rough - seasick remedies highly recommended, consume before boarding. REST & PREPARATION: Full night's rest important, avoid alcohol night before, eat healthy breakfast. WHAT TO BRING: Layers/waterproof jacket, soft-soled shoes (no sandals), cameras/binoculars, sun protection, your own food/drinks (no alcohol), reusable water bottles. PROHIBITED: Smoking/vaping, drone aircraft, single-use plastics. The vessel has all USCG safety equipment including life vests, communications, first aid.",
    requirements: [
      "Minimum age 8 years (youth must be with parent/guardian)",
      "Must climb 6-foot ladder to board vessel",
      "Good physical mobility for 9-hour marine conditions",
      "Seasickness preparation strongly recommended",
      "Bring own food, water, and weather protection",
      "No wheelchairs, crutches, or mobility limitations",
      "Sign liability waiver acknowledging trip conditions",
    ],
    pricing: {
      amount: 300,
      currency: "USD",
      period: "day expedition",
    },
    duration: {
      minWeeks: 0,
      maxWeeks: 0,
    },
    impact:
      "REFUND POLICY: Full refund if cancelled 7+ days before departure (less $25 fee). Within 7 days no refunds but may transfer to another date with fee. Weather cancellations receive full refund or transfer. Once vessel passes Golden Gate Bridge, no refunds regardless of conditions or wildlife sightings. Contact info@sharkstewards.org or via Universe platform for questions. This expedition directly supports NOAA's White Shark Stewardship Program and Shark Stewards conservation efforts. Data and photographs collected contribute to ongoing research on great white shark behavior, marine mammal populations, and ecosystem health monitoring in one of the world's most biodiverse marine sanctuaries.",
    rating: 4.8,
    reviewsCount: 156,
    featured: true,
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find((experience) => experience.id === id);
};

export const getFeaturedExperiences = (): Experience[] => {
  return experiences.filter((experience) => experience.featured);
};
export interface ResearchArea {
  title: string
  description: string
  icon: string
}

export interface TeamMember {
  name: string
  role: string
  avatar?: string
  bio: string
}

export interface Milestone {
  date: string
  title: string
  status: 'completed' | 'in-progress' | 'upcoming'
  description: string
}

export interface Resource {
  title: string
  url: string
  type: 'article' | 'paper' | 'video' | 'report'
}

export interface NewsItem {
  title: string
  description: string
  date: string
  url: string
  type: 'research' | 'news' | 'update' | 'milestone'
}

export interface ResearchArtifact {
  title: string
  description: string
  date: string
  zipUrl: string  // URL to zips.zoo.ngo
  size: string    // e.g., "250 MB"
  format: string  // e.g., "DNA sequences (FASTA)", "Image dataset (PNG/JPEG)", "Models (PyTorch)"
  doi?: string    // Optional DOI
}

export interface DAO {
  id: string
  name: string
  symbol: string
  emoji: string
  tagline: string
  description: string
  mission: string
  partners?: string
  treasury: string
  raised: string
  goal: string
  proposals: number
  members: number
  multisig: string

  // Extended DAO content
  marketHypothesis?: string
  researchAreas?: ResearchArea[]
  team?: TeamMember[]
  roadmap?: Milestone[]
  valueCaptureModel?: string
  tokenomics?: {
    distribution: { label: string; percentage: number; color: string }[]
    utility: string[]
  }
  resources?: Resource[]
  news?: NewsItem[]
  researchArtifacts?: ResearchArtifact[]
}

export const daos: DAO[] = [
  {
    id: 'ocean',
    name: 'OceanDAO',
    symbol: 'OCEAN',
    emoji: '🧬',
    tagline: 'Ocean DNA sequencing and marine biodiversity research',
    description: 'OceanDAO pioneers ocean DNA sequencing to catalog and protect marine biodiversity. Through partnerships with marine research institutions, we\'re building comprehensive genetic databases of ocean life, enabling better conservation strategies and sustainable ocean management.',
    mission: 'Catalog and protect marine biodiversity through cutting-edge DNA sequencing',
    partners: 'Marine research labs, ocean conservation groups, and universities worldwide working on environmental DNA (eDNA) sampling and genomic analysis of marine species.',
    treasury: '$325,000',
    raised: '$325,000',
    goal: '$500,000',
    proposals: 18,
    members: 342,
    multisig: '0x742d35Cc6634C0532925a3b844Bc9e7595f08f3a',

    marketHypothesis: 'Ocean biodiversity is declining at an unprecedented rate, with an estimated 10-15% of marine species facing extinction within the next century. Traditional conservation methods are insufficient to catalog and protect the vast diversity of ocean life. Environmental DNA (eDNA) sequencing offers a revolutionary approach to rapidly identify, monitor, and protect marine species at scale. By building the world\'s most comprehensive marine genetic database, OceanDAO enables data-driven conservation strategies, sustainable fishing practices, and early detection of ecosystem threats. The market for marine conservation technology is projected to reach $2.8 billion by 2030, driven by increasing regulatory requirements, climate change impacts, and growing awareness of ocean health\'s critical role in planetary stability.',

    researchAreas: [
      {
        title: 'eDNA Sampling & Analysis',
        description: 'Deploy automated water sampling stations across key marine ecosystems to collect environmental DNA. Advanced genomic sequencing identifies species presence, abundance, and genetic diversity without invasive observation methods.',
        icon: '🧪'
      },
      {
        title: 'Marine Biodiversity Mapping',
        description: 'Create comprehensive genetic databases of ocean life, cataloging both known and undiscovered species. Machine learning algorithms identify patterns and predict ecosystem health trends.',
        icon: '🗺️'
      },
      {
        title: 'Coral Reef Genomics',
        description: 'Study coral stress responses, disease resistance, and symbiotic relationships through genomic analysis. Identify resilient coral strains for restoration and climate adaptation programs.',
        icon: '🪸'
      },
      {
        title: 'Illegal Fishing Detection',
        description: 'Use eDNA to detect presence of protected species in fishing zones. Blockchain-verified sampling data provides tamper-proof evidence for enforcement agencies.',
        icon: '🛡️'
      }
    ],

    tokenomics: {
      distribution: [
        { label: 'Research Grants', percentage: 40, color: '#667eea' },
        { label: 'Field Operations', percentage: 25, color: '#764ba2' },
        { label: 'Technology Development', percentage: 20, color: '#f093fb' },
        { label: 'Community & Governance', percentage: 10, color: '#4facfe' },
        { label: 'Treasury Reserve', percentage: 5, color: '#00f2fe' }
      ],
      utility: [
        'Governance voting on research priorities and funding allocation',
        'Access to exclusive marine expeditions and citizen science programs',
        'Data licensing revenue share from commercial partners',
        'Priority access to NFT collections of newly discovered species',
        'Staking rewards from treasury yield generation'
      ]
    },

    team: [
      {
        name: 'Dr. Sylvia Earle',
        role: 'Scientific Advisory Board',
        bio: 'Legendary marine biologist and National Geographic Explorer-in-Residence. Pioneer of deep ocean exploration with over 7,000 hours underwater.'
      },
      {
        name: 'Dr. Erika Woolsey',
        role: 'Marine Conservation Lead',
        bio: 'CEO of The Hydrous, marine biologist specializing in coral reef ecosystems and immersive ocean storytelling through VR/AR technology.'
      },
      {
        name: 'Dr. Jesse Ausubel',
        role: 'Biodiversity Research Advisor',
        bio: 'Director of the Program for the Human Environment at Rockefeller University. Led the Census of Marine Life, a 10-year global initiative.'
      }
    ],

    roadmap: [
      {
        date: '2024 Q1',
        title: 'eDNA Sampling Network Launch',
        status: 'completed',
        description: 'Deployed 25 automated sampling stations across Pacific, Atlantic, and Indian Ocean sites. Established baseline genetic databases for 10 key ecosystems.'
      },
      {
        date: '2024 Q2',
        title: 'Machine Learning Pipeline',
        status: 'completed',
        description: 'Built AI models for species identification from genetic sequences. Achieved 94% accuracy on known species, discovered 12 potential new species.'
      },
      {
        date: '2024 Q3',
        title: 'Coral Reef Focus Campaign',
        status: 'in-progress',
        description: 'Intensive genomic study of coral resilience in warming oceans. Partnering with restoration projects in Caribbean, Great Barrier Reef, and Coral Triangle.'
      },
      {
        date: '2024 Q4',
        title: 'Commercial Data Partnerships',
        status: 'upcoming',
        description: 'License datasets to fishing industry, aquaculture operations, and environmental consultancies. Revenue supports expanded research.'
      },
      {
        date: '2025 Q1',
        title: 'Global Expansion',
        status: 'upcoming',
        description: 'Scale to 100+ sampling sites worldwide. Launch citizen science app for crowd-sourced water sampling and data contribution.'
      }
    ],

    valueCaptureModel: 'OceanDAO creates value through multiple revenue streams while maintaining open science principles. Primary revenue comes from data licensing to commercial partners (fishing industry, aquaculture, biotech, pharmaceuticals) who use our genetic databases for sustainable operations and drug discovery. Government contracts for biodiversity monitoring and compliance verification provide steady institutional funding. Token holders capture value through governance participation, staking yields from treasury management, and revenue sharing from commercial partnerships. Conservation impact is monetized through verified carbon credits from marine ecosystem restoration and blue carbon projects. NFT collections of newly discovered species create cultural value and fund ongoing research. As the world\'s most comprehensive marine genetic database, OceanDAO becomes essential infrastructure for ocean management, positioning token holders to benefit from the growing ocean economy while accelerating conservation impact.',

    resources: [
      {
        title: 'Environmental DNA: A powerful tool for ocean conservation',
        url: 'https://www.nature.com/articles/s41559-020-01334-9',
        type: 'paper'
      },
      {
        title: 'The Census of Marine Life: Making Ocean Life Count',
        url: 'https://www.plos.org/census-marine-life/',
        type: 'report'
      },
      {
        title: 'How eDNA is revolutionizing marine conservation',
        url: 'https://www.youtube.com/watch?v=ocean-edna',
        type: 'video'
      },
      {
        title: 'Blue Economy: Sustainable Ocean Development',
        url: 'https://www.worldbank.org/en/topic/oceans-fisheries-and-coastal-economies',
        type: 'article'
      }
    ],

    news: [
      {
        title: 'OceanDAO Publishes Groundbreaking DNA Study',
        description: 'New research reveals 300+ undiscovered marine species through environmental DNA sampling in the Pacific Ocean. This breakthrough demonstrates the power of eDNA technology in cataloging marine biodiversity.',
        date: '2025-01-10',
        url: 'https://papers.zoo.ngo/ocean-dna-2025',
        type: 'research'
      },
      {
        title: 'Coral Reef Genomics Initiative Launch',
        description: 'OceanDAO announces major research initiative to study coral stress responses and climate resilience. Focus on identifying heat-tolerant coral strains for restoration programs.',
        date: '2024-12-15',
        url: 'https://papers.zoo.ngo/coral-genomics-2024',
        type: 'news'
      },
      {
        title: '50 Automated Sampling Stations Deployed',
        description: 'Milestone achievement: OceanDAO has successfully deployed 50 autonomous eDNA sampling stations across key marine ecosystems worldwide, doubling our monitoring capacity.',
        date: '2024-11-20',
        url: 'https://papers.zoo.ngo/sampling-network-expansion',
        type: 'milestone'
      }
    ],

    researchArtifacts: [
      {
        title: 'Pacific Ocean eDNA Sequence Database',
        description: 'Complete genomic sequences from 300+ newly cataloged marine species. Includes raw FASTA files, annotated genomes, and species identification models.',
        date: '2025-01-10',
        zipUrl: 'https://zips.zoo.ngo/ocean-dao/pacific-edna-2025.zip',
        size: '2.4 GB',
        format: 'DNA sequences (FASTA), Annotations (GFF3), ML models (PyTorch)',
        doi: '10.5281/zenodo.ocean.2025.001'
      },
      {
        title: 'Coral Reef Genetic Diversity Dataset',
        description: 'Comprehensive genetic analysis of coral species across 15 reef systems. Includes stress response markers and climate resilience indicators.',
        date: '2024-12-15',
        zipUrl: 'https://zips.zoo.ngo/ocean-dao/coral-genomics-2024.zip',
        size: '1.8 GB',
        format: 'DNA sequences (FASTA), SNP data (VCF), Analysis scripts (R/Python)',
        doi: '10.5281/zenodo.ocean.2024.012'
      },
      {
        title: 'Marine Biodiversity Sampling Network Data',
        description: 'Raw data from 50 autonomous sampling stations covering 2 years of continuous monitoring. Includes environmental metadata and species presence matrices.',
        date: '2024-11-20',
        zipUrl: 'https://zips.zoo.ngo/ocean-dao/sampling-network-2024.zip',
        size: '850 MB',
        format: 'Time-series data (CSV), Environmental metadata (JSON), GIS files (GeoJSON)',
        doi: '10.5281/zenodo.ocean.2024.010'
      }
    ]
  },
  {
    id: 'shark',
    name: 'SharkDAO',
    symbol: 'SHARK',
    emoji: '🦈',
    tagline: 'Partnership with Shark Stewards for shark conservation',
    description: 'SharkDAO works with Shark Stewards to protect sharks worldwide through research, education, and policy advocacy. We offer exclusive shark diving experiences while supporting shark protection initiatives.',
    mission: 'Protect sharks worldwide through research, education, and policy advocacy',
    partners: 'Shark Stewards, leading global shark conservation organization',
    treasury: '$150,000',
    raised: '$150,000',
    goal: '$300,000',
    proposals: 5,
    members: 234,
    multisig: 'zoo.eth',

    marketHypothesis: 'Sharks are apex predators essential to ocean ecosystem health, yet 100 million sharks are killed annually, with 25% of shark species threatened with extinction. Overfishing, finning, and bycatch have devastated shark populations globally. Despite their critical ecological role, sharks receive only 1% of marine conservation funding. SharkDAO addresses this gap through innovative financing mechanisms, combining ecotourism revenue with conservation action. The dive tourism industry generates $4.2 billion annually, with shark diving valued at $314 million—demonstrating that living sharks are worth more than dead ones. By tokenizing shark conservation and offering exclusive diving experiences, SharkDAO creates sustainable funding while raising awareness. With shark fin soup demand declining 80% in China and growing recognition of sharks\' ecological value, the market timing is ideal for community-driven shark protection at scale.',

    researchAreas: [
      {
        title: 'Shark Population Monitoring',
        description: 'Deploy acoustic tagging, satellite tracking, and drone surveys to monitor shark movements, breeding sites, and population health. Data informs marine protected area design and fishing regulations.',
        icon: '📡'
      },
      {
        title: 'Anti-Finning Enforcement',
        description: 'Support coast guard operations, port inspections, and supply chain tracking to combat illegal shark finning. Blockchain-based traceability ensures sustainable shark products.',
        icon: '🚨'
      },
      {
        title: 'Community-Based Conservation',
        description: 'Work with fishing communities to transition from shark fishing to shark tourism. Provide training, equipment, and marketing support for sustainable livelihoods.',
        icon: '🤝'
      },
      {
        title: 'Shark Diving Experiences',
        description: 'Offer exclusive shark diving expeditions with world-class operators. Revenue directly funds conservation while educating participants about shark ecology and threats.',
        icon: '🤿'
      }
    ],

    tokenomics: {
      distribution: [
        { label: 'Conservation Programs', percentage: 35, color: '#667eea' },
        { label: 'Dive Experience Operations', percentage: 30, color: '#764ba2' },
        { label: 'Education & Advocacy', percentage: 20, color: '#f093fb' },
        { label: 'Community Rewards', percentage: 10, color: '#4facfe' },
        { label: 'Treasury Reserve', percentage: 5, color: '#00f2fe' }
      ],
      utility: [
        'Book exclusive shark diving trips worldwide at member rates',
        'Vote on conservation priorities and funding allocation',
        'Access shark research data and population analytics',
        'Earn rewards for participating in citizen science programs',
        'Trade diving NFTs with proof of participation'
      ]
    },

    team: [
      {
        name: 'David McGuire',
        role: 'Director, Shark Stewards',
        bio: 'Marine biologist and shark conservationist. Founded Shark Stewards and led campaigns resulting in California shark fin ban and federal protections for multiple shark species.'
      },
      {
        name: 'Dr. Barbara Block',
        role: 'Scientific Advisor',
        bio: 'Stanford marine biologist specializing in shark physiology and migration. Pioneer of electronic tagging technology that revolutionized understanding of shark behavior.'
      },
      {
        name: 'Ocean Ramsey',
        role: 'Conservation Ambassador',
        bio: 'Marine biologist and shark advocate known for free-diving with great white sharks. Founder of One Ocean Diving, promoting shark conservation through education.'
      }
    ],

    roadmap: [
      {
        date: '2024 Q1',
        title: 'Partnership Launch with Shark Stewards',
        status: 'completed',
        description: 'Formalized partnership with Shark Stewards. Established initial conservation priorities focusing on California and Pacific shark populations.'
      },
      {
        date: '2024 Q2',
        title: 'First Shark Diving Expeditions',
        status: 'completed',
        description: 'Organized member diving trips to Guadalupe Island (great whites) and Cocos Island (hammerheads). 100% positive feedback, generated $45K for conservation.'
      },
      {
        date: '2024 Q3',
        title: 'Acoustic Tagging Program',
        status: 'in-progress',
        description: 'Deploying 50 acoustic receivers along California coast to track shark movements. Tagging 100+ sharks across multiple species for long-term monitoring.'
      },
      {
        date: '2024 Q4',
        title: 'Anti-Finning Campaign',
        status: 'upcoming',
        description: 'Launch advocacy campaign for stronger international shark finning regulations. Support enforcement operations in key trafficking regions.'
      },
      {
        date: '2025 Q1',
        title: 'Global Expansion',
        status: 'upcoming',
        description: 'Expand diving operations to Bahamas, South Africa, and Fiji. Partner with 10 additional dive operators for year-round member experiences.'
      }
    ],

    valueCaptureModel: 'SharkDAO creates a virtuous cycle where ecotourism funds conservation while building public support for shark protection. Token holders access exclusive diving experiences at premium locations worldwide, with 70% of dive revenue funding direct conservation action. Partnerships with elite dive operators provide members with unforgettable encounters while generating sustainable funding streams. Governance rights allow the community to direct funding toward highest-impact conservation projects, from population monitoring to anti-finning enforcement. As shark populations recover and diving destinations expand, token value accrues through both increased dive bookings and conservation impact. The model proves that sharks are worth more alive than dead—estimated at $1.9M per shark over its lifetime in tourism value versus $50-100 for fins. Additional revenue comes from merchandise, documentary licensing, and corporate partnerships with ocean-focused brands. By aligning economic incentives with conservation outcomes, SharkDAO demonstrates a scalable model for protecting apex predators while rewarding community participation.',

    resources: [
      {
        title: 'The Economic Value of Sharks to Tourism',
        url: 'https://www.nature.com/articles/sharks-tourism-value',
        type: 'paper'
      },
      {
        title: 'Shark Stewards: 20 Years of Conservation Impact',
        url: 'https://sharkstewards.org/impact-report',
        type: 'report'
      },
      {
        title: 'Why Sharks Matter: The Apex Predator Perspective',
        url: 'https://www.youtube.com/watch?v=shark-conservation',
        type: 'video'
      },
      {
        title: 'Global Shark Finning Trade Analysis',
        url: 'https://www.traffic.org/shark-fin-trade/',
        type: 'article'
      }
    ]
  },
  {
    id: 'beluga',
    name: 'BelugaDAO',
    symbol: 'BELUGA',
    emoji: '🐋',
    tagline: 'Supporting beluga sanctuaries with Frontiers North',
    description: 'BelugaDAO partners with Frontiers North to support beluga whale sanctuaries and Arctic wildlife conservation. We provide unique Arctic wildlife experiences while funding critical research and protection efforts.',
    mission: 'Protect Arctic beluga whales through sanctuary development and research',
    partners: 'Frontiers North Adventures - frontiersnorth.com',
    treasury: '$75,000',
    raised: '$75,000',
    goal: '$200,000',
    proposals: 3,
    members: 156,
    multisig: 'zoo.eth',

    marketHypothesis: 'Arctic ecosystems are warming twice as fast as the global average, threatening beluga whale populations and the indigenous communities that depend on them. Beluga whales face increasing threats from climate change, shipping traffic, underwater noise pollution, and habitat degradation. Traditional conservation approaches struggle in remote Arctic regions with limited infrastructure and extreme conditions. BelugaDAO creates a sustainable funding model by combining Arctic ecotourism with cutting-edge research and community-led conservation. The Arctic tourism market is growing 15% annually, driven by last-chance tourism and adventure travel demand. By offering exclusive beluga encounters and northern lights experiences, BelugaDAO generates revenue while funding critical whale research and sanctuary development. Partnership with Frontiers North Adventures provides expertise in responsible Arctic tourism and indigenous community engagement.',

    researchAreas: [
      {
        title: 'Beluga Population Monitoring',
        description: 'Track beluga pod movements, calving sites, and population health using acoustic monitoring, aerial surveys, and photo-identification. Data guides marine protected area designation in critical habitat.',
        icon: '📊'
      },
      {
        title: 'Climate Impact Studies',
        description: 'Research how Arctic warming affects beluga prey availability, migration patterns, and habitat use. Model future scenarios to guide adaptive management strategies.',
        icon: '🌡️'
      },
      {
        title: 'Sanctuary Development',
        description: 'Establish protected beluga sanctuaries in key feeding and calving grounds. Work with indigenous communities on co-management approaches that respect traditional knowledge.',
        icon: '🏔️'
      },
      {
        title: 'Arctic Wildlife Experiences',
        description: 'Offer responsible whale-watching expeditions, Churchill wildlife tours, and aurora viewing. 100% of profits fund conservation while educating visitors about Arctic ecosystems.',
        icon: '🎥'
      }
    ],

    tokenomics: {
      distribution: [
        { label: 'Sanctuary Operations', percentage: 40, color: '#667eea' },
        { label: 'Research Programs', percentage: 30, color: '#764ba2' },
        { label: 'Community Partnerships', percentage: 20, color: '#f093fb' },
        { label: 'Arctic Experiences', percentage: 7, color: '#4facfe' },
        { label: 'Treasury Reserve', percentage: 3, color: '#00f2fe' }
      ],
      utility: [
        'Access exclusive Arctic wildlife expeditions with Frontiers North',
        'Vote on sanctuary development and research priorities',
        'Receive beluga adoption certificates and updates',
        'Priority booking for northern lights tours',
        'Revenue share from Arctic tourism operations'
      ]
    },

    team: [
      {
        name: 'Frontiers North Adventures',
        role: 'Arctic Tourism Partner',
        bio: 'Leading Arctic adventure company specializing in responsible wildlife tourism in Churchill, Manitoba. 30+ years experience with beluga whales and polar bear encounters.'
      },
      {
        name: 'Dr. Valeria Vergara',
        role: 'Beluga Research Advisor',
        bio: 'Marine biologist specializing in beluga whale acoustics and communication. Leading expert on beluga vocalizations and their use of sound in Arctic environments.'
      },
      {
        name: 'Indigenous Elders Council',
        role: 'Traditional Knowledge Advisors',
        bio: 'Representatives from Inuit and First Nations communities with generations of beluga stewardship. Guide culturally appropriate conservation approaches.'
      }
    ],

    roadmap: [
      {
        date: '2024 Q1',
        title: 'Partnership with Frontiers North',
        status: 'completed',
        description: 'Formalized partnership with Frontiers North Adventures. Established framework for responsible Arctic tourism supporting conservation.'
      },
      {
        date: '2024 Q2',
        title: 'First Churchill Expeditions',
        status: 'completed',
        description: 'Launched inaugural beluga and polar bear viewing tours. 24 members participated, raising $32K for sanctuary development.'
      },
      {
        date: '2024 Q3',
        title: 'Acoustic Monitoring Network',
        status: 'in-progress',
        description: 'Installing underwater hydrophones to monitor beluga vocalizations year-round. Tracking population movements and response to shipping traffic.'
      },
      {
        date: '2024 Q4',
        title: 'Community Sanctuary Planning',
        status: 'upcoming',
        description: 'Co-design beluga sanctuaries with indigenous communities. Integrate traditional ecological knowledge with scientific research.'
      },
      {
        date: '2025 Q1',
        title: 'Expanded Arctic Experiences',
        status: 'upcoming',
        description: 'Add summer kayaking with belugas, winter aurora expeditions. Scale to serve 100+ members annually while protecting whale habitat.'
      }
    ],

    valueCaptureModel: 'BelugaDAO creates value by making Arctic conservation accessible and sustainable. Token holders access world-class beluga encounters and northern lights experiences that would typically cost $8,000-12,000 per person, while knowing their participation directly funds whale protection. Partnership with Frontiers North provides operational expertise and infrastructure in Churchill, Manitoba—beluga capital of the world. Revenue from tourism operations flows directly to sanctuary development, research programs, and indigenous community partnerships. As Arctic tourism grows 15% annually, BelugaDAO captures value from the \"last chance tourism\" trend while ensuring visits support rather than harm whale populations. The model demonstrates that responsible ecotourism can fund conservation in remote regions where traditional funding mechanisms struggle. Token value accrues through both tourism revenue and the appreciation of protected beluga habitat as climate change makes Arctic conservation increasingly critical.',

    resources: [
      {
        title: 'Beluga Whales in a Changing Arctic',
        url: 'https://www.nature.com/articles/arctic-beluga-climate',
        type: 'paper'
      },
      {
        title: 'Frontiers North: 30 Years of Arctic Conservation',
        url: 'https://frontiersnorth.com/conservation-report',
        type: 'report'
      },
      {
        title: 'Churchill Beluga Whale Migration',
        url: 'https://www.youtube.com/watch?v=beluga-churchill',
        type: 'video'
      },
      {
        title: 'Indigenous-Led Arctic Conservation Success Stories',
        url: 'https://www.arcticconservation.org/indigenous-leadership',
        type: 'article'
      }
    ]
  },
  {
    id: 'kauai',
    name: 'KauaiDAO',
    symbol: 'KAUAI',
    emoji: '🏝️',
    tagline: 'Hawaii marine conservation led by Gregg Winston',
    description: 'KauaiDAO focuses on preserving Hawaii\'s unique marine ecosystems and coral reefs. Led by conservation expert Gregg Winston, we work to protect island biodiversity.',
    mission: 'Preserve Hawaii\'s unique marine ecosystems and coral reefs',
    partners: 'Hawaii marine conservation organizations and research institutions',
    treasury: '$200,000',
    raised: '$200,000',
    goal: '$400,000',
    proposals: 7,
    members: 412,
    multisig: 'zoo.eth',

    marketHypothesis: 'Hawaii\'s coral reefs are among the most biologically diverse ecosystems on Earth, yet face existential threats from climate change, ocean acidification, invasive species, and tourism impacts. Over 25% of Hawaiian reef species are found nowhere else on the planet. Traditional conservation funding is insufficient to protect these unique ecosystems at scale. KauaiDAO combines marine science with community engagement and sustainable tourism to create resilient funding for reef protection. The Hawaii ecotourism market generates $2.4 billion annually, with growing demand for authentic conservation experiences. Led by conservation expert Gregg Winston and supported by local Hawaiian communities, KauaiDAO demonstrates how island conservation can be both culturally respectful and economically sustainable. With coral bleaching events increasing in frequency and severity, the time to act is now.',

    researchAreas: [
      {
        title: 'Coral Restoration',
        description: 'Grow and transplant climate-resilient coral species. Identify heat-tolerant strains and scale nursery operations to restore degraded reef areas across Kauai.',
        icon: '🪸'
      },
      {
        title: 'Marine Protected Areas',
        description: 'Establish and enforce no-take zones in critical reef habitats. Monitor effectiveness through regular biodiversity surveys and water quality testing.',
        icon: '🛡️'
      },
      {
        title: 'Native Species Conservation',
        description: 'Protect endemic Hawaiian marine species including monk seals, green sea turtles, and native fish. Track populations and mitigate human impacts.',
        icon: '🐢'
      },
      {
        title: 'Community Education',
        description: 'Engage local communities and visitors in reef stewardship. Offer snorkel tours, beach cleanups, and cultural education about traditional Hawaiian ocean management.',
        icon: '🤙'
      }
    ],

    tokenomics: {
      distribution: [
        { label: 'Reef Restoration', percentage: 45, color: '#667eea' },
        { label: 'Marine Protection', percentage: 25, color: '#764ba2' },
        { label: 'Community Programs', percentage: 20, color: '#f093fb' },
        { label: 'Research & Monitoring', percentage: 7, color: '#4facfe' },
        { label: 'Treasury Reserve', percentage: 3, color: '#00f2fe' }
      ],
      utility: [
        'Participate in coral restoration dives and reef monitoring',
        'Vote on marine protected area priorities',
        'Access exclusive Hawaiian conservation experiences',
        'Support local Hawaiian conservation leaders',
        'Earn rewards for beach cleanup participation'
      ]
    },

    team: [
      {
        name: 'Gregg Winston',
        role: 'Conservation Director',
        bio: 'Marine conservationist with 20+ years protecting Hawaiian reefs. Founder of Kauai reef restoration programs and advocate for community-based ocean stewardship.'
      },
      {
        name: 'Dr. Ruth Gates (Honored)',
        role: 'Scientific Inspiration',
        bio: 'Late coral reef scientist who pioneered super coral research. Her vision of climate-resilient reefs continues to guide Hawaiian conservation efforts.'
      },
      {
        name: 'Kumu Hula Council',
        role: 'Cultural Advisors',
        bio: 'Hawaiian cultural practitioners who maintain traditional ecological knowledge. Guide integration of ancient ahupuaʻa management with modern conservation.'
      }
    ],

    roadmap: [
      {
        date: '2024 Q1',
        title: 'Kauai Partnership Formation',
        status: 'completed',
        description: 'Established partnerships with local Hawaiian organizations and Gregg Winston\'s conservation network. Defined initial reef restoration sites.'
      },
      {
        date: '2024 Q2',
        title: 'Coral Nursery Launch',
        status: 'completed',
        description: 'Built underwater coral nurseries at 3 sites around Kauai. Began cultivating 500+ coral fragments of heat-resistant species.'
      },
      {
        date: '2024 Q3',
        title: 'Marine Protected Area Campaign',
        status: 'in-progress',
        description: 'Working with state officials to expand no-take zones. Conducting baseline biodiversity surveys to demonstrate conservation need.'
      },
      {
        date: '2024 Q4',
        title: 'Community Restoration Days',
        status: 'upcoming',
        description: 'Launch monthly coral planting events for DAO members and locals. Combine restoration work with traditional Hawaiian cultural practices.'
      },
      {
        date: '2025 Q1',
        title: 'Island-Wide Expansion',
        status: 'upcoming',
        description: 'Scale restoration to 10 sites across Kauai. Partner with hotels for sustainable tourism that funds conservation.'
      }
    ],

    valueCaptureModel: 'KauaiDAO creates value by protecting Hawaii\'s irreplaceable marine biodiversity while generating sustainable tourism revenue. Token holders access authentic Hawaiian conservation experiences—from coral restoration dives to traditional navigation teachings—that connect visitors with island culture and ecology. Partnership with Gregg Winston and local Hawaiian communities ensures conservation efforts are culturally appropriate and effective. As climate change threatens reefs worldwide, Kauai\'s work developing heat-resistant corals creates valuable intellectual property and restoration expertise. Revenue from ethical tourism and coral restoration consulting services flows back to the DAO, creating a virtuous cycle. The model proves that island conservation can be self-sustaining while honoring indigenous stewardship traditions. Token value accrues through conservation impact, tourism revenue, and the growing recognition that protecting Hawaii\'s unique marine ecosystems is essential to the island\'s identity and economy.',

    resources: [
      {
        title: 'Hawaiian Coral Reef Resilience to Climate Change',
        url: 'https://www.nature.com/articles/hawaii-reef-resilience',
        type: 'paper'
      },
      {
        title: 'Traditional Hawaiian Ocean Management Practices',
        url: 'https://www.papahanaumokuakea.gov/education/ahupuaa.html',
        type: 'report'
      },
      {
        title: 'Kauai Coral Restoration Project Documentary',
        url: 'https://www.youtube.com/watch?v=kauai-coral',
        type: 'video'
      },
      {
        title: 'Super Corals: Engineering Reef Resilience',
        url: 'https://www.scientificamerican.com/super-corals/',
        type: 'article'
      }
    ]
  },
  {
    id: 'tiger',
    name: 'TigerDAO',
    symbol: 'TIGER',
    emoji: '🐅',
    tagline: 'Supporting tiger conservation and exotic cat sanctuaries',
    description: 'TigerDAO supports tiger conservation efforts globally and exotic cat sanctuaries across North America. We work to protect these magnificent animals from extinction.',
    mission: 'Protect tigers and big cats from extinction through habitat preservation',
    partners: 'Big cat sanctuaries and tiger conservation organizations worldwide',
    treasury: '$200,000',
    raised: '$200,000',
    goal: '$500,000',
    proposals: 8,
    members: 567,
    multisig: 'zoo.eth',

    marketHypothesis: 'Wild tiger populations have declined 97% in the past century, from 100,000 to fewer than 4,000 individuals. Poaching, habitat loss, and human-wildlife conflict drive tigers toward extinction despite global conservation efforts. Meanwhile, thousands of captive big cats in the US lack proper care, living in roadside zoos and private collections. TigerDAO addresses both crises through a dual approach: protecting wild tiger habitat in Asia while supporting accredited sanctuaries rescuing captive cats in North America. The exotic animal rescue market is fragmented and underfunded, while ecotourism to tiger reserves generates $350 million annually. By tokenizing big cat conservation and connecting donors directly with impact, TigerDAO creates sustainable funding for the full conservation pipeline—from anti-poaching patrols in India to lifetime care for rescued tigers in Colorado.',

    researchAreas: [
      {
        title: 'Wild Tiger Protection',
        description: 'Fund anti-poaching units, camera trap monitoring, and habitat corridors in tiger range countries. Support community conservation programs that reduce human-wildlife conflict.',
        icon: '🌏'
      },
      {
        title: 'Sanctuary Operations',
        description: 'Support accredited big cat sanctuaries providing lifetime care for rescued tigers, lions, and other exotic cats. Fund enclosures, veterinary care, and enrichment programs.',
        icon: '🏠'
      },
      {
        title: 'Rescue & Rehabilitation',
        description: 'Emergency response for big cats seized from illegal trade or abusive situations. Provide transport, medical treatment, and placement in appropriate sanctuaries.',
        icon: '🚁'
      },
      {
        title: 'Policy & Advocacy',
        description: 'Campaign for stronger laws against private ownership and breeding. Support the Big Cat Public Safety Act and international wildlife trade regulations.',
        icon: '⚖️'
      }
    ],

    tokenomics: {
      distribution: [
        { label: 'Wild Tiger Conservation', percentage: 35, color: '#667eea' },
        { label: 'Sanctuary Support', percentage: 35, color: '#764ba2' },
        { label: 'Rescue Operations', percentage: 20, color: '#f093fb' },
        { label: 'Advocacy & Education', percentage: 7, color: '#4facfe' },
        { label: 'Treasury Reserve', percentage: 3, color: '#00f2fe' }
      ],
      utility: [
        'Adopt a tiger and receive regular updates and photos',
        'Vote on which conservation projects to fund',
        'Virtual visits with rescued big cats at partner sanctuaries',
        'Priority access to tiger conservation safaris',
        'Exclusive NFT art supporting big cat protection'
      ]
    },

    team: [
      {
        name: 'Big Cat Rescue Network',
        role: 'Sanctuary Partners',
        bio: 'Coalition of accredited big cat sanctuaries across North America. Provide lifetime care for rescued tigers, lions, and other exotic cats.'
      },
      {
        name: 'Dr. Alan Rabinowitz (Honored)',
        role: 'Conservation Inspiration',
        bio: 'Late big cat conservationist who established critical tiger corridors in Asia. His vision of connected wild populations guides TigerDAO\'s habitat work.'
      },
      {
        name: 'Wildlife Conservation Society',
        role: 'Field Conservation Partner',
        bio: 'Leading organization protecting wild tigers in India, Russia, and Southeast Asia through community-based conservation and anti-poaching efforts.'
      }
    ],

    roadmap: [
      {
        date: '2024 Q1',
        title: 'Sanctuary Partnership Network',
        status: 'completed',
        description: 'Formalized partnerships with 5 accredited big cat sanctuaries. Established criteria for DAO support and transparent funding allocation.'
      },
      {
        date: '2024 Q2',
        title: 'First Rescue Operations',
        status: 'completed',
        description: 'Funded emergency rescue of 3 tigers from illegal breeder. Provided transport and placement at partner sanctuary, plus lifetime care funding.'
      },
      {
        date: '2024 Q3',
        title: 'Wild Tiger Camera Trapping',
        status: 'in-progress',
        description: 'Deploying 100 camera traps in Indian tiger reserves. Monitoring population trends and poaching threats in critical habitat.'
      },
      {
        date: '2024 Q4',
        title: 'Big Cat Public Safety Act Support',
        status: 'upcoming',
        description: 'Campaign for federal legislation banning private big cat ownership. Fund lobbying, education, and grassroots advocacy efforts.'
      },
      {
        date: '2025 Q1',
        title: 'Global Expansion',
        status: 'upcoming',
        description: 'Extend support to tiger conservation in Russia, Thailand, and Indonesia. Partner with local organizations on habitat protection.'
      }
    ],

    valueCaptureModel: 'TigerDAO creates value by addressing the full spectrum of big cat conservation—from wild tiger protection to captive animal rescue. Token holders directly fund both immediate animal welfare (sanctuary care) and long-term species survival (habitat protection). Partnerships with accredited sanctuaries provide transparency and accountability, while collaboration with field conservation organizations maximizes impact for wild populations. As public awareness of captive big cat abuse grows (catalyzed by documentaries like Tiger King), demand for ethical alternatives increases. TigerDAO captures this momentum through NFT art collections, virtual sanctuary experiences, and educational programs that generate revenue while raising awareness. Token value accrues through both conservation impact metrics (tigers protected, habitat secured) and the growing recognition that big cat conservation requires integrated solutions addressing both wild and captive populations.',

    resources: [
      {
        title: 'The State of the Tiger: Status and Conservation',
        url: 'https://www.panthera.org/tiger-status-report',
        type: 'report'
      },
      {
        title: 'Captive Big Cats in the United States',
        url: 'https://www.worldwildlife.org/publications/captive-big-cats',
        type: 'paper'
      },
      {
        title: 'Tiger Conservation Success Stories from India',
        url: 'https://www.youtube.com/watch?v=india-tiger-success',
        type: 'video'
      },
      {
        title: 'Big Cat Public Safety Act: What You Need to Know',
        url: 'https://www.humanesociety.org/big-cat-public-safety-act',
        type: 'article'
      }
    ]
  },
  {
    id: 'research',
    name: 'ResearchDAO',
    symbol: 'RESEARCH',
    emoji: '🔬',
    tagline: 'NSF grant research in AI and conservation',
    description: 'ResearchDAO funds NSF grant research in AI and conservation technology, supporting Zoo\'s scientific initiatives to develop cutting-edge solutions for conservation challenges.',
    mission: 'Develop cutting-edge AI solutions for conservation challenges',
    partners: 'National Science Foundation, universities, and research institutions',
    treasury: '$500,000',
    raised: '$500,000',
    goal: '$1,000,000',
    proposals: 12,
    members: 789,
    multisig: 'zoo.eth',

    marketHypothesis: 'Conservation faces a data crisis: 80% of wildlife populations lack adequate monitoring, species identification requires expert knowledge scarce in the field, and conservation decisions often rely on outdated information. AI and machine learning offer transformative solutions—automated species recognition, real-time habitat monitoring, predictive modeling for poaching, and optimization of limited conservation resources. The AI for conservation market is nascent but growing rapidly, with $2.1 billion invested in environmental AI startups since 2020. However, most AI conservation tools remain in academic labs, not deployed at scale. ResearchDAO bridges this gap by funding practical AI research that solves real conservation problems, then open-sourcing the technology for global use. With NSF grants leveraging community contributions 3:1, ResearchDAO maximizes research impact while building a portfolio of AI tools that create lasting value for conservation and token holders.',

    researchAreas: [
      {
        title: 'Computer Vision for Wildlife',
        description: 'Train neural networks to identify species from camera trap images, drone footage, and citizen science photos. Automated recognition enables population monitoring at unprecedented scale.',
        icon: '👁️'
      },
      {
        title: 'Acoustic Monitoring AI',
        description: 'Develop deep learning models that detect and classify wildlife sounds—from whale songs to bird calls to elephant vocalizations. Non-invasive population tracking 24/7.',
        icon: '🎧'
      },
      {
        title: 'Predictive Anti-Poaching',
        description: 'Machine learning models predict poaching hotspots based on historical data, weather, economic factors. Optimize ranger patrols to prevent wildlife crime before it happens.',
        icon: '🎯'
      },
      {
        title: 'Climate Impact Modeling',
        description: 'AI-powered simulations predict how climate change affects species distribution, habitat suitability, and ecosystem dynamics. Guide adaptation strategies and corridor design.',
        icon: '🌡️'
      }
    ],

    tokenomics: {
      distribution: [
        { label: 'Research Grants', percentage: 50, color: '#667eea' },
        { label: 'Technology Development', percentage: 25, color: '#764ba2' },
        { label: 'Open Source Infrastructure', percentage: 15, color: '#f093fb' },
        { label: 'Education & Outreach', percentage: 7, color: '#4facfe' },
        { label: 'Treasury Reserve', percentage: 3, color: '#00f2fe' }
      ],
      utility: [
        'Vote on research priorities and grant allocation',
        'Access to AI models and datasets for conservation projects',
        'Commercial licensing revenue share from AI tools',
        'Priority support for deploying AI in field projects',
        'Co-author publications from funded research'
      ]
    },

    team: [
      {
        name: 'Dr. Fei-Fei Li',
        role: 'AI Research Advisor',
        bio: 'Stanford professor and pioneer of ImageNet. Co-director of Stanford Human-Centered AI Institute. Leading expert in computer vision applications for environmental monitoring.'
      },
      {
        name: 'Dr. Grégoire Dubois',
        role: 'Conservation Technology Lead',
        bio: 'European Commission scientist specializing in AI for biodiversity. Developed machine learning models for habitat mapping and species distribution prediction.'
      },
      {
        name: 'Dr. Tom Hart',
        role: 'Field Applications Advisor',
        bio: 'Penguin ecologist at Oxford University. Created Penguin Watch citizen science platform using AI to analyze millions of penguin images from remote cameras.'
      }
    ],

    roadmap: [
      {
        date: '2024 Q1',
        title: 'NSF Grant Award',
        status: 'completed',
        description: 'Secured $350K NSF grant for AI-powered acoustic monitoring. Matched by DAO treasury for $700K total research budget.'
      },
      {
        date: '2024 Q2',
        title: 'Wildlife Vision Foundation Model',
        status: 'completed',
        description: 'Trained large vision model on 10M+ wildlife images. Achieves 96% accuracy on 5,000 species, outperforming human experts on many taxa.'
      },
      {
        date: '2024 Q3',
        title: 'Anti-Poaching AI Deployment',
        status: 'in-progress',
        description: 'Partnering with 5 African wildlife reserves to deploy predictive patrol optimization. Early results show 40% reduction in poaching incidents.'
      },
      {
        date: '2024 Q4',
        title: 'Open Source Release',
        status: 'upcoming',
        description: 'Publish all AI models, training data, and deployment guides as open source. Launch API for conservation organizations worldwide.'
      },
      {
        date: '2025 Q1',
        title: 'Climate Adaptation Tools',
        status: 'upcoming',
        description: 'Release AI models predicting species range shifts under climate scenarios. Help conservation planners design resilient protected area networks.'
      }
    ],

    valueCaptureModel: 'ResearchDAO captures value through a hybrid open-source/commercial model. Core AI models and research are published openly, accelerating conservation science globally. However, enterprise deployment, support, and custom model training generate revenue shared with token holders. NSF and other grants provide 3:1 leverage on DAO contributions—every $100K from the DAO unlocks $300K in federal research funding. As conservation organizations, governments, and corporations adopt ResearchDAO AI tools, licensing fees and support contracts create sustainable revenue. Token holders benefit from both direct revenue sharing and the appreciation of conservation AI as critical infrastructure. The DAO also captures value through IP licensing for commercial applications (agriculture, forestry, environmental monitoring) while ensuring conservation use remains free. By funding the full research pipeline—from basic science to field deployment—ResearchDAO builds a portfolio of AI tools that compound in value as adoption scales.',

    resources: [
      {
        title: 'AI for Conservation: A Comprehensive Review',
        url: 'https://www.nature.com/articles/ai-conservation-2024',
        type: 'paper'
      },
      {
        title: 'NSF Environmental AI Research Program',
        url: 'https://www.nsf.gov/ai-environment',
        type: 'report'
      },
      {
        title: 'Machine Learning for Wildlife Monitoring',
        url: 'https://www.youtube.com/watch?v=ml-wildlife',
        type: 'video'
      },
      {
        title: 'Predictive Poaching Prevention: Results from the Field',
        url: 'https://conservationai.org/poaching-prediction',
        type: 'article'
      }
    ]
  },
  {
    id: 'zoo',
    name: 'ZooDAO',
    symbol: 'ZOO',
    emoji: '🦁',
    tagline: 'Main governance for Zoo Labs Foundation',
    description: 'ZooDAO is the main governance DAO for Zoo Labs Foundation, coordinating global conservation efforts through decentralized governance. Token holders vote on funding allocation and strategic direction.',
    mission: 'Coordinate global conservation efforts through decentralized governance',
    partners: 'All Zoo conservation initiatives and partner organizations',
    treasury: '$1,200,000',
    raised: '$1,200,000',
    goal: '$2,000,000',
    proposals: 24,
    members: 2345,
    multisig: 'zoo.eth',

    marketHypothesis: 'Conservation funding is fragmented, inefficient, and dominated by legacy institutions with high overhead costs. 70-80% of donated funds never reach conservation projects due to administrative costs. Meanwhile, on-the-ground conservationists struggle for resources while crypto-native donors lack transparent, verifiable ways to support conservation at scale. ZooDAO creates the coordination layer for decentralized conservation funding—enabling direct funding, transparent allocation, and measurable impact across multiple conservation domains. As the meta-DAO governing all Zoo conservation initiatives, ZooDAO allows token holders to direct capital to highest-impact projects while maintaining accountability through blockchain transparency. With $2.3 trillion in generational wealth transfer and growing crypto-philanthropy, the market opportunity for efficient, transparent conservation funding is unprecedented.',

    researchAreas: [
      {
        title: 'DAO Governance Innovation',
        description: 'Pioneer new governance mechanisms for conservation funding. Test quadratic funding, retroactive public goods funding, and impact certificates for environmental outcomes.',
        icon: '🗳️'
      },
      {
        title: 'Impact Measurement',
        description: 'Develop blockchain-based verification of conservation impact. Track species protected, habitat restored, and carbon sequestered with cryptographic proof.',
        icon: '📊'
      },
      {
        title: 'Treasury Management',
        description: 'Generate sustainable yields through DeFi while maintaining capital preservation. Use treasury income to fund ongoing conservation operations.',
        icon: '💰'
      },
      {
        title: 'Cross-DAO Coordination',
        description: 'Facilitate collaboration between OceanDAO, SharkDAO, TigerDAO, and other conservation DAOs. Share resources, insights, and best practices across the ecosystem.',
        icon: '🤝'
      }
    ],

    tokenomics: {
      distribution: [
        { label: 'Conservation Grants', percentage: 50, color: '#667eea' },
        { label: 'DAO Operations', percentage: 20, color: '#764ba2' },
        { label: 'Treasury Growth', percentage: 15, color: '#f093fb' },
        { label: 'Ecosystem Development', percentage: 10, color: '#4facfe' },
        { label: 'Emergency Fund', percentage: 5, color: '#00f2fe' }
      ],
      utility: [
        'Vote on funding allocation across all Zoo DAOs',
        'Propose new conservation initiatives and DAOs',
        'Access consolidated reports from all Zoo projects',
        'Participate in meta-governance decisions',
        'Earn rewards for active governance participation'
      ]
    },

    team: [
      {
        name: 'Zoo Labs Foundation',
        role: 'Core Team',
        bio: 'Techstars \'17 alumni building decentralized infrastructure for conservation. Combines blockchain expertise with deep conservation partnerships.'
      },
      {
        name: 'Conservation Partners Network',
        role: 'Field Partners',
        bio: 'Coalition of 20+ conservation organizations worldwide providing on-the-ground expertise and project implementation across marine, terrestrial, and Arctic ecosystems.'
      },
      {
        name: 'DAO Governance Council',
        role: 'Community Leaders',
        bio: 'Elected representatives from token holder community. Guide strategic direction, evaluate funding proposals, and ensure alignment with conservation mission.'
      }
    ],

    roadmap: [
      {
        date: '2024 Q1',
        title: 'Zoo Foundation 501(c)(3) Status',
        status: 'completed',
        description: 'Achieved tax-exempt public charity status (EIN: 88-3538992). Enables tax-deductible donations and grant funding for conservation projects.'
      },
      {
        date: '2024 Q2',
        title: 'First Conservation DAOs Launch',
        status: 'completed',
        description: 'Launched OceanDAO, SharkDAO, and ResearchDAO. Deployed $650K in initial conservation funding across 3 focus areas.'
      },
      {
        date: '2024 Q3',
        title: 'Impact Verification System',
        status: 'in-progress',
        description: 'Building blockchain-based impact tracking. Deploying IoT sensors and satellite monitoring for real-time conservation metrics.'
      },
      {
        date: '2024 Q4',
        title: 'Treasury Diversification',
        status: 'upcoming',
        description: 'Implement sustainable treasury management strategy. Target 5-8% annual yield to fund ongoing operations without token sales.'
      },
      {
        date: '2025 Q1',
        title: 'Global Conservation Network',
        status: 'upcoming',
        description: 'Expand to 10+ conservation DAOs covering biodiversity hotspots worldwide. Coordinate $5M+ in annual conservation funding.'
      }
    ],

    valueCaptureModel: 'ZooDAO captures value as the coordination layer for global conservation funding. As the meta-DAO, it takes a small allocation from each specialized DAO (OceanDAO, SharkDAO, etc.) for coordination services and shared infrastructure. This creates a diversified revenue stream less dependent on any single conservation domain. Treasury management generates sustainable yields that fund operations without diluting token holders. As the Zoo conservation ecosystem grows, network effects increase ZooDAO\'s value—more DAOs mean more coordination value, more shared infrastructure, more collective bargaining power. Token holders benefit from the success of the entire conservation portfolio, not just individual projects. The 501(c)(3) status enables institutional partnerships and foundation grants that multiply DAO funding. ZooDAO positions token holders to benefit from the full conservation economy—from ecotourism to carbon credits to impact investing—while maintaining mission-first alignment.',

    resources: [
      {
        title: 'Decentralized Conservation Funding: A New Paradigm',
        url: 'https://conservation-dao.org/decentralized-funding-white-paper',
        type: 'paper'
      },
      {
        title: 'Zoo Labs Foundation Impact Report 2024',
        url: 'https://zoo.ngo/impact-2024',
        type: 'report'
      },
      {
        title: 'How DAOs Are Revolutionizing Conservation',
        url: 'https://www.youtube.com/watch?v=conservation-daos',
        type: 'video'
      },
      {
        title: 'Crypto-Philanthropy: The Future of Giving',
        url: 'https://www.coindesk.com/crypto-philanthropy-conservation',
        type: 'article'
      }
    ]
  },
  {
    id: 'zen',
    name: 'ZenDAO',
    symbol: 'ZEN',
    emoji: '🧘',
    tagline: 'ZenLM AI development for conservation',
    description: 'ZenDAO supports ZenLM AI development for conservation applications. We build AI tools for species identification, ecosystem monitoring, and conservation planning.',
    mission: 'Build AI tools for species identification and ecosystem monitoring',
    partners: 'AI research labs, conservation tech companies, and wildlife organizations',
    treasury: '$180,000',
    raised: '$180,000',
    goal: '$350,000',
    proposals: 9,
    members: 456,
    multisig: 'zoo.eth',

    marketHypothesis: 'Small language models (1B-7B parameters) are revolutionizing edge AI, enabling sophisticated intelligence on devices without cloud connectivity. Conservation field work often occurs in remote areas without reliable internet—making edge AI critical for real-time species identification, habitat monitoring, and ranger support. ZenLM, a family of small conservation-focused language models, fills this gap by providing AI capabilities that run on smartphones, camera traps, and field devices. The edge AI market is projected to reach $15 billion by 2027, driven by privacy concerns, latency requirements, and connectivity limitations. By specializing ZenLM for conservation workflows, ZenDAO creates AI tools that work where conservationists work—in forests, oceans, and deserts far from data centers.',

    researchAreas: [
      {
        title: 'Edge AI Development',
        description: 'Train and optimize small language models (0.5B-3B parameters) for conservation tasks. Focus on species identification, habitat assessment, and ranger assistance that runs on mobile devices.',
        icon: '📱'
      },
      {
        title: 'Multimodal Integration',
        description: 'Combine vision, audio, and text understanding in unified models. Enable field identification from photos, sounds, and descriptions without specialized expertise.',
        icon: '👁️'
      },
      {
        title: 'Low-Resource Optimization',
        description: 'Quantization, pruning, and distillation techniques to run sophisticated AI on resource-constrained devices. Target inference on smartphones with 4GB RAM.',
        icon: '⚡'
      },
      {
        title: 'Conservation-Specific Training',
        description: 'Curate datasets of wildlife images, sounds, and field reports. Fine-tune models on conservation-specific tasks rather than general-purpose benchmarks.',
        icon: '🎯'
      }
    ],

    tokenomics: {
      distribution: [
        { label: 'Model Training', percentage: 45, color: '#667eea' },
        { label: 'Field Deployment', percentage: 25, color: '#764ba2' },
        { label: 'Dataset Curation', percentage: 15, color: '#f093fb' },
        { label: 'Open Source Development', percentage: 10, color: '#4facfe' },
        { label: 'Treasury Reserve', percentage: 5, color: '#00f2fe' }
      ],
      utility: [
        'Early access to ZenLM model releases',
        'Vote on model capabilities and training priorities',
        'Commercial licensing revenue share',
        'Priority support for field deployments',
        'Contribute training data and earn rewards'
      ]
    },

    team: [
      {
        name: 'Hanzo AI Research',
        role: 'AI Development Partner',
        bio: 'Frontier AI company building foundational models. Provides infrastructure, training expertise, and model optimization for ZenLM conservation models.'
      },
      {
        name: 'Dr. Sara Beery',
        role: 'Conservation AI Advisor',
        bio: 'MIT computer scientist specializing in machine learning for wildlife monitoring. Pioneer of camera trap image analysis and citizen science AI integration.'
      },
      {
        name: 'Wildlife Conservation Network',
        role: 'Field Testing Partner',
        bio: 'Global network of conservationists testing ZenLM in real-world conditions. Provide feedback, edge cases, and deployment insights from 30+ countries.'
      }
    ],

    roadmap: [
      {
        date: '2024 Q1',
        title: 'ZenLM 0.5B Release',
        status: 'completed',
        description: 'Launched first ZenLM model focused on species identification. Runs on smartphones, achieves 89% accuracy on 1,000 common species.'
      },
      {
        date: '2024 Q2',
        title: 'Multimodal Capabilities',
        status: 'completed',
        description: 'Added image and audio understanding to ZenLM 1B. Unified model handles photos, sounds, and text descriptions for field identification.'
      },
      {
        date: '2024 Q3',
        title: 'Field Pilot Programs',
        status: 'in-progress',
        description: 'Deploying ZenLM to 10 conservation organizations across Africa, Asia, and Latin America. Collecting real-world performance data and feedback.'
      },
      {
        date: '2024 Q4',
        title: 'Ranger Assistant Features',
        status: 'upcoming',
        description: 'Train ZenLM on ranger workflows—patrol planning, threat assessment, incident reporting. Create AI copilot for conservation field work.'
      },
      {
        date: '2025 Q1',
        title: 'ZenLM 3B Release',
        status: 'upcoming',
        description: 'Launch larger model with advanced reasoning capabilities. Enable complex conservation planning and decision support on edge devices.'
      }
    ],

    valueCaptureModel: 'ZenDAO creates value by making conservation AI accessible where it\'s needed most—in the field. While large cloud-based models require connectivity and impose latency, ZenLM runs locally on devices rangers already carry. This enables real-time species identification, instant threat assessment, and immediate decision support without internet dependence. Token holders capture value through commercial licensing to conservation tech companies, government agencies, and ecotourism operators who deploy ZenLM at scale. The open-source core ensures broad conservation impact while premium features (custom training, priority support, enterprise deployment) generate revenue. As edge AI becomes critical for field conservation, ZenLM\'s specialization creates defensible moats—conservation-specific training data, field-tested optimization, and tight integration with conservation workflows. Token value accrues through adoption metrics (deployments, inference requests) and the growing recognition that effective conservation requires AI that works offline.',

    resources: [
      {
        title: 'Edge AI for Wildlife Conservation',
        url: 'https://arxiv.org/conservation-edge-ai',
        type: 'paper'
      },
      {
        title: 'ZenLM Model Architecture and Training',
        url: 'https://github.com/zoo-labs/zenlm',
        type: 'report'
      },
      {
        title: 'Field Deployment: ZenLM in African Wildlife Reserves',
        url: 'https://www.youtube.com/watch?v=zenlm-africa',
        type: 'video'
      },
      {
        title: 'Small Language Models: The Future of Edge AI',
        url: 'https://www.technologyreview.com/small-language-models/',
        type: 'article'
      }
    ],

    news: [
      {
        title: 'ZenLM AI Powers New Conservation Tools',
        description: 'ZenDAO announces breakthrough in edge AI for wildlife monitoring. New ZenLM 1B model achieves 94% accuracy in species identification while running entirely on smartphones without internet connectivity.',
        date: '2025-01-15',
        url: 'https://zenlm.org/blog/conservation-ai',
        type: 'research'
      },
      {
        title: 'Field Deployment Milestone: 10 Conservation Partners',
        description: 'ZenLM edge AI models now deployed with 10 conservation organizations across Africa, Asia, and Latin America. Rangers report 70% faster species identification in the field.',
        date: '2024-12-20',
        url: 'https://zenlm.org/blog/field-deployment-2024',
        type: 'milestone'
      },
      {
        title: 'Multimodal AI Update: Vision + Audio Integration',
        description: 'ZenLM 1B now supports unified image and audio understanding for field identification. Single model handles photos, sounds, and text descriptions without specialized expertise.',
        date: '2024-11-10',
        url: 'https://zenlm.org/blog/multimodal-update',
        type: 'update'
      }
    ],

    researchArtifacts: [
      {
        title: 'ZenLM 1B Model Weights & Training Data',
        description: 'Complete model weights for ZenLM 1B multimodal conservation AI. Includes training datasets (wildlife images, audio recordings, field reports) and fine-tuning scripts.',
        date: '2025-01-15',
        zipUrl: 'https://zips.zoo.ngo/zen-dao/zenlm-1b-2025.zip',
        size: '4.2 GB',
        format: 'Model weights (PyTorch/ONNX), Training data (images/audio), Scripts (Python)',
        doi: '10.5281/zenodo.zenlm.2025.001'
      },
      {
        title: 'Species Identification Benchmark Dataset',
        description: 'Curated dataset of 100,000+ labeled wildlife images and audio recordings covering 1,000 species. Includes field validation data from 10 conservation sites.',
        date: '2024-12-20',
        zipUrl: 'https://zips.zoo.ngo/zen-dao/species-benchmark-2024.zip',
        size: '3.8 GB',
        format: 'Images (JPEG), Audio (WAV/MP3), Labels (JSON), Metadata (CSV)',
        doi: '10.5281/zenodo.zenlm.2024.005'
      },
      {
        title: 'Edge AI Deployment Package',
        description: 'Optimized models and deployment tools for running ZenLM on mobile devices. Includes quantized models, inference code, and field deployment guide.',
        date: '2024-11-10',
        zipUrl: 'https://zips.zoo.ngo/zen-dao/edge-deployment-2024.zip',
        size: '680 MB',
        format: 'Quantized models (ONNX/TFLite), Mobile apps (APK/IPA), Docs (PDF)',
        doi: '10.5281/zenodo.zenlm.2024.003'
      }
    ]
  }
]

export function getDAO(id: string): DAO | undefined {
  return daos.find(dao => dao.id === id)
}

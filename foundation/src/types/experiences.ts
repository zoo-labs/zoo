export type Continent = 'Africa' | 'Asia' | 'Europe' | 'North America' | 'Oceania' | 'South America';

export type WildlifeType = 'Big Cats' | 'Mountain Goats' | 'Primates' | 'Elephants' | 'Marine Life' | 'Birds' | 'General Wildlife';

export type VolunteerTask = 'Food Preparation' | 'Habitat Maintenance' | 'Animal Rehabilitation' | 'Research' | 'Education' | 'Conservation';

export type Experience = {
  id: string;
  title: string;
  location: {
    city: string;
    country: string;
    continent: Continent;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  description: string;
  overview: string;
  wildlifeTypes: WildlifeType[];
  volunteerTasks: VolunteerTask[];
  ethicalConsiderations: string;
  requirements: string[];
  pricing: {
    amount: number;
    currency: string;
    period: string;
  };
  duration: {
    minWeeks: number;
    maxWeeks?: number;
  };
  impact: string;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
};

export type FilterOptions = {
  continent?: Continent[];
  country?: string[];
  wildlifeTypes?: WildlifeType[];
  volunteerTasks?: VolunteerTask[];
  duration?: {
    min?: number;
    max?: number;
  };
  accessible?: boolean;
};
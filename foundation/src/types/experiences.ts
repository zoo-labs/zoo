export type Continent = string;

export type WildlifeType = string;

export type VolunteerTask = string;

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
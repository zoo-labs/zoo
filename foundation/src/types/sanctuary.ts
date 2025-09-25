export interface Sanctuary {
  id: string;
  name: string;
  slug: string;
  description: string;
  owner_id: string;
  location: {
    address: string;
    city: string;
    state?: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  images: string[];
  logo?: string;
  established_year?: number;
  certifications?: string[];
  wildlife_types: string[];
  facilities: string[];
  team_size: number;
  languages_spoken: string[];
  verified: boolean;
  status: 'pending' | 'active' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface SanctuaryHost {
  id: string;
  user_id: string;
  sanctuary_id: string;
  role: 'owner' | 'manager' | 'staff';
  permissions: string[];
  created_at: string;
}

export interface SanctuaryStats {
  total_experiences: number;
  active_experiences: number;
  total_bookings: number;
  upcoming_bookings: number;
  total_revenue: number;
  average_rating: number;
  total_reviews: number;
}

export interface SanctuaryOnboarding {
  current_step: number;
  completed_steps: string[];
  basic_info: boolean;
  location_info: boolean;
  wildlife_info: boolean;
  facilities_info: boolean;
  team_info: boolean;
  verification_docs: boolean;
  payment_setup: boolean;
}

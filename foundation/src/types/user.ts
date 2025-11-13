export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  role: 'volunteer' | 'sanctuary_host' | 'admin';
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface VolunteerProfile extends User {
  date_of_birth?: string;
  nationality?: string;
  languages: string[];
  emergency_contact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  dietary_restrictions?: string[];
  medical_conditions?: string[];
  skills?: string[];
  interests?: string[];
  previous_experience?: string;
  total_bookings: number;
  total_volunteer_hours: number;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  role: 'volunteer' | 'sanctuary_host';
}

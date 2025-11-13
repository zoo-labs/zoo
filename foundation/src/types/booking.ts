export interface Booking {
  id: string;
  experience_id: string;
  volunteer_id: string;
  sanctuary_id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  start_date: string;
  end_date: string;
  duration_weeks: number;
  total_amount: number;
  currency: string;
  payment_status: 'pending' | 'paid' | 'refunded' | 'partial_refund';
  payment_method?: string;
  special_requests?: string;
  dietary_requirements?: string[];
  emergency_contact: {
    name: string;
    phone: string;
    email: string;
    relationship: string;
  };
  arrival_details?: {
    flight_number?: string;
    arrival_time?: string;
    pickup_required: boolean;
  };
  cancellation_reason?: string;
  cancellation_date?: string;
  created_at: string;
  updated_at: string;
}

export interface BookingMessage {
  id: string;
  booking_id: string;
  sender_id: string;
  sender_type: 'volunteer' | 'sanctuary';
  message: string;
  attachments?: string[];
  read: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  experience_id: string;
  volunteer_id: string;
  sanctuary_id: string;
  rating: number;
  title: string;
  comment: string;
  aspects: {
    accommodation: number;
    food: number;
    staff: number;
    activities: number;
    value_for_money: number;
  };
  photos?: string[];
  sanctuary_response?: string;
  sanctuary_response_date?: string;
  verified_booking: boolean;
  created_at: string;
  updated_at: string;
}

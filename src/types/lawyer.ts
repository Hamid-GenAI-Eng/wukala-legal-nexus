
export interface LawyerProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  specializations: string[];
  experience: number;
  location: string;
  barCouncilNumber: string;
  education: string;
  description: string;
  rating: number;
  totalCases: number;
  hourlyRate: number;
  availability: 'available' | 'busy' | 'unavailable';
  profileImage?: string;
  verified: boolean;
}

export interface LawyerSearchFilters {
  specialization?: string;
  location?: string;
  experience?: number;
  rating?: number;
  maxRate?: number;
}

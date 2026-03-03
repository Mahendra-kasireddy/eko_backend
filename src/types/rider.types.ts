export type VehicleType = 'bike' | 'cycle' | 'scooter';
export type RiderTier = 'bronze' | 'silver' | 'gold';

export interface Rider {
  id: string;
  name: string;
  phone: string;
  countryCode?: string;
  email?: string;
  vehicleType: VehicleType;
  vehicleNumber: string;
  tier: RiderTier;
  isOnline: boolean;
  rating: number;
  totalDeliveries: number;
  joinedAt: string;
  profilePhoto?: string;
  city: string;
}

export interface RiderStats {
  todayDeliveries: number;
  todayPlasticKg: number;
  todayEarnings: number;
  monthlyPlasticKg: number;
  monthlyDeliveries: number;
}

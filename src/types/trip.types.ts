export type TripType = 'eko_delivery' | 'public_ride';
export type TripStatus =
  | 'assigned'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  coordinates: Coordinates;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  phone: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface PlasticCollection {
  id: string;
  tripId: string;
  weightKg: number;
  bagCount: number;
  collectedAt: string;
  submittedAt?: string;
  storeId: string;
  status: 'collected' | 'submitted';
  customerRedeemPoints: number;
}

export interface Trip {
  id: string;
  type: TripType;
  status: TripStatus;
  customer: Customer;
  store: Store;
  items: OrderItem[];
  plasticCollection?: PlasticCollection;
  totalAmount: number;
  deliveryFee: number;
  distance: number;
  estimatedDuration: number;
  createdAt: string;
  updatedAt: string;
}

export interface RideRequest {
  id: string;
  type: TripType;
  customer: Customer;
  pickup: Coordinates;
  dropoff: Coordinates;
  fare: number;
  distance: number;
  estimatedDuration: number;
  expiresInSeconds: number;
}

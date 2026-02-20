import {Trip, RideRequest} from '../types/trip.types';

export const fetchActiveTrip = async (): Promise<Trip | null> => {
  await new Promise<void>(resolve => setTimeout(resolve, 800));
  return {
    id: 'trip_001',
    type: 'eko_delivery',
    status: 'assigned',
    customer: {
      id: 'cust_001',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      address: 'Plot 42, Jubilee Hills, Hyderabad - 500033',
      coordinates: {latitude: 17.4317, longitude: 78.4087},
    },
    store: {
      id: 'store_001',
      name: 'EKO Green Store - Banjara Hills',
      address: 'Road No. 12, Banjara Hills, Hyderabad - 500034',
      coordinates: {latitude: 17.4239, longitude: 78.4483},
      phone: '+91 40 6789 0123',
    },
    items: [
      {id: 'item_001', name: 'Organic Spinach', quantity: 2, unit: 'bunch', price: 40},
      {id: 'item_002', name: 'Farm Tomatoes', quantity: 1, unit: 'kg', price: 60},
      {id: 'item_003', name: 'Coconut Oil (Cold Pressed)', quantity: 1, unit: 'bottle', price: 280},
    ],
    totalAmount: 380,
    deliveryFee: 30,
    distance: 3.2,
    estimatedDuration: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const fetchTripHistory = async (): Promise<Trip[]> => {
  await new Promise<void>(resolve => setTimeout(resolve, 600));
  return [];
};

export const updateTripStatus = async (
  tripId: string,
  status: Trip['status'],
): Promise<{success: boolean}> => {
  await new Promise<void>(resolve => setTimeout(resolve, 500));
  console.log('Trip status updated:', tripId, status);
  return {success: true};
};

export const fetchMockRideRequest = async (): Promise<RideRequest> => {
  await new Promise<void>(resolve => setTimeout(resolve, 500));
  return {
    id: 'ride_req_001',
    type: 'public_ride',
    customer: {
      id: 'cust_002',
      name: 'Kiran Reddy',
      phone: '+91 90123 45678',
      address: 'Madhapur, Hyderabad',
      coordinates: {latitude: 17.4481, longitude: 78.3915},
    },
    pickup: {latitude: 17.4481, longitude: 78.3915},
    dropoff: {latitude: 17.3850, longitude: 78.4867},
    fare: 85,
    distance: 7.4,
    estimatedDuration: 24,
    expiresInSeconds: 15,
  };
};

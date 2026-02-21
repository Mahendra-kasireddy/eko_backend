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
  const now = new Date();
  return [
    {
      id: 'trip_h001',
      type: 'eko_delivery',
      status: 'completed',
      customer: {
        id: 'cust_h001',
        name: 'Sneha Patel',
        phone: '+91 98001 12345',
        address: 'Plot 22, Madhapur, Hyderabad - 500081',
        coordinates: {latitude: 17.4481, longitude: 78.3915},
      },
      store: {
        id: 'store_001',
        name: 'EKO Green Store - Banjara Hills',
        address: 'Road No. 12, Banjara Hills, Hyderabad - 500034',
        coordinates: {latitude: 17.4239, longitude: 78.4483},
        phone: '+91 40 6789 0123',
      },
      items: [
        {id: 'i_h001', name: 'Organic Milk', quantity: 1, unit: 'L', price: 60},
        {id: 'i_h002', name: 'Paneer', quantity: 1, unit: '200g', price: 90},
      ],
      totalAmount: 150,
      deliveryFee: 28,
      distance: 2.1,
      estimatedDuration: 12,
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 90 * 60 * 1000).toISOString(),
    },
    {
      id: 'trip_h002',
      type: 'eko_delivery',
      status: 'completed',
      customer: {
        id: 'cust_h002',
        name: 'Rajesh Nair',
        phone: '+91 97700 22233',
        address: 'Gachibowli, Hyderabad - 500032',
        coordinates: {latitude: 17.4401, longitude: 78.3489},
      },
      store: {
        id: 'store_002',
        name: 'EKO Green Store - Jubilee Hills',
        address: 'Road No. 36, Jubilee Hills, Hyderabad',
        coordinates: {latitude: 17.4317, longitude: 78.4087},
        phone: '+91 40 7890 1234',
      },
      items: [
        {id: 'i_h003', name: 'Fresh Vegetables Pack', quantity: 1, unit: 'kg', price: 120},
      ],
      totalAmount: 120,
      deliveryFee: 25,
      distance: 3.6,
      estimatedDuration: 20,
      createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'trip_h003',
      type: 'eko_delivery',
      status: 'completed',
      customer: {
        id: 'cust_h003',
        name: 'Divya Menon',
        phone: '+91 99887 76655',
        address: 'Kondapur, Hyderabad - 500084',
        coordinates: {latitude: 17.4609, longitude: 78.3536},
      },
      store: {
        id: 'store_001',
        name: 'EKO Green Store - Banjara Hills',
        address: 'Road No. 12, Banjara Hills, Hyderabad - 500034',
        coordinates: {latitude: 17.4239, longitude: 78.4483},
        phone: '+91 40 6789 0123',
      },
      items: [
        {id: 'i_h004', name: 'Coconut Oil', quantity: 1, unit: 'bottle', price: 280},
        {id: 'i_h005', name: 'Toor Dal', quantity: 1, unit: 'kg', price: 130},
      ],
      totalAmount: 410,
      deliveryFee: 32,
      distance: 4.2,
      estimatedDuration: 22,
      createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 23 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

export const simulateNewOrderAssignment = async (): Promise<Trip> => {
  await new Promise<void>(resolve => setTimeout(resolve, 8000));
  return {
    id: `trip_${Date.now()}`,
    type: 'eko_delivery',
    status: 'assigned',
    customer: {
      id: 'cust_new',
      name: 'Amit Kumar',
      phone: '+91 91234 56789',
      address: 'Flat 8B, Kondapur, Hyderabad - 500084',
      coordinates: {latitude: 17.4609, longitude: 78.3536},
    },
    store: {
      id: 'store_001',
      name: 'EKO Green Store - Banjara Hills',
      address: 'Road No. 12, Banjara Hills, Hyderabad - 500034',
      coordinates: {latitude: 17.4239, longitude: 78.4483},
      phone: '+91 40 6789 0123',
    },
    items: [
      {id: 'item_n01', name: 'Fresh Milk (1L)', quantity: 2, unit: 'pack', price: 56},
      {id: 'item_n02', name: 'Whole Wheat Bread', quantity: 1, unit: 'loaf', price: 45},
      {id: 'item_n03', name: 'Greek Yogurt', quantity: 1, unit: '400g', price: 80},
    ],
    totalAmount: 237,
    deliveryFee: 35,
    distance: 4.8,
    estimatedDuration: 22,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const submitPlasticCollection = async (
  tripId: string,
  weightKg: number,
): Promise<{success: boolean}> => {
  await new Promise<void>(resolve => setTimeout(resolve, 400));
  console.log('Plastic collection submitted:', tripId, weightKg, 'kg');
  return {success: true};
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

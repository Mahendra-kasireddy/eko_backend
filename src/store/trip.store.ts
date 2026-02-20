import {create} from 'zustand';
import {Trip, RideRequest} from '../types/trip.types';

interface TripState {
  activeTrip: Trip | null;
  tripHistory: Trip[];
  pendingRideRequest: RideRequest | null;
  setActiveTrip: (trip: Trip | null) => void;
  setTripHistory: (trips: Trip[]) => void;
  setPendingRideRequest: (request: RideRequest | null) => void;
  updateTripStatus: (status: Trip['status']) => void;
}

export const useTripStore = create<TripState>(set => ({
  activeTrip: null,
  tripHistory: [],
  pendingRideRequest: null,
  setActiveTrip: (trip: Trip | null) => set({activeTrip: trip}),
  setTripHistory: (trips: Trip[]) => set({tripHistory: trips}),
  setPendingRideRequest: (request: RideRequest | null) =>
    set({pendingRideRequest: request}),
  updateTripStatus: (status: Trip['status']) =>
    set(state => ({
      activeTrip: state.activeTrip
        ? {...state.activeTrip, status, updatedAt: new Date().toISOString()}
        : null,
    })),
}));

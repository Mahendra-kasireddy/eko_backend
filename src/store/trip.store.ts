import {create} from 'zustand';
import {Trip, RideRequest} from '../types/trip.types';

interface TripState {
  activeTrip: Trip | null;
  tripHistory: Trip[];
  pendingRideRequest: RideRequest | null;
  pendingTrip: Trip | null;
  setActiveTrip: (trip: Trip | null) => void;
  setTripHistory: (trips: Trip[]) => void;
  setPendingRideRequest: (request: RideRequest | null) => void;
  setPendingTrip: (trip: Trip | null) => void;
  updateTripStatus: (status: Trip['status']) => void;
  completeTrip: () => void;
}

export const useTripStore = create<TripState>(set => ({
  activeTrip: null,
  tripHistory: [],
  pendingRideRequest: null,
  pendingTrip: null,
  setActiveTrip: (trip: Trip | null) => set({activeTrip: trip}),
  setTripHistory: (trips: Trip[]) => set({tripHistory: trips}),
  setPendingRideRequest: (request: RideRequest | null) =>
    set({pendingRideRequest: request}),
  setPendingTrip: (trip: Trip | null) => set({pendingTrip: trip}),
  updateTripStatus: (status: Trip['status']) =>
    set(state => ({
      activeTrip: state.activeTrip
        ? {...state.activeTrip, status, updatedAt: new Date().toISOString()}
        : null,
    })),
  completeTrip: () =>
    set(state => ({
      tripHistory: state.activeTrip
        ? [
            {
              ...state.activeTrip,
              status: 'completed' as Trip['status'],
              updatedAt: new Date().toISOString(),
            },
            ...state.tripHistory,
          ]
        : state.tripHistory,
      activeTrip: null,
    })),
}));

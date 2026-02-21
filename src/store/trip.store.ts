import {create} from 'zustand';
import {Trip, RideRequest, PlasticCollection} from '../types/trip.types';

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
  setPlasticCollection: (collection: PlasticCollection) => void;
  markPlasticSubmitted: (tripId: string) => void;
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
  setPlasticCollection: (collection: PlasticCollection) =>
    set(state => ({
      activeTrip: state.activeTrip
        ? {...state.activeTrip, plasticCollection: collection}
        : null,
    })),
  markPlasticSubmitted: (tripId: string) =>
    set(state => ({
      tripHistory: state.tripHistory.map(trip =>
        trip.id === tripId && trip.plasticCollection
          ? {
              ...trip,
              plasticCollection: {
                ...trip.plasticCollection,
                status: 'submitted' as const,
                submittedAt: new Date().toISOString(),
              },
            }
          : trip,
      ),
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

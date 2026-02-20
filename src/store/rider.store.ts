import {create} from 'zustand';
import {Rider, RiderStats} from '../types/rider.types';

interface RiderState {
  rider: Rider | null;
  stats: RiderStats | null;
  isAuthenticated: boolean;
  isOnline: boolean;
  setRider: (rider: Rider) => void;
  setStats: (stats: RiderStats) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  toggleOnlineStatus: () => void;
  clearRider: () => void;
}

export const useRiderStore = create<RiderState>(set => ({
  rider: null,
  stats: null,
  isAuthenticated: false,
  isOnline: false,
  setRider: (rider: Rider) => set({rider, isAuthenticated: true, isOnline: rider.isOnline}),
  setStats: (stats: RiderStats) => set({stats}),
  setOnlineStatus: (isOnline: boolean) =>
    set(state => ({
      isOnline,
      rider: state.rider ? {...state.rider, isOnline} : null,
    })),
  toggleOnlineStatus: () =>
    set(state => ({
      isOnline: !state.isOnline,
      rider: state.rider ? {...state.rider, isOnline: !state.isOnline} : null,
    })),
  clearRider: () => set({rider: null, isAuthenticated: false, isOnline: false}),
}));

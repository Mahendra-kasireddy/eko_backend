import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Rider} from '../types/rider.types';

const RIDER_KEY = '@eko_rider_profile';

export const RiderStorage = {
  setRider: (rider: Rider) => AsyncStorage.setItem(RIDER_KEY, JSON.stringify(rider)),
  getRider: async (): Promise<Rider | null> => {
    const raw = await AsyncStorage.getItem(RIDER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Rider;
    } catch {
      return null;
    }
  },
  removeRider: () => AsyncStorage.removeItem(RIDER_KEY),
};

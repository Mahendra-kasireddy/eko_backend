import {RiderStats} from '../../types/rider.types';
import {Trip} from '../../types/trip.types';
import {fetchActiveTrip} from '../../services/trip.service';

export const fetchHomeStats = async (): Promise<RiderStats> => {
  await new Promise<void>(resolve => setTimeout(resolve, 400));
  return {
    todayDeliveries: 7,
    todayPlasticKg: 2.4,
    todayEarnings: 620,
    monthlyPlasticKg: 18.4,
    monthlyDeliveries: 124,
  };
};

export const fetchHomeTripData = async (): Promise<Trip | null> =>
  fetchActiveTrip();

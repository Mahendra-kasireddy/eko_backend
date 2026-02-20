import {useTripStore} from '../../../store/trip.store';

export const useTripsData = () => {
  const activeTrip = useTripStore(s => s.activeTrip);
  const updateTripStatus = useTripStore(s => s.updateTripStatus);
  return {activeTrip, updateTripStatus};
};

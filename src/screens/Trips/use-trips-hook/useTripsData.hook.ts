import {useEffect} from 'react';
import {useTripStore} from '../../../store/trip.store';
import {fetchTripHistory} from '../../../services/trip.service';

export const useTripsData = () => {
  const activeTrip = useTripStore(s => s.activeTrip);
  const tripHistory = useTripStore(s => s.tripHistory);
  const updateTripStatus = useTripStore(s => s.updateTripStatus);
  const setTripHistory = useTripStore(s => s.setTripHistory);

  // Load history from service on mount (merges with any in-memory completed trips)
  useEffect(() => {
    if (tripHistory.length === 0) {
      fetchTripHistory().then(trips => {
        setTripHistory(trips);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {activeTrip, tripHistory, updateTripStatus};
};

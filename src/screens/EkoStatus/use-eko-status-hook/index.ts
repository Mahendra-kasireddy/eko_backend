import {useRiderStore} from '../../../store/rider.store';
import {useTripStore} from '../../../store/trip.store';
import {useTripsActions} from '../../Trips/use-trips-hook/useTripsActions.hook';

export const useEkoStatusHook = () => {
  const isOnline = useRiderStore(s => s.isOnline);
  const toggleOnlineStatus = useRiderStore(s => s.toggleOnlineStatus);
  const activeTrip = useTripStore(s => s.activeTrip);
  const tripHistory = useTripStore(s => s.tripHistory);
  const updateTripStatus = useTripStore(s => s.updateTripStatus);
  const {
    handleTripAction,
    collectPlasticAndDeliver,
    submitPlasticToStore,
    callCustomer,
    callStore,
    actionLoading,
  } = useTripsActions(activeTrip, updateTripStatus);

  const pendingPlasticTrips = tripHistory.filter(
    t => t.plasticCollection && t.plasticCollection.status === 'collected',
  );

  const pendingPlasticKg = pendingPlasticTrips.reduce(
    (sum, t) => sum + (t.plasticCollection?.weightKg ?? 0),
    0,
  );

  const submitAllPendingPlastic = async () => {
    for (const trip of pendingPlasticTrips) {
      await submitPlasticToStore(trip.id);
    }
  };

  return {
    isOnline,
    toggleOnlineStatus,
    activeTrip,
    actionLoading,
    handleTripAction,
    collectPlasticAndDeliver,
    callCustomer,
    callStore,
    pendingPlasticTrips,
    pendingPlasticKg,
    submitAllPendingPlastic,
  };
};

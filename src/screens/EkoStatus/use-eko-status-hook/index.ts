import {useRiderStore} from '../../../store/rider.store';
import {useTripStore} from '../../../store/trip.store';
import {useTripsActions} from '../../Trips/use-trips-hook/useTripsActions.hook';

export const useEkoStatusHook = () => {
  const isOnline = useRiderStore(s => s.isOnline);
  const toggleOnlineStatus = useRiderStore(s => s.toggleOnlineStatus);
  const activeTrip = useTripStore(s => s.activeTrip);
  const updateTripStatus = useTripStore(s => s.updateTripStatus);
  const {
    handleTripAction,
    collectPlasticAndDeliver,
    callCustomer,
    callStore,
    actionLoading,
  } = useTripsActions(activeTrip, updateTripStatus);

  return {
    isOnline,
    toggleOnlineStatus,
    activeTrip,
    actionLoading,
    handleTripAction,
    collectPlasticAndDeliver,
    callCustomer,
    callStore,
  };
};

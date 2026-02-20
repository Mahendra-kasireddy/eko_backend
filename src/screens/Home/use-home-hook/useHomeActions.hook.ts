import {useEffect, useRef} from 'react';
import {useRiderStore} from '../../../store/rider.store';
import {useTripStore} from '../../../store/trip.store';
import {simulateNewOrderAssignment} from '../../../services/trip.service';
import {Trip} from '../../../types/trip.types';

export const useHomeActions = () => {
  const isOnline = useRiderStore(s => s.isOnline);
  const toggleOnlineStatus = useRiderStore(s => s.toggleOnlineStatus);
  const pendingTrip = useTripStore(s => s.pendingTrip);
  const setPendingTrip = useTripStore(s => s.setPendingTrip);
  const setActiveTrip = useTripStore(s => s.setActiveTrip);
  const activeTrip = useTripStore(s => s.activeTrip);
  const isFetching = useRef(false);

  const handleToggleOnline = () => toggleOnlineStatus();

  // When rider goes online + no active/pending trip → simulate order assignment
  useEffect(() => {
    if (!isOnline || activeTrip || pendingTrip || isFetching.current) {
      return;
    }
    isFetching.current = true;
    let cancelled = false;

    simulateNewOrderAssignment()
      .then(trip => {
        if (!cancelled && isOnline) {
          setPendingTrip(trip);
        }
      })
      .catch(() => {})
      .finally(() => {
        isFetching.current = false;
      });

    return () => {
      cancelled = true;
      isFetching.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, !!activeTrip, !!pendingTrip]);

  const handleAcceptOrder = (trip: Trip) => {
    setPendingTrip(null);
    setActiveTrip(trip);
  };

  const handleDeclineOrder = () => {
    setPendingTrip(null);
  };

  return {
    isOnline,
    handleToggleOnline,
    pendingTrip,
    handleAcceptOrder,
    handleDeclineOrder,
  };
};

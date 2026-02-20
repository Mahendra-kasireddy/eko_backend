import {useState} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {Trip} from '../../../types/trip.types';
import {updateTripStatus as apiUpdateTrip} from '../../../services/trip.service';
import {useTripStore} from '../../../store/trip.store';

export const useTripsActions = (
  activeTrip: Trip | null,
  updateTripStatus: (status: Trip['status']) => void,
) => {
  const [actionLoading, setActionLoading] = useState(false);
  const completeTrip = useTripStore(s => s.completeTrip);

  const handleTripAction = async () => {
    if (!activeTrip) return;
    const next: Record<Trip['status'], Trip['status'] | null> = {
      assigned: 'picked_up',
      picked_up: 'in_transit',
      in_transit: 'delivered',
      delivered: 'completed',
      completed: null,
      cancelled: null,
    };
    const nextStatus = next[activeTrip.status];
    if (!nextStatus) return;
    setActionLoading(true);
    try {
      await apiUpdateTrip(activeTrip.id, nextStatus);
      // When delivered → move trip to history and clear activeTrip
      if (nextStatus === 'delivered') {
        completeTrip();
      } else {
        updateTripStatus(nextStatus);
      }
      // After "Mark as Picked Up" → auto-navigate to customer
      if (nextStatus === 'in_transit') {
        const {latitude, longitude} = activeTrip.customer.coordinates;
        if (Platform.OS === 'ios') {
          Linking.openURL(`maps://?daddr=${latitude},${longitude}&dirflg=d`).catch(
            () => Linking.openURL(`https://maps.google.com/?daddr=${latitude},${longitude}`),
          );
        } else {
          Linking.openURL(`google.navigation:q=${latitude},${longitude}&mode=d`).catch(
            () => Linking.openURL(`https://maps.google.com/?daddr=${latitude},${longitude}`),
          );
        }
      }
    } catch {
      Alert.alert('Error', 'Failed to update trip status');
    } finally {
      setActionLoading(false);
    }
  };

  const callCustomer = () => {
    if (activeTrip?.customer.phone) {
      Linking.openURL(`tel:${activeTrip.customer.phone}`);
    }
  };

  const callStore = () => {
    if (activeTrip?.store.phone) {
      Linking.openURL(`tel:${activeTrip.store.phone}`);
    }
  };

  return {handleTripAction, callCustomer, callStore, actionLoading};
};

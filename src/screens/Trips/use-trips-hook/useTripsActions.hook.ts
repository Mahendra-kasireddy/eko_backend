import {useState} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {Trip, PlasticCollection} from '../../../types/trip.types';
import {
  updateTripStatus as apiUpdateTrip,
  submitPlasticCollection,
} from '../../../services/trip.service';
import {useTripStore} from '../../../store/trip.store';

const PLASTIC_INCENTIVE_PER_KG = 5; // ₹5 per kg for rider
const PLASTIC_POINTS_PER_KG = 10; // 10 points per kg for customer

export const useTripsActions = (
  activeTrip: Trip | null,
  updateTripStatus: (status: Trip['status']) => void,
) => {
  const [actionLoading, setActionLoading] = useState(false);
  const completeTrip = useTripStore(s => s.completeTrip);
  const setPlasticCollection = useTripStore(s => s.setPlasticCollection);

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
      if (nextStatus === 'delivered') {
        completeTrip();
      } else {
        updateTripStatus(nextStatus);
      }
      // After "Mark as Picked Up" → auto-navigate to customer
      if (nextStatus === 'in_transit') {
        const {latitude, longitude} = activeTrip.customer.coordinates;
        if (Platform.OS === 'ios') {
          Linking.openURL(
            `maps://?daddr=${latitude},${longitude}&dirflg=d`,
          ).catch(() =>
            Linking.openURL(
              `https://maps.google.com/?daddr=${latitude},${longitude}`,
            ),
          );
        } else {
          Linking.openURL(
            `google.navigation:q=${latitude},${longitude}&mode=d`,
          ).catch(() =>
            Linking.openURL(
              `https://maps.google.com/?daddr=${latitude},${longitude}`,
            ),
          );
        }
      }
    } catch {
      Alert.alert('Error', 'Failed to update trip status');
    } finally {
      setActionLoading(false);
    }
  };

  // Called after rider enters plastic weight at customer location
  const collectPlasticAndDeliver = async (weightKg: number) => {
    if (!activeTrip) return;
    setActionLoading(true);
    try {
      const collection: PlasticCollection = {
        id: `plastic_${Date.now()}`,
        tripId: activeTrip.id,
        weightKg,
        bagCount: weightKg > 0 ? Math.ceil(weightKg / 2) : 0,
        collectedAt: new Date().toISOString(),
        storeId: activeTrip.store.id,
        status: 'collected',
        customerRedeemPoints: Math.round(weightKg * PLASTIC_POINTS_PER_KG),
      };
      await submitPlasticCollection(activeTrip.id, weightKg);
      setPlasticCollection(collection);
      await apiUpdateTrip(activeTrip.id, 'delivered');
      completeTrip();
    } catch {
      Alert.alert('Error', 'Failed to collect plastic. Please try again.');
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

  return {
    handleTripAction,
    collectPlasticAndDeliver,
    callCustomer,
    callStore,
    actionLoading,
    PLASTIC_INCENTIVE_PER_KG,
    PLASTIC_POINTS_PER_KG,
  };
};

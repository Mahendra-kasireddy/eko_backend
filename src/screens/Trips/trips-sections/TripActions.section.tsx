import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {styles} from '../Trips.styles';
import {TRIPS_STRINGS} from '../Trips.constants';
import {Trip} from '../../../types/trip.types';
import {Colors} from '../../../constants/colors';

interface TripActionsSectionProps {
  trip: Trip;
  actionLoading: boolean;
  onTripAction: () => void;
  onCollectPlastic: () => void;
  onCallCustomer: () => void;
  onCallStore: () => void;
}

const ACTION_LABELS: Partial<Record<Trip['status'], string>> = {
  assigned: TRIPS_STRINGS.START_TRIP,
  picked_up: TRIPS_STRINGS.PICKED_UP,
  in_transit: TRIPS_STRINGS.DELIVERED,
  delivered: TRIPS_STRINGS.DELIVERED,
};

const TripActionsSection: React.FC<TripActionsSectionProps> = ({
  trip,
  actionLoading,
  onTripAction,
  onCollectPlastic,
  onCallCustomer,
  onCallStore,
}) => {
  const actionLabel = ACTION_LABELS[trip.status] ?? 'View';
  const showCollectPlastic = trip.status === 'in_transit' || trip.status === 'delivered';

  return (
    <View style={styles.actionSection}>
      <TouchableOpacity style={styles.primaryAction} onPress={onTripAction} disabled={actionLoading}>
        {actionLoading ? (
          <ActivityIndicator color={Colors.text.inverse} />
        ) : (
          <Text style={styles.primaryActionText}>{actionLabel}</Text>
        )}
      </TouchableOpacity>
      {showCollectPlastic && (
        <TouchableOpacity style={styles.plasticAction} onPress={onCollectPlastic}>
          <Text style={styles.plasticActionText}>{TRIPS_STRINGS.COLLECT_PLASTIC}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.callRow}>
        <TouchableOpacity style={styles.callBtn} onPress={onCallCustomer}>
          <Text style={styles.callBtnText}>📞 {TRIPS_STRINGS.CALL_CUSTOMER}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callBtn} onPress={onCallStore}>
          <Text style={styles.callBtnText}>🏪 {TRIPS_STRINGS.CALL_STORE}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TripActionsSection;

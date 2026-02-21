import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../EkoStatus.styles';
import {Colors} from '../../../constants/colors';
import {Trip} from '../../../types/trip.types';
import TripMapSection from '../../Trips/trips-sections/TripMap.section';
import TripDetailsSection from '../../Trips/trips-sections/TripDetails.section';
import TripActionsSection from '../../Trips/trips-sections/TripActions.section';

interface EkoOnlineSectionProps {
  activeTrip: Trip | null;
  actionLoading: boolean;
  handleTripAction: () => void;
  collectPlasticAndDeliver: (weightKg: number) => void;
  callCustomer: () => void;
  callStore: () => void;
  onGoOffline: () => void;
  pendingPlasticTrips: Trip[];
  pendingPlasticKg: number;
  submitAllPendingPlastic: () => void;
}

// ── Pending plastic batch submit card ─────────────────────────
const PendingPlasticCard: React.FC<{
  tripCount: number;
  totalKg: number;
  onSubmit: () => void;
  loading: boolean;
}> = ({tripCount, totalKg, onSubmit, loading}) => (
  <View style={styles.plasticPendingCard}>
    <View style={styles.plasticPendingHeader}>
      <View style={styles.plasticPendingIconBg}>
        <Ionicons name="leaf" size={18} color="#34D399" />
      </View>
      <Text style={styles.plasticPendingTitle} numberOfLines={1}>
        Plastic to Submit
      </Text>
      <View style={styles.plasticPendingBadge}>
        <Text style={styles.plasticPendingBadgeText}>
          {tripCount} {tripCount === 1 ? 'trip' : 'trips'}
        </Text>
      </View>
    </View>

    <View style={styles.plasticStatsRow}>
      <View style={styles.plasticStatItem}>
        <Text style={styles.plasticStatValue}>{totalKg.toFixed(1)} kg</Text>
        <Text style={styles.plasticStatLabel}>Collected</Text>
      </View>
      <View style={styles.plasticStatDivider} />
      <View style={styles.plasticStatItem}>
        <Text style={styles.plasticStatValue}>₹{(totalKg * 5).toFixed(0)}</Text>
        <Text style={styles.plasticStatLabel}>Incentive</Text>
      </View>
      <View style={styles.plasticStatDivider} />
      <View style={styles.plasticStatItem}>
        <Text style={styles.plasticStatValue}>{tripCount}</Text>
        <Text style={styles.plasticStatLabel}>Orders</Text>
      </View>
    </View>

    <TouchableOpacity
      style={styles.submitPlasticBtn}
      onPress={onSubmit}
      disabled={loading}
      activeOpacity={0.8}>
      <Ionicons name="storefront-outline" size={18} color="#fff" />
      <Text style={styles.submitPlasticBtnText}>
        {loading ? 'Submitting...' : 'Submit All to Store'}
      </Text>
    </TouchableOpacity>
  </View>
);

// ── Radar pulse — no active trip ──────────────────────────────
const WaitingState: React.FC<{
  onGoOffline: () => void;
  pendingPlasticTrips: Trip[];
  pendingPlasticKg: number;
  submitAllPendingPlastic: () => void;
}> = ({onGoOffline, pendingPlasticTrips, pendingPlasticKg, submitAllPendingPlastic}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.7,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {toValue: 1, duration: 0, useNativeDriver: true}),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [scale, opacity]);

  return (
    <ScrollView
      contentContainerStyle={styles.waitingContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.pulseWrapper}>
        <Animated.View
          style={[styles.pulseRing, {transform: [{scale}], opacity}]}
        />
        <View style={styles.onlineIconBg}>
          <Ionicons name="radio" size={40} color={Colors.primary} />
        </View>
      </View>
      <Text style={styles.onlineTitle}>You are Eko Online</Text>
      <Text style={styles.onlineSubtitle}>Waiting for new orders...</Text>

      {pendingPlasticTrips.length > 0 && (
        <PendingPlasticCard
          tripCount={pendingPlasticTrips.length}
          totalKg={pendingPlasticKg}
          onSubmit={submitAllPendingPlastic}
          loading={false}
        />
      )}

      <TouchableOpacity
        style={styles.goOfflineBtn}
        onPress={onGoOffline}
        activeOpacity={0.8}>
        <Ionicons name="power-outline" size={16} color="#475569" />
        <Text style={styles.goOfflineBtnText}>Go Eko Offline</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// ── Full active delivery view ─────────────────────────────────
const EkoOnlineSection: React.FC<EkoOnlineSectionProps> = ({
  activeTrip,
  actionLoading,
  handleTripAction,
  collectPlasticAndDeliver,
  callCustomer,
  callStore,
  onGoOffline,
  pendingPlasticTrips,
  pendingPlasticKg,
  submitAllPendingPlastic,
}) => {
  if (!activeTrip) {
    return (
      <WaitingState
        onGoOffline={onGoOffline}
        pendingPlasticTrips={pendingPlasticTrips}
        pendingPlasticKg={pendingPlasticKg}
        submitAllPendingPlastic={submitAllPendingPlastic}
      />
    );
  }

  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <TripMapSection trip={activeTrip} />
      <TripDetailsSection trip={activeTrip} />
      <TripActionsSection
        trip={activeTrip}
        actionLoading={actionLoading}
        onTripAction={handleTripAction}
        onCollectPlasticAndDeliver={collectPlasticAndDeliver}
        onCallCustomer={callCustomer}
        onCallStore={callStore}
      />
    </ScrollView>
  );
};

export default EkoOnlineSection;

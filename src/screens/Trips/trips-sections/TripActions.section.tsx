import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {styles} from '../Trips.styles';
import {TRIPS_STRINGS} from '../Trips.constants';
import {Trip} from '../../../types/trip.types';
import {Colors} from '../../../constants/colors';

const PLASTIC_INCENTIVE_PER_KG = 5; // ₹ per kg
const PLASTIC_POINTS_PER_KG = 10;   // points per kg

interface TripActionsSectionProps {
  trip: Trip;
  actionLoading: boolean;
  onTripAction: () => void;
  onCollectPlasticAndDeliver: (weightKg: number) => void;
  onCallCustomer: () => void;
  onCallStore: () => void;
}

// ── Mandatory plastic collection form shown when in_transit ────
const PlasticCollectionCard: React.FC<{
  customerName: string;
  actionLoading: boolean;
  onSubmit: (weightKg: number) => void;
}> = ({customerName, actionLoading, onSubmit}) => {
  const [weightStr, setWeightStr] = useState('');
  const [noPlastic, setNoPlastic] = useState(false);

  const weightKg = noPlastic ? 0 : parseFloat(weightStr) || 0;
  const isReady = noPlastic || (weightStr.trim() !== '' && parseFloat(weightStr) >= 0);
  const riderEarns = (weightKg * PLASTIC_INCENTIVE_PER_KG).toFixed(2);
  const customerPoints = Math.round(weightKg * PLASTIC_POINTS_PER_KG);

  const handleToggleNoPlastic = () => {
    setNoPlastic(v => !v);
    setWeightStr('');
  };

  return (
    <View style={styles.plasticCard}>
      {/* Header */}
      <View style={styles.plasticCardHeader}>
        <Text style={{fontSize: 28}}>♻️</Text>
        <View style={styles.plasticCardHeaderText}>
          <Text style={styles.plasticCardTitle}>Collect Plastic</Text>
          <Text style={styles.plasticCardSubtitle}>
            Collect from {customerName} before delivering
          </Text>
        </View>
      </View>

      {/* Weight input */}
      <View style={styles.weightRow}>
        <TextInput
          style={styles.weightInput}
          value={noPlastic ? '0' : weightStr}
          onChangeText={setWeightStr}
          keyboardType="decimal-pad"
          placeholder="0.0"
          placeholderTextColor={Colors.text.muted}
          editable={!noPlastic}
          maxLength={5}
        />
        <Text style={styles.weightUnit}>kg</Text>
      </View>

      {/* No plastic toggle */}
      <TouchableOpacity
        style={styles.noPlasticRow}
        onPress={handleToggleNoPlastic}
        activeOpacity={0.7}>
        <View
          style={[
            styles.noPlasticCheckbox,
            noPlastic && styles.noPlasticCheckboxActive,
          ]}>
          {noPlastic && <Text style={{color: '#fff', fontSize: 13}}>✓</Text>}
        </View>
        <Text style={styles.noPlasticLabel}>
          Customer has no plastic to give
        </Text>
      </TouchableOpacity>

      {/* Incentive preview */}
      <View style={styles.incentiveRow}>
        <View style={styles.incentiveItem}>
          <Text style={styles.incentiveValue}>₹{riderEarns}</Text>
          <Text style={styles.incentiveLabel}>Your incentive</Text>
        </View>
        <View style={styles.incentiveDivider} />
        <View style={styles.incentiveItem}>
          <Text style={styles.incentiveValue}>{customerPoints}</Text>
          <Text style={styles.incentiveLabel}>Customer points</Text>
        </View>
        <View style={styles.incentiveDivider} />
        <View style={styles.incentiveItem}>
          <Text style={styles.incentiveValue}>{weightKg.toFixed(1)}</Text>
          <Text style={styles.incentiveLabel}>kg collected</Text>
        </View>
      </View>

      {/* Collect & Deliver button */}
      <TouchableOpacity
        style={[styles.collectBtn, (!isReady || actionLoading) && styles.collectBtnDisabled]}
        onPress={() => isReady && !actionLoading && onSubmit(weightKg)}
        disabled={!isReady || actionLoading}
        activeOpacity={0.85}>
        {actionLoading ? (
          <ActivityIndicator color={Colors.text.inverse} />
        ) : (
          <>
            <Text style={{fontSize: 18}}>♻️</Text>
            <Text style={styles.collectBtnText}>Collect & Mark Delivered</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

// ── Main action labels for other statuses ─────────────────────
const ACTION_LABELS: Partial<Record<Trip['status'], string>> = {
  assigned: TRIPS_STRINGS.START_TRIP,
  picked_up: TRIPS_STRINGS.PICKED_UP,
  delivered: TRIPS_STRINGS.DELIVERED,
};

const TripActionsSection: React.FC<TripActionsSectionProps> = ({
  trip,
  actionLoading,
  onTripAction,
  onCollectPlasticAndDeliver,
  onCallCustomer,
  onCallStore,
}) => {
  // in_transit → mandatory plastic collection (no direct Mark as Delivered)
  if (trip.status === 'in_transit') {
    return (
      <View style={styles.actionSection}>
        <PlasticCollectionCard
          customerName={trip.customer.name}
          actionLoading={actionLoading}
          onSubmit={onCollectPlasticAndDeliver}
        />
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
  }

  const actionLabel = ACTION_LABELS[trip.status] ?? 'Update';

  return (
    <View style={styles.actionSection}>
      <TouchableOpacity
        style={styles.primaryAction}
        onPress={onTripAction}
        disabled={actionLoading}>
        {actionLoading ? (
          <ActivityIndicator color={Colors.text.inverse} />
        ) : (
          <Text style={styles.primaryActionText}>{actionLabel}</Text>
        )}
      </TouchableOpacity>
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

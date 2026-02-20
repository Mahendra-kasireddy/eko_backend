import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../Home.styles';
import {HOME_STRINGS} from '../Home.constants';
import {Trip} from '../../../types/trip.types';
import {formatDistance} from '../../../utils/formatters';

interface HomeActiveOrderSectionProps {
  activeTrip: Trip | null;
  isOnline: boolean;
  onViewOrder: () => void;
}

const HomeActiveOrderSection: React.FC<HomeActiveOrderSectionProps> = ({
  activeTrip,
  isOnline,
  onViewOrder,
}) => (
  <View style={styles.activeSection}>
    <Text style={styles.sectionTitle}>{HOME_STRINGS.ACTIVE_ORDER}</Text>
    {activeTrip ? (
      <View style={styles.activeCard}>
        {/* Live indicator */}
        <View style={styles.activePulse}>
          <View style={styles.activeDot} />
          <Text style={styles.activePulseText}>Live Order</Text>
          <View style={styles.distancePill}>
            <Text style={styles.distanceText}>{formatDistance(activeTrip.distance)}</Text>
          </View>
        </View>

        {/* Type tag */}
        <View style={styles.activeCardHeader}>
          <View style={styles.orderTypeTag}>
            <Text style={styles.orderTypeText}>
              {activeTrip.type === 'eko_delivery' ? '📦 EKO Delivery' : '🛵 Ride'}
            </Text>
          </View>
        </View>

        {/* Customer */}
        <View style={styles.customerRow}>
          <Text style={styles.customerIcon}>👤</Text>
          <Text style={styles.customerName}>{activeTrip.customer.name}</Text>
        </View>
        <Text style={styles.customerAddress}>{activeTrip.customer.address}</Text>

        <TouchableOpacity style={styles.viewOrderBtn} onPress={onViewOrder} activeOpacity={0.85}>
          <Text style={styles.viewOrderText}>{HOME_STRINGS.VIEW_ORDER}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyEmoji}>{isOnline ? '📦' : '😴'}</Text>
        <Text style={styles.emptyTitle}>{HOME_STRINGS.NO_ACTIVE_ORDER}</Text>
        <Text style={styles.emptySubtitle}>
          {!isOnline ? HOME_STRINGS.GO_ONLINE_TO_RECEIVE : 'Waiting for new orders...'}
        </Text>
      </View>
    )}
  </View>
);

export default HomeActiveOrderSection;

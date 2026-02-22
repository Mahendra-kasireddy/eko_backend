import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../Home.styles';
import {Trip} from '../../../types/trip.types';
import {formatDistance} from '../../../utils/formatters';
import {useTranslation} from '../../../i18n';

interface HomeActiveOrderSectionProps {
  activeTrip: Trip | null;
  isOnline: boolean;
  onViewOrder: () => void;
}

const HomeActiveOrderSection: React.FC<HomeActiveOrderSectionProps> = ({activeTrip, isOnline, onViewOrder}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.activeSection}>
      <Text style={styles.sectionTitle}>{t('home.active_order')}</Text>
      {activeTrip ? (
        <View style={styles.activeCard}>
          <View style={styles.activePulse}>
            <View style={styles.activeDot} />
            <Text style={styles.activePulseText}>{t('order.live_order')}</Text>
            <View style={styles.distancePill}>
              <Text style={styles.distanceText}>{formatDistance(activeTrip.distance)}</Text>
            </View>
          </View>
          <View style={styles.activeCardHeader}>
            <View style={styles.orderTypeTag}>
              <Text style={styles.orderTypeText}>
                {activeTrip.type === 'eko_delivery' ? `📦 ${t('order.eko_delivery')}` : `🛵 ${t('order.ride')}`}
              </Text>
            </View>
          </View>
          <View style={styles.customerRow}>
            <Text style={styles.customerIcon}>👤</Text>
            <Text style={styles.customerName}>{activeTrip.customer.name}</Text>
          </View>
          <Text style={styles.customerAddress}>{activeTrip.customer.address}</Text>
          <TouchableOpacity style={styles.viewOrderBtn} onPress={onViewOrder} activeOpacity={0.85}>
            <Text style={styles.viewOrderText}>{t('home.view_order')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>{isOnline ? '📦' : '😴'}</Text>
          <Text style={styles.emptyTitle}>{t('home.no_active_order')}</Text>
          <Text style={styles.emptySubtitle}>
            {!isOnline ? t('home.go_online_hint') : t('home.waiting_orders')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default HomeActiveOrderSection;

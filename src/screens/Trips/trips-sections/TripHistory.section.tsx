import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';
import {FontSize, FontWeight} from '../../../constants/fonts';
import {Trip} from '../../../types/trip.types';
import {useTranslation} from '../../../i18n';

interface TripHistorySectionProps {
  trips: Trip[];
}

const TripHistorySection: React.FC<TripHistorySectionProps> = ({trips}) => {
  const {t} = useTranslation();

  const formatTime = (iso: string): string => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffH < 1) {
      const diffM = Math.floor(diffMs / (1000 * 60));
      return t('trips.m_ago', {min: diffM});
    }
    if (diffH < 24) { return t('trips.h_ago', {h: diffH}); }
    const diffD = Math.floor(diffH / 24);
    return diffD === 1 ? t('trips.yesterday') : t('trips.days_ago', {days: diffD});
  };

  if (trips.length === 0) {
    return (
      <View style={s.empty}>
        <Text style={s.emptyEmoji}>📦</Text>
        <Text style={s.emptyTitle}>{t('trips.no_trips')}</Text>
        <Text style={s.emptySubtitle}>{t('trips.no_trips_hint')}</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      {trips.map(trip => (
        <View key={trip.id} style={s.card}>
          {/* Top row: customer + time */}
          <View style={s.cardHeader}>
            <View style={s.customerBadge}>
              <Text style={s.customerInitial}>
                {trip.customer.name.charAt(0)}
              </Text>
            </View>
            <View style={s.headerInfo}>
              <Text style={s.customerName}>{trip.customer.name}</Text>
              <Text style={s.timeAgo}>{formatTime(trip.updatedAt)}</Text>
            </View>
            <View style={s.completedBadge}>
              <Text style={s.completedText}>{t('trips.done')}</Text>
            </View>
          </View>

          {/* Address */}
          <View style={s.addrRow}>
            <Text style={s.addrIcon}>📍</Text>
            <Text style={s.addrText} numberOfLines={1}>
              {trip.customer.address.split(',')[0]}
            </Text>
          </View>

          {/* Stats row */}
          <View style={s.statsRow}>
            <View style={s.stat}>
              <Text style={s.statValue}>₹{trip.deliveryFee}</Text>
              <Text style={s.statLabel}>{t('trips.earned')}</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statValue}>{trip.distance} km</Text>
              <Text style={s.statLabel}>{t('trips.distance')}</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statValue}>{trip.items.length}</Text>
              <Text style={s.statLabel}>{t('trips.items')}</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statValue}>₹{trip.totalAmount}</Text>
              <Text style={s.statLabel}>{t('trips.order')}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const s = StyleSheet.create({
  container: {padding: 16, paddingBottom: 110},
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  emptyEmoji: {fontSize: 56, marginBottom: 16, opacity: 0.7},
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  customerBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerInitial: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.extraBold,
    color: Colors.primary,
  },
  headerInfo: {flex: 1},
  customerName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
  },
  timeAgo: {
    fontSize: FontSize.xs,
    color: Colors.text.muted,
    marginTop: 1,
  },
  completedBadge: {
    backgroundColor: Colors.accent + '18',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  completedText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.accent,
  },
  addrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  addrIcon: {fontSize: 13},
  addrText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
  },
  stat: {flex: 1, alignItems: 'center'},
  statValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.primary,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.borderLight,
  },
});

export default TripHistorySection;

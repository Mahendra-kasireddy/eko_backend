import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../Home.styles';
import {HOME_STRINGS} from '../Home.constants';
import {Rider, RiderStats} from '../../../types/rider.types';
import {Colors} from '../../../constants/colors';
import {formatCurrency} from '../../../utils/formatters';

interface HomeHeaderSectionProps {
  rider: Rider | null;
  stats?: RiderStats | null;
  isOnline: boolean;
  onToggle: () => void;
}

const TIER_COLORS: Record<string, string> = {
  bronze: Colors.bronze,
  silver: Colors.silver,
  gold: Colors.gold,
};

const TIER_EMOJI: Record<string, string> = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
};

const getGreeting = (): string => {
  const h = new Date().getHours();
  if (h < 12) return HOME_STRINGS.GREETING_MORNING;
  if (h < 17) return HOME_STRINGS.GREETING_AFTERNOON;
  return HOME_STRINGS.GREETING_EVENING;
};

const HomeHeaderSection: React.FC<HomeHeaderSectionProps> = ({
  rider,
  stats,
  isOnline,
  onToggle,
}) => (
  <>
    {/* ── White Top Bar ── */}
    <View style={styles.topBar}>
      <View style={styles.topBarRow}>
        <View style={styles.topBarLeft}>
          <Text style={styles.topBarGreeting}>{getGreeting()} 👋</Text>
          <Text style={styles.topBarName}>{rider?.name ?? 'Rider'}</Text>
        </View>
        {rider?.tier && (
          <View
            style={[
              styles.tierBadge,
              {backgroundColor: (TIER_COLORS[rider.tier] ?? Colors.bronze) + '22'},
            ]}>
            <Text>{TIER_EMOJI[rider.tier] ?? '🏅'}</Text>
            <Text
              style={[
                styles.tierText,
                {color: TIER_COLORS[rider.tier] ?? Colors.bronze},
              ]}>
              {rider.tier.toUpperCase()}
            </Text>
          </View>
        )}
      </View>
    </View>

    {/* ── Earnings Hero Card ── */}
    <View style={styles.earningsHero}>
      <Text style={styles.earningsHeroLabel}>Today's Earnings</Text>
      <View style={styles.earningsHeroRow}>
        <Text style={styles.earningsHeroAmount}>
          {formatCurrency(stats?.todayEarnings ?? 0)}
        </Text>
        <View style={styles.earningsHeroRight}>
          <Text style={styles.earningsHeroDeliveries}>
            {stats?.todayDeliveries ?? 0} deliveries
          </Text>
          {rider?.tier && (
            <Text style={styles.earningsHeroTier}>
              {TIER_EMOJI[rider.tier] ?? '🏅'} {rider.tier.toUpperCase()} Rider
            </Text>
          )}
        </View>
      </View>
    </View>

    {/* ── Online / Offline Button (Blinkit style) ── */}
    <View style={styles.onlineBtnWrap}>
      <TouchableOpacity
        style={isOnline ? styles.onlineBtnOnline : styles.onlineBtnOffline}
        onPress={onToggle}
        activeOpacity={0.82}>
        {isOnline && <View style={styles.onlineDot} />}
        <Text
          style={
            isOnline ? styles.onlineBtnTextOnline : styles.onlineBtnTextOffline
          }>
          {isOnline ? HOME_STRINGS.GO_OFFLINE : HOME_STRINGS.GO_ONLINE}
        </Text>
      </TouchableOpacity>
    </View>
  </>
);

export default HomeHeaderSection;

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../Home.styles';
import {HOME_STRINGS} from '../Home.constants';
import {RiderStats} from '../../../types/rider.types';
import {formatCurrency} from '../../../utils/formatters';

interface HomeHeaderSectionProps {
  stats?: RiderStats | null;
  isOnline: boolean;
  onToggle: () => void;
}

const HomeHeaderSection: React.FC<HomeHeaderSectionProps> = ({
  stats,
  isOnline,
  onToggle,
}) => (
  <>
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

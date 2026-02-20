import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Home.styles';
import {HOME_STRINGS} from '../Home.constants';
import {RiderStats} from '../../../types/rider.types';
import {formatWeight} from '../../../utils/formatters';
import {Colors} from '../../../constants/colors';

interface HomeStatsSectionProps {
  stats: RiderStats | null;
}

const HomeStatsSection: React.FC<HomeStatsSectionProps> = ({stats}) => (
  <View style={styles.statsSection}>
    <Text style={styles.statsTitle}>{HOME_STRINGS.TODAY_STATS}</Text>
    <View style={styles.statsRow}>
      <View style={styles.statCard}>
        <View style={[styles.statIconBg, {backgroundColor: Colors.primary + '12'}]}>
          <Text style={styles.statEmoji}>🛵</Text>
        </View>
        <Text style={styles.statValue}>{stats?.todayDeliveries ?? 0}</Text>
        <Text style={styles.statLabel}>{HOME_STRINGS.DELIVERIES}</Text>
      </View>
      <View style={styles.statCard}>
        <View style={[styles.statIconBg, {backgroundColor: Colors.accent + '15'}]}>
          <Text style={styles.statEmoji}>♻️</Text>
        </View>
        <Text style={styles.statValue}>{formatWeight(stats?.todayPlasticKg ?? 0)}</Text>
        <Text style={styles.statLabel}>{HOME_STRINGS.PLASTIC_KG}</Text>
      </View>
      <View style={styles.statCard}>
        <View style={[styles.statIconBg, {backgroundColor: Colors.gold + '20'}]}>
          <Text style={styles.statEmoji}>📦</Text>
        </View>
        <Text style={styles.statValue}>{stats?.monthlyDeliveries ?? 0}</Text>
        <Text style={styles.statLabel}>Monthly</Text>
      </View>
    </View>
  </View>
);

export default HomeStatsSection;

import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Profile.styles';
import {PROFILE_STRINGS} from '../Profile.constants';
import {Rider} from '../../../types/rider.types';
import {RiderStats} from '../../../types/rider.types';

interface ProfileStatsSectionProps {
  rider: Rider | null;
  stats: RiderStats | null;
}

const ProfileStatsSection: React.FC<ProfileStatsSectionProps> = ({rider, stats}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{PROFILE_STRINGS.STATS}</Text>
    <View style={styles.sectionCard}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{rider?.totalDeliveries ?? 0}</Text>
          <Text style={styles.statLabel}>{PROFILE_STRINGS.TOTAL_DELIVERIES}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{rider?.rating?.toFixed(1) ?? '—'}</Text>
          <Text style={styles.statLabel}>⭐ {PROFILE_STRINGS.RATING}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats?.monthlyPlasticKg?.toFixed(1) ?? '0'}</Text>
          <Text style={styles.statLabel}>♻️ {PROFILE_STRINGS.TOTAL_PLASTIC}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default ProfileStatsSection;

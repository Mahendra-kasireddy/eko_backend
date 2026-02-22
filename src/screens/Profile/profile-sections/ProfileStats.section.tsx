import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Profile.styles';
import {Rider} from '../../../types/rider.types';
import {RiderStats} from '../../../types/rider.types';
import {useTranslation} from '../../../i18n';

interface ProfileStatsSectionProps {
  rider: Rider | null;
  stats: RiderStats | null;
}

const ProfileStatsSection: React.FC<ProfileStatsSectionProps> = ({rider, stats}) => {
  const {t} = useTranslation();
  return (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{t('profile.my_stats')}</Text>
    <View style={styles.sectionCard}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{rider?.totalDeliveries ?? 0}</Text>
          <Text style={styles.statLabel}>{t('profile.total_deliveries')}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{rider?.rating?.toFixed(1) ?? '—'}</Text>
          <Text style={styles.statLabel}>⭐ {t('profile.rating')}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats?.monthlyPlasticKg?.toFixed(1) ?? '0'}</Text>
          <Text style={styles.statLabel}>♻️ {t('profile.total_plastic')}</Text>
        </View>
      </View>
    </View>
  </View>
  );
};

export default ProfileStatsSection;

import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Home.styles';
import {RiderStats} from '../../../types/rider.types';
import {formatWeight} from '../../../utils/formatters';
import {Colors} from '../../../constants/colors';
import {useTranslation} from '../../../i18n';

interface HomeStatsSectionProps {
  stats: RiderStats | null;
}

const HomeStatsSection: React.FC<HomeStatsSectionProps> = ({stats}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>{t('home.todays_summary')}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={[styles.statIconBg, {backgroundColor: Colors.primary + '12'}]}>
            <Text style={styles.statEmoji}>🛵</Text>
          </View>
          <Text style={styles.statValue}>{stats?.todayDeliveries ?? 0}</Text>
          <Text style={styles.statLabel}>{t('home.stat_deliveries')}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIconBg, {backgroundColor: Colors.accent + '15'}]}>
            <Text style={styles.statEmoji}>♻️</Text>
          </View>
          <Text style={styles.statValue}>{formatWeight(stats?.todayPlasticKg ?? 0)}</Text>
          <Text style={styles.statLabel}>{t('home.stat_plastic')}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIconBg, {backgroundColor: Colors.gold + '20'}]}>
            <Text style={styles.statEmoji}>📦</Text>
          </View>
          <Text style={styles.statValue}>{stats?.monthlyDeliveries ?? 0}</Text>
          <Text style={styles.statLabel}>{t('home.stat_monthly')}</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeStatsSection;

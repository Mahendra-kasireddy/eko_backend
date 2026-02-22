import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../Home.styles';
import {RiderStats} from '../../../types/rider.types';
import {formatCurrency} from '../../../utils/formatters';
import {useTranslation} from '../../../i18n';

interface HomeHeaderSectionProps {
  stats?: RiderStats | null;
  isOnline: boolean;
  onToggle: () => void;
}

const HomeHeaderSection: React.FC<HomeHeaderSectionProps> = ({stats, isOnline, onToggle}) => {
  const {t} = useTranslation();
  return (
    <>
      {/* ── Earnings Hero Card ── */}
      <View style={styles.earningsHero}>
        <Text style={styles.earningsHeroLabel}>{t('home.todays_earnings')}</Text>
        <View style={styles.earningsHeroRow}>
          <Text style={styles.earningsHeroAmount}>
            {formatCurrency(stats?.todayEarnings ?? 0)}
          </Text>
          <View style={styles.earningsHeroRight}>
            <Text style={styles.earningsHeroDeliveries}>
              {stats?.todayDeliveries ?? 0} {t('home.deliveries')}
            </Text>
          </View>
        </View>
      </View>

      {/* ── Online / Offline Button ── */}
      <View style={styles.onlineBtnWrap}>
        <TouchableOpacity
          style={isOnline ? styles.onlineBtnOnline : styles.onlineBtnOffline}
          onPress={onToggle}
          activeOpacity={0.82}>
          {isOnline && <View style={styles.onlineDot} />}
          <Text style={isOnline ? styles.onlineBtnTextOnline : styles.onlineBtnTextOffline}>
            {isOnline ? t('home.go_offline') : t('home.go_online')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeHeaderSection;

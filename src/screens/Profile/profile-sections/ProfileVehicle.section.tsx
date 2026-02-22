import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Profile.styles';
import {Rider} from '../../../types/rider.types';
import {formatDate} from '../../../utils/formatters';
import {useTranslation} from '../../../i18n';

interface ProfileVehicleSectionProps {
  rider: Rider | null;
}

const VEHICLE_EMOJIS: Record<string, string> = {
  bike: '🏍️',
  scooter: '🛵',
  cycle: '🚴',
};

const ProfileVehicleSection: React.FC<ProfileVehicleSectionProps> = ({rider}) => {
  const {t} = useTranslation();
  return (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{t('profile.vehicle_details')}</Text>
    <View style={styles.sectionCard}>
      <View style={styles.infoRow}>
        <View style={styles.infoLabel}>
          <Text style={styles.infoEmoji}>{VEHICLE_EMOJIS[rider?.vehicleType ?? 'bike']}</Text>
          <Text style={styles.infoLabelText}>{t('profile.vehicle_type')}</Text>
        </View>
        <Text style={styles.infoValue}>{rider?.vehicleType ?? '—'}</Text>
      </View>
      <View style={styles.infoDivider} />
      <View style={styles.infoRow}>
        <View style={styles.infoLabel}>
          <Text style={styles.infoEmoji}>🔢</Text>
          <Text style={styles.infoLabelText}>{t('profile.vehicle_number')}</Text>
        </View>
        <Text style={styles.infoValue}>{rider?.vehicleNumber ?? '—'}</Text>
      </View>
      <View style={styles.infoDivider} />
      <View style={styles.infoRow}>
        <View style={styles.infoLabel}>
          <Text style={styles.infoEmoji}>📍</Text>
          <Text style={styles.infoLabelText}>{t('profile.city')}</Text>
        </View>
        <Text style={styles.infoValue}>{rider?.city ?? '—'}</Text>
      </View>
      <View style={styles.infoDivider} />
      <View style={styles.infoRow}>
        <View style={styles.infoLabel}>
          <Text style={styles.infoEmoji}>📅</Text>
          <Text style={styles.infoLabelText}>{t('profile.joined')}</Text>
        </View>
        <Text style={styles.infoValue}>{rider?.joinedAt ? formatDate(rider.joinedAt) : '—'}</Text>
      </View>
    </View>
  </View>
  );
};

export default ProfileVehicleSection;

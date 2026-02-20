import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Profile.styles';
import {PROFILE_STRINGS} from '../Profile.constants';
import {Rider} from '../../../types/rider.types';
import {formatDate} from '../../../utils/formatters';

interface ProfileVehicleSectionProps {
  rider: Rider | null;
}

const VEHICLE_EMOJIS: Record<string, string> = {
  bike: '🏍️',
  scooter: '🛵',
  cycle: '🚴',
};

const ProfileVehicleSection: React.FC<ProfileVehicleSectionProps> = ({rider}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{PROFILE_STRINGS.VEHICLE}</Text>
    <View style={styles.sectionCard}>
      <View style={styles.infoRow}>
        <View style={styles.infoLabel}>
          <Text style={styles.infoEmoji}>{VEHICLE_EMOJIS[rider?.vehicleType ?? 'bike']}</Text>
          <Text style={styles.infoLabelText}>{PROFILE_STRINGS.VEHICLE_TYPE}</Text>
        </View>
        <Text style={styles.infoValue}>{rider?.vehicleType ?? '—'}</Text>
      </View>
      <View style={styles.infoDivider} />
      <View style={styles.infoRow}>
        <View style={styles.infoLabel}>
          <Text style={styles.infoEmoji}>🔢</Text>
          <Text style={styles.infoLabelText}>{PROFILE_STRINGS.VEHICLE_NUMBER}</Text>
        </View>
        <Text style={styles.infoValue}>{rider?.vehicleNumber ?? '—'}</Text>
      </View>
      <View style={styles.infoDivider} />
      <View style={styles.infoRow}>
        <View style={styles.infoLabel}>
          <Text style={styles.infoEmoji}>📍</Text>
          <Text style={styles.infoLabelText}>{PROFILE_STRINGS.CITY}</Text>
        </View>
        <Text style={styles.infoValue}>{rider?.city ?? '—'}</Text>
      </View>
      <View style={styles.infoDivider} />
      <View style={styles.infoRow}>
        <View style={styles.infoLabel}>
          <Text style={styles.infoEmoji}>📅</Text>
          <Text style={styles.infoLabelText}>{PROFILE_STRINGS.JOINED}</Text>
        </View>
        <Text style={styles.infoValue}>{rider?.joinedAt ? formatDate(rider.joinedAt) : '—'}</Text>
      </View>
    </View>
  </View>
);

export default ProfileVehicleSection;

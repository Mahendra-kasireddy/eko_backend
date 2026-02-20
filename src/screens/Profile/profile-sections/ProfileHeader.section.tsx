import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Profile.styles';
import {Rider} from '../../../types/rider.types';
import {Colors} from '../../../constants/colors';

interface ProfileHeaderSectionProps {
  rider: Rider | null;
}

const TIER_COLORS = {bronze: Colors.bronze, silver: Colors.silver, gold: Colors.gold};
const TIER_EMOJIS = {bronze: '🥉', silver: '🥈', gold: '🥇'};

const ProfileHeaderSection: React.FC<ProfileHeaderSectionProps> = ({rider}) => (
  <View style={styles.header}>
    <View style={styles.avatarCircle}>
      <Text style={styles.avatarEmoji}>🧑‍💼</Text>
    </View>
    <Text style={styles.riderName}>{rider?.name ?? 'Rider'}</Text>
    <Text style={styles.riderPhone}>+91 {rider?.phone}</Text>
    {rider?.tier && (
      <View style={[styles.tierBadge, {backgroundColor: TIER_COLORS[rider.tier] + '30', marginTop: 10}]}>
        <Text>{TIER_EMOJIS[rider.tier]}</Text>
        <Text style={[styles.tierText, {color: TIER_COLORS[rider.tier]}]}>
          {rider.tier.toUpperCase()} RIDER
        </Text>
      </View>
    )}
  </View>
);

export default ProfileHeaderSection;

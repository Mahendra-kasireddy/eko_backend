import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../Home.styles';
import {HOME_STRINGS} from '../Home.constants';
import {Colors} from '../../../constants/colors';

interface QuickAction {
  emoji: string;
  label: string;
  bg: string;
  onPress: () => void;
}

interface HomeQuickActionsSectionProps {
  goToEarnings: () => void;
  goToTrips: () => void;
  goToTripHistory: () => void;
  goToProfile: () => void;
}

const HomeQuickActionsSection: React.FC<HomeQuickActionsSectionProps> = ({
  goToEarnings,
  goToTrips,
  goToTripHistory,
  goToProfile,
}) => {
  const actions: QuickAction[] = [
    {emoji: '♻️', label: HOME_STRINGS.LOG_PLASTIC, bg: Colors.accent + '15', onPress: goToTrips},
    {emoji: '💰', label: HOME_STRINGS.MY_EARNINGS, bg: Colors.gold + '20', onPress: goToEarnings},
    {emoji: '🗺️', label: HOME_STRINGS.TRIP_HISTORY, bg: Colors.primary + '12', onPress: goToTripHistory},
    {emoji: '👤', label: HOME_STRINGS.LEADERBOARD, bg: Colors.cta + '18', onPress: goToProfile},
  ];

  return (
    <View style={styles.quickSection}>
      <Text style={styles.sectionTitle}>{HOME_STRINGS.QUICK_ACTIONS}</Text>
      <View style={styles.quickGrid}>
        {actions.map(a => (
          <TouchableOpacity
            key={a.label}
            style={styles.quickCard}
            onPress={a.onPress}
            activeOpacity={0.72}>
            <View style={[styles.quickIconBg, {backgroundColor: a.bg}]}>
              <Text style={styles.quickEmoji}>{a.emoji}</Text>
            </View>
            <Text style={styles.quickLabel}>{a.label}</Text>
            <Text style={styles.quickArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeQuickActionsSection;

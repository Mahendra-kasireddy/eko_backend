import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';

interface OnboardingDotsSectionProps {
  total: number;
  currentIndex: number;
}

const OnboardingDotsSection: React.FC<OnboardingDotsSectionProps> = ({
  total,
  currentIndex,
}) => (
  <View style={styles.row}>
    {Array.from({length: total}).map((_, i) => (
      <View
        key={i}
        style={[styles.dot, i === currentIndex ? styles.active : styles.inactive]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'center', gap: 8},
  dot: {height: 8, borderRadius: 4},
  active: {width: 24, backgroundColor: Colors.primary},
  inactive: {width: 8, backgroundColor: Colors.border},
});

export default OnboardingDotsSection;

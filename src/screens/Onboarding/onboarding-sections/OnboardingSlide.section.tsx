import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';
import {FontSize, FontWeight} from '../../../constants/fonts';

interface OnboardingSlideSectionProps {
  emoji: string;
  title: string;
  subtitle: string;
  index?: number;
}

const SLIDE_BG: string[] = ['#DCFCE7', '#D1FAE5', '#FEF9C3'];
const SLIDE_RING: string[] = [Colors.primary + '30', Colors.accent + '30', Colors.warning + '30'];
const SLIDE_ICON_BG: string[] = [Colors.primary, Colors.primaryMid, Colors.warning];

const OnboardingSlideSection: React.FC<OnboardingSlideSectionProps> = ({
  emoji,
  title,
  subtitle,
  index = 0,
}) => {
  const bg = SLIDE_BG[index % SLIDE_BG.length];
  const ring = SLIDE_RING[index % SLIDE_RING.length];
  const iconBg = SLIDE_ICON_BG[index % SLIDE_ICON_BG.length];

  return (
    <View style={[styles.container, {backgroundColor: bg}]}>
      {/* Illustration area */}
      <View style={styles.illustrationArea}>
        <View style={[styles.ring, {borderColor: ring}]}>
          <View style={[styles.iconCircle, {backgroundColor: iconBg}]}>
            <Text style={styles.emoji}>{emoji}</Text>
          </View>
        </View>
      </View>

      {/* Text */}
      <View style={styles.textArea}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  illustrationArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  ring: {
    width: 188,
    height: 188,
    borderRadius: 94,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 152,
    height: 152,
    borderRadius: 76,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {fontSize: 68},
  textArea: {alignItems: 'center'},
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default OnboardingSlideSection;

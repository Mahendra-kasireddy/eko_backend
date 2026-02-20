import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, StatusBar} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';
import {APP} from '../../constants/app.constants';

const SplashComponent: React.FC = () => {
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const taglineY = useRef(new Animated.Value(16)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scale, {toValue: 1, tension: 65, friction: 9, useNativeDriver: true}),
        Animated.timing(opacity, {toValue: 1, duration: 480, useNativeDriver: true}),
      ]),
      Animated.parallel([
        Animated.timing(taglineOpacity, {toValue: 1, duration: 380, useNativeDriver: true}),
        Animated.timing(taglineY, {toValue: 0, duration: 380, useNativeDriver: true}),
      ]),
      Animated.timing(footerOpacity, {toValue: 1, duration: 280, useNativeDriver: true}),
    ]).start();
  }, [scale, opacity, taglineOpacity, taglineY, footerOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <Animated.View style={[styles.logoWrapper, {opacity, transform: [{scale}]}]}>
        <View style={styles.logoBox}>
          <Text style={styles.logoE}>E</Text>
          <Text style={styles.logoK}>K</Text>
          <Text style={styles.logoO}>O</Text>
        </View>
        <Text style={styles.riderLabel}>RIDER</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.taglineWrapper,
          {opacity: taglineOpacity, transform: [{translateY: taglineY}]},
        ]}>
        <Text style={styles.tagline}>{APP.TAGLINE}</Text>
        <View style={styles.taglineDivider} />
      </Animated.View>

      <Animated.View style={[styles.footer, {opacity: footerOpacity}]}>
        <View style={styles.cityRow}>
          <View style={styles.onlineDot} />
          <Text style={styles.cityText}>Hyderabad</Text>
        </View>
        <Text style={styles.versionText}>v{APP.VERSION}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: 'rgba(255,255,255,0.045)',
    top: -110,
    right: -130,
  },
  bgCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.035)',
    bottom: -70,
    left: -90,
  },
  logoWrapper: {alignItems: 'center'},
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 24,
    paddingHorizontal: 36,
    paddingVertical: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  logoE: {
    fontSize: 56,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.inverse,
    letterSpacing: 4,
  },
  logoK: {
    fontSize: 56,
    fontWeight: FontWeight.extraBold,
    color: Colors.cta,
    letterSpacing: 4,
  },
  logoO: {
    fontSize: 56,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.inverse,
    letterSpacing: 4,
  },
  riderLabel: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 9,
    marginTop: 14,
  },
  taglineWrapper: {alignItems: 'center', marginTop: 44},
  tagline: {
    fontSize: FontSize.md,
    color: Colors.cta,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  taglineDivider: {
    width: 36,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 1,
    marginTop: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 52,
    alignItems: 'center',
    gap: 8,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.online,
  },
  cityText: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: FontWeight.medium,
  },
  versionText: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.28)',
  },
});

export default SplashComponent;

import React from 'react';
import {View, Text, Animated} from 'react-native';
import {styles} from '../Login.styles';
import {LOGIN_STRINGS} from '../Login.constants';

interface LoginHeaderSectionProps {
  logoMarginBottom: Animated.Value;
  subtitleOpacity: Animated.Value;
  subtitleMaxHeight: Animated.Value;
}

const LoginHeaderSection: React.FC<LoginHeaderSectionProps> = ({
  logoMarginBottom,
  subtitleOpacity,
  subtitleMaxHeight,
}) => (
  <>
    <Animated.View style={[styles.logoRow, {marginBottom: logoMarginBottom}]}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>EKO</Text>
      </View>
      <Text style={styles.appName}>EKO Rider</Text>
    </Animated.View>
    <Text style={styles.title}>{LOGIN_STRINGS.TITLE}</Text>
    <Animated.View
      style={{opacity: subtitleOpacity, maxHeight: subtitleMaxHeight, overflow: 'hidden'}}>
      <Text style={styles.subtitle}>{LOGIN_STRINGS.SUBTITLE}</Text>
    </Animated.View>
  </>
);

export default LoginHeaderSection;

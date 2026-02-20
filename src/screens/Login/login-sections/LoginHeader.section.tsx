import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Login.styles';
import {LOGIN_STRINGS} from '../Login.constants';

const LoginHeaderSection: React.FC = () => (
  <>
    <View style={styles.logoRow}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>EKO</Text>
      </View>
      <Text style={styles.appName}>EKO Rider</Text>
    </View>
    <Text style={styles.title}>{LOGIN_STRINGS.TITLE}</Text>
    <Text style={styles.subtitle}>{LOGIN_STRINGS.SUBTITLE}</Text>
  </>
);

export default LoginHeaderSection;

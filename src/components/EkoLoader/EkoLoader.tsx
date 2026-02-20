import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize} from '../../constants/fonts';

interface EkoLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

const EkoLoader: React.FC<EkoLoaderProps> = ({
  message,
  fullScreen = false,
}) => (
  <View style={[styles.container, fullScreen && styles.fullScreen]}>
    <ActivityIndicator size="large" color={Colors.primary} />
    {message ? <Text style={styles.message}>{message}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  message: {
    marginTop: 12,
    color: Colors.text.secondary,
    fontSize: FontSize.sm,
  },
});

export default EkoLoader;

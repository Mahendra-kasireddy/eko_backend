import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';

interface EkoStatusBadgeProps {
  isOnline: boolean;
}

const EkoStatusBadge: React.FC<EkoStatusBadgeProps> = ({isOnline}) => (
  <View style={[styles.badge, isOnline ? styles.online : styles.offline]}>
    <View style={[styles.dot, isOnline ? styles.dotOnline : styles.dotOffline]} />
    <Text style={[styles.label, isOnline ? styles.labelOnline : styles.labelOffline]}>
      {isOnline ? 'Online' : 'Offline'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  online: {backgroundColor: '#DCFCE7'},
  offline: {backgroundColor: '#F3F4F6'},
  dot: {width: 7, height: 7, borderRadius: 4, marginRight: 5},
  dotOnline: {backgroundColor: Colors.online},
  dotOffline: {backgroundColor: Colors.offline},
  label: {fontSize: FontSize.xs, fontWeight: FontWeight.semiBold},
  labelOnline: {color: '#15803D'},
  labelOffline: {color: Colors.text.secondary},
});

export default EkoStatusBadge;

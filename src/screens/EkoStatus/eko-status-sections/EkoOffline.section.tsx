import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../EkoStatus.styles';

interface EkoOfflineSectionProps {
  onGoOnline: () => void;
}

const EkoOfflineSection: React.FC<EkoOfflineSectionProps> = ({onGoOnline}) => (
  <View style={styles.offlineContainer}>
    <View style={styles.offlineIconBg}>
      <Ionicons name="power-outline" size={58} color="#9AA4AE" />
    </View>
    <Text style={styles.offlineTitle}>You are Eko Offline</Text>
    <Text style={styles.offlineSubtitle}>
      Go online to start receiving{'\n'}delivery assignments
    </Text>
    <TouchableOpacity
      style={styles.goOnlineBtn}
      onPress={onGoOnline}
      activeOpacity={0.85}>
      <Ionicons name="power" size={20} color="#fff" />
      <Text style={styles.goOnlineBtnText}>Go Eko Online</Text>
    </TouchableOpacity>
  </View>
);

export default EkoOfflineSection;

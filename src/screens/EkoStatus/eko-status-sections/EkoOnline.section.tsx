import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../EkoStatus.styles';
import {Colors} from '../../../constants/colors';

interface EkoOnlineSectionProps {
  onGoOffline: () => void;
}

const EkoOnlineSection: React.FC<EkoOnlineSectionProps> = ({onGoOffline}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.7,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {toValue: 1, duration: 0, useNativeDriver: true}),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [scale, opacity]);

  return (
    <View style={styles.waitingContainer}>
      <View style={styles.pulseWrapper}>
        <Animated.View
          style={[styles.pulseRing, {transform: [{scale}], opacity}]}
        />
        <View style={styles.onlineIconBg}>
          <Ionicons name="radio" size={40} color={Colors.primary} />
        </View>
      </View>
      <Text style={styles.onlineTitle}>You are Eko Online</Text>
      <Text style={styles.onlineSubtitle}>Waiting for new orders...</Text>
      <TouchableOpacity
        style={styles.goOfflineBtn}
        onPress={onGoOffline}
        activeOpacity={0.8}>
        <Ionicons name="power-outline" size={16} color="#475569" />
        <Text style={styles.goOfflineBtnText}>Go Eko Offline</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EkoOnlineSection;

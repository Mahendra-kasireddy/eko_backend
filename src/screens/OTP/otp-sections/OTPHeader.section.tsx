import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from '../OTP.styles';
import {OTP_STRINGS} from '../OTP.constants';

interface OTPHeaderSectionProps {
  phone: string;
  onBack: () => void;
}

const OTPHeaderSection: React.FC<OTPHeaderSectionProps> = ({phone, onBack}) => (
  <>
    <TouchableOpacity style={styles.backBtn} onPress={onBack}>
      <Text style={styles.backText}>← Back</Text>
    </TouchableOpacity>
    <Text style={styles.title}>{OTP_STRINGS.TITLE}</Text>
    <Text style={styles.subtitle}>
      {OTP_STRINGS.SUBTITLE_PREFIX}
      <Text style={styles.phone}>+91 {phone}</Text>
    </Text>
  </>
);

export default OTPHeaderSection;

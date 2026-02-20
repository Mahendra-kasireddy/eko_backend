import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../OTP.styles';
import {OTP_STRINGS} from '../OTP.constants';

interface OTPResendSectionProps {
  canResend: boolean;
  resendTimer: number;
  onResend: () => void;
  onChangeNumber: () => void;
}

const OTPResendSection: React.FC<OTPResendSectionProps> = ({
  canResend,
  resendTimer,
  onResend,
  onChangeNumber,
}) => (
  <View>
    <View style={styles.resendRow}>
      <Text style={styles.resendText}>{OTP_STRINGS.RESEND_PREFIX}</Text>
      {canResend ? (
        <TouchableOpacity onPress={onResend}>
          <Text style={styles.resendLink}>{OTP_STRINGS.RESEND}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.resendDisabled}>
          {OTP_STRINGS.RESEND_TIMER_PREFIX}
          {resendTimer}
          {OTP_STRINGS.RESEND_TIMER_SUFFIX}
        </Text>
      )}
    </View>
    <TouchableOpacity onPress={onChangeNumber}>
      <Text style={styles.changeNumber}>{OTP_STRINGS.CHANGE_NUMBER}</Text>
    </TouchableOpacity>
    <Text style={styles.demoHint}>{OTP_STRINGS.DEMO_HINT}</Text>
  </View>
);

export default OTPResendSection;

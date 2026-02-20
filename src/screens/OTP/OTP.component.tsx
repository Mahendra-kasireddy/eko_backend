import React from 'react';
import {View, StatusBar, KeyboardAvoidingView, Platform} from 'react-native';
import {styles} from './OTP.styles';
import {OTP_STRINGS} from './OTP.constants';
import OTPHeaderSection from './otp-sections/OTPHeader.section';
import OTPInputSection from './otp-sections/OTPInput.section';
import OTPResendSection from './otp-sections/OTPResend.section';
import EkoButton from '../../components/EkoButton/EkoButton';

interface OTPComponentProps {
  phone: string;
  otp: string[];
  focusedIndex: number;
  setFocusedIndex: (i: number) => void;
  loading: boolean;
  error: string;
  resendTimer: number;
  canResend: boolean;
  handleVerify: () => void;
  handleResend: () => void;
  handleBack: () => void;
  handleOTPInput: (v: string, i: number, setFocusedIndex: (i: number) => void) => void;
}

const OTPComponent: React.FC<OTPComponentProps> = props => {
  const otpFilled = props.otp.every(d => d !== '');
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <OTPHeaderSection phone={props.phone} onBack={props.handleBack} />
        <View style={styles.body}>
          <OTPInputSection
            otp={props.otp}
            focusedIndex={props.focusedIndex}
            error={props.error}
            onOTPInput={props.handleOTPInput}
            setFocusedIndex={props.setFocusedIndex}
          />
          <View style={styles.verifyBtn}>
            <EkoButton
              label={OTP_STRINGS.VERIFY}
              onPress={props.handleVerify}
              loading={props.loading}
              disabled={!otpFilled}
            />
          </View>
          <OTPResendSection
            canResend={props.canResend}
            resendTimer={props.resendTimer}
            onResend={props.handleResend}
            onChangeNumber={props.handleBack}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPComponent;

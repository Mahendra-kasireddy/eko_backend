import React, {useRef} from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from '../OTP.styles';

interface OTPInputSectionProps {
  otp: string[];
  focusedIndex: number;
  error: string;
  onOTPInput: (value: string, index: number, focusNext: (i: number) => void) => void;
  setFocusedIndex: (i: number) => void;
}

const OTPInputSection: React.FC<OTPInputSectionProps> = ({
  otp,
  focusedIndex,
  error,
  onOTPInput,
  setFocusedIndex,
}) => {
  const refs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const focusAt = (i: number) => {
    refs[i]?.current?.focus();
    setFocusedIndex(i);
  };

  return (
    <View>
      <View style={styles.otpRow}>
        {otp.map((digit, i) => (
          <View
            key={i}
            style={[
              styles.otpBox,
              focusedIndex === i && styles.otpBoxFocused,
              digit ? styles.otpBoxFilled : null,
            ]}>
            <TextInput
              ref={refs[i]}
              style={styles.otpDigit}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              caretHidden
              selectTextOnFocus
              onFocus={() => setFocusedIndex(i)}
              onChangeText={v => onOTPInput(v, i, focusAt)}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace' && !digit && i > 0) {
                  focusAt(i - 1);
                }
              }}
            />
          </View>
        ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default OTPInputSection;

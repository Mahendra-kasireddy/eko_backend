import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from '../Login.styles';
import {LOGIN_STRINGS} from '../Login.constants';
import EkoButton from '../../../components/EkoButton/EkoButton';

interface LoginFormSectionProps {
  phone: string;
  loading: boolean;
  error: string;
  isFocused: boolean;
  setIsFocused: (v: boolean) => void;
  handlePhoneChange: (v: string) => void;
  handleContinue: () => void;
}

const LoginFormSection: React.FC<LoginFormSectionProps> = ({
  phone,
  loading,
  error,
  isFocused,
  setIsFocused,
  handlePhoneChange,
  handleContinue,
}) => (
  <View style={styles.body}>
    <Text style={styles.label}>Mobile Number</Text>
    <View style={[styles.inputRow, isFocused && styles.inputRowFocused]}>
      <View style={styles.countryCode}>
        <Text style={styles.flagText}>🇮🇳</Text>
        <Text style={styles.countryCodeText}>{LOGIN_STRINGS.COUNTRY_CODE}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder={LOGIN_STRINGS.PHONE_PLACEHOLDER}
        placeholderTextColor="#C4C9D4"
        keyboardType="phone-pad"
        maxLength={10}
        value={phone}
        onChangeText={handlePhoneChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="done"
        onSubmitEditing={handleContinue}
      />
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
    <View style={styles.continueBtn}>
      <EkoButton
        label={LOGIN_STRINGS.CONTINUE}
        onPress={handleContinue}
        loading={loading}
        disabled={phone.length !== 10}
      />
    </View>
    <View style={styles.terms}>
      <Text style={styles.termsText}>{LOGIN_STRINGS.TERMS_PREFIX}</Text>
      <Text style={styles.termsLink}>{LOGIN_STRINGS.TERMS_LINK}</Text>
      <Text style={styles.termsText}>{LOGIN_STRINGS.TERMS_AND}</Text>
      <Text style={styles.termsLink}>{LOGIN_STRINGS.PRIVACY_LINK}</Text>
    </View>
  </View>
);

export default LoginFormSection;

import React from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './Login.styles';
import LoginHeaderSection from './login-sections/LoginHeader.section';
import LoginFormSection from './login-sections/LoginForm.section';

interface LoginComponentProps {
  phone: string;
  loading: boolean;
  error: string;
  isFocused: boolean;
  setIsFocused: (v: boolean) => void;
  handlePhoneChange: (v: string) => void;
  handleContinue: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = props => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Section 1: Green header (stays fixed, never moves) ── */}
      <View style={[styles.headerSection, {paddingTop: insets.top + 28}]}>
        <LoginHeaderSection />
      </View>

      {/* ── Section 2: Form — KAV pushes form up on keyboard,
          but it's bounded below the header so no overlap ── */}
      <KeyboardAvoidingView
        style={styles.formOuter}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={styles.formInner}>
          <LoginFormSection {...props} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginComponent;

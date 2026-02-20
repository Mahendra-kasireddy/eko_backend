import React from 'react';
import {View, StatusBar, KeyboardAvoidingView, Platform} from 'react-native';
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

const LoginComponent: React.FC<LoginComponentProps> = props => (
  <KeyboardAvoidingView
    style={{flex: 1}}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <StatusBar barStyle="light-content" />
    <View style={styles.container}>
      <LoginHeaderSection />
      <LoginFormSection {...props} />
    </View>
  </KeyboardAvoidingView>
);

export default LoginComponent;

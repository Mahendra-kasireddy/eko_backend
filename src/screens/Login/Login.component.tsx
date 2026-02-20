import React, {useRef, useEffect} from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  Easing,
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

const ease = Easing.out(Easing.quad);

const LoginComponent: React.FC<LoginComponentProps> = props => {
  const insets = useSafeAreaInsets();

  // Animated values for header compression when keyboard opens
  const headerPB = useRef(new Animated.Value(52)).current;
  const logoMB = useRef(new Animated.Value(32)).current;
  const subtitleOpacity = useRef(new Animated.Value(1)).current;
  const subtitleMaxH = useRef(new Animated.Value(26)).current;

  useEffect(() => {
    const dur = Platform.OS === 'ios' ? 260 : 200;
    const t = (v: number) => ({toValue: v, duration: dur, easing: ease, useNativeDriver: false as const});
    const tN = (v: number) => ({toValue: v, duration: dur, easing: ease, useNativeDriver: true as const});

    const compress = () =>
      Animated.parallel([
        Animated.timing(headerPB, t(14)),
        Animated.timing(logoMB, t(12)),
        Animated.timing(subtitleOpacity, tN(0)),
        Animated.timing(subtitleMaxH, t(0)),
      ]).start();

    const expand = () =>
      Animated.parallel([
        Animated.timing(headerPB, t(52)),
        Animated.timing(logoMB, t(32)),
        Animated.timing(subtitleOpacity, tN(1)),
        Animated.timing(subtitleMaxH, t(26)),
      ]).start();

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = Keyboard.addListener(showEvent, compress);
    const onHide = Keyboard.addListener(hideEvent, expand);

    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, [headerPB, logoMB, subtitleOpacity, subtitleMaxH]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Section 1: Green header — compresses when keyboard opens */}
      <Animated.View
        style={[styles.headerSection, {paddingTop: insets.top + 28, paddingBottom: headerPB}]}>
        <LoginHeaderSection
          logoMarginBottom={logoMB}
          subtitleOpacity={subtitleOpacity}
          subtitleMaxHeight={subtitleMaxH}
        />
      </Animated.View>

      {/* Section 2: Form — KAV pushes it up, centered in available space */}
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

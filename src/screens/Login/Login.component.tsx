import React, {useRef, useEffect} from 'react';
import {
  View,
  StatusBar,
  Animated,
  Keyboard,
  Platform,
  KeyboardEvent,
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
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = (e: KeyboardEvent) => {
      Animated.spring(slideAnim, {
        toValue: -(e.endCoordinates.height * 0.52),
        useNativeDriver: true,
        damping: 18,
        stiffness: 180,
        mass: 0.8,
      }).start();
    };

    const onHide = () => {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 180,
        mass: 0.8,
      }).start();
    };

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [slideAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Section 1: Green header (pushed down with top inset + extra padding) ── */}
      <View style={[styles.headerSection, {paddingTop: insets.top + 28}]}>
        <LoginHeaderSection />
      </View>

      {/* ── Section 2: Form card — centered in lower half, slides up on keyboard ── */}
      <Animated.View
        style={[styles.formSection, {transform: [{translateY: slideAnim}]}]}>
        <LoginFormSection {...props} />
      </Animated.View>
    </View>
  );
};

export default LoginComponent;

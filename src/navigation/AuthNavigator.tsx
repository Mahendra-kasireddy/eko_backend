import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from './navigation.types';

import SplashContainer from '../screens/Splash/Splash.container';
import OnboardingContainer from '../screens/Onboarding/Onboarding.container';
import LoginContainer from '../screens/Login/Login.container';
import OTPContainer from '../screens/OTP/OTP.container';
import SignupContainer from '../screens/Signup/Signup.container';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Splash" component={SplashContainer} />
    <Stack.Screen name="Onboarding" component={OnboardingContainer} />
    <Stack.Screen name="Login" component={LoginContainer} />
    <Stack.Screen name="OTP" component={OTPContainer} />
    <Stack.Screen name="Signup" component={SignupContainer} />
  </Stack.Navigator>
);

export default AuthNavigator;

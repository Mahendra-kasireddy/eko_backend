import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  OTP: {phone: string};
};

export type MainTabParamList = {
  Home: undefined;
  Trips: undefined;
  Plastic: undefined;
  Earnings: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

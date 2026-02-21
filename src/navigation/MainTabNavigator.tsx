import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MainTabParamList} from './navigation.types';
import {Colors} from '../constants/colors';
import {FontSize, FontWeight} from '../constants/fonts';
import {useRiderStore} from '../store/rider.store';
import {useTripStore} from '../store/trip.store';

// Screens
import HomeContainer from '../screens/Home/Home.container';
import TripsContainer from '../screens/Trips/Trips.container';
import EkoStatusContainer from '../screens/EkoStatus/EkoStatus.container';
import EarningsContainer from '../screens/Earnings/Earnings.container';
import ProfileContainer from '../screens/Profile/Profile.container';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface TabBarProps {
  state: {index: number; routes: {key: string; name: string}[]};
  descriptors: Record<string, {options: {tabBarLabel?: string}}>;
  navigation: {
    emit: (e: {
      type: string;
      target: string;
      canPreventDefault: boolean;
    }) => {defaultPrevented: boolean};
    navigate: (name: string) => void;
  };
}

const TAB_ICONS: Record<string, {active: string; inactive: string}> = {
  Home: {active: 'home', inactive: 'home-outline'},
  Trips: {active: 'bicycle', inactive: 'bicycle-outline'},
  Earnings: {active: 'wallet', inactive: 'wallet-outline'},
  Profile: {active: 'person-circle', inactive: 'person-circle-outline'},
};

const TAB_LABELS: Record<string, string> = {
  Home: 'Home',
  Trips: 'Trips',
  Earnings: 'Earn',
  Profile: 'Profile',
};

const CustomTabBar: React.FC<TabBarProps> = ({state, navigation}) => {
  const isOnline = useRiderStore(s => s.isOnline);
  const pendingTrip = useTripStore(s => s.pendingTrip);

  // Pulse animation — fires when there is an incoming order
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (pendingTrip) {
      pulseAnim.current = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulseScale, {
              toValue: 1.9,
              duration: 900,
              useNativeDriver: true,
            }),
            Animated.timing(pulseScale, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(pulseOpacity, {
              toValue: 0.45,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 0,
              duration: 900,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );
      pulseAnim.current.start();
    } else {
      pulseAnim.current?.stop();
      pulseScale.setValue(1);
      pulseOpacity.setValue(0);
    }
  }, [!!pendingTrip, pulseScale, pulseOpacity]);

  return (
    <View style={tabStyles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const isCenter = route.name === 'EkoStatus';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // ── Center FAB button ──────────────────────────────────────
        if (isCenter) {
          const circleBg = isOnline ? Colors.primary : '#5A6875';

          return (
            <View key={route.key} style={tabStyles.ekoWrapper}>
              {/* Pulse ring — only visible when pendingTrip is set */}
              <Animated.View
                style={[
                  tabStyles.pulseRing,
                  {
                    transform: [{scale: pulseScale}],
                    opacity: pulseOpacity,
                    backgroundColor: Colors.primary,
                  },
                ]}
              />
              <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.82}
                style={[tabStyles.ekoCircle, {backgroundColor: circleBg}]}>
                <Text style={tabStyles.ekoCircleText}>
                  {isOnline ? 'Eko\nOnline' : 'Eko\nOffline'}
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  tabStyles.ekoLabel,
                  {color: isOnline ? Colors.primary : Colors.text.muted},
                ]}>
                {isOnline ? 'Eko Online' : 'Eko Offline'}
              </Text>
            </View>
          );
        }

        // ── Regular tab item ───────────────────────────────────────
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={tabStyles.tabItem}>
            {isFocused && <View style={tabStyles.activeIndicator} />}
            <View
              style={[
                tabStyles.iconWrapper,
                isFocused && tabStyles.iconWrapperActive,
              ]}>
              <Ionicons
                name={
                  isFocused
                    ? TAB_ICONS[route.name]?.active
                    : TAB_ICONS[route.name]?.inactive
                }
                size={22}
                color={isFocused ? Colors.primary : Colors.text.muted}
              />
            </View>
            <Text
              style={[
                tabStyles.label,
                {
                  color: isFocused ? Colors.primary : Colors.text.muted,
                  fontWeight: isFocused ? FontWeight.bold : FontWeight.regular,
                },
              ]}>
              {TAB_LABELS[route.name]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.tabBar,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 4,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 28,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  iconWrapper: {
    width: 36,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 2,
  },
  iconWrapperActive: {
    backgroundColor: Colors.primary + '12',
  },
  label: {fontSize: FontSize.xs, letterSpacing: 0.2},

  // ── Center FAB ────────────────────────────────────────────────
  ekoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ekoLabel: {
    position: 'absolute',
    bottom: 6,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.2,
  },
  pulseRing: {
    position: 'absolute',
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  ekoCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    borderWidth: 3,
    borderColor: Colors.card,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 12,
  },
  ekoCircleText: {
    color: Colors.text.inverse,
    fontSize: 11,
    fontWeight: FontWeight.extraBold,
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 15,
  },
});

const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    tabBar={props => <CustomTabBar {...(props as unknown as TabBarProps)} />}
    screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={HomeContainer} />
    <Tab.Screen name="Trips" component={TripsContainer} />
    <Tab.Screen name="EkoStatus" component={EkoStatusContainer} />
    <Tab.Screen name="Earnings" component={EarningsContainer} />
    <Tab.Screen name="Profile" component={ProfileContainer} />
  </Tab.Navigator>
);

export default MainTabNavigator;

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './navigation.types';
import {Colors} from '../constants/colors';
import {FontSize, FontWeight} from '../constants/fonts';
import {useRiderStore} from '../store/rider.store';

// Screens
import HomeContainer from '../screens/Home/Home.container';
import TripsContainer from '../screens/Trips/Trips.container';
import PlasticContainer from '../screens/Plastic/Plastic.container';
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

const TAB_ICONS: Record<string, string> = {
  Home: '⌂',
  Trips: '⊙',
  Earnings: '₹',
  Profile: '◉',
};

const TAB_LABELS: Record<string, string> = {
  Home: 'Home',
  Trips: 'Trips',
  Earnings: 'Earn',
  Profile: 'Profile',
};

const CustomTabBar: React.FC<TabBarProps> = ({state, navigation}) => {
  const isOnline = useRiderStore(s => s.isOnline);
  const toggleOnlineStatus = useRiderStore(s => s.toggleOnlineStatus);

  return (
    <View style={tabStyles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const isCenter = route.name === 'Plastic';

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

        if (isCenter) {
          return (
            <View key={route.key} style={tabStyles.ekoWrapper}>
              <TouchableOpacity
                onPress={() => {
                  toggleOnlineStatus();
                  onPress();
                }}
                activeOpacity={0.82}
                style={[
                  tabStyles.ekoCircle,
                  {backgroundColor: isOnline ? Colors.primary : '#5A6875'},
                ]}>
                <Text style={tabStyles.ekoTitle}>EKO</Text>
                <View style={tabStyles.ekoStatusRow}>
                  <View
                    style={[
                      tabStyles.ekoDot,
                      {backgroundColor: isOnline ? Colors.online : '#9AA4AE'},
                    ]}
                  />
                  <Text style={tabStyles.ekoStatusText}>
                    {isOnline ? 'Online' : 'Offline'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }

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
              <Text
                style={[
                  tabStyles.icon,
                  {color: isFocused ? Colors.primary : Colors.text.muted},
                ]}>
                {TAB_ICONS[route.name]}
              </Text>
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
  icon: {fontSize: 20},
  label: {fontSize: FontSize.xs, letterSpacing: 0.2},
  ekoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  ekoTitle: {
    color: Colors.text.inverse,
    fontSize: 13,
    fontWeight: FontWeight.extraBold,
    letterSpacing: 1.5,
  },
  ekoStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 3,
  },
  ekoDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  ekoStatusText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 7,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
});

const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    tabBar={props => <CustomTabBar {...(props as unknown as TabBarProps)} />}
    screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={HomeContainer} />
    <Tab.Screen name="Trips" component={TripsContainer} />
    <Tab.Screen name="Plastic" component={PlasticContainer} />
    <Tab.Screen name="Earnings" component={EarningsContainer} />
    <Tab.Screen name="Profile" component={ProfileContainer} />
  </Tab.Navigator>
);

export default MainTabNavigator;

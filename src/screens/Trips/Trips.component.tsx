import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {MainTabParamList} from '../../types/navigation.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './Trips.styles';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import {useStatusBarStyle} from '../../hooks/useStatusBarStyle';
import {Colors} from '../../constants/colors';
import TripMapSection from './trips-sections/TripMap.section';
import TripDetailsSection from './trips-sections/TripDetails.section';
import TripActionsSection from './trips-sections/TripActions.section';
import TripHistorySection from './trips-sections/TripHistory.section';
import {Trip} from '../../types/trip.types';

interface TripsComponentProps {
  activeTrip: Trip | null;
  tripHistory: Trip[];
  actionLoading: boolean;
  handleTripAction: () => void;
  callCustomer: () => void;
  callStore: () => void;
}

type TabKey = 'active' | 'history';

const TripsComponent: React.FC<TripsComponentProps> = props => {
  useStatusBarStyle('dark-content', Colors.card);
  const route = useRoute<RouteProp<MainTabParamList, 'Trips'>>();
  const [activeTab, setActiveTab] = useState<TabKey>('active');

  useEffect(() => {
    if (route.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route.params?.tab]);

  const tabBar = (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'active' && styles.tabActive]}
        onPress={() => setActiveTab('active')}
        activeOpacity={0.7}>
        <View style={styles.tabRow}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.tabTextActive,
            ]}>
            Active Trip
          </Text>
          {props.activeTrip && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>1</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'history' && styles.tabActive]}
        onPress={() => setActiveTab('history')}
        activeOpacity={0.7}>
        <View style={styles.tabRow}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' && styles.tabTextActive,
            ]}>
            Past Orders
          </Text>
          {props.tripHistory.length > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {props.tripHistory.length}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  if (activeTab === 'history') {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />
        <ScreenHeader title="My Trips" />
        {tabBar}
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <TripHistorySection trips={props.tripHistory} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!props.activeTrip) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />
        <ScreenHeader title="My Trips" />
        {tabBar}
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛵</Text>
          <Text style={styles.emptyTitle}>No Active Trip</Text>
          <Text style={styles.emptySubtitle}>
            Go online to receive delivery assignments
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />
      <ScreenHeader title="My Trips" />
      {tabBar}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <TripMapSection trip={props.activeTrip} />
        <TripDetailsSection trip={props.activeTrip} />
        <TripActionsSection
          trip={props.activeTrip}
          actionLoading={props.actionLoading}
          onTripAction={props.handleTripAction}
          onCollectPlastic={() => {}}
          onCallCustomer={props.callCustomer}
          onCallStore={props.callStore}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripsComponent;

import React from 'react';
import {View, Text, ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './Trips.styles';
import {TRIPS_STRINGS} from './Trips.constants';
import TripMapSection from './trips-sections/TripMap.section';
import TripDetailsSection from './trips-sections/TripDetails.section';
import TripActionsSection from './trips-sections/TripActions.section';
import {Trip} from '../../types/trip.types';

interface TripsComponentProps {
  activeTrip: Trip | null;
  actionLoading: boolean;
  handleTripAction: () => void;
  callCustomer: () => void;
  callStore: () => void;
}

const TripsComponent: React.FC<TripsComponentProps> = props => {
  if (!props.activeTrip) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛵</Text>
          <Text style={styles.emptyTitle}>{TRIPS_STRINGS.NO_TRIP_TITLE}</Text>
          <Text style={styles.emptySubtitle}>{TRIPS_STRINGS.NO_TRIP_DESC}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
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

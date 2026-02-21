import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './Trips.styles';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import {useStatusBarStyle} from '../../hooks/useStatusBarStyle';
import {Colors} from '../../constants/colors';
import TripHistorySection from './trips-sections/TripHistory.section';
import {Trip} from '../../types/trip.types';

interface TripsComponentProps {
  tripHistory: Trip[];
}

const TripsComponent: React.FC<TripsComponentProps> = ({tripHistory}) => {
  useStatusBarStyle('dark-content', Colors.card);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />
      <ScreenHeader title="Past Orders" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <TripHistorySection trips={tripHistory} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripsComponent;

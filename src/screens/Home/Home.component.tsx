import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './Home.styles';
import HomeHeaderSection from './home-sections/HomeHeader.section';
import HomeStatsSection from './home-sections/HomeStats.section';
import HomeActiveOrderSection from './home-sections/HomeActiveOrder.section';
import HomeQuickActionsSection from './home-sections/HomeQuickActions.section';
import EkoLoader from '../../components/EkoLoader/EkoLoader';
import {Rider, RiderStats} from '../../types/rider.types';
import {Trip} from '../../types/trip.types';
import {Colors} from '../../constants/colors';

interface HomeComponentProps {
  rider: Rider | null;
  stats: RiderStats | null;
  activeTrip: Trip | null;
  loading: boolean;
  error: string;
  isOnline: boolean;
  handleToggleOnline: () => void;
  goToTrips: () => void;
  goToPlastic: () => void;
  goToEarnings: () => void;
  goToProfile: () => void;
}

const HomeComponent: React.FC<HomeComponentProps> = props => {
  if (props.loading) return <EkoLoader fullScreen message="Loading your dashboard..." />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <HomeHeaderSection
          rider={props.rider}
          stats={props.stats}
          isOnline={props.isOnline}
          onToggle={props.handleToggleOnline}
        />
        <HomeStatsSection stats={props.stats} />
        <HomeActiveOrderSection
          activeTrip={props.activeTrip}
          isOnline={props.isOnline}
          onViewOrder={props.goToTrips}
        />
        <HomeQuickActionsSection
          goToPlastic={props.goToPlastic}
          goToEarnings={props.goToEarnings}
          goToTrips={props.goToTrips}
          goToProfile={props.goToProfile}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeComponent;

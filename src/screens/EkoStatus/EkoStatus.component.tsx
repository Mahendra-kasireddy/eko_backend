import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStatusBarStyle} from '../../hooks/useStatusBarStyle';
import {styles} from './EkoStatus.styles';
import {Colors} from '../../constants/colors';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import EkoOfflineSection from './eko-status-sections/EkoOffline.section';
import EkoOnlineSection from './eko-status-sections/EkoOnline.section';
import {Trip} from '../../types/trip.types';

interface EkoStatusComponentProps {
  isOnline: boolean;
  toggleOnlineStatus: () => void;
  activeTrip: Trip | null;
  actionLoading: boolean;
  handleTripAction: () => void;
  collectPlasticAndDeliver: (weightKg: number) => void;
  callCustomer: () => void;
  callStore: () => void;
}

const EkoStatusComponent: React.FC<EkoStatusComponentProps> = ({
  isOnline,
  toggleOnlineStatus,
  activeTrip,
  actionLoading,
  handleTripAction,
  collectPlasticAndDeliver,
  callCustomer,
  callStore,
}) => {
  useStatusBarStyle('dark-content', Colors.card);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />
      <ScreenHeader title={isOnline ? 'Eko Online' : 'Eko Offline'} />

      {isOnline ? (
        <EkoOnlineSection
          activeTrip={activeTrip}
          actionLoading={actionLoading}
          handleTripAction={handleTripAction}
          collectPlasticAndDeliver={collectPlasticAndDeliver}
          callCustomer={callCustomer}
          callStore={callStore}
          onGoOffline={toggleOnlineStatus}
        />
      ) : (
        <EkoOfflineSection onGoOnline={toggleOnlineStatus} />
      )}
    </SafeAreaView>
  );
};

export default EkoStatusComponent;

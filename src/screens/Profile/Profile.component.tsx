import React from 'react';
import {View, ScrollView, StatusBar} from 'react-native';
import {useStatusBarStyle} from '../../hooks/useStatusBarStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './Profile.styles';
import {Colors} from '../../constants/colors';
import ProfileHeaderSection from './profile-sections/ProfileHeader.section';
import ProfileStatsSection from './profile-sections/ProfileStats.section';
import ProfileVehicleSection from './profile-sections/ProfileVehicle.section';
import ProfileSettingsSection from './profile-sections/ProfileSettings.section';
import {Rider, RiderStats} from '../../types/rider.types';

interface ProfileComponentProps {
  rider: Rider | null;
  stats: RiderStats | null;
  handleLogout: () => void;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({rider, stats, handleLogout}) => {
  useStatusBarStyle('light-content', Colors.primary);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      {/* Green strip fills the status bar inset area — white icons visible */}
      <View style={{height: insets.top, backgroundColor: Colors.primary}} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ProfileHeaderSection rider={rider} />
        <ProfileStatsSection rider={rider} stats={stats} />
        <ProfileVehicleSection rider={rider} />
        <ProfileSettingsSection onLogout={handleLogout} />
      </ScrollView>
    </View>
  );
};

export default ProfileComponent;

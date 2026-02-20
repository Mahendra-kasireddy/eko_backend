import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './Profile.styles';
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

const ProfileComponent: React.FC<ProfileComponentProps> = ({rider, stats, handleLogout}) => (
  <SafeAreaView style={styles.container} edges={['top']}>
    <StatusBar barStyle="light-content" backgroundColor="#1B4332" />
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <ProfileHeaderSection rider={rider} />
      <ProfileStatsSection rider={rider} stats={stats} />
      <ProfileVehicleSection rider={rider} />
      <ProfileSettingsSection onLogout={handleLogout} />
    </ScrollView>
  </SafeAreaView>
);

export default ProfileComponent;

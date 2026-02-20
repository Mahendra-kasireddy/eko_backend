import React from 'react';
import {useProfileHook} from './use-profile-hook';
import ProfileComponent from './Profile.component';

const ProfileContainer: React.FC = () => {
  const hookData = useProfileHook();
  return <ProfileComponent {...hookData} />;
};

export default ProfileContainer;

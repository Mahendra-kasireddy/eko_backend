import {Alert} from 'react-native';
import {useRiderStore} from '../../../store/rider.store';
import {PROFILE_STRINGS} from '../Profile.constants';

export const useProfileActions = () => {
  const clearRider = useRiderStore(s => s.clearRider);

  const handleLogout = () => {
    Alert.alert('Logout', PROFILE_STRINGS.LOGOUT_CONFIRM, [
      {text: PROFILE_STRINGS.LOGOUT_CANCEL, style: 'cancel'},
      {
        text: PROFILE_STRINGS.LOGOUT_CONFIRM_BTN,
        style: 'destructive',
        onPress: () => clearRider(),
      },
    ]);
  };

  return {handleLogout};
};

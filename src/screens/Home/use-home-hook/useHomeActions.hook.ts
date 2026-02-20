import {useRiderStore} from '../../../store/rider.store';

export const useHomeActions = () => {
  const isOnline = useRiderStore(s => s.isOnline);
  const toggleOnlineStatus = useRiderStore(s => s.toggleOnlineStatus);

  const handleToggleOnline = () => toggleOnlineStatus();

  return {isOnline, handleToggleOnline};
};

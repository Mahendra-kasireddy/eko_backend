import {useTripsData} from './useTripsData.hook';
import {useTripsActions} from './useTripsActions.hook';

export const useTripsHook = () => {
  const data = useTripsData();
  const actions = useTripsActions(data.activeTrip, data.updateTripStatus);
  return {...data, ...actions};
};

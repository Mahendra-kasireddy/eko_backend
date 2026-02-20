import {useState, useEffect} from 'react';
import {RiderStats} from '../../../types/rider.types';
import {Trip} from '../../../types/trip.types';
import {fetchHomeStats, fetchHomeTripData} from '../Home.services';
import {useRiderStore} from '../../../store/rider.store';
import {useTripStore} from '../../../store/trip.store';

export const useHomeData = () => {
  const rider = useRiderStore(s => s.rider);
  const setStats = useRiderStore(s => s.setStats);
  const stats = useRiderStore(s => s.stats);
  const setActiveTrip = useTripStore(s => s.setActiveTrip);
  const activeTrip = useTripStore(s => s.activeTrip);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [statsData, tripData] = await Promise.all([
          fetchHomeStats(),
          fetchHomeTripData(),
        ]);
        setStats(statsData);
        setActiveTrip(tripData);
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [setStats, setActiveTrip]);

  return {rider, stats, activeTrip, loading, error};
};

import {useEffect, useState} from 'react';
import {useEarningsStore} from '../../../store/earnings.store';
import {fetchMonthlyEarnings} from '../../../services/earnings.service';

export const useEarningsData = () => {
  const monthlyEarnings = useEarningsStore(s => s.monthlyEarnings);
  const setMonthlyEarnings = useEarningsStore(s => s.setMonthlyEarnings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMonthlyEarnings().then(data => {
      setMonthlyEarnings(data);
    }).finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {monthlyEarnings, loading};
};

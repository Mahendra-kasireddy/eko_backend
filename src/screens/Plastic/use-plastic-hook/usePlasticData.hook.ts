import {useEffect} from 'react';
import {usePlasticStore} from '../../../store/plastic.store';
import {fetchMonthlyPlasticSummary} from '../../../services/plastic.service';
import {useState} from 'react';

export const usePlasticData = () => {
  const monthlySummary = usePlasticStore(s => s.monthlySummary);
  const collections = usePlasticStore(s => s.collections);
  const setMonthlySummary = usePlasticStore(s => s.setMonthlySummary);
  const addCollection = usePlasticStore(s => s.addCollection);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMonthlyPlasticSummary().then(data => {
      setMonthlySummary(data);
      data.collections.forEach(c => {
        addCollection(c);
      });
    }).finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayCollections = collections.length > 0 ? collections : (monthlySummary?.collections ?? []);

  return {monthlySummary, collections: displayCollections, loading};
};

import { useEffect, useState } from 'react';
import { SummarizedOrderRequestData } from './types';

export function useGetOrdersStatistics() {
  const [data, setData] = useState<SummarizedOrderRequestData | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadStatistics = async () => {
      const url = `${import.meta.env.VITE_API_URL}/order/statistics?startDate=2024-09-07T15:00:00&endDate=2024-09-07T16:00:00`;
      console.log('URL', url);
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    loadStatistics();
  }, []);

  return { data, loading };
}

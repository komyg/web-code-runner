import { useEffect, useState } from 'react';
import { OrderStatistics, SummarizedOrderRequestData } from './types';
import { lightFormat } from 'date-fns';

export function useGetOrdersStatistics() {
  const [data, setData] = useState<OrderStatistics[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadStatistics = async () => {
      const url = `${import.meta.env.VITE_API_URL}/order/statistics`;
      const response = await fetch(url);
      const data: SummarizedOrderRequestData[] = await response.json();

      setData(
        data.map((data) => ({
          ...data,
          time: lightFormat(data.startDate, 'HH:mm'),
        }))
      );
      setLoading(false);
    };
    loadStatistics();
  }, []);

  return { data, loading };
}

import { useEffect, useState } from 'react';
import { ServiceData } from './types';

export function useGetServiceData(serviceId: string) {
  const [data, setData] = useState<ServiceData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOrdersServiceData = async () => {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/service/${serviceId}`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    loadOrdersServiceData();
  }, []);

  return { data, loading };
}

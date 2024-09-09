import { useState } from 'react';

interface UpdateServiceData {
  numReplicas: number;
}

export function useUpdateService() {
  const [loading, setLoading] = useState(false);

  const updateService = async (serviceId: string, data: UpdateServiceData) => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/service/${serviceId}`;
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error updating service', error);
    }

    setLoading(false);
  };

  return { loading, updateService };
}

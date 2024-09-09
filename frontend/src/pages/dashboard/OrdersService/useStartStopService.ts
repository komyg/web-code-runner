import { useState } from 'react';

export function useStartService() {
  const [loading, setLoading] = useState(false);

  const startService = async (serviceId: string) => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/service/${serviceId}/start`;
      await fetch(url, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error updating service', error);
    }

    setLoading(false);
  };

  return { loading, startService };
}

export function useStopService() {
  const [loading, setLoading] = useState(false);

  const stopService = async (serviceId: string, deploymentId: string) => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/service/${serviceId}/stop`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deploymentId }),
      });
    } catch (error) {
      console.error('Error updating service', error);
    }

    setLoading(false);
  };

  return { loading, stopService };
}

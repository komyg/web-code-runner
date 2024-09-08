import { useGetOrdersStatistics } from './useGetOrdersStatistics';

export function OrdersRequestChart() {
  const { data, loading } = useGetOrdersStatistics();

  console.log('Data', data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Data loaded</div>;
}

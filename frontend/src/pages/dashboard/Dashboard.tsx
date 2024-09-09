import { Box, CircularProgress, Container } from '@mui/material';
import { OrdersRequestChart } from './OrdersRequestChart/OrdersRequestChart';
import { OrdersService } from './OrdersService/OrdersService';
import { useGetServiceData } from './OrdersService/useGetServiceData';
import { useGetOrdersStatistics } from './OrdersRequestChart/useGetOrdersStatistics';

export function Dashboard() {
  const { data: serviceData, loading: serviceLoading } = useGetServiceData(
    import.meta.env.VITE_DEFAULT_SERVICE_ID
  );
  const { data: ordersData, loading: ordersLoading } = useGetOrdersStatistics();

  const loading =
    serviceLoading || ordersLoading || !serviceData || !ordersData;

  return (
    <Container>
      <Box
        display="flex"
        alignContent="center"
        justifyContent="center"
        mt="40px"
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <OrdersRequestChart ordersStatistics={ordersData} />
            <OrdersService serviceData={serviceData!} />
          </>
        )}
      </Box>
    </Container>
  );
}

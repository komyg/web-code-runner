import { Box, Container } from '@mui/material';
import { OrdersRequestChart } from './OrdersRequestChart/OrdersRequestChart';
import { OrdersService } from './OrdersService/OrdersService';

export function Dashboard() {
  return (
    <Container>
      <Box display="flex">
        <OrdersRequestChart />
        <OrdersService />
      </Box>
    </Container>
  );
}

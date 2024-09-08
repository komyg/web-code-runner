import { Box, Typography } from '@mui/material';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import { OrderStatistics } from './types';

interface Props {
  ordersStatistics: OrderStatistics[];
}

export function OrdersRequestChart({ ordersStatistics }: Props) {
  return (
    <Box display="flex" justifyContent="center" alignContent="center">
      <Typography variant="h4">Order Requests</Typography>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryBar data={ordersStatistics} x="time" y="successfulRequests" />
      </VictoryChart>
    </Box>
  );
}

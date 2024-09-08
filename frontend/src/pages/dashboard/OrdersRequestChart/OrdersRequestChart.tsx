import { Box, Typography } from '@mui/material';
import { VictoryBar, VictoryChart, VictoryStack, VictoryTheme } from 'victory';
import { OrderStatistics } from './types';

interface Props {
  ordersStatistics: OrderStatistics[];
}

export function OrdersRequestChart({ ordersStatistics }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5">Order Requests</Typography>
      <VictoryChart
        theme={VictoryTheme.material}
        width={600}
        title="Order Requests"
      >
        <VictoryStack>
          <VictoryBar
            data={ordersStatistics}
            x="time"
            y="successfulRequests"
            style={{ data: { fill: 'green' } }}
          />
          <VictoryBar
            data={ordersStatistics}
            x="time"
            y="failedRequests"
            style={{ data: { fill: 'yellow' } }}
          />
          <VictoryBar
            data={ordersStatistics}
            x="time"
            y="serverErrorRequests"
            style={{ data: { fill: 'red' } }}
          />
          <VictoryBar
            data={ordersStatistics}
            x="time"
            y="badGatewayRequests"
            style={{ data: { fill: 'purple' } }}
          />
          <VictoryBar
            data={ordersStatistics}
            x="time"
            y="serviceUnabailableRequests"
            style={{ data: { fill: 'purple' } }}
          />
          <VictoryBar
            data={ordersStatistics}
            x="time"
            y="gatewayTimeoutRequests"
            style={{ data: { fill: 'grey' } }}
          />
        </VictoryStack>
      </VictoryChart>
    </Box>
  );
}

import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetOrdersStatistics } from './useGetOrdersStatistics';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

export function OrdersRequestChart() {
  const { data, loading } = useGetOrdersStatistics();

  return (
    <Box display="flex" justifyContent="center" alignContent="center">
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant="h4">Order Requests</Typography>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar data={data} x="startDate" y="successfulRequests" />
          </VictoryChart>
        </Box>
      )}
    </Box>
  );
}

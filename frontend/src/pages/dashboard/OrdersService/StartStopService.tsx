import { Box, Button } from '@mui/material';
import { useStartService, useStopService } from './useStartStopService';

interface Props {
  serviceId: string;
  serviceStatus: string;
  deploymentId: string;
}

export function StartStopService({
  serviceId,
  deploymentId,
  serviceStatus,
}: Props) {
  const { loading: startServiceLoading, startService } = useStartService();
  const { loading: stopServiceLoading, stopService } = useStopService();
  const loading = startServiceLoading || stopServiceLoading;

  const startButton = (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      disabled={loading}
      onClick={() => startService(serviceId)}
    >
      Start
    </Button>
  );
  const stopButton = (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      disabled={loading}
      onClick={() => stopService(serviceId, deploymentId)}
    >
      Stop
    </Button>
  );

  return (
    <Box display="flex" justifyContent="space-around">
      {serviceStatus === 'SUCCESS' ? stopButton : startButton}
    </Box>
  );
}

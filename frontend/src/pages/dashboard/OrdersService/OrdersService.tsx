import { Box, Typography } from '@mui/material';
import { ServiceData } from './types';
import { OrdersServiceForm } from './OrdersServiceForm';
import { StartStopService } from './StartStopService';

interface Props {
  serviceData: ServiceData;
}

export function OrdersService({ serviceData }: Props) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">{serviceData.serviceName}</Typography>
      <Typography>Service ID: {serviceData.serviceId}</Typography>
      <Typography>Status: {serviceData.status}</Typography>
      <OrdersServiceForm
        numReplicas={serviceData.numReplicas}
        serviceId={serviceData.serviceId}
        serviceStatus={serviceData.status}
      />
      <StartStopService
        serviceId={serviceData.serviceId}
        serviceStatus={serviceData.status}
        deploymentId={serviceData.deploymentId}
      />
    </Box>
  );
}

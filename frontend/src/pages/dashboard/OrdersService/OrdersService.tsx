import { Box, Typography } from '@mui/material';
import { ServiceData } from './types';
import { OrdersServiceForm } from './OrdersServiceForm';

interface Props {
  serviceData: ServiceData;
}

export function OrdersService({ serviceData }: Props) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">{serviceData.serviceName}</Typography>
      <Typography>Service ID: {serviceData.serviceId}</Typography>
      <Typography>Status: {serviceData.status}</Typography>
      <OrdersServiceForm numReplicas={serviceData.numReplicas} />
    </Box>
  );
}

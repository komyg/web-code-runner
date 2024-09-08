import { Box, Typography } from '@mui/material';
import { ServiceData } from './types';

interface Props {
  serviceData: ServiceData;
}

export function OrdersService({ serviceData }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
    >
      <Typography variant="h6">{serviceData.serviceName}</Typography>
    </Box>
  );
}

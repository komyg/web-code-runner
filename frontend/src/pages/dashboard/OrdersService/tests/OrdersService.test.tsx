import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import { OrdersService } from '../OrdersService';
import { ServiceData } from '../types';

it('should match the snapshot', () => {
  const fakeServiceData: ServiceData = {
    serviceId: 'fake-service-id',
    serviceName: 'fake-service',
    numReplicas: 1,
    status: 'SUCCESS',
    deploymentId: 'fake-deployment-id',
  };
  const { asFragment } = render(
    <OrdersService serviceData={fakeServiceData} />
  );
  expect(asFragment()).toMatchSnapshot();
});

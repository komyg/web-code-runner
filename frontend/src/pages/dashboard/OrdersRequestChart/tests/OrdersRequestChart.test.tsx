import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import { OrdersRequestChart } from '../OrdersRequestChart';
import { OrderStatistics } from '../types';
import { parseISO } from 'date-fns';

it('should match the snapshot', () => {
  const fakeStatistics: OrderStatistics[] = [
    {
      startDate: parseISO('2022-09-09T10:10:00Z'),
      endDate: parseISO('2022-09-09T10:15:00Z'),
      time: '10:10',
      totalRequests: 21,
      successfulRequests: 1,
      failedRequests: 2,
      serverErrorRequests: 3,
      badGatewayRequests: 4,
      serviceUnavailableRequests: 5,
      gatewayTimeoutRequests: 6,
    },
    {
      startDate: parseISO('2022-09-09T10:15:00Z'),
      endDate: parseISO('2022-09-09T10:20:00Z'),
      time: '10:15',
      totalRequests: 57,
      successfulRequests: 7,
      failedRequests: 8,
      serverErrorRequests: 9,
      badGatewayRequests: 10,
      serviceUnavailableRequests: 11,
      gatewayTimeoutRequests: 12,
    },
  ];
  const { asFragment } = render(
    <OrdersRequestChart ordersStatistics={fakeStatistics} />
  );
  expect(asFragment()).toMatchSnapshot();
});

import { describe, it, expect } from 'vitest';
import { buildApp } from '../../app';
import { SummarizedOrderRequestData } from '../../types/order.types';

describe('/order/statistics', () => {
  it('should return order statistics', async () => {
    const app = buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/order/statistics',
    });

    expect(response.statusCode).toBe(200);

    const body: SummarizedOrderRequestData[] = response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0].totalRequests).toBeGreaterThan(0);
    expect(body[0].successfulRequests).toBeGreaterThan(0);
  });
});

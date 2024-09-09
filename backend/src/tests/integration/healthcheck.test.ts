import { describe, it, beforeEach, expect } from 'vitest';
import { buildApp } from '../../app';
describe('/', () => {
  it('should return healthcheck', async () => {
    const app = buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ healthy: true });
  });
});

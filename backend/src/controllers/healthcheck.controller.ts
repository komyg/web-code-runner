import { RouteShorthandOptions } from 'fastify';

export const healthcheckSchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          healthy: {
            type: 'boolean',
          },
        },
      },
    },
  },
};

export async function healthcheck() {
  return { healthy: true };
}

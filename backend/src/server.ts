import 'dotenv/config';
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { registerCodeRunnerRoutes } from './code-runner/code-runner.router';
import { registerOrderRoutes } from './orders/orders.router';

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
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

server.get('/', opts, async (request, reply) => {
  return { healthy: true };
});

registerCodeRunnerRoutes(server);
registerOrderRoutes(server);

const start = async () => {
  try {
    await server.listen({ host: '0.0.0.0', port: 3000 });

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
console.log('Server is listening on port 3000');

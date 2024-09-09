import 'dotenv/config';
import cors from '@fastify/cors';
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { registerRoutes } from './router/router';

const server: FastifyInstance = Fastify({});

registerRoutes(server);

const start = async () => {
  try {
    await server.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type'],
    });

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

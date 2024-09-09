import cors from '@fastify/cors';
import 'dotenv/config';
import { buildApp } from './app';

async function start() {
  const app = buildApp();
  try {
    await app.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type'],
    });

    await app.listen({ host: '0.0.0.0', port: 3000 });

    const address = app.server.address();
    const port = typeof address === 'string' ? address : address?.port;
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
console.log('Server is listening on port 3000');

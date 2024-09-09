import Fastify, {
  FastifyHttpOptions,
  FastifyInstance,
  FastifyServerOptions,
} from 'fastify';
import { registerRoutes } from './router/router';

export function buildApp(opts: FastifyServerOptions = {}) {
  const app: FastifyInstance = Fastify(opts);
  registerRoutes(app);
  return app;
}

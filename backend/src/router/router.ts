import { FastifyInstance } from 'fastify';
import { getOrderStats } from '../controllers/orders.controller';
import {
  getServiceData,
  getServiceDataSchema,
} from '../controllers/railway-services.controller';

export function registerRoutes(fastify: FastifyInstance) {
  registerOrderRoutes(fastify);
  railwayServicesRoutes(fastify);
}

function registerOrderRoutes(fastify: FastifyInstance) {
  fastify.get('/order/statistics', getOrderStats);
}

function railwayServicesRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/service/:serviceId',
    getServiceDataSchema,
    getServiceData as any
  );
}

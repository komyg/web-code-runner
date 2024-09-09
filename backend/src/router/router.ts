import { FastifyInstance } from 'fastify';
import { getOrderStats } from '../controllers/orders.controller';
import {
  getServiceData,
  GetServiceDataParams,
  getServiceDataSchema,
  patchService,
  PatchServiceBody,
  PatchServiceParams,
  patchServiceSchema,
} from '../controllers/railway-services.controller';

export function registerRoutes(fastify: FastifyInstance) {
  registerOrderRoutes(fastify);
  railwayServicesRoutes(fastify);
}

function registerOrderRoutes(fastify: FastifyInstance) {
  fastify.get('/order/statistics', getOrderStats);
}

function railwayServicesRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: GetServiceDataParams }>(
    '/service/:serviceId',
    getServiceDataSchema,
    getServiceData
  );
  fastify.patch<{ Params: PatchServiceParams; Body: PatchServiceBody }>(
    '/service/:serviceId',
    patchServiceSchema,
    patchService
  );
}

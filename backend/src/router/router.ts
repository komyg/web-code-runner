import { FastifyInstance } from 'fastify';
import { getOrderStats } from '../controllers/orders.controller';

export function registerOrderRoutes(fastify: FastifyInstance) {
  fastify.get('/order/statistics', getOrderStats);
}

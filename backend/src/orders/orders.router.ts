import { FastifyInstance } from 'fastify';
import { getOrderStats } from './orders.controller';

export function registerOrderRoutes(fastify: FastifyInstance) {
  fastify.get('/order/statistics', getOrderStats);
}

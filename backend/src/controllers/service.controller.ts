import { parseISO } from 'date-fns';
import { FastifyReply, FastifyRequest } from 'fastify';
import { getOrderStatistics } from '../services/load-balancer/load-balancer.service';
import { getServiceInstanceData } from '../services/railway/railway.service';

export async function getServiceData(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const serviceId = (request.query as any).serviceId;
  const data = await getServiceInstanceData(serviceId);
  reply.send(data);
}

export async function getOrderStats(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const startDate = parseISO((request.query as any).startDate);
  const endDate = parseISO((request.query as any).endDate);
  const data = await getOrderStatistics(startDate, endDate);
  reply.send(data);
}

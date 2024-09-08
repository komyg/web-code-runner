import { parseISO } from 'date-fns';
import { FastifyReply, FastifyRequest } from 'fastify';
import { getOrderStatistics } from './service/orders.service';

export async function getOrderStats(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const startDate = parseISO((request.query as any).startDate);
  const endDate = parseISO((request.query as any).endDate);
  console.log('parsed');
  const data = await getOrderStatistics(startDate, endDate);
  reply.send(data);
}

import { parseISO, subHours } from 'date-fns';
import { FastifyReply, FastifyRequest } from 'fastify';
import { getOrderStatistics } from '../services/load-balancer/load-balancer.service';

export const getOrderStatsSchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        startDate: { type: 'string' },
        endDate: { type: 'string' },
      },
    },
  },
};

export interface GetOrderStatsQueryParams {
  startDate: string;
  endDate: string;
}

export async function getOrderStats(
  request: FastifyRequest<{ Querystring: GetOrderStatsQueryParams }>,
  reply: FastifyReply
) {
  const endDate = request.query.endDate
    ? parseISO(request.query.endDate)
    : new Date();
  const startDate = request.query.startDate
    ? parseISO(request.query.startDate)
    : subHours(endDate, 1);

  const data = await getOrderStatistics(startDate, endDate);
  reply.send(data);
}

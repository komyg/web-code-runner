import { parseISO } from 'date-fns';
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';
import { getOrderStatistics } from '../services/load-balancer/load-balancer.service';
import { getServiceInstanceData } from '../services/railway/railway.service';

export const getServiceDataSchema: RouteShorthandOptions = {
  schema: {
    params: {
      type: 'object',
      required: ['serviceId'],
      properties: {
        serviceId: { type: 'string' },
      },
    },
  },
};

export interface GetServiceDataParams {
  serviceId: string;
}

export async function getServiceData(
  request: FastifyRequest<{ Params: GetServiceDataParams }>,
  reply: FastifyReply
) {
  const { serviceId } = request.params;
  const result = await getServiceInstanceData(serviceId);
  reply.send(result.data);
}

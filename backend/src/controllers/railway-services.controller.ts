import { min, parseISO } from 'date-fns';
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';
import { getOrderStatistics } from '../services/load-balancer/load-balancer.service';
import {
  getServiceInstanceData,
  updateNumReplicas,
} from '../services/railway/railway.service';

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

export const patchServiceSchema: RouteShorthandOptions = {
  schema: {
    params: {
      type: 'object',
      required: ['serviceId'],
      properties: {
        serviceId: { type: 'string' },
      },
    },
    body: {
      type: 'object',
      required: ['numReplicas'],
      properties: {
        numReplicas: { type: 'number', minimum: 1 },
      },
    },
  },
};

export interface PatchServiceParams {
  serviceId: string;
}

export interface PatchServiceBody {
  numReplicas: number;
}

export async function patchService(
  request: FastifyRequest<{
    Params: PatchServiceParams;
    Body: PatchServiceBody;
  }>,
  reply: FastifyReply
) {
  const { serviceId } = request.params;
  const { numReplicas } = request.body;
  const result = await updateNumReplicas(serviceId, numReplicas);
  result.error
    ? reply
        .code(400)
        .send({ error: 'Error updating number of replicas for service' })
    : reply.code(200);
}

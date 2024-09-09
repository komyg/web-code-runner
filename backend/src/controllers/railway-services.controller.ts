import { min, parseISO } from 'date-fns';
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';
import { getOrderStatistics } from '../services/load-balancer/load-balancer.service';
import {
  deployService,
  getServiceInstanceData,
  removeServiceDeployment,
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
    response: {
      200: {
        type: 'object',
        properties: {
          serviceId: { type: 'string' },
          serviceName: { type: 'string' },
          numReplicas: { type: 'number' },
          status: { type: 'string' },
          deploymentId: { type: 'string' },
        },
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
  if (result.error) {
    console.error(result.error);
  }

  const responseBody = {
    serviceId,
    serviceName: result.data?.serviceInstance.serviceName,
    numReplicas: result.data?.serviceInstance.numReplicas,
    status: result.data?.serviceInstance.latestDeployment.status,
    deploymentId: result.data?.serviceInstance.latestDeployment.id,
  };

  reply.send(responseBody);
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
  if (result.error) {
    console.error(result.error);
  }

  result.error
    ? reply
        .code(400)
        .send({ error: 'Error updating number of replicas for service' })
    : reply.code(200);
}

export const startServiceSchema: RouteShorthandOptions = {
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

export interface StartStopServiceParam {
  serviceId: string;
}

export async function startService(
  request: FastifyRequest<{
    Params: StartStopServiceParam;
  }>,
  reply: FastifyReply
) {
  const { serviceId } = request.params;
  const result = await deployService(serviceId);
  if (result.error) {
    console.error(result.error);
  }

  result.error
    ? reply.code(400).send({ error: 'Error starting service' })
    : reply.code(200);
}

export interface StopServiceBody {
  deploymentId: string;
}

export const stopServiceSchema: RouteShorthandOptions = {
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
      required: ['deploymentId'],
      properties: {
        deploymentId: { type: 'string' },
      },
    },
  },
};

export async function stopService(
  request: FastifyRequest<{
    Params: StartStopServiceParam;
    Body: StopServiceBody;
  }>,
  reply: FastifyReply
) {
  const { deploymentId } = request.body;
  const result = await removeServiceDeployment(deploymentId);
  if (result.error) {
    console.error(result.error);
  }

  result.error
    ? reply.code(400).send({ error: 'Error stopping service' })
    : reply.code(200);
}

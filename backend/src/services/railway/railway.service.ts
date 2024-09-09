import { gql } from '@urql/core';
import { railwayClient } from './railway.client';

const RAILWAY_URL = process.env.RAILWAY_URL;

export async function deployRunnerInstance() {
  const document = gql`
    mutation ServiceInstanceDeploy(
      $environmentId: String!
      $serviceId: String!
    ) {
      serviceInstanceDeploy(
        environmentId: $environmentId
        serviceId: $serviceId
      )
    }
  `;

  return railwayClient
    .mutation(document, {
      environmentId: process.env.RAILWAY_ENVIRONMENT,
      serviceId: '2b3e5634-232c-47b1-ae91-553f3e0a3a98',
    })
    .toPromise();
}

export async function removeRunnerDeployment() {
  const document = gql`
    mutation DeploymentRemove($id: String!) {
      deploymentRemove(id: $id)
    }
  `;

  return railwayClient
    .mutation(document, {
      id: '45bf508c-6ebe-4ebd-b604-add368b4cff0',
    })
    .toPromise();
}

export async function updateNumReplicas(
  serviceId: string,
  numReplicas: number
) {
  const document = gql`
    mutation ServiceInstanceUpdate($numReplicas: Int!, $serviceId: String!) {
      serviceInstanceUpdate(
        input: { numReplicas: $numReplicas }
        serviceId: $serviceId
      )
    }
  `;

  return railwayClient
    .mutation(document, { numReplicas, serviceId })
    .toPromise();
}

interface ServiceInstanceData {
  serviceInstance: {
    latestDeployment: {
      createdAt: string;
      status: string;
      updatedAt: string;
    };
    numReplicas: number;
    serviceName: string;
  };
}

export async function getServiceInstanceData(serviceId: string) {
  const document = gql`
    query ServiceInstance($environmentId: String!, $serviceId: String!) {
      serviceInstance(environmentId: $environmentId, serviceId: $serviceId) {
        latestDeployment {
          createdAt
          status
          updatedAt
        }
        numReplicas
        serviceName
      }
    }
  `;

  const query = await railwayClient
    .query<ServiceInstanceData>(document, {
      serviceId,
      environmentId: process.env.RAILWAY_ENVIRONMENT,
    })
    .toPromise();

  console.log(query);

  return query;
}

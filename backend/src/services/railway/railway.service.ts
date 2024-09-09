import { gql } from '@urql/core';
import { railwayClient } from './railway.client';

const RAILWAY_URL = process.env.RAILWAY_URL;

export async function deployService(serviceId: string) {
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
      environmentId: process.env.RAILWAY_ENV,
      serviceId,
    })
    .toPromise();
}

export async function removeServiceDeployment(deploymentId: string) {
  const document = gql`
    mutation DeploymentRemove($id: String!) {
      deploymentRemove(id: $id)
    }
  `;

  return railwayClient
    .mutation(document, {
      id: deploymentId,
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
      id: string;
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
          id
        }
        numReplicas
        serviceName
      }
    }
  `;

  return railwayClient
    .query<ServiceInstanceData>(document, {
      serviceId,
      environmentId: process.env.RAILWAY_ENV,
    })
    .toPromise();
}

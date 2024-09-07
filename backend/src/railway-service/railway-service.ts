import { gql } from '@urql/core';
import { railwayClient } from './client';

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

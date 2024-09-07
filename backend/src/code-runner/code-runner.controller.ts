import { FastifyReply, FastifyRequest } from 'fastify';
import {
  deployRunnerInstance,
  removeRunnerDeployment,
} from '../railway-service/railway-service';

export async function startRunner(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await deployRunnerInstance();
  console.log('Runner started', result.data);
}

export async function stopRunner(request: FastifyRequest, reply: FastifyReply) {
  const result = await removeRunnerDeployment();
  console.log(result.data);
}

export async function runCode(request: FastifyRequest, reply: FastifyReply) {}

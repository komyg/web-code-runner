import { FastifyInstance } from 'fastify';
import { runCode, startRunner, stopRunner } from './code-runner.controller';

export function registerCodeRunnerRoutes(fastify: FastifyInstance) {
  fastify.post('/code-runner/start-runner', startRunner);
  fastify.post('/code-runner/stop-runner', stopRunner);
  fastify.post('/code-runner/run', runCode);
}

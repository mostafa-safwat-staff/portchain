import { FastifyInstance } from 'fastify';
import { checkHealth } from '../controllers/healthController';

export default async function (fastify: FastifyInstance) {
    fastify.get('/', checkHealth);
}

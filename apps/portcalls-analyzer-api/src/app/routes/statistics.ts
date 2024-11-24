import { FastifyInstance } from 'fastify';
import { getStatistics } from '../controllers/statisticsController';

export default async function (fastify: FastifyInstance) {
    fastify.get('/api/statistics', getStatistics);
}

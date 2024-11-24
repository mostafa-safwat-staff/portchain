import { FastifyReply, FastifyRequest } from "fastify";

export const checkHealth = (req: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ healthy: true });
};
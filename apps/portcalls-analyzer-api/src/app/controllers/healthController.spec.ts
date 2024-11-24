import { FastifyReply, FastifyRequest } from 'fastify';
import { checkHealth } from './healthController';
describe('Health Check Controller', () => {
    it('should return healthy when the service is available', () => {
        const mockSend = jest.fn();
        const reply = {
            send: mockSend,
        } as unknown as FastifyReply;

        const req = {} as FastifyRequest;

        checkHealth(req, reply);

        expect(mockSend).toHaveBeenLastCalledWith({ healthy: true });
    });
});

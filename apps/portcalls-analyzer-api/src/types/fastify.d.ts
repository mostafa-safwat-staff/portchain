import { PortChainService } from '../services/PortChainService';

declare module 'fastify' {
    interface FastifyInstance {
        portChainService: PortChainService;
        config: ConfigVars;
    }
}

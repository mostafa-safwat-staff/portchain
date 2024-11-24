import fastifyPlugins from 'fastify-plugin';
import { PortChainService } from '../../services/PortChainService';
import Config from '../../types/config';
import { FastifyInstance } from 'fastify';

interface PluginOptions {
    config: Config;
}

const applicationServices = async (fastify: FastifyInstance, opts: PluginOptions) => {
    const service = new PortChainService({
        baseUrl: opts.config.BASE_PORT_CHAIN_API_URL,
    });
    fastify.decorate('portChainService', service);
};

export default fastifyPlugins(applicationServices);

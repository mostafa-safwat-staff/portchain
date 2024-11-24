import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: { ...opts, config: fastify.config },
    });

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: { ...opts },
    });
}
